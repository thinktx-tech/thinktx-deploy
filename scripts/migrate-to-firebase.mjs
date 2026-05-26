#!/usr/bin/env node
/**
 * One-time migration script
 * Imports data/careers.json and data/learning-hub.json into Firestore,
 * and uploads every file in public/uploads/ to Firebase Storage.
 *
 * Run: node scripts/migrate-to-firebase.mjs
 *
 * Requires: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY,
 *           NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET in environment (reads .env.local automatically).
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, join, basename } from "path";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { createRequire } from "module";

// ── Load .env.local manually (no dotenv dependency needed) ──────────────────
const envPath = resolve(process.cwd(), ".env.local");
try {
    const raw = readFileSync(envPath, "utf-8");
    for (const line of raw.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^"(.*)"$/, "$1");
        if (!process.env[key]) process.env[key] = val;
    }
} catch {
    console.warn("⚠️  Could not read .env.local – make sure env vars are set.");
}

// ── Init Firebase Admin ─────────────────────────────────────────────────────
if (getApps().length === 0) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
}

const db = getFirestore();
const bucket = getStorage().bucket();

// ── Helpers ─────────────────────────────────────────────────────────────────
async function uploadFile(localPath, destPath) {
    await bucket.upload(localPath, { destination: destPath });
    await bucket.file(destPath).makePublic();
    const url = `https://storage.googleapis.com/${bucket.name}/${destPath}`;
    console.log(`  ✅ Uploaded → ${url}`);
    return url;
}

async function upsertDoc(collection, id, data) {
    await db.collection(collection).doc(id).set(data, { merge: true });
}

// ── Step 1: Upload files from public/uploads/ ────────────────────────────────
console.log("\n📂 Uploading files from public/uploads/ to Firebase Storage...");
const uploadsDir = resolve(process.cwd(), "public", "uploads");
const urlMap = {}; // local path → firebase URL

try {
    const files = readdirSync(uploadsDir).filter(
        (f) => !f.startsWith(".") && statSync(join(uploadsDir, f)).isFile()
    );

    for (const filename of files) {
        const localPath = join(uploadsDir, filename);
        const destPath = `uploads/${filename}`;
        try {
            // Check if already exists in bucket
            const [exists] = await bucket.file(destPath).exists();
            if (exists) {
                const url = `https://storage.googleapis.com/${bucket.name}/${destPath}`;
                urlMap[`/uploads/${filename}`] = url;
                console.log(`  ⏭️  Already exists: ${filename}`);
            } else {
                const url = await uploadFile(localPath, destPath);
                urlMap[`/uploads/${filename}`] = url;
            }
        } catch (err) {
            console.error(`  ❌ Failed: ${filename}`, err.message);
        }
    }
} catch (err) {
    console.warn("⚠️  Could not read public/uploads/:", err.message);
}

// ── Helper: replace old local URLs with Firebase Storage URLs ────────────────
function remapUrl(val) {
    if (!val) return val;
    return urlMap[val] ?? val;
}

// ── Step 2: Migrate careers.json → Firestore ─────────────────────────────────
console.log("\n💼 Migrating careers...");
try {
    const careers = JSON.parse(readFileSync(resolve(process.cwd(), "data", "careers.json"), "utf-8"));
    for (const item of careers) {
        const data = {
            ...item,
            createdAt: item.createdAt ?? Date.now(),
        };
        await upsertDoc("careers", item.id, data);
        console.log(`  ✅ Career: ${item.title}`);
    }
} catch (err) {
    console.error("❌ Careers migration failed:", err.message);
}

// ── Step 3: Migrate learning-hub.json → Firestore ───────────────────────────
console.log("\n📚 Migrating learning hub...");
try {
    const items = JSON.parse(readFileSync(resolve(process.cwd(), "data", "learning-hub.json"), "utf-8"));
    for (const item of items) {
        const data = {
            ...item,
            coverImage: remapUrl(item.coverImage),
            attachment: remapUrl(item.attachment),
            createdAt: item.createdAt ?? Date.now(),
        };
        await upsertDoc("learning-hub", item.id, data);
        console.log(`  ✅ Article: ${item.title.slice(0, 60)}...`);
    }
} catch (err) {
    console.error("❌ Learning hub migration failed:", err.message);
}

console.log("\n🎉 Migration complete! Your data is now in Firebase.\n");
process.exit(0);

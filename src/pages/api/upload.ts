import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminAccessToken } from "@/lib/firebase-admin";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

const TOKEN = process.env.ADMIN_TOKEN ?? "thinktx-admin-token-secure";
const BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "";
const BUCKET_FOLDER = "uploads";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const auth = req.headers.authorization;
    if (auth !== `Bearer ${TOKEN}`) return res.status(401).json({ error: "Unauthorized" });

    const form = formidable({
        maxFileSize: 20 * 1024 * 1024,
        keepExtensions: true,
    });

    try {
        const [, files] = await form.parse(req);
        const file = files.file?.[0];
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        const originalName = (file.originalFilename ?? "file")
            .replace(/[^a-zA-Z0-9._-]/g, "_")
            .replace(/_{2,}/g, "_");
        const destPath = `${BUCKET_FOLDER}/${Date.now()}-${originalName}`;
        const contentType = file.mimetype ?? "application/octet-stream";

        const fileBuffer = fs.readFileSync(file.filepath);
        const accessToken = await getAdminAccessToken();

        // Firebase Storage REST API — works with both appspot.com and firebasestorage.app buckets
        const encodedPath = encodeURIComponent(destPath);
        const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o?name=${encodedPath}&uploadType=media`;

        const uploadRes = await fetch(uploadUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": contentType,
            },
            body: fileBuffer,
        });

        if (!uploadRes.ok) {
            const errText = await uploadRes.text();
            console.error(`[upload] Firebase Storage error ${uploadRes.status}: ${errText}`);
            return res.status(500).json({ error: "Upload failed", detail: `Firebase ${uploadRes.status}` });
        }

        const metadata = await uploadRes.json() as { downloadTokens?: string };
        const downloadToken = metadata.downloadTokens;

        // Firebase download URL — works without public storage rules
        const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodedPath}?alt=media&token=${downloadToken ?? ""}`;

        fs.unlink(file.filepath, () => {});

        return res.status(200).json({ url });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[upload] error:", message);
        return res.status(500).json({ error: "Upload failed", detail: message });
    }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const TOKEN = process.env.ADMIN_TOKEN ?? "thinktx-admin-token-secure";
const COLLECTION = "careers";

export interface CareerItem {
    id: string;
    title: string;
    department: string;
    location: string;
    type: "full-time" | "internship";
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    published: boolean;
    date: string;
    createdAt?: number;
}

function isAuthed(req: NextApiRequest) {
    return req.headers.authorization === `Bearer ${TOKEN}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = adminDb();

    /* ── Public GET — return published items ── */
    if (req.method === "GET" && !req.headers.authorization) {
        const snap = await db.collection(COLLECTION)
            .where("published", "==", true)
            .get();
        const items = snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .sort((a: any, b: any) => ((b.createdAt || 0) - (a.createdAt || 0)));
        return res.status(200).json(items);
    }

    /* ── Admin GET — return all items ── */
    if (req.method === "GET" && isAuthed(req)) {
        const snap = await db.collection(COLLECTION)
            .orderBy("createdAt", "desc")
            .get();
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        return res.status(200).json(items);
    }

    if (!isAuthed(req)) return res.status(401).json({ error: "Unauthorized" });

    /* ── POST — create ── */
    if (req.method === "POST") {
        const docRef = db.collection(COLLECTION).doc();
        const item: CareerItem = {
            ...req.body,
            id: docRef.id,
            date: req.body.date || new Date().toISOString().split("T")[0],
            createdAt: Date.now(),
        };
        await docRef.set(item);
        return res.status(201).json(item);
    }

    /* ── PUT — update ── */
    if (req.method === "PUT") {
        const { id, ...rest } = req.body;
        if (!id) return res.status(400).json({ error: "Missing id" });
        await db.collection(COLLECTION).doc(id).update({ ...rest, updatedAt: FieldValue.serverTimestamp() });
        const updated = await db.collection(COLLECTION).doc(id).get();
        return res.status(200).json({ id: updated.id, ...updated.data() });
    }

    /* ── DELETE ── */
    if (req.method === "DELETE") {
        const { id } = req.body;
        if (!id) return res.status(400).json({ error: "Missing id" });
        await db.collection(COLLECTION).doc(id).delete();
        return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
}

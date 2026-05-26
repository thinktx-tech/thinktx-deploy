import type { NextApiRequest, NextApiResponse } from "next";

/* ────────────────────────────────────────────────────────────
   Simple auth — swap for a real provider in production
   ──────────────────────────────────────────────────────────── */

const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASS = process.env.ADMIN_PASS ?? "thinktx2024";
const TOKEN = process.env.ADMIN_TOKEN ?? "thinktx-admin-token-secure";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { username, password } = req.body ?? {};

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        return res.status(200).json({ token: TOKEN });
    }

    return res.status(401).json({ error: "Invalid credentials" });
}

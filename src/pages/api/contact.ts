import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Sender must be on a domain verified in Resend (thinktx.my).
const FROM = process.env.CONTACT_FROM || "ThinkTx Website <contact@thinktx.my>";
const TO = process.env.CONTACT_EMAIL || "info@thinktx.my";

// Reject obviously abusive payloads early.
const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const body = req.body ?? {};
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (!EMAIL_RE.test(email)) {
        return res.status(400).json({ error: "Invalid email address" });
    }
    if (
        name.length > LIMITS.name ||
        email.length > LIMITS.email ||
        subject.length > LIMITS.subject ||
        message.length > LIMITS.message
    ) {
        return res.status(400).json({ error: "Field too long" });
    }

    try {
        const { error } = await resend.emails.send({
            from: FROM,
            to: TO,
            replyTo: email,
            subject: `[Website] ${subject}`,
            text: `New contact form submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
            `,
        });

        if (error) {
            console.error("Resend send error:", error);
            return res.status(500).json({ error: "Failed to send email" });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Email send error:", error);
        return res.status(500).json({ error: "Failed to send email" });
    }
}

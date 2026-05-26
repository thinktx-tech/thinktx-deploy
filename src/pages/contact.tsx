import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

/* ────────────────────────────────────────────────────────────
   Location coordinates for Wisma Pantai, Bangsar Trade Centre
   ──────────────────────────────────────────────────────────── */

const LAT = 3.1285;
const LNG = 101.6725;
const ADDRESS_ENCODED = encodeURIComponent(
    "Suite B-16-3, Level 16, Tower B, Wisma Pantai, Bangsar Trade Centre, No. 5, Jalan 4/83A, Off Jalan Pantai Baharu, 59200 Kuala Lumpur"
);

const mapLinks = [
    {
        label: "Google Maps",
        href: `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`,
        logo: "/gmaps.png",
        imageClass: "w-8 h-8 object-contain",
    },
    {
        label: "Apple Maps",
        href: `https://maps.apple.com/?q=${ADDRESS_ENCODED}&ll=${LAT},${LNG}`,
        logo: "/amaps.png",
        imageClass: "w-8 h-8 object-contain",
    },
    {
        label: "Waze",
        href: `https://waze.com/ul?ll=${LAT},${LNG}&navigate=yes`,
        logo: "/waze.png",
        imageClass: "w-8 h-8 object-cover rounded-xl",
    },
];

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            setStatus("sent");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            <Navbar alwaysVisible />

            {/* ── Hero ── */}
            <PageHero
                badge="Contact Us"
                heading={<>Get in Touch <span className="text-accent">With Us.</span></>}
                subtitle="We are always happy to hear from you. Reach out for consultations, inquiries, or just to say hello."
                image="/contact-hero.png"
                imageAlt="ThinkTx Office"
            />

            {/* ── Divider ── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
            </div>

            {/* ── Contact Content ── */}
            <section className="relative z-10 bg-background">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

                        {/* ── Left: Contact Info ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="flex flex-col gap-10"
                        >
                            {/* General Enquiries */}
                            <div
                                className="p-8 rounded-2xl bg-background"
                                style={{ boxShadow: "var(--neu-raised)" }}
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent">
                                        General Enquiries
                                    </h3>
                                </div>

                                <ul className="flex flex-col gap-5">
                                    <li>
                                        <Link
                                            href="mailto:info@thinktx.my"
                                            className="group flex items-center gap-4 text-foreground/60 hover:text-accent transition-colors duration-200"
                                        >
                                            <span
                                                className="w-10 h-10 rounded-xl flex items-center justify-center bg-background flex-shrink-0"
                                                style={{ boxShadow: "var(--neu-raised-sm)" }}
                                            >
                                                <Mail className="w-4 h-4 text-accent/70" />
                                            </span>
                                            <span className="text-sm font-semibold">info@thinktx.my</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="tel:+60362629633"
                                            className="group flex items-center gap-4 text-foreground/60 hover:text-accent transition-colors duration-200"
                                        >
                                            <span
                                                className="w-10 h-10 rounded-xl flex items-center justify-center bg-background flex-shrink-0"
                                                style={{ boxShadow: "var(--neu-raised-sm)" }}
                                            >
                                                <Phone className="w-4 h-4 text-accent/70" />
                                            </span>
                                            <span className="text-sm font-semibold">+603 6262 9633</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="tel:+60149649633"
                                            className="group flex items-center gap-4 text-foreground/60 hover:text-accent transition-colors duration-200"
                                        >
                                            <span
                                                className="w-10 h-10 rounded-xl flex items-center justify-center bg-background flex-shrink-0"
                                                style={{ boxShadow: "var(--neu-raised-sm)" }}
                                            >
                                                <Phone className="w-4 h-4 text-accent/70" />
                                            </span>
                                            <span className="text-sm font-semibold">+6014 964 9633</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Headquarters */}
                            <div
                                className="p-8 rounded-2xl bg-background"
                                style={{ boxShadow: "var(--neu-raised)" }}
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent">
                                        Headquarters
                                    </h3>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span
                                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-background flex-shrink-0 mt-0.5"
                                        style={{ boxShadow: "var(--neu-raised-sm)" }}
                                    >
                                        <MapPin className="w-4 h-4 text-accent/70" />
                                    </span>
                                    <p className="text-sm font-semibold text-foreground/60 leading-relaxed">
                                        Suite B-16-3, Level 16, Tower B<br />
                                        Wisma Pantai, Bangsar Trade Centre<br />
                                        No. 5, Jalan 4/83A, Off Jalan Pantai Baharu<br />
                                        59200 Kuala Lumpur, W.P. Kuala Lumpur
                                    </p>
                                </div>
                            </div>

                            {/* Map Embed */}
                            <div
                                className="rounded-2xl overflow-hidden bg-background"
                                style={{ boxShadow: "var(--neu-raised)" }}
                            >
                                <iframe
                                    title="ThinkTx Office Location"
                                    src={`https://maps.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`}
                                    width="100%"
                                    height="260"
                                    style={{ border: 0, display: "block" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Navigation Buttons */}
                            <div className="grid grid-cols-3 gap-3">
                                {mapLinks.map(({ label, href, logo, imageClass }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-background transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                                        style={{ boxShadow: "var(--neu-raised)" }}
                                    >
                                        <Image
                                            src={logo}
                                            alt={label}
                                            width={36}
                                            height={36}
                                            className={imageClass}
                                        />
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/60 group-hover:text-accent transition-colors duration-200 text-center leading-tight">
                                            {label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── Right: Contact Form ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                            className="h-full"
                        >
                            <div
                                className="p-8 sm:p-10 rounded-2xl bg-background h-full flex flex-col"
                                style={{ boxShadow: "var(--neu-raised)" }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent">
                                        Send Us a Message
                                    </h3>
                                </div>
                                <p className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
                                    Let&apos;s Get Started
                                </p>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2">
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className="w-full px-4 py-3 rounded-xl bg-background text-foreground text-sm placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
                                            style={{ boxShadow: "var(--neu-inset-sm)" }}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-background text-foreground text-sm placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
                                            style={{ boxShadow: "var(--neu-inset-sm)" }}
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            required
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="What is this about?"
                                            className="w-full px-4 py-3 rounded-xl bg-background text-foreground text-sm placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
                                            style={{ boxShadow: "var(--neu-inset-sm)" }}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col flex-1 min-h-0">
                                        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help..."
                                            className="w-full flex-1 min-h-[120px] px-4 py-3 rounded-xl bg-background text-foreground text-sm placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/40 transition-shadow resize-none"
                                            style={{ boxShadow: "var(--neu-inset-sm)" }}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-accent text-white font-semibold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === "sending" ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    {/* Status messages */}
                                    {status === "sent" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 text-green-500 text-sm font-medium"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            Message sent successfully! We&apos;ll get back to you soon.
                                        </motion.div>
                                    )}
                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-500 text-sm font-medium"
                                        >
                                            Something went wrong. Please try again or email us directly.
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <Footer hideCtaButton hideContact />
        </div>
    );
}

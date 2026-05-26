import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { Briefcase, MapPin, Clock, ArrowUpRight, Search, X, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import type { CareerItem } from "@/pages/api/careers";
import type { GetServerSideProps } from "next";

interface Props {
    items: CareerItem[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const { adminDb } = await import("@/lib/firebase-admin");
    const db = adminDb();
    const snap = await db.collection("careers")
        .where("published", "==", true)
        .get();
    const items: CareerItem[] = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as CareerItem))
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return { props: { items } };
};

const TYPE_COLORS: Record<string, string> = {
    "full-time": "bg-green-500/10 text-green-600",
    internship: "bg-purple-500/10 text-purple-600",
};

const JOB_TYPES = ["all", "full-time", "internship"] as const;

/* ────────────────────────────────────────────────────────────
   Career Detail Modal
   ──────────────────────────────────────────────────────────── */

function CareerModal({ item, onClose }: { item: CareerItem; onClose: () => void }) {
    const overlayRef = useRef<HTMLDivElement>(null);

    // Lock background scrolling natively without interfering with modal touch events
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <motion.div
            ref={overlayRef}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8 overflow-hidden bg-foreground/15"
            onClick={onClose}
        >
            {/* Modal card */}
            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                data-modal-body
                data-lenis-prevent="true"
                className="relative w-full max-w-2xl max-h-[100dvh] sm:max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-t-3xl sm:rounded-3xl bg-background border border-foreground/[0.06] scrollbar-hide overscroll-contain"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
                {/* Sticky header */}
                <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-lg rounded-t-3xl border-b border-foreground/[0.06]">
                    <div className="flex items-center gap-4 p-6 md:p-8 pb-5 md:pb-6">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center bg-background flex-shrink-0"
                            style={{ boxShadow: "var(--neu-inset-sm)" }}
                        >
                            <Briefcase className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight truncate">{item.title}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-xl flex items-center justify-center bg-background text-foreground/40 hover:text-accent transition-colors duration-200 flex-shrink-0"
                            style={{ boxShadow: "var(--neu-raised-sm)" }}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 pt-5 md:pt-6">
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${TYPE_COLORS[item.type] ?? "bg-foreground/5 text-foreground/40"}`}>
                            {item.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-foreground/45">
                            <Clock className="w-3.5 h-3.5" />
                            {item.department}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-foreground/45">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-foreground/45">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(item.date).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                    </div>

                    {/* Description */}
                    <div
                        className="text-sm md:text-[15px] text-foreground/60 leading-relaxed mb-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_b]:font-bold [&_i]:italic [&_u]:underline"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                    />

                    {/* Responsibilities */}
                    {item.responsibilities?.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4 w-full">
                                <div className="h-px flex-1 bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent text-center shrink">
                                    Responsibilities
                                </span>
                                <div className="h-px flex-1 bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                            </div>
                            <div className="flex flex-col gap-3">
                                {item.responsibilities.map((r, ri) => (
                                    <motion.div
                                        key={ri}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: 0.1 + ri * 0.04, ease: "easeOut" as const }}
                                        className="flex items-start gap-3.5"
                                    >
                                        <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-accent/10 text-accent text-[10px] font-bold flex-shrink-0 mt-0.5">
                                            {String(ri + 1).padStart(2, "0")}
                                        </span>
                                        <p className="text-sm text-foreground/50 leading-relaxed">{r}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Requirements */}
                    {item.requirements?.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4 w-full">
                                <div className="h-px flex-1 bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent text-center shrink">
                                    Requirements
                                </span>
                                <div className="h-px flex-1 bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                            </div>
                            <div className="flex flex-col gap-3">
                                {item.requirements.map((req, ri) => (
                                    <motion.div
                                        key={ri}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: 0.1 + ri * 0.04, ease: "easeOut" as const }}
                                        className="flex items-start gap-3.5"
                                    >
                                        <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-accent/10 text-accent text-[10px] font-bold flex-shrink-0 mt-0.5">
                                            {String(ri + 1).padStart(2, "0")}
                                        </span>
                                        <p className="text-sm text-foreground/50 leading-relaxed">{req}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Benefits */}
                    {item.benefits?.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4 w-full">
                                <div className="h-px flex-1 bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent text-center shrink">
                                    Benefits
                                </span>
                                <div className="h-px flex-1 bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                            </div>
                            <div className="flex flex-col gap-3">
                                {item.benefits.map((b, bi) => (
                                    <motion.div
                                        key={bi}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: 0.1 + bi * 0.04, ease: "easeOut" as const }}
                                        className="flex items-start gap-3.5"
                                    >
                                        <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-accent/10 text-accent text-[10px] font-bold flex-shrink-0 mt-0.5">
                                            {String(bi + 1).padStart(2, "0")}
                                        </span>
                                        <p className="text-sm text-foreground/50 leading-relaxed">{b}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Apply CTA */}
                    <div className="pt-2">
                        <Link
                            href={`mailto:info@thinktx.my?subject=Application: ${encodeURIComponent(item.title)}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-bold transition-all duration-300 hover:shadow-[0_0_24px_rgba(238,32,70,0.35)] hover:-translate-y-0.5"
                        >
                            Apply Now
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */

export default function CareersPage({ items }: Props) {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [selected, setSelected] = useState<CareerItem | null>(null);
    const lenis = useLenis();

    // Lock page scroll (both Lenis + native) when modal is open
    useEffect(() => {
        if (selected) {
            lenis?.stop();
        } else {
            lenis?.start();
        }
    }, [selected, lenis]);

    const filtered = useMemo(() => {
        let result = items;
        if (typeFilter !== "all") result = result.filter((i) => i.type === typeFilter);
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (i) =>
                    i.title.toLowerCase().includes(q) ||
                    i.department.toLowerCase().includes(q) ||
                    i.location.toLowerCase().includes(q),
            );
        }
        return result;
    }, [items, search, typeFilter]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            <Navbar alwaysVisible />

            {/* ── Hero ── */}
            <PageHero
                badge="Careers"
                heading={<>Join Our <span className="text-accent">Team.</span></>}
                subtitle="Explore exciting career opportunities at ThinkTx and be part of a team redefining tax excellence in Malaysia."
                image="/careers-hero.png"
                imageAlt="Careers at ThinkTx"
                imagePosition="center 35%"
            />

            {/* ── Divider ── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
            </div>

            {/* ── Search & Filter ── */}
            {items.length > 0 && (
                <section className="relative z-10 bg-background">
                    <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 pt-16 pb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            {/* Search input */}
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25 pointer-events-none" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by title, department or location..."
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                                    style={{ boxShadow: "var(--neu-inset-sm)" }}
                                />
                            </div>

                            {/* Type filter */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {JOB_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setTypeFilter(type)}
                                        className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${typeFilter === type
                                            ? "bg-accent text-white shadow-[0_0_16px_rgba(238,32,70,0.25)]"
                                            : "bg-background text-foreground/40 hover:text-foreground"
                                            }`}
                                        style={typeFilter !== type ? { boxShadow: "var(--neu-raised-sm)" } : undefined}
                                    >
                                        {type === "all" ? "All" : type}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ── Listings ── */}
            <section className="relative z-10 bg-background">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 py-20">
                    {items.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-24"
                        >
                            <Briefcase className="w-12 h-12 mx-auto mb-4 text-foreground/20" />
                            <h2 className="text-2xl font-bold mb-2">No openings right now</h2>
                            <p className="text-foreground/45 mb-8 max-w-md mx-auto">
                                We don't have any open positions at the moment, but we're always looking for talented people.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-bold transition-all duration-300 hover:shadow-[0_0_24px_rgba(238,32,70,0.35)] hover:-translate-y-0.5"
                            >
                                Send Us Your Resume
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-24 text-foreground/30">
                            <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-medium">No jobs match your search</p>
                            <p className="text-sm mt-1">Try a different keyword or filter.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {filtered.map((item, i) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    onClick={() => setSelected(item)}
                                    className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 rounded-2xl bg-background transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
                                    style={{ boxShadow: "var(--neu-raised)" }}
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold tracking-tight group-hover:text-accent transition-colors duration-200 truncate">
                                                {item.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-4 mt-1.5 text-sm text-foreground/40">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {item.location}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(item.date).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" })}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${TYPE_COLORS[item.type] ?? "bg-foreground/5 text-foreground/40"}`}>
                                                {item.type}
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 text-foreground/20 group-hover:text-accent transition-colors duration-200" />
                                        </div>
                                    </div>
                                </motion.button>
                            ))}

                            {/* General application CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center pt-8"
                            >
                                <p className="text-sm text-foreground/40 mb-4">
                                    Don't see a role that fits? We'd still love to hear from you.
                                </p>
                                <Link
                                    href="mailto:info@thinktx.my?subject=General Application"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all duration-200"
                                >
                                    Send a general application
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── What It's Like + How to Join ── */}
            <section className="relative z-10 bg-background">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* What It's Like to Work Here */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="rounded-2xl p-8 md:p-10 bg-background border border-foreground/[0.06]"
                            style={{ boxShadow: "var(--neu-raised)" }}
                        >
                            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
                                What It's Like to{" "}
                                <span className="text-accent">Work Here</span>
                            </h3>

                            <div className="flex flex-col gap-4 text-sm text-foreground/55 leading-relaxed mb-6">
                                <p>
                                    Working at ThinkTx means being part of a collaborative, high-performing environment that values expertise, integrity, and innovation.
                                </p>
                                <p>
                                    We believe in empowering our people, encouraging growth, and maintaining a culture of mutual respect and continuous learning.
                                </p>
                                <p>
                                    Whether you're a fresh graduate or an experienced professional, you'll find opportunities to develop your career through:
                                </p>
                            </div>

                            <ul className="flex flex-col gap-3">
                                {[
                                    "Hands-on experience with diverse clients across industries.",
                                    "Mentorship from seasoned professionals.",
                                    "Exposure to real-world tax, finance, and advisory challenges.",
                                    "Learning platforms and knowledge-sharing through ThinkTX Academy.",
                                    "A supportive, inclusive, and growth-focused workplace culture.",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/50 leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* How to Join Us */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="rounded-2xl p-8 md:p-10 bg-background border border-foreground/[0.06]"
                            style={{ boxShadow: "var(--neu-raised)" }}
                        >
                            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
                                How to{" "}
                                <span className="text-accent">Join Us</span>
                            </h3>

                            <p className="text-sm text-foreground/55 leading-relaxed mb-8">
                                We're always looking for talented individuals who share our values and vision. Here's how you can be part of ThinkTx's journey:
                            </p>

                            <ol className="flex flex-col gap-5">
                                {[
                                    { title: "Explore Open Positions", desc: "See the current roles we're hiring for above." },
                                    { title: "Apply Online", desc: "Submit your CV and a brief cover letter explaining why you'd like to join ThinkTx." },
                                    { title: "Let’s Talk", desc: "Shortlisted candidates will be contacted for interviews and assessments." },
                                    { title: "Grow With Us", desc: "If you're the right fit, we'll welcome you to the team and support your career every step of the way." },
                                ].map((step, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent text-sm font-bold flex items-center justify-center flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <p className="text-sm font-bold mb-0.5">{step.title}</p>
                                            <p className="text-sm text-foreground/45 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            <div className="mt-8 pt-6 border-t border-foreground/[0.06]">
                                <p className="text-sm text-foreground/45 leading-relaxed">
                                    To apply, send your CV to{" "}
                                    <Link href="mailto:info@thinktx.my" className="text-accent font-semibold hover:underline">
                                        info@thinktx.my
                                    </Link>{" "}
                                    with the subject line: <span className="font-semibold text-foreground/70">[Job Title] Application – Your Name</span>.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Job Detail Modal ── */}
            <AnimatePresence>
                {selected && (
                    <CareerModal item={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
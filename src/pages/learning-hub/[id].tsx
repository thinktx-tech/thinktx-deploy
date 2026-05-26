import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Newspaper, FileText, Calendar, Clock, Download, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { LearningHubItem } from "@/pages/api/learning-hub";
import type { GetServerSideProps } from "next";

/** Convert plain-text newlines to <br> only if the string has no HTML block tags */
function formatHtml(raw: string): string {
    if (!raw) return "";
    const hasBlocks = /<(p|div|br|ul|ol|li|h[1-6])\b/i.test(raw);
    if (hasBlocks) return raw;
    return raw.replace(/\n/g, "<br>");
}

interface Props {
    item: LearningHubItem;
}

const CATEGORIES = [
    { value: "newsletter", label: "Newsletter", icon: Newspaper },
    { value: "update", label: "Update", icon: FileText },
    { value: "article", label: "Article", icon: BookOpen },
] as const;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { adminDb } = await import("@/lib/firebase-admin");
    const db = adminDb();
    const id = ctx.params?.id as string;
    const doc = await db.collection("learning-hub").doc(id).get();
    if (!doc.exists) return { notFound: true };
    const data = doc.data()!;
    const item = {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis?.() ?? data.createdAt ?? null,
        updatedAt: data.updatedAt?.toMillis?.() ?? data.updatedAt ?? null,
    } as unknown as LearningHubItem;
    if (!item.published) return { notFound: true };
    return { props: { item } };
};

export default function LearningHubArticle({ item }: Props) {
    const cat = CATEGORIES.find((c) => c.value === item.category);
    const CategoryIcon = cat?.icon ?? BookOpen;
    const isPortraitType = item.category === "webinar" || item.category === "ibfd" || item.category === "newspaper";

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            <Navbar alwaysVisible />

            {/* ── Back nav ── */}
            <div className="pt-28 pb-4 max-w-4xl mx-auto px-5 sm:px-8 md:px-12">
                <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        href={`/learning-hub/category/${item.category}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/40 hover:text-accent transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to {item.category === "webinar" ? "Webinars" : item.category === "ibfd" ? "IBFD" : item.category === "newspaper" ? "National Newspaper" : "Learning Hub"}
                    </Link>
                </motion.div>
            </div>

            {isPortraitType ? (
                /* ── Portrait layout for webinar / ibfd ── */
                <article className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col items-center"
                    >
                        {/* Category badge */}
                        <div className="flex items-center gap-3 mb-8 self-start">
                            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider">
                                {item.category}
                            </span>
                        </div>

                        {/* Portrait A4 image — centred, max width constrained */}
                        <div
                            className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
                            style={{ aspectRatio: "210/297", boxShadow: "var(--neu-raised)" }}
                        >
                            {item.coverImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={item.coverImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-background/50">
                                    <BookOpen className="w-12 h-12 text-foreground/20" />
                                    <span className="text-sm text-foreground/20">No image uploaded</span>
                                </div>
                            )}
                        </div>

                        {/* Title, date, actions */}
                        <div className="w-full max-w-2xl mt-8">
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-3">
                                {item.title}
                            </h1>

                            <span className="flex items-center gap-1.5 text-sm text-foreground/30 mb-6">
                                <Calendar className="w-4 h-4" />
                                {item.date}
                            </span>

                            {item.summary && (
                                <div
                                    className="text-sm text-foreground/50 leading-relaxed mb-8 [&_b]:font-bold [&_i]:italic [&_u]:underline"
                                    dangerouslySetInnerHTML={{ __html: formatHtml(item.summary) }}
                                />
                            )}

                            <div className="flex flex-wrap gap-4">
                                {item.attachment && (
                                    <a
                                        href={item.attachment}
                                        download
                                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-white bg-accent hover:shadow-[0_0_24px_rgba(238,32,70,0.35)] transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download PDF
                                    </a>
                                )}
                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-accent bg-background hover:bg-accent/5 transition-colors duration-200"
                                        style={{ boxShadow: "var(--neu-raised)" }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View Link
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </article>
            ) : (
                /* ── Standard article layout ── */
                <article className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 pb-20">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-5 flex-wrap">
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center bg-background flex-shrink-0"
                                style={{ boxShadow: "var(--neu-inset-sm)" }}
                            >
                                <CategoryIcon className="w-6 h-6 text-accent" />
                            </div>
                            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider">
                                {item.category}
                            </span>
                            {item.source === "taxsphere" && (
                                <span className="inline-block px-3 py-1 rounded-full border border-foreground/10 text-foreground/70 text-sm font-bold uppercase tracking-wider">
                                    TaxSphere
                                </span>
                            )}
                            {item.source === "cch" && (
                                <span className="inline-block px-3 py-1 rounded-full border border-foreground/10 text-foreground/70 text-sm font-bold uppercase tracking-wider">
                                    CCH
                                </span>
                            )}
                            {item.source === "ringgitplus" && (
                                <span className="inline-block px-3 py-1 rounded-full border border-foreground/10 text-foreground/70 text-sm font-bold uppercase tracking-wider">
                                    ThinkTx + RinggitPlus
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 text-sm text-foreground/30">
                                <Calendar className="w-4 h-4" />
                                {item.date}
                            </span>
                            {item.readDuration && (
                                <span className="flex items-center gap-1.5 text-sm text-foreground/30">
                                    <Clock className="w-4 h-4" />
                                    {item.readDuration} min read
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5">
                            {item.title}
                        </h1>

                        <div
                            className="text-base md:text-lg text-foreground/50 leading-relaxed font-medium max-w-3xl [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_b]:font-bold [&_i]:italic [&_u]:underline [&_p]:mb-2 [&_p:last-child]:mb-0"
                            dangerouslySetInnerHTML={{ __html: formatHtml(item.summary) }}
                        />
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-px bg-background mb-10"
                        style={{ boxShadow: "var(--neu-inset-sm)" }}
                    />

                    {/* Cover image */}
                    {item.coverImage && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="relative w-full rounded-2xl overflow-hidden mb-10"
                            style={{ boxShadow: "var(--neu-raised)" }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.coverImage} alt={item.title} className="w-full h-auto object-cover" />
                        </motion.div>
                    )}

                    {/* Content */}
                    {item.content && item.content.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="rounded-2xl bg-background p-6 sm:p-8 md:p-10"
                            style={{ boxShadow: "var(--neu-raised)" }}
                        >
                            <div
                                className="text-[15px] md:text-base text-foreground/65 leading-[1.85]
                                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3
                                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3
                                    [&_li]:my-1
                                    [&_b]:font-bold [&_b]:text-foreground/80
                                    [&_i]:italic [&_u]:underline
                                    [&_p]:mb-4 [&_p:last-child]:mb-0
                                    [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-4 [&_h1]:mt-8
                                    [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-3 [&_h2]:mt-6
                                    [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mb-2 [&_h3]:mt-4
                                    [&_a]:text-accent [&_a]:underline [&_a]:hover:text-accent/80"
                                dangerouslySetInnerHTML={{ __html: formatHtml(item.content) }}
                            />
                        </motion.div>
                    )}

                    {/* Link + Attachment */}
                    {(item.link || item.attachment) && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-white bg-accent hover:shadow-[0_0_24px_rgba(238,32,70,0.35)] transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View Link
                                </a>
                            )}
                            {item.attachment && (
                                <a
                                    href={item.attachment}
                                    download
                                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-accent bg-background hover:bg-accent/5 transition-colors duration-200"
                                    style={{ boxShadow: "var(--neu-raised)" }}
                                >
                                    <Download className="w-4 h-4" />
                                    Download Attachment
                                </a>
                            )}
                        </motion.div>
                    )}

                    {/* Bottom back link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-16 pt-8 border-t border-foreground/[0.06]"
                    >
                        <Link
                            href="/learning-hub"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/40 hover:text-accent transition-colors duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Learning Hub
                        </Link>
                    </motion.div>
                </article>
            )}

            <Footer />
        </div>
    );
}

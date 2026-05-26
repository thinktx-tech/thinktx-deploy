import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import type { LearningHubItem } from "@/pages/api/learning-hub";
import type { GetServerSideProps } from "next";

function formatHtml(raw: string): string {
    if (!raw) return "";
    const hasBlocks = /<(p|div|br|ul|ol|li|h[1-6])\b/i.test(raw);
    if (hasBlocks) return raw;
    return raw.replace(/\n/g, "<br>");
}

interface Props {
    items: LearningHubItem[];
    slug: string;
    title: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const slug = context.params?.slug as string;
    const { adminDb } = await import("@/lib/firebase-admin");
    const db = adminDb();

    const snap = await db.collection("learning-hub")
        .where("published", "==", true)
        .get();
    const allItems = snap.docs
        .map((d) => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                // Convert Firestore Timestamps → epoch ms so Next.js can serialize them
                createdAt: data.createdAt?.toMillis?.() ?? data.createdAt ?? null,
                updatedAt: data.updatedAt?.toMillis?.() ?? data.updatedAt ?? null,
            } as unknown as LearningHubItem;
        })
        .sort((a, b) => ((b.createdAt as number) || 0) - ((a.createdAt as number) || 0));

    const sourceCategories = ["taxsphere", "cch", "ringgitplus"];
    let items: LearningHubItem[];
    if (slug === "article") {
        items = allItems.filter(
            (i) => i.category === "article" || sourceCategories.includes(i.category)
        );
    } else if (sourceCategories.includes(slug)) {
        items = allItems.filter(
            (i) => i.category === slug || (i.category === "article" && i.source === slug)
        );
    } else {
        items = allItems.filter((i) => i.category === slug);
    }

    let title = "Insights";
    if (slug === "newsletter") title = "Newsletters";
    if (slug === "article") title = "Articles";
    if (slug === "update") title = "Updates";
    if (slug === "taxsphere") title = "TaxSphere";
    if (slug === "cch") title = "CCH Articles";
    if (slug === "ringgitplus") title = "ThinkTx | RinggitPlus";
    if (slug === "newspaper") title = "National Newspaper";
    if (slug === "ibfd") title = "International Bureau of Fiscal Documentation";
    if (slug === "webinar") title = "Webinars";

    return { props: { items, slug, title } };
};

export default function CategoryPage({ items, slug, title }: Props) {
    const router = useRouter();
    const currentSource = router.query.source as string | undefined;

    const filteredItems = items.filter((item) => {
        if (slug !== "article") return true;
        if (!currentSource || currentSource === "all") return true;
        return item.category === currentSource || item.source === currentSource;
    });

    const setSourceFilter = (source: string) => {
        // Need to extract the raw pathname so we can shallow push correctly
        const urlObj = { 
            pathname: `/learning-hub/category/${slug}`, 
            query: source !== "all" ? { source } : {} 
        };
        router.push(urlObj, undefined, { shallow: true });
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            <Navbar alwaysVisible />

            {/* ── Hero ── */}
            <PageHero
                badge="Learning Hub"
                heading={<>{title}</>}
                subtitle={`Explore our latest ${title.toLowerCase()} and expert insights.`}
                image={slug === "webinar" ? "/Webinar.png" : "/learning-hero.jpg"}
                imageAlt={`ThinkTx ${title}`}
                imagePosition={slug === "webinar" ? "center 25%" : "center 40%"}
            />

            {/* ── Divider ── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
            </div>

            {/* ── Content ── */}
            <section className="relative z-10 bg-background">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-20">
                    
                    <div className="mb-12">
                        <Link 
                            href="/learning-hub" 
                            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-accent transition-colors duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Directory
                        </Link>
                    </div>

                    {/* Article Filter Tabs */}
                    {slug === "article" && (
                        <div className="flex flex-wrap items-center gap-3 mb-10">
                            {[
                                { id: "all", label: "All Articles" },
                                { id: "taxsphere", label: "TaxSphere" },
                                { id: "cch", label: "CCH" },
                                { id: "ringgitplus", label: "ThinkTx + RinggitPlus" },
                            ].map((tab) => {
                                const isActive = currentSource === tab.id || (!currentSource && tab.id === "all");
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setSourceFilter(tab.id)}
                                        className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
                                            isActive 
                                                ? "bg-accent text-white shadow-[0_4px_14px_rgba(238,32,70,0.3)] hover:shadow-[0_6px_20px_rgba(238,32,70,0.4)]" 
                                                : "bg-background text-foreground/50 border border-foreground/10 hover:border-accent/40 hover:text-accent"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Items grid */}
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-24 text-foreground/30">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-medium">No {title.toLowerCase()} available yet in this category</p>
                            <p className="text-sm mt-1">Check back soon for new updates.</p>
                        </div>
                    ) : (slug === "webinar" || slug === "ibfd" || slug === "newspaper") ? (
                        /* ── Portrait A4 grid for webinar / ibfd / newspaper ── */
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                            {filteredItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <Link
                                        href={`/learning-hub/${item.id}`}
                                        className="group flex flex-col rounded-2xl bg-background overflow-hidden cursor-pointer"
                                        style={{ boxShadow: "var(--neu-raised)" }}
                                    >
                                        {/* Portrait A4 image — aspect ratio 210:297 */}
                                        <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: "210/297" }}>
                                            {item.coverImage ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={item.coverImage}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-background/50 gap-2">
                                                    <BookOpen className="w-8 h-8 text-foreground/20" />
                                                    <span className="text-xs text-foreground/20">No image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Title + date below */}
                                        <div className="px-4 pt-4 pb-5">
                                            <h3 className="text-sm font-bold leading-snug tracking-tight mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <span className="flex items-center gap-1 text-[11px] text-foreground/30">
                                                <Calendar className="w-3 h-3" />
                                                {item.date}
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        /* ── Standard article grid ── */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    whileHover={{ y: -4 }}
                                    className="h-full"
                                >
                                    <Link
                                        href={`/learning-hub/${item.id}`}
                                        className="group flex flex-col rounded-2xl bg-background cursor-pointer overflow-hidden text-left h-full"
                                        style={{ boxShadow: "var(--neu-raised)" }}
                                    >
                                        {item.coverImage && (
                                            <div className="relative w-full h-44 overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}

                                        <div className={`flex items-center gap-2 mb-4 px-7 flex-wrap ${item.coverImage ? "pt-6" : "pt-7"}`}>
                                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                            <span className="flex items-center gap-1 text-[11px] text-foreground/30">
                                                <Calendar className="w-3 h-3" />
                                                {item.date}
                                            </span>
                                            {item.readDuration && (
                                                <span className="flex items-center gap-1 text-[11px] text-foreground/30">
                                                    <Clock className="w-3 h-3" />
                                                    {item.readDuration} min read
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold tracking-tight mb-3 px-7 group-hover:text-accent transition-colors duration-200">
                                            {item.title}
                                        </h3>

                                        <div
                                            className={`text-sm text-foreground/50 leading-relaxed px-7 ${item.coverImage ? "line-clamp-3" : "line-clamp-[10]"} [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_b]:font-bold [&_i]:italic [&_u]:underline`}
                                            dangerouslySetInnerHTML={{ __html: formatHtml(item.summary) }}
                                        />

                                        <span className="mt-auto pt-4 pb-7 px-7 text-xs font-semibold text-accent">
                                            Read more →
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

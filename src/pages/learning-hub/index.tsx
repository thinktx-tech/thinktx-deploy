import { motion } from "framer-motion";
import Link from "next/link";
import { Newspaper, Video, Coins, Library, Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

const DIRECTORY_CATEGORIES = [
    {
        title: "TaxSphere",
        slug: "taxsphere",
        description: "Knowledge hub featuring our newsletters, expert articles, and compliance updates.",
        icon: null,
        image: "/thinktx-logo.png",
    },
    {
        title: "ThinkTx | CCH",
        slug: "cch",
        description: "Our curated content and analytical pieces for CCH professional platforms.",
        icon: Library,
        image: null,
    },
    {
        title: "ThinkTx | IBFD",
        slug: "ibfd",
        description: "Our journal pieces for International Bureau of Fiscal Documentation on authoritative global tax research and analysis. ",
        icon: Scale,
        image: null,
    },
    {
        title: "National Newspapers",
        slug: "newspaper",
        description: "Our tax and finance coverage for leading national newspapers.",
        icon: Newspaper,
        image: null,
    },
    {
        title: "Webinars",
        slug: "webinar",
        description: "Our webinar covering key tax developments and advisory topics.",
        icon: Video,
        image: null,
    },
    {
        title: "ThinkTx | RinggitPlus",
        slug: "ringgitplus",
        description: "Collaborative articles and financial guides brought to you by ThinkTx with Ringgitplus.",
        icon: Coins,
        image: null,
    },
] as const;

export default function LearningHubPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            <Navbar alwaysVisible />

            {/* ── Hero ── */}
            <PageHero
                badge="Learning Hub"
                heading={<>Insights & <span className="text-accent">Knowledge.</span></>}
                subtitle="Stay informed with our latest newsletters, tax updates, and expert articles."
                image="/learning-hero.jpg"
                imageAlt="ThinkTx Learning Hub"
                imagePosition="center 40%"
            />

            {/* ── Divider ── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
            </div>

            {/* ── Hub Directory Section ── */}
            <section className="relative z-10 bg-background pt-20 pb-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold tracking-tight">
                            Explore by <span className="text-accent">Category</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {DIRECTORY_CATEGORIES.map((cat, i) => (
                            <motion.div
                                key={cat.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="h-full"
                            >
                                <Link
                                    href={`/learning-hub/category/${cat.slug}`}
                                    className="group h-full flex flex-col p-8 rounded-3xl bg-background border border-foreground/[0.04] transition-all duration-300"
                                    style={{ boxShadow: "var(--neu-raised)" }}
                                >
                                    <div className="h-14 flex items-center justify-start mb-6 w-full">
                                        {cat.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={cat.image} alt={cat.title} className={`${"imageClass" in cat ? cat.imageClass : "max-h-8"} w-auto object-contain transition-transform duration-500 group-hover:scale-105 origin-left opacity-90 group-hover:opacity-100 filter group-hover:brightness-110`} />
                                        ) : cat.icon && (
                                            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
                                                <cat.icon className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                                        {cat.title}
                                    </h3>
                                    <p className="text-sm text-foreground/50 leading-relaxed mb-6 flex-grow">
                                        {cat.description}
                                    </p>
                                    <span className="text-xs font-bold text-foreground/40 group-hover:text-accent flex items-center gap-2 transition-colors">
                                        Browse Category
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import BreakingBarriers from "@/components/BreakingBarriers";
import Footer from "@/components/Footer";

/* ────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */

interface Award {
    title: string;
    category: string;
    year: string;
    description: string;
    image: string;
}

interface EngagementEvent {
    date: string;
    title: string;
    description: string;
    image: string;
}

interface MediaEngagement {
    outlet: string;
    type: string;
    title: string;
    description: string;
    image: string;
}

const awards: Award[] = [
    {
        title: "Malaysia Top Achievers",
        category: "Leadership Excellence in Tax Advisory Services",
        year: "2025",
        description:
            "We are honoured to be awarded the Malaysia Top Achievers 2025 – Leadership Excellence in Tax Advisory Services. This recognition reflects our unwavering commitment to delivering exceptional tax solutions, fostering innovation, and upholding the highest professional standards. This recognition highlights the success and outstanding performance of achievers in Malaysia, as well as recognises their contribution to the nation's economic growth. This award is a testament to the dedication, expertise, and collaborative spirit of our entire team.",
        image: "/Award2.png",
    },
    {
        title: "Nambikkai International Business Icon Awards",
        category: "Leadership Excellence in Business Advisory & Tax",
        year: "2025",
        description:
            "Endorsed by the Ministry of Entrepreneur and Cooperatives Development, Malaysia. We are honoured to be awarded the Nambikkai International Business Icon Awards 2025 – Leadership Excellence in Business Advisory & Tax. Being recognized at the international level affirms ThinkTx's position as a trusted advisory firm and reinforces our commitment to delivering reliable, practical and high-quality solutions to our clients, while upholding integrity, professionalism and excellence in everything we do.",
        image: "/Award1.png",
    },
];

const engagementEvents: EngagementEvent[] = [
    {
        date: "06 December 2025",
        title: "The Futurizts, RinggitPlus & CIMB",
        description:
            "Personal taxes made simple for individuals and sharing on key areas to watch out for tax filing.",
        image: "/e4.png",
    },
    {
        date: "31 October 2025",
        title: "Taylor's University",
        description:
            "Our Executive Director sharing on the tax implications on the rise of digital currency in support of Ministry of Economy's research on economic implications of related tax policies.",
        image: "/e3.png",
    },
    {
        date: "05 July 2025",
        title: "SEGi College KL",
        description:
            "Panel discussion on latest updates in Malaysia's taxation landscape, particularly recent changes in SST and rollout of e-Invoicing for businesses.",
        image: "/e2.png",
    },
    {
        date: "22 September 2024",
        title: "Malaysian Indian Contractors' Association",
        description:
            "e-Invoicing sharing session with logistics entrepreneurs.",
        image: "/e7.png",
    },
    {
        date: "17 August 2024",
        title: "Association of Logistics Entrepreneurs Malaysia",
        description:
            "Coaching business owners in the construction industry on e-Invoicing and sharing of key views.",
        image: "/e6.png",
    },
    {
        date: "22 June 2024",
        title: "Great Eastern",
        description:
            "Our Executive Director presenting on e-Invoicing for business players in insurance industry.",
        image: "/e5.png",
    },
];

const mediaEngagements: MediaEngagement[] = [
    {
        outlet: "BFM 89.9",
        type: "Radio Feature · 2025",
        title: "How LHDN Uses 'Badges of Trade' to Tax Crypto",
        description:
            "We recently featured on BFM 89.9's P&L podcast to discuss how LHDN applies \"badges of trade\" in taxing cryptocurrency transactions. We shared valuable insights on the distinction between capital gains and business income, valuation and record-keeping best practices, and the tax implications of activities such as trading, mining, and airdrops. At ThinkTx Consultants, we are committed to helping individuals and businesses navigate the evolving taxation landscape with clarity and compliance.",
        image: "/m1.png",
    },
];

/* ────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────── */

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
    }),
};

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */

export default function AccoladesPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            <Navbar alwaysVisible />

            {/* ── Hero ── */}
            <PageHero
                badge="Milestones"
                heading={<>Recognition & <span className="text-accent">Impact.</span></>}
                subtitle="Awards, engagements, and contributions that reflect our commitment to excellence in tax advisory and business consulting."
                image="/accolades-hero.png"
                imageAlt="ThinkTX Milestones"
            />

            {/* ── Awards ── */}
            <section className="relative z-10 bg-background">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-28">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                            <span className="text-sm md:text-base font-extrabold uppercase tracking-[0.2em] text-accent">
                                Awards
                            </span>
                        </div>
                        <p className="text-4xl md:text-5xl font-bold tracking-tight">
                            Recognised for <span className="text-accent">Excellence</span>
                        </p>
                    </motion.div>

                    {/* Award spotlight cards */}
                    <div className="flex flex-col gap-8">
                        {awards.map((award, idx) => (
                            <motion.div
                                key={idx}
                                custom={idx}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-80px" }}
                                className="relative overflow-hidden rounded-3xl border border-white/[0.15] bg-white/[0.04] backdrop-blur-xl shadow-lg shadow-black/10"
                            >
                                {/* Left accent stripe */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent rounded-r-full z-10" />
                                {/* Radial glow */}
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(238,32,70,0.07),transparent_60%)] pointer-events-none" />

                                <div className="grid grid-cols-1 md:grid-cols-[1fr_320px]">
                                    {/* Text side */}
                                    <div className="flex flex-col justify-center p-8 md:p-12 pl-10 md:pl-14">
                                        <Trophy className="w-8 h-8 text-accent mb-6" />
                                        <div className="inline-flex self-start items-center py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-extrabold uppercase tracking-[0.15em] mb-5">
                                            {award.category}
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                                            {award.title}
                                        </h3>
                                        <p className="text-[11px] font-semibold text-foreground/40 uppercase tracking-[0.2em] mb-6">
                                            {award.year}
                                        </p>
                                        <p className="text-sm md:text-[15px] text-foreground/55 leading-relaxed max-w-2xl">
                                            {award.description}
                                        </p>
                                    </div>

                                    {/* Image side */}
                                    <div className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-full">
                                        <Image
                                            src={award.image}
                                            alt={award.title}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Divider ── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
            </div>

            {/* ── Media Engagements ── */}
            <section className="relative z-10 bg-background border-t border-white/[0.15]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-28">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                            <span className="text-sm md:text-base font-extrabold uppercase tracking-[0.2em] text-accent">
                                Media Engagements
                            </span>
                        </div>
                        <p className="text-4xl md:text-5xl font-bold tracking-tight">
                            In the <span className="text-accent">Spotlight</span>
                        </p>
                    </motion.div>

                    {/* "As Featured In" label */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/40 mb-8"
                    >
                        As Featured In
                    </motion.p>

                    {/* Media cards */}
                    <div className="flex flex-col gap-8">
                        {mediaEngagements.map((media, idx) => (
                            <motion.div
                                key={idx}
                                custom={idx}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-80px" }}
                                className="relative grid grid-cols-1 md:grid-cols-[280px_1fr] rounded-3xl border border-white/[0.15] bg-white/[0.04] backdrop-blur-xl overflow-hidden shadow-lg shadow-black/10"
                            >
                                {/* Right accent stripe */}
                                <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-accent rounded-l-full z-10" />

                                {/* Image */}
                                <div className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-[320px]">
                                    <Image
                                        src={media.image}
                                        alt={media.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Text */}
                                <div className="flex flex-col justify-center p-8 md:p-12 pr-10 md:pr-14">
                                    <p className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                                        {media.outlet}
                                    </p>
                                    <div className="h-px bg-accent/20 mb-6" />
                                    <h3 className="text-base font-semibold tracking-tight mb-4">
                                        {media.title}
                                    </h3>
                                    <p className="text-sm text-foreground/55 leading-relaxed mb-8">
                                        {media.description}
                                    </p>
                                    <div className="self-start inline-flex items-center py-1.5 px-4 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-extrabold uppercase tracking-[0.15em]">
                                        {media.type}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Divider ── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
            </div>

            {/* ── Engagement Events ── */}
            <section className="relative z-10 bg-background">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-28">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                            <span className="text-sm md:text-base font-extrabold uppercase tracking-[0.2em] text-accent">
                                Engagement Events
                            </span>
                        </div>
                        <p className="text-4xl md:text-5xl font-bold tracking-tight">
                            Shaping the <span className="text-accent">Industry</span>
                        </p>
                    </motion.div>

                    {/* Event cards - packed closely together */}
                    <div className="flex flex-col gap-5">
                        {engagementEvents.map((event, idx) => {
                            const imageRight = idx % 2 === 0;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                                    className="group relative overflow-hidden rounded-3xl border border-accent bg-white/[0.03] backdrop-blur-xl"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">

                                        {/* Image — first in DOM = top on mobile */}
                                        <div className={`relative min-h-[240px] md:min-h-full overflow-hidden ${imageRight ? "md:order-2" : "md:order-1"}`}>
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                            />
                                            {/* Edge blend toward text side */}
                                            <div className={`absolute inset-0 ${imageRight ? "bg-gradient-to-r from-background/25 to-transparent" : "bg-gradient-to-l from-background/25 to-transparent"} md:block hidden`} />
                                        </div>

                                        {/* Text — second in DOM = bottom on mobile */}
                                        <div className={`relative flex flex-col justify-center p-8 md:p-12 overflow-hidden ${imageRight ? "md:order-1" : "md:order-2"}`}>

                                            {/* Subtle Number & Date Header */}
                                            <div className="flex items-center gap-4 mb-5">
                                                <span className="text-2xl font-black text-foreground/20 select-none">
                                                    {String(idx + 1).padStart(2, "0")}
                                                </span>
                                                {event.date && (
                                                    <div className="inline-flex items-center py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-extrabold uppercase tracking-[0.15em]">
                                                        {event.date}
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight leading-snug mb-4">
                                                {event.title}
                                            </h3>

                                            <p className="text-sm md:text-[15px] text-foreground/55 leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Breaking Barriers ── */}
            <div className="relative z-10 bg-background">
                <BreakingBarriers />
            </div>

            {/* ── Footer ── */}
            <Footer />
        </div>
    );
}
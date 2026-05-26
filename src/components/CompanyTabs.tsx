import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    UserCheck, Award, Layers, Lightbulb, TrendingUp,
    Target, Compass, ShieldCheck, Zap, Users, Star, RefreshCw,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────────── */

const differentiators = [
    {
        icon: UserCheck,
        title: "Specialist Practice, Personalized Service",
        body: "We are a niche consulting practice focused on delivering personalized, client-centric tax and corporate solutions tailored to meet unique needs.",
    },
    {
        icon: Award,
        title: "Experienced, Certified Professionals",
        body: "Our team comprises licensed tax agents, chartered accountants, and seasoned industry experts with a combined experience of over 40 years.",
    },
    {
        icon: Layers,
        title: "Comprehensive Range of Expertise",
        body: "From tax advisory to compliance and dispute resolution, we offer a wide array of services to address every aspect of your financial and corporate requirements.",
    },
    {
        icon: Lightbulb,
        title: "Thought Leaders in the Industry",
        body: "We actively engage in industry discussions, sharing insights on trending topics through impactful presentations, seminars, and publications.",
    },
    {
        icon: TrendingUp,
        title: "Proven Track Record Across Industries",
        body: "With extensive experience serving diverse sectors, we provide strategies that work, no matter your industry or business size.",
    },
];

const mvCards = [
    {
        icon: Target,
        title: "Mission",
        body: "To empower our clients with innovative solutions and personalized support, enabling them to achieve their financial and operational goals with confidence.",
    },
    {
        icon: Compass,
        title: "Vision",
        body: "To be the trusted partner for businesses and individuals, simplifying the complexities of tax and finance with clarity, expertise, and dedication.",
    },
];

const coreValues = [
    {
        num: "01",
        icon: ShieldCheck,
        title: "Integrity & Transparency",
        body: "Trust is at the core of our relationships. We ensure honest, transparent, and accountable consulting services for every client.",
    },
    {
        num: "02",
        icon: Zap,
        title: "Innovation & Forward Thinking",
        body: "We embrace modern strategies, data-driven insights, and innovative solutions to help businesses stay ahead of the curve.",
    },
    {
        num: "03",
        icon: Users,
        title: "Client Centric Approach",
        body: "We believe in personalized solutions, not one-size-fits-all strategies. Every business is unique, and we tailor our services to meet your needs.",
    },
    {
        num: "04",
        icon: Star,
        title: "Excellence & Expertise",
        body: "We are committed to delivering high-quality, results-driven consulting backed by deep industry expertise and extensive experience.",
    },
    {
        num: "05",
        icon: Target,
        title: "Collaboration & Partnership",
        body: "Success is a journey we take together. We work closely with our clients, fostering long-term relationships and providing hands-on guidance.",
    },
    {
        num: "06",
        icon: RefreshCw,
        title: "Adaptability & Resilience",
        body: "The business world is constantly changing. We help our clients navigate uncertainty with flexible, adaptive, and future-ready solutions.",
    },
];

const TABS = [
    { id: "apart", label: "What Sets Us Apart" },
    { id: "mission", label: "Mission & Vision" },
    { id: "values", label: "Core Values" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ── Tab content panels ───────────────────────────────────── */

function PanelApart() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {differentiators.map((item, i) => {
                const Icon = item.icon;
                const isLast = i === differentiators.length - 1 && differentiators.length % 2 !== 0;
                return (
                    <motion.div
                        key={item.title}
                        whileHover={{ y: -3 }}
                        className={`group relative flex items-start gap-5 p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl overflow-hidden transition-all duration-300 ${isLast ? "md:col-span-2" : ""}`}
                    >
                        <div
                            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ boxShadow: "inset 0 0 40px rgba(238, 32, 70, 0.12)" }}
                        />
                        <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.05] border border-white/[0.06] transition-all duration-300 group-hover:scale-110">
                            <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="relative z-10">
                            <h4 className="font-bold mb-1.5 text-white group-hover:text-accent transition-colors duration-300">
                                {item.title}
                            </h4>
                            <p className="text-white/55 text-sm leading-relaxed">
                                {item.body}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

function PanelMission() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mvCards.map((card, i) => {
                const Icon = card.icon;
                return (
                    <motion.div
                        key={card.title}
                        whileHover={{ y: -4 }}
                        className="group relative flex flex-col items-center text-center p-10 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl overflow-hidden transition-all duration-300"
                    >
                        <div
                            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ boxShadow: "inset 0 0 50px rgba(238, 32, 70, 0.15)" }}
                        />
                        <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/[0.05] border border-white/[0.06] transition-all duration-300 group-hover:scale-110">
                            <Icon className="w-7 h-7 text-accent" />
                        </div>
                        <div className="relative z-10 w-8 h-0.5 rounded-full bg-accent mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        <h3 className="relative z-10 text-2xl font-extrabold mb-4 text-white group-hover:text-accent transition-colors duration-300">
                            {card.title}
                        </h3>
                        <p className="relative z-10 text-white/55 leading-relaxed">
                            {card.body}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}

function PanelValues() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((item, i) => {
                const Icon = item.icon;
                return (
                    <motion.div
                        key={item.title}
                        whileHover={{ y: -4 }}
                        className="group relative flex flex-col p-7 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl overflow-hidden transition-all duration-300"
                    >
                        <div
                            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ boxShadow: "inset 0 0 40px rgba(238, 32, 70, 0.12)" }}
                        />

                        {/* Icon */}
                        <div className="relative z-10 mb-6">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/[0.05] transition-transform duration-300 group-hover:scale-110">
                                <Icon className="w-4 h-4 text-accent" />
                            </div>
                        </div>

                        {/* Accent line */}
                        <div className="relative z-10 w-8 h-[2px] rounded-full bg-accent/40 group-hover:bg-accent/80 group-hover:w-12 transition-all duration-500 mb-4" />

                        <h4 className="relative z-10 font-bold text-base mb-2 text-white group-hover:text-accent transition-colors duration-300">
                            {item.title}
                        </h4>
                        <p className="relative z-10 text-white/55 text-sm leading-relaxed">
                            {item.body}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}

/* ── Main component ───────────────────────────────────────── */

export default function CompanyTabs() {
    const [activeTab, setActiveTab] = useState<TabId>("apart");

    return (
        <section className="relative w-full bg-background py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
            <div className="relative max-w-7xl mx-auto">
                {/* Cinematic Envelope */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden"
                    style={{ boxShadow: "var(--neu-raised)" }}
                >
                    {/* Background image + overlays */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/ct.jpg"
                            alt="ThinkTX team background"
                            fill
                            className="object-cover"
                            style={{ objectPosition: "center 40%" }}
                        />
                        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 via-[60%] to-black/20" />
                    </div>

                    {/* Foreground content */}
                    <div className="relative z-10 px-6 sm:px-10 md:px-16 py-16 md:py-24">

                        {/* Section headline */}
                        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white"
                            >
                                Who We <span className="text-accent">Are.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mt-4 text-white/55 text-sm md:text-base max-w-xl leading-relaxed"
                            >
                                The values, mission, and principles that define every decision we make.
                            </motion.p>
                        </div>

                        {/* Tab switcher */}
                        <div className="flex justify-center mb-10">
                            <div className="inline-flex flex-wrap justify-center gap-1 sm:gap-0 p-1.5 rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08]">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                                            activeTab === tab.id
                                                ? "text-white bg-white/[0.12] border border-white/[0.15]"
                                                : "text-white/40 hover:text-white/65"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab content — grid-stacking keeps container height stable */}
                        <div className="grid">
                            {([
                                { id: "apart" as TabId, Panel: PanelApart },
                                { id: "mission" as TabId, Panel: PanelMission },
                                { id: "values" as TabId, Panel: PanelValues },
                            ] as const).map(({ id, Panel }) => (
                                <motion.div
                                    key={id}
                                    animate={{ opacity: activeTab === id ? 1 : 0 }}
                                    transition={{ duration: 0.45, ease: "easeInOut" }}
                                    className={`[grid-area:1/1] ${activeTab === id ? "pointer-events-auto" : "pointer-events-none"}`}
                                >
                                    <Panel />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

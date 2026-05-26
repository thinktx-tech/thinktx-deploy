import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Compass, Handshake } from "lucide-react";

const pillars = [
    {
        num: "01",
        icon: Globe,
        label: "The Landscape",
        body: "Malaysia's business landscape is evolving at pace — global markets, regulatory shifts, and industry disruptions demand strategic financial planning, corporate tax solutions, and advisory services that drive growth.",
    },
    {
        num: "02",
        icon: Compass,
        label: "Our Approach",
        body: "We partner with SMEs, startups, and corporations to navigate complexity with expert accounting, tax advisory, and business strategy — delivering tailored, forward-thinking solutions for every stage of growth.",
    },
    {
        num: "03",
        icon: Handshake,
        label: "Our Promise",
        body: "From corporate tax advisory and e-Invoicing to full business transformation, ThinkTx delivers the expertise to unlock opportunities, mitigate risks, and build long-term success.",
    },
];

export default function BreakingBarriers() {
    return (
        <section className="relative w-full bg-background py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
            <div className="relative max-w-7xl mx-auto">
                {/* ── Cinematic Envelope (Image + Content) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden"
                    style={{ boxShadow: "var(--neu-raised)" }}
                >
                    {/* Background image covering entirely */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/img2.png"
                            alt="ThinkTx team advising clients"
                            fill
                            className="object-cover"
                            style={{ objectPosition: "center 25%" }}
                        />
                        {/* Dark glass overlay for strong contrast and legibility */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 via-[60%] to-black/20" />
                    </div>

                    {/* Foreground Content */}
                    <div className="relative z-10 flex flex-col px-6 sm:px-10 md:px-16 py-16 md:py-24">

                        {/* Headline overlay */}
                        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-3xl"
                            >
                                Breaking Barriers,{" "}
                                <span className="text-accent">Building Success.</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mt-5 text-white/60 text-sm md:text-base max-w-xl leading-relaxed"
                            >
                                Three pillars that define how we deliver results for
                                every client, every time.
                            </motion.p>
                        </div>

                        {/* ── Three Pillar Glass Boxes ── */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            {pillars.map((pillar, i) => {
                                const Icon = pillar.icon;
                                return (
                                    <motion.div
                                        key={pillar.label}
                                        initial={{ opacity: 0, y: 28 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.4 + i * 0.12,
                                        }}
                                        whileHover={{ y: -6 }}
                                        className="group relative flex flex-col p-8 md:p-10 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl overflow-hidden transition-all duration-300"
                                    >
                                        {/* Hover glow */}
                                        <div
                                            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                boxShadow: "inset 0 0 80px rgba(238, 32, 70, 0.15)",
                                            }}
                                        />

                                        {/* Number + Icon row */}
                                        <div className="relative z-10 flex items-center justify-between mb-8">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.05] border border-white/[0.05] transition-transform duration-300 group-hover:scale-110">
                                                <Icon className="w-6 h-6 text-accent" />
                                            </div>
                                            <span className="relative z-20 text-5xl font-extrabold !text-white group-hover:text-accent transition-colors duration-500 select-none">
                                                {pillar.num}
                                            </span>
                                        </div>

                                        {/* Accent line */}
                                        <div className="relative z-10 w-10 h-[2px] rounded-full bg-accent/40 group-hover:bg-accent/80 group-hover:w-16 transition-all duration-500 mb-6" />

                                        {/* Label */}
                                        <h3 className="relative z-10 text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">
                                            {pillar.label}
                                        </h3>

                                        {/* Body */}
                                        <p className="relative z-10 text-white/55 text-[15px] leading-relaxed">
                                            {pillar.body}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

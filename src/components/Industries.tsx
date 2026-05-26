import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Car, Building2, ShoppingBag, Factory, Plane,
    Landmark, FlaskConical, Zap, HeartPulse, HardHat,
} from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

/* ── Data ─────────────────────────────────────────────────── */

const industries = [
    { name: "Automotive", icon: Car },
    { name: "Business Services", icon: Building2 },
    { name: "Retail", icon: ShoppingBag },
    { name: "Manufacturing", icon: Factory },
    { name: "Tourism & Travel", icon: Plane },
    { name: "Financial Services", icon: Landmark },
    { name: "Chemical Industries", icon: FlaskConical },
    { name: "Energy", icon: Zap },
    { name: "Healthcare", icon: HeartPulse },
    { name: "Construction", icon: HardHat },
];

const leftIndustries = industries.slice(0, 5);
const rightIndustries = industries.slice(5, 10);

/*
 * Curvature: positive = curve bows upward, negative = bows downward.
 * Top nodes curve up, bottom nodes curve down, middle is straight.
 * Both sides use the same values so the spread mirrors exactly.
 */
const curvatures = [75, 35, 0, -35, -75];

/*
 * Bracket-curve offsets: top/bottom nodes sit closer to center,
 * middle nodes furthest out — forming a ( ) parenthesis shape.
 * Values represent margin pushing the node inward (toward center).
 */
const bracketOffsets = [64, 28, 0, 28, 64];

/* ── Component ────────────────────────────────────────────── */

export default function Industries() {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);

    const ref0 = useRef<HTMLDivElement>(null);
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const ref4 = useRef<HTMLDivElement>(null);
    const ref5 = useRef<HTMLDivElement>(null);
    const ref6 = useRef<HTMLDivElement>(null);
    const ref7 = useRef<HTMLDivElement>(null);
    const ref8 = useRef<HTMLDivElement>(null);
    const ref9 = useRef<HTMLDivElement>(null);

    const leftRefs = [ref0, ref1, ref2, ref3, ref4];
    const rightRefs = [ref5, ref6, ref7, ref8, ref9];

    return (
        <section className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-20">
            {/* Section Header */}
            <div className="mb-16 md:mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-6"
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-background"
                        style={{ boxShadow: "var(--neu-raised-sm)" }}
                    >
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Sectors We Empower
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                >
                    Industries We{" "}
                    <span className="text-accent">Serve.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed"
                >
                    Deep industry expertise across 10+ sectors. We understand the
                    unique challenges within your industry, enabling strategic tax and
                    business advisory services that drive growth.
                </motion.p>
            </div>

            {/* ── Hub-and-Spoke Beam Diagram (md+) / Grid (mobile) ── */}

            {/* Desktop: hub-and-spoke with beams */}
            <div
                ref={containerRef}
                className="relative hidden md:flex flex-row items-center justify-between gap-4 min-h-[520px] py-8"
            >
                {/* Left Column — 5 nodes (bracket curve) */}
                <div className="relative z-10 flex flex-col justify-between h-[480px]">
                    {leftIndustries.map((industry, i) => {
                        const Icon = industry.icon;
                        return (
                            <motion.div
                                key={industry.name}
                                ref={leftRefs[i]}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                                whileHover={{ y: -3 }}
                                className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-background transition-all duration-300"
                                style={{ boxShadow: "var(--neu-raised)", marginLeft: `${bracketOffsets[i]}px` }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-background"
                                    style={{ boxShadow: "var(--neu-inset-sm)" }}
                                >
                                    <Icon className="w-5 h-5 text-foreground/50" />
                                </div>
                                <span className="text-sm font-semibold whitespace-nowrap">
                                    {industry.name}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Center — ThinkTx Logo */}
                <motion.div
                    ref={centerRef}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative z-10 flex-shrink-0"
                >
                    <div
                        className="w-24 h-24 rounded-full bg-background flex items-center justify-center"
                        style={{ boxShadow: "var(--neu-raised)" }}
                    >
                        <Image
                            src="/thinktx-logo.png"
                            alt="ThinkTx"
                            width={56}
                            height={56}
                            className="object-contain w-14 h-14"
                        />
                    </div>
                </motion.div>

                {/* Right Column — 5 nodes (bracket curve) */}
                <div className="relative z-10 flex flex-col justify-between h-[480px]">
                    {rightIndustries.map((industry, i) => {
                        const Icon = industry.icon;
                        return (
                            <motion.div
                                key={industry.name}
                                ref={rightRefs[i]}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                                whileHover={{ y: -3 }}
                                className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-background transition-all duration-300 flex-row-reverse"
                                style={{ boxShadow: "var(--neu-raised)", marginRight: `${bracketOffsets[i]}px` }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-background"
                                    style={{ boxShadow: "var(--neu-inset-sm)" }}
                                >
                                    <Icon className="w-5 h-5 text-foreground/50" />
                                </div>
                                <span className="text-sm font-semibold whitespace-nowrap">
                                    {industry.name}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Animated Beams — Left nodes → Center ── */}
                {leftRefs.map((ref, i) => (
                    <AnimatedBeam
                        key={`left-${i}`}
                        containerRef={containerRef}
                        fromRef={ref}
                        toRef={centerRef}
                        curvature={curvatures[i]}
                        gradientStartColor="#EE2046"
                        gradientStopColor="#ff6b81"
                        pathColor="#41445B"
                        pathWidth={1.5}
                        pathOpacity={0.1}
                        duration={4 + i * 0.3}
                        delay={i * 0.8}
                        repeatDelay={0}
                    />
                ))}

                {/* ── Animated Beams — Right nodes → Center ── */}
                {rightRefs.map((ref, i) => (
                    <AnimatedBeam
                        key={`right-${i}`}
                        containerRef={containerRef}
                        fromRef={ref}
                        toRef={centerRef}
                        curvature={curvatures[i]}
                        reverse
                        gradientStartColor="#EE2046"
                        gradientStopColor="#ff6b81"
                        pathColor="#41445B"
                        pathWidth={1.5}
                        pathOpacity={0.1}
                        duration={4 + i * 0.3}
                        delay={i * 0.8}
                        repeatDelay={0}
                    />
                ))}
            </div>

            {/* Mobile: clean 2-column grid (no beams) */}
            <div className="md:hidden grid grid-cols-2 gap-3 py-8">
                {industries.map((industry, i) => {
                    const Icon = industry.icon;
                    return (
                        <motion.div
                            key={industry.name}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-background"
                            style={{ boxShadow: "var(--neu-raised)" }}
                        >
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-background"
                                style={{ boxShadow: "var(--neu-inset-sm)" }}
                            >
                                <Icon className="w-4 h-4 text-foreground/50" />
                            </div>
                            <span className="text-xs font-semibold">
                                {industry.name}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

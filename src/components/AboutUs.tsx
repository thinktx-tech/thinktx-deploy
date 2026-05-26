import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
    return (
        <section className="relative w-full bg-background py-24 px-6 overflow-hidden">
            {/* Subtle ambient glow */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* ── Badge ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-background"
                        style={{ boxShadow: "var(--neu-raised-sm)" }}
                    >
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        About Us
                    </div>
                </motion.div>

                {/* ── Main Grid: Content Left + Image Right ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left — Text content */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: 0.05 }}
                            className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] mb-7"
                        >
                            A Trusted Partner in{" "}
                            <span className="text-accent">Tax & Advisory</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="text-foreground/50 text-base md:text-lg leading-relaxed mb-5 max-w-xl"
                        >
                            ThinkTx is a boutique consulting firm specialising in tax,
                            financial advisory, and corporate strategy. We help SMEs,
                            startups, and corporations navigate Malaysia&apos;s evolving
                            regulatory landscape with clarity and confidence.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="text-foreground/40 text-sm leading-relaxed mb-10 max-w-xl"
                        >
                            With a team of licensed tax agents, chartered accountants,
                            and seasoned industry experts, we deliver tailored,
                            forward-thinking strategies that drive growth and compliance.
                        </motion.p>

                        {/* ── CTA ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                        >
                            <Link
                                href="/team"
                                className="group inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent/80 transition-colors duration-300"
                            >
                                Meet the Team
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right — Image with floating accent elements */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Main image */}
                        <div
                            className="relative rounded-3xl overflow-hidden bg-background"
                            style={{ boxShadow: "var(--neu-raised)" }}
                        >
                            <Image
                                src="/img1.png"
                                alt="ThinkTx consulting team"
                                width={720}
                                height={540}
                                className="w-full h-auto object-cover"
                            />
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
                        </div>

                        {/* Decorative accent line */}
                        <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-accent/20 rounded-tr-3xl pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

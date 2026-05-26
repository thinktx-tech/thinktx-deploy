import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function CompanyQuote() {
    return (
        <section className="relative w-full bg-background py-16 md:py-20 px-6 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[700px] h-[350px] rounded-full bg-accent/5 blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        {/* Decorative quote mark */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-8"
                        >
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center bg-background"
                                style={{ boxShadow: "var(--neu-raised)" }}
                            >
                                <Quote className="w-7 h-7 text-accent" />
                            </div>
                        </motion.div>

                        {/* Quote text */}
                        <motion.blockquote
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-snug mb-8"
                        >
                            ThinkTx is a dynamic consulting firm specialising in{" "}
                            <span className="text-accent">tax</span>, financial
                            advisory, and business strategy solutions.
                        </motion.blockquote>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-2xl"
                        >
                            With a team of seasoned professionals, we help businesses
                            and individuals navigate an evolving financial and
                            regulatory landscape with{" "}
                            <span className="text-accent font-semibold">
                                confidence.
                            </span>
                        </motion.p>

                        {/* Decorative line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="w-24 h-[2px] bg-accent/30 rounded-full mt-10 origin-center"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

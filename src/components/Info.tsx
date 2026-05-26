import { motion } from "framer-motion";
import { ShieldCheck, Award, Users, TrendingUp } from "lucide-react";

const stats = [
    { value: "500+", label: "Clients Served", icon: Users },
    { value: "40+", label: "Years of Expertise", icon: Award },
    { value: "100%", label: "Financial Impact Delivered", icon: TrendingUp },
    { value: "100%", label: "Compliance Record", icon: ShieldCheck },
];

const pillars = [
    // "MOF Registered Tax Agents",
    // "MIA Certified Accountants",
    "SST & e-Invoicing Specialists",
    "Corporate Restructuring Advisors",
];

export default function Info() {
    return (
        <section className="relative w-full bg-background py-16 md:py-20 px-6 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[600px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />
            </div>

            <div className="relative max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-background"
                        style={{ boxShadow: "var(--neu-raised-sm)" }}
                    >
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Why ThinkTx
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Numbers That <span className="text-accent">Speak for Themselves.</span>
                    </h2>
                    <p className="text-foreground/60 text-lg max-w-xl mx-auto">
                        Trusted by hundreds of businesses across Malaysia to simplify complexity and protect what matters most.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="flex flex-col items-center text-center p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-background transition-all duration-300"
                                style={{ boxShadow: "var(--neu-raised)" }}
                            >
                                <div
                                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 bg-background"
                                    style={{ boxShadow: "var(--neu-inset-sm)" }}
                                >
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                                </div>
                                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-1">
                                    {stat.value}
                                </span>
                                <span className="text-xs sm:text-sm text-foreground/50 font-medium">
                                    {stat.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3"
                >
                    {pillars.map((pillar) => (
                        <div
                            key={pillar}
                            className="px-5 py-2.5 rounded-full text-sm font-semibold text-foreground/70 bg-background"
                            style={{ boxShadow: "var(--neu-raised-sm)" }}
                        >
                            {pillar}
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

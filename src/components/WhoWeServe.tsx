import { motion } from "framer-motion";
import Image from "next/image";

const segments = [
    {
        title: "SME Owners",
        image: "/SME.png",
        description:
            "We partner with SMEs to deliver the financial clarity and structure needed for sustainable growth — strategic tax advice, compliance support, and financial oversight.",
        points: [
            "• Business structuring & tax efficiency",
            "• Cost savings, incentives & streamlined ops",
            "• Tax position management for long-term growth",
            "• Outsourced accounting, payroll & SST services",
            "• Trusted advisory for decision & planning",
        ],
    },
    {
        title: "Corporates",
        image: "/corporate.png",
        description:
            "ThinkTx acts as your extended finance and compliance team — ensuring operational excellence, reducing risk, and optimising corporate governance.",
        points: [
            "• Outsourced finance & tax functions",
            "• High-level tax reviews & diagnostics",
            "• Corporate affairs & secretarial compliance",
            "• e-Invoicing, transfer pricing & restructuring",
            "• Corporate tax position & risk advisory",
        ],
    },
    {
        title: "Individuals",
        image: "/Individuals.png",
        description:
            "Personalised tax and compliance solutions for locals and expatriates alike — manage wealth, and to stay compliant, and plan effectively for the future.",
        points: [
            "• Personal income tax filings",
            "• Stamp duty on property & share transfers",
            "• Rental, dividends & reporting compliance",
            "• Expatriate & cross-border tax matters",
            "• Tax dispute resolution",
        ],
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
    }),
};

export default function WhoWeServe() {
    return (
        <section className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="text-center mb-20"
            >
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-background"
                    style={{ boxShadow: "var(--neu-raised-sm)" }}
                >
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Who We Serve
                </div>

                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                    ThinkTx is{" "}
                    <span className="text-accent">for</span>
                </h2>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {segments.map((seg, i) => (
                    <motion.div
                        key={seg.title}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="group flex flex-col rounded-3xl bg-background overflow-hidden"
                        style={{ boxShadow: "var(--neu-raised-sm)" }}
                    >
                        {/* Image */}
                        <div className="relative w-full h-56 overflow-hidden">
                            <Image
                                src={seg.image}
                                alt={seg.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                        </div>

                        {/* Body */}
                        <div className="flex flex-col flex-1 p-7">
                            <h3 className="text-2xl font-extrabold mb-4 group-hover:text-accent transition-colors duration-300">
                                {seg.title}
                            </h3>

                            <p className="text-sm text-foreground/55 leading-relaxed mb-6">
                                {seg.description}
                            </p>

                            {/* Divider */}
                            <div
                                className="w-full h-px mb-6 rounded-full"
                                style={{ boxShadow: "var(--neu-inset-sm)", background: "transparent", border: "none", height: "1px", opacity: 0.3, backgroundColor: "currentColor" }}
                            />

                            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                                How we help
                            </p>

                            <ul className="flex flex-col gap-2.5 flex-1">
                                {seg.points.map((point, j) => (
                                    <motion.li
                                        key={j}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 + j * 0.06 }}
                                        className="flex items-start gap-2.5 text-sm text-foreground/65 leading-snug"
                                    >
                                        <span className="mt-[5px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent/70" />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

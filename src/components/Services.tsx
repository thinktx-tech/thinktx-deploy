import { motion } from "framer-motion";
import { Calculator, Briefcase, FileText, Zap } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "Taxation",
        description: "Expert tax advisory, compliance, and dispute resolution to optimize tax outcomes and ensure regulatory compliance.",
        icon: Calculator,
        colSpan: "md:col-span-2",
        delay: 0.1,
        href: "/services#taxation",
    },
    {
        title: "Corporate Advisory",
        description: "Strategic solutions for business transformation, restructuring, and financial planning to drive growth and long-term success.",
        icon: Briefcase,
        colSpan: "md:col-span-1",
        delay: 0.2,
        href: "/services#corporate-advisory",
    },
    {
        title: "Outsourcing Services",
        description: "Streamlined accounting, payroll, and SST services to enhance efficiency and reduce your operational burdens.",
        icon: FileText,
        colSpan: "md:col-span-1",
        delay: 0.3,
        href: "/services#outsourcing",
    },
    {
        title: "e-Invoicing Compliance",
        description: "Seamlessly transition to digital invoicing. We ensure your business stays ahead of Malaysia's evolving tax regulations.",
        icon: Zap,
        colSpan: "md:col-span-2",
        delay: 0.4,
        href: "/services#taxation",
    },
];

export default function Services() {
    return (
        <section className="py-32 px-6 relative max-w-7xl mx-auto w-full">
            {/* Section Header */}
            <div className="mb-16 md:mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
                >
                    Comprehensive Solutions <br className="hidden md:block" />
                    <span className="text-foreground/40">Tailored for Success.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg text-foreground/60 max-w-2xl"
                >
                    We offer a wide range of tax, financial advisory, and business consulting services designed to help businesses navigate complexity and optimize performance.
                </motion.p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: service.delay }}
                            whileHover={{ y: -4 }}
                            className={`group relative p-8 rounded-3xl bg-background overflow-hidden transition-all duration-500 ${service.colSpan}`}
                            style={{ boxShadow: "var(--neu-raised)" }}
                        >
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ boxShadow: "inset 0 0 40px rgba(238, 32, 70, 0.06)" }} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-background transition-all duration-300 group-hover:scale-110"
                                    style={{ boxShadow: "var(--neu-inset-sm)" }}
                                >
                                    <Icon className="w-7 h-7 text-accent" />
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-foreground/60 mb-8 flex-grow leading-relaxed">
                                    {service.description}
                                </p>

                                <Link
                                    href={service.href}
                                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground/50 group-hover:text-accent transition-all duration-300 mt-auto w-fit"
                                >
                                    Learn More
                                    <motion.span
                                        className="inline-block"
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 4 }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

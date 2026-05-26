import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import pkg from "../../../package.json";
import {
    BookOpen, Briefcase, LogOut, ArrowRight, LayoutDashboard,
    ChevronRight, Sparkles,
} from "lucide-react";

export default function AdminDashboard() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [time, setTime] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (!localStorage.getItem("admin-token")) {
                router.replace("/admin");
                return;
            }
            setMounted(true);
        }
    }, [router]);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(
                now.toLocaleDateString("en-MY", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
            );
        };
        update();
        const id = setInterval(update, 60000);
        return () => clearInterval(id);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("admin-token");
        router.push("/admin");
    };

    if (!mounted) return null;

    const cards = [
        {
            id: "learning-hub",
            title: "Learning Hub",
            desc: "Manage newsletters, articles, and updates for your clients and visitors.",
            icon: BookOpen,
            href: "/admin/learning-hub",
            gradient: "from-accent/8 to-accent/2",
            iconBg: "bg-accent/10",
            iconColor: "text-accent",
        },
        {
            id: "careers",
            title: "Careers",
            desc: "Add, edit, or remove job listings shown on the careers page.",
            icon: Briefcase,
            href: "/admin/careers",
            gradient: "from-[#41445B]/8 to-[#41445B]/2",
            iconBg: "bg-[#41445B]/10",
            iconColor: "text-[#41445B]",
        },
    ];

    const getGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#41445B]/[0.04] blur-[120px]" />
                <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-accent/[0.015] blur-[100px]" />
            </div>

            {/* Top bar */}
            <div className="sticky top-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-foreground/[0.04]">
                <div className="max-w-6xl mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <Link href="/" className="relative group">
                            <Image
                                src="/thinktx-logo.png"
                                alt="ThinkTx"
                                width={120}
                                height={36}
                                className="object-contain h-8 w-auto transition-opacity group-hover:opacity-70"
                            />
                        </Link>
                        <div className="hidden sm:flex items-center gap-1.5 text-foreground/20">
                            <ChevronRight className="w-3.5 h-3.5" />
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/[0.03]">
                                <LayoutDashboard className="w-3.5 h-3.5 text-accent" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/40">
                                    Admin <span className="lowercase text-accent/80">v{pkg.version}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-foreground/40 hover:text-accent bg-background transition-all duration-300 hover:-translate-y-px"
                        style={{ boxShadow: "var(--neu-raised-sm)" }}
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Sign out</span>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-16 pb-24">
                {/* Welcome header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-2.5 mb-4">
                        <Sparkles className="w-4 h-4 text-accent/60" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/30">
                            {time}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 leading-[1.1]">
                        {getGreeting()}.
                    </h1>
                    <p className="text-lg text-foreground/40 max-w-lg">
                        Choose a section below to manage your website content.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.15 + i * 0.1,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        >
                            <Link
                                href={card.href}
                                onMouseEnter={() => setHoveredCard(card.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className="group relative block rounded-2xl bg-background overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
                                style={{ boxShadow: "var(--neu-raised)" }}
                            >
                                {/* Gradient highlight on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                {/* Top accent line */}
                                <div className="absolute top-0 left-0 right-0 h-[2px]">
                                    <div
                                        className={`h-full bg-gradient-to-r ${
                                            card.id === "learning-hub"
                                                ? "from-transparent via-accent to-transparent"
                                                : "from-transparent via-[#41445B] to-transparent"
                                        } transition-opacity duration-500 ${
                                            hoveredCard === card.id ? "opacity-60" : "opacity-0"
                                        }`}
                                    />
                                </div>

                                <div className="relative p-8 sm:p-10 flex flex-col min-h-[260px]">
                                    {/* Icon */}
                                    <div
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${card.iconBg} transition-transform duration-500 group-hover:scale-110`}
                                    >
                                        <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold tracking-tight mb-2.5">
                                            {card.title}
                                        </h2>
                                        <p className="text-sm text-foreground/40 leading-relaxed max-w-[280px]">
                                            {card.desc}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-8 flex items-center gap-2.5">
                                        <span className="text-[13px] font-bold text-accent">
                                            Manage
                                        </span>
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:translate-x-1">
                                            <ArrowRight className="w-3.5 h-3.5 text-accent transition-colors group-hover:text-white" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-[11px] text-foreground/20 tracking-wide">
                        ThinkTx Admin Portal
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

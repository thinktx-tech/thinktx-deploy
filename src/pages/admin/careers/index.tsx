import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import pkg from "../../../../package.json";
import {
    LogOut, Plus, Pencil, Trash2, X, Check, ArrowLeft,
    Eye, EyeOff, MapPin, Clock, ChevronRight, LayoutDashboard, Briefcase,
} from "lucide-react";
import type { CareerItem } from "@/pages/api/careers";

export default function AdminCareers() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [items, setItems] = useState<CareerItem[]>([]);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem("admin-token");
        if (!t) { router.replace("/admin"); return; }
        setToken(t);
    }, [router]);

    const fetchItems = useCallback(async () => {
        if (!token) return;
        const res = await fetch("/api/careers", { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setItems(await res.json());
    }, [token]);

    useEffect(() => { fetchItems(); }, [fetchItems]);

    const handleDelete = async (id: string) => {
        await fetch("/api/careers", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ id }),
        });
        setDeleting(null);
        fetchItems();
    };

    const handleTogglePublish = async (item: CareerItem) => {
        await fetch("/api/careers", {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ ...item, published: !item.published }),
        });
        fetchItems();
    };

    const handleLogout = () => { localStorage.removeItem("admin-token"); router.push("/admin"); };

    return (
        <div className="min-h-screen bg-background">
            <div className="fixed top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none" />

            {/* Top bar */}
            <div className="sticky top-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-foreground/[0.04]">
                <div className="max-w-6xl mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <Link href="/" className="group">
                            <Image src="/thinktx-logo.png" alt="ThinkTx" width={120} height={36} className="object-contain h-8 w-auto transition-opacity group-hover:opacity-70" />
                        </Link>
                        <div className="hidden sm:flex items-center gap-1.5 text-foreground/20">
                            <ChevronRight className="w-3.5 h-3.5" />
                            <Link href="/admin/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-foreground/[0.03] transition-colors">
                                <LayoutDashboard className="w-3.5 h-3.5 text-accent" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/40">
                                    Admin <span className="lowercase text-accent/80">v{pkg.version}</span>
                                </span>
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/[0.03]">
                                <Briefcase className="w-3.5 h-3.5 text-accent/60" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/50">Careers</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-foreground/40 hover:text-accent bg-background transition-all duration-300 hover:-translate-y-px" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Sign out</span>
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="w-10 h-10 rounded-xl flex items-center justify-center bg-background hover:text-accent transition-colors" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight">Careers</h1>
                            <p className="text-sm text-foreground/35">{items.length} listing{items.length !== 1 ? "s" : ""}</p>
                        </div>
                    </div>
                    <Link href="/admin/careers/edit" className="group flex items-center gap-2.5 px-6 py-3 rounded-xl bg-accent text-white text-sm font-bold transition-all duration-300 hover:shadow-[0_0_32px_rgba(238,32,70,0.3)] hover:-translate-y-0.5">
                        <Plus className="w-4 h-4" /> Add Listing
                    </Link>
                </div>

                {/* Item list */}
                <div className="flex flex-col gap-4">
                    {items.length === 0 && (
                        <div className="text-center py-20 text-foreground/30 text-sm">
                            No job listings yet. Click &quot;Add Listing&quot; to create one.
                        </div>
                    )}
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-2xl bg-background flex items-start gap-6"
                            style={{ boxShadow: "var(--neu-raised)" }}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.published ? "bg-green-500/10 text-green-600" : "bg-foreground/5 text-foreground/30"}`}>
                                        {item.published ? "Published" : "Draft"}
                                    </span>
                                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                                        {item.type}
                                    </span>
                                    <span className="text-[11px] text-foreground/30">{item.date}</span>
                                </div>
                                <h3 className="text-lg font-bold tracking-tight mb-1">{item.title}</h3>
                                <div className="flex items-center gap-4 text-xs text-foreground/40">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.department}</span>
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => handleTogglePublish(item)} title={item.published ? "Unpublish" : "Publish"} className="w-9 h-9 rounded-lg flex items-center justify-center bg-background text-foreground/40 hover:text-accent transition-all" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                                    {item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <Link href={`/admin/careers/edit?id=${item.id}`} className="w-9 h-9 rounded-lg flex items-center justify-center bg-background text-foreground/40 hover:text-accent transition-all" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                                    <Pencil className="w-4 h-4" />
                                </Link>
                                {deleting === item.id ? (
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => handleDelete(item.id)} className="w-9 h-9 rounded-lg flex items-center justify-center bg-accent text-white"><Check className="w-4 h-4" /></button>
                                        <button onClick={() => setDeleting(null)} className="w-9 h-9 rounded-lg flex items-center justify-center bg-background text-foreground/40" style={{ boxShadow: "var(--neu-raised-sm)" }}><X className="w-4 h-4" /></button>
                                    </div>
                                ) : (
                                    <button onClick={() => setDeleting(item.id)} className="w-9 h-9 rounded-lg flex items-center justify-center bg-background text-foreground/40 hover:text-accent transition-all" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

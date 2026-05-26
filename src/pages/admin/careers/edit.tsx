import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import pkg from "../../../../package.json";
import {
    ArrowLeft, LogOut, ChevronRight, LayoutDashboard, Briefcase, Loader2,
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import type { CareerItem } from "@/pages/api/careers";

type JobType = CareerItem["type"];

const TYPE_OPTIONS: { value: JobType; label: string }[] = [
    { value: "full-time", label: "Full-time" },
    { value: "internship", label: "Internship" },
];

const EMPTY_FORM: Omit<CareerItem, "id"> = {
    title: "",
    department: "",
    location: "Kuala Lumpur",
    type: "full-time",
    description: "",
    responsibilities: [],
    requirements: [],
    benefits: [],
    published: true,
    date: new Date().toISOString().split("T")[0],
};

export default function AdminCareerEdit() {
    const router = useRouter();
    const { id } = router.query;
    const isEditing = !!id;

    const [token, setToken] = useState("");
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = localStorage.getItem("admin-token");
        if (!t) { router.replace("/admin"); return; }
        setToken(t);
    }, [router]);

    const loadItem = useCallback(async () => {
        if (!token || !id) { setLoading(false); return; }
        const res = await fetch("/api/careers", { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
            const items: CareerItem[] = await res.json();
            const item = items.find((i) => i.id === id);
            if (item) {
                setForm({
                    title: item.title, department: item.department, location: item.location,
                    type: item.type, description: item.description,
                    responsibilities: item.responsibilities ?? [],
                    requirements: item.requirements ?? [],
                    benefits: item.benefits ?? [],
                    published: item.published, date: item.date,
                });
            }
        }
        setLoading(false);
    }, [token, id]);

    useEffect(() => { loadItem(); }, [loadItem]);

    const linesToArray = (text: string) => text.split("\n");
    const arrayToLines = (arr: string[]) => arr.join("\n");
    const cleanArray = (arr: string[]) => arr.map((l) => l.trim()).filter(Boolean);

    const handleSave = async () => {
        setSaving(true);
        const clean = {
            ...form,
            responsibilities: cleanArray(form.responsibilities),
            requirements: cleanArray(form.requirements),
            benefits: cleanArray(form.benefits),
        };
        const method = isEditing ? "PUT" : "POST";
        const body = isEditing ? { ...clean, id } : clean;
        await fetch("/api/careers", {
            method,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(body),
        });
        router.push("/admin/careers");
    };

    const handleLogout = () => { localStorage.removeItem("admin-token"); router.push("/admin"); };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-foreground/30" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="fixed top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none" />

            {/* Top bar */}
            <div className="sticky top-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-foreground/[0.04]">
                <div className="max-w-4xl mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">
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
                            <Link href="/admin/careers" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-foreground/[0.03] transition-colors">
                                <Briefcase className="w-3.5 h-3.5 text-accent/60" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/40">Careers</span>
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/50">
                                {isEditing ? "Edit" : "New"}
                            </span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-foreground/40 hover:text-accent bg-background transition-all duration-300 hover:-translate-y-px" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Sign out</span>
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/admin/careers" className="w-10 h-10 rounded-xl flex items-center justify-center bg-background hover:text-accent transition-colors" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        {isEditing ? "Edit Listing" : "New Listing"}
                    </h1>
                </div>

                {/* Form */}
                <div className="rounded-2xl bg-background p-8 sm:p-10 border border-foreground/[0.06]" style={{ boxShadow: "var(--neu-raised)" }}>
                    <div className="flex flex-col gap-6">
                        {/* Title */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Job Title</label>
                            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} placeholder="e.g. Senior Tax Consultant" />
                        </div>

                        {/* Department + Location + Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Department</label>
                                <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} placeholder="e.g. Tax" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Location</label>
                                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} placeholder="e.g. Kuala Lumpur" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Type</label>
                                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as JobType })} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }}>
                                    {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Description — Rich Text */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Description</label>
                            <RichTextEditor
                                value={form.description}
                                onChange={(html) => setForm({ ...form, description: html })}
                                placeholder="Job description..."
                                minHeight="160px"
                            />
                        </div>

                        {/* Responsibilities */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Responsibilities</label>
                            <textarea value={arrayToLines(form.responsibilities)} onChange={(e) => setForm({ ...form, responsibilities: linesToArray(e.target.value) })} rows={4} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none resize-y focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} placeholder="One responsibility per line..." />
                            <span className="text-[10px] text-foreground/25">Each line becomes a bullet point</span>
                        </div>

                        {/* Requirements */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Requirements</label>
                            <textarea value={arrayToLines(form.requirements)} onChange={(e) => setForm({ ...form, requirements: linesToArray(e.target.value) })} rows={4} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none resize-y focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} placeholder="One requirement per line..." />
                            <span className="text-[10px] text-foreground/25">Each line becomes a bullet point</span>
                        </div>

                        {/* Benefits */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Benefits</label>
                            <textarea value={arrayToLines(form.benefits)} onChange={(e) => setForm({ ...form, benefits: linesToArray(e.target.value) })} rows={4} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none resize-y focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} placeholder="One benefit per line..." />
                            <span className="text-[10px] text-foreground/25">Each line becomes a bullet point</span>
                        </div>

                        {/* Published toggle */}
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.published ? "bg-accent" : "bg-foreground/15"}`} onClick={() => setForm({ ...form, published: !form.published })}>
                                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form.published ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                            </div>
                            <span className="text-sm text-foreground/60">{form.published ? "Published" : "Draft"}</span>
                        </label>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-foreground/[0.06]">
                            <Link href="/admin/careers" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground/50 bg-background hover:text-foreground transition-all" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                                Cancel
                            </Link>
                            <button onClick={handleSave} disabled={!form.title.trim() || saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-bold transition-all duration-300 hover:shadow-[0_0_24px_rgba(238,32,70,0.35)] disabled:opacity-40">
                                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isEditing ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

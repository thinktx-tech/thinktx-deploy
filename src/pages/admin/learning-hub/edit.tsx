import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import pkg from "../../../../package.json";
import {
    ArrowLeft, LogOut, ChevronRight, LayoutDashboard, BookOpen,
    Newspaper, FileText, ImageIcon, X, Clock, Paperclip, Loader2, LinkIcon, AlertTriangle,
} from "lucide-react";

const MAX_UPLOAD_MB = 20;
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;
import RichTextEditor from "@/components/RichTextEditor";
import type { LearningHubItem } from "@/pages/api/learning-hub";

type Category = LearningHubItem["category"];

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
    { value: "newsletter", label: "Newsletter" },
    { value: "update", label: "Update" },
    { value: "article", label: "Article" },
    { value: "taxsphere", label: "TaxSphere" },
    { value: "cch", label: "CCH Articles" },
    { value: "ringgitplus", label: "RinggitPlus" },
    { value: "newspaper", label: "National Newspaper" },
    { value: "ibfd", label: "IBFD" },
    { value: "webinar", label: "Webinar" },
];

const EMPTY_FORM: Omit<LearningHubItem, "id"> = {
    title: "",
    category: "newsletter",
    source: undefined,
    summary: "",
    content: "",
    coverImage: "",
    date: new Date().toISOString().split("T")[0],
    published: true,
    readDuration: undefined,
    attachment: "",
    link: "",
};

export default function AdminLearningHubEdit() {
    const router = useRouter();
    const { id } = router.query;
    const isEditing = !!id;

    const [token, setToken] = useState("");
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadingAttachment, setUploadingAttachment] = useState(false);
    const [sizeError, setSizeError] = useState<{ name: string; sizeMb: string } | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem("admin-token");
        if (!t) { router.replace("/admin"); return; }
        setToken(t);
    }, [router]);

    const loadItem = useCallback(async () => {
        if (!token || !id) { setLoading(false); return; }
        const res = await fetch("/api/learning-hub", { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
            const items: LearningHubItem[] = await res.json();
            const item = items.find((i) => i.id === id);
            if (item) {
                setForm({
                    title: item.title, category: item.category, source: item.source, summary: item.summary,
                    content: item.content, coverImage: item.coverImage ?? "",
                    date: item.date, published: item.published,
                    readDuration: item.readDuration, attachment: item.attachment ?? "",
                    link: item.link ?? "",
                });
            }
        }
        setLoading(false);
    }, [token, id]);

    useEffect(() => { loadItem(); }, [loadItem]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_UPLOAD_BYTES) {
            setSizeError({ name: file.name, sizeMb: (file.size / (1024 * 1024)).toFixed(1) });
            e.target.value = "";
            return;
        }
        setUploading(true);
        setUploadError(null);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
            if (res.ok) {
                const { url } = await res.json();
                setForm((prev) => ({ ...prev, coverImage: url }));
            } else {
                const data = await res.json().catch(() => ({}));
                setUploadError(data.detail ?? "Image upload failed. Please try again.");
            }
        } catch {
            setUploadError("Image upload failed. Please check your connection.");
        } finally {
            setUploading(false);
        }
    };

    const handleAttachmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_UPLOAD_BYTES) {
            setSizeError({ name: file.name, sizeMb: (file.size / (1024 * 1024)).toFixed(1) });
            e.target.value = "";
            return;
        }
        setUploadingAttachment(true);
        setUploadError(null);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
            if (res.ok) {
                const { url } = await res.json();
                setForm((prev) => ({ ...prev, attachment: url }));
            } else {
                const data = await res.json().catch(() => ({}));
                setUploadError(data.detail ?? "Attachment upload failed. Please try again.");
            }
        } catch {
            setUploadError("Attachment upload failed. Please check your connection.");
        } finally {
            setUploadingAttachment(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        const method = isEditing ? "PUT" : "POST";
        const body = isEditing ? { ...form, id } : form;
        await fetch("/api/learning-hub", {
            method,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(body),
        });
        router.push("/admin/learning-hub");
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
                            <Link href="/admin/learning-hub" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-foreground/[0.03] transition-colors">
                                <BookOpen className="w-3.5 h-3.5 text-accent/60" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/40">Learning Hub</span>
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
                    <Link href="/admin/learning-hub" className="w-10 h-10 rounded-xl flex items-center justify-center bg-background hover:text-accent transition-colors" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        {isEditing ? "Edit Item" : "New Item"}
                    </h1>
                </div>

                {/* Form */}
                <div className="rounded-2xl bg-background p-8 sm:p-10 border border-foreground/[0.06]" style={{ boxShadow: "var(--neu-raised)" }}>
                    <div className="flex flex-col gap-6">
                        {/* Title */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Title</label>
                            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} placeholder="Enter title" />
                        </div>

                        {/* Cover Image */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Cover Image</label>
                            {form.coverImage ? (
                                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-foreground/5">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={form.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, coverImage: "" })}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center gap-2 w-full h-36 rounded-xl cursor-pointer transition-all hover:text-accent" style={{ boxShadow: "var(--neu-inset-sm)" }}>
                                    {uploading ? (
                                        <span className="w-5 h-5 border-2 border-foreground/20 border-t-accent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <ImageIcon className="w-6 h-6 text-foreground/25" />
                                            <span className="text-xs text-foreground/35">Click to upload cover image</span>
                                        </>
                                    )}
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            )}
                        </div>

                        {/* Category + Source + Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Category</label>
                                <select value={form.category} onChange={(e) => {
                                    const cat = e.target.value as Category;
                                    setForm({ ...form, category: cat, source: cat === "article" ? form.source : undefined });
                                }} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }}>
                                    {CATEGORY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>

                            {form.category === "article" && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Source</label>
                                    <select value={form.source || ""} onChange={(e) => setForm({ ...form, source: e.target.value ? (e.target.value as any) : undefined })} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }}>
                                        <option value="">None (Standard)</option>
                                        <option value="taxsphere">TaxSphere</option>
                                        <option value="cch">CCH</option>
                                        <option value="ringgitplus">ThinkTx + RinggitPlus</option>
                                    </select>
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Date</label>
                                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                            </div>
                        </div>

                        {/* Read Duration */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Read Duration (minutes)</label>
                            <div className="relative">
                                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25 pointer-events-none" />
                                <input type="number" min={1} value={form.readDuration ?? ""} onChange={(e) => setForm({ ...form, readDuration: e.target.value ? Number(e.target.value) : undefined })} className="w-full pl-10 pr-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} placeholder="e.g. 5" />
                            </div>
                        </div>

                        {/* Attachment */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Attachment (PDF / Document)</label>
                            {form.attachment ? (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }}>
                                    <Paperclip className="w-4 h-4 text-accent flex-shrink-0" />
                                    <span className="text-sm text-foreground/60 truncate flex-1">{form.attachment.split("/").pop()}</span>
                                    <button type="button" onClick={() => setForm({ ...form, attachment: "" })} className="w-7 h-7 rounded-lg flex items-center justify-center bg-background text-foreground/40 hover:text-accent transition-all" style={{ boxShadow: "var(--neu-raised-sm)" }}>
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center gap-2 w-full h-24 rounded-xl cursor-pointer transition-all hover:text-accent" style={{ boxShadow: "var(--neu-inset-sm)" }}>
                                    {uploadingAttachment ? (
                                        <span className="w-5 h-5 border-2 border-foreground/20 border-t-accent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Paperclip className="w-5 h-5 text-foreground/25" />
                                            <span className="text-xs text-foreground/35">Click to upload PDF or document</span>
                                        </>
                                    )}
                                    <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" onChange={handleAttachmentUpload} className="hidden" />
                                </label>
                            )}
                        </div>

                        {/* Link */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Link (URL)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25 pointer-events-none" />
                                <input value={form.link ?? ""} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl bg-background text-sm outline-none focus:ring-2 focus:ring-accent/30" style={{ boxShadow: "var(--neu-inset-sm)" }} placeholder="https://example.com" />
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Summary</label>
                            <RichTextEditor
                                value={form.summary}
                                onChange={(html) => setForm({ ...form, summary: html })}
                                placeholder="Write a short summary..."
                                minHeight="120px"
                            />
                        </div>

                        {/* Content — Rich Text */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">Content</label>
                            <RichTextEditor
                                value={form.content}
                                onChange={(html) => setForm({ ...form, content: html })}
                                placeholder="Write your full content here..."
                                minHeight="280px"
                            />
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
                            <Link href="/admin/learning-hub" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground/50 bg-background hover:text-foreground transition-all" style={{ boxShadow: "var(--neu-raised-sm)" }}>
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

            {/* ── Upload Error Toast ── */}
            {uploadError && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-background border border-accent/30 text-sm font-semibold text-foreground/80 shadow-xl" style={{ boxShadow: "var(--neu-raised)" }}>
                    <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{uploadError}</span>
                    <button type="button" onClick={() => setUploadError(null)} className="ml-2 text-foreground/30 hover:text-accent transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* ── File Too Large Modal ── */}
            {sizeError && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSizeError(null)}>
                    <div
                        className="relative max-w-md w-full rounded-2xl bg-background p-7 sm:p-8"
                        style={{ boxShadow: "var(--neu-raised)" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSizeError(null)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center bg-background text-foreground/40 hover:text-accent transition-all"
                            style={{ boxShadow: "var(--neu-raised-sm)" }}
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-5">
                            <AlertTriangle className="w-7 h-7 text-accent" />
                        </div>

                        <h3 className="text-xl font-extrabold tracking-tight mb-2">
                            File is too large
                        </h3>
                        <p className="text-sm text-foreground/60 leading-relaxed mb-1">
                            <span className="font-semibold text-foreground/80">{sizeError.name}</span> is{" "}
                            <span className="font-semibold text-accent">{sizeError.sizeMb} MB</span>.
                        </p>
                        <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                            The maximum allowed size is <span className="font-semibold">{MAX_UPLOAD_MB} MB</span>. Please compress your file or choose a smaller one and try again.
                        </p>

                        <button
                            type="button"
                            onClick={() => setSizeError(null)}
                            className="w-full px-5 py-3 rounded-xl text-sm font-bold text-white bg-accent transition-all duration-300 hover:shadow-[0_0_24px_rgba(238,32,70,0.35)] hover:-translate-y-0.5"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

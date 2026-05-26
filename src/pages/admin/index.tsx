import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Shield } from "lucide-react";

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage.getItem("admin-token")) {
            router.replace("/admin/dashboard");
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                setError("Invalid username or password");
                setLoading(false);
                return;
            }

            const { token } = await res.json();
            localStorage.setItem("admin-token", token);
            router.push("/admin/dashboard");
        } catch {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[140px]" />
                <div className="absolute bottom-[-10%] left-[-8%] w-[450px] h-[450px] rounded-full bg-[#41445B]/[0.05] blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-[420px] relative"
            >
                <div
                    className="rounded-3xl bg-background p-10 sm:p-12 relative overflow-hidden"
                    style={{ boxShadow: "var(--neu-raised)" }}
                >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                    {/* Logo */}
                    <div className="flex justify-center mb-10">
                        <Image
                            src="/thinktx-logo.png"
                            alt="ThinkTx"
                            width={140}
                            height={42}
                            className="object-contain h-10 w-auto"
                        />
                    </div>

                    {/* Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/[0.04]">
                            <Shield className="w-3.5 h-3.5 text-accent/60" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/35">
                                Admin Portal
                            </span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-extrabold tracking-tight text-center mb-1.5">
                        Welcome back
                    </h1>
                    <p className="text-sm text-foreground/40 text-center mb-10">
                        Sign in to manage your content
                    </p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        {/* Username */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/35 ml-1">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-5 py-3.5 rounded-xl bg-background text-sm text-foreground outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/20 placeholder:text-foreground/20"
                                style={{ boxShadow: "var(--neu-inset-sm)" }}
                                placeholder="Enter username"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/35 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-5 py-3.5 pr-12 rounded-xl bg-background text-sm text-foreground outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/20 placeholder:text-foreground/20"
                                    style={{ boxShadow: "var(--neu-inset-sm)" }}
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/25 hover:text-foreground/50 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-accent/[0.06]"
                            >
                                <p className="text-sm text-accent font-medium">{error}</p>
                            </motion.div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-white text-sm font-bold transition-all duration-300 hover:shadow-[0_0_40px_rgba(238,32,70,0.3)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 mt-2"
                        >
                            {loading ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-[11px] text-foreground/18 mt-8 tracking-wide">
                    ThinkTx Admin Portal
                </p>
            </motion.div>
        </div>
    );
}

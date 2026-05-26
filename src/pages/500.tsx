import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Custom500() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-accent/20">
            <Navbar />
            
            <main className="flex-1 flex flex-col items-center justify-center relative px-6 z-10">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-center max-w-xl flex flex-col items-center"
                >
                    <AlertTriangle className="w-16 h-16 text-accent/30 mb-6" />
                    <h1 className="text-6xl sm:text-8xl font-black text-foreground/5 tracking-tighter mb-4 select-none">
                        500
                    </h1>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                        Internal Server Error
                    </h2>
                    <p className="text-foreground/50 mb-10 text-lg leading-relaxed">
                        Something went wrong on our end. We're working to fix the issue. Please try again later.
                    </p>
                    
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-foreground text-background font-bold hover:bg-accent hover:text-white transition-all duration-300 group"
                        style={{ boxShadow: "var(--neu-raised-sm)" }}
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Homepage
                    </Link>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="absolute bottom-12 opacity-40 hover:opacity-100 transition-opacity"
                >
                    <Image 
                        src="/thinktx-logo.png" 
                        alt="ThinkTx" 
                        width={100} 
                        height={30} 
                        className="object-contain"
                    />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

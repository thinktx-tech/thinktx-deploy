import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Navbar from "@/components/Navbar";
import CompanyQuote from "@/components/CompanyQuote";
import WhoWeServe from "@/components/WhoWeServe";
import Industries from "@/components/Industries";
import Info from "@/components/Info";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.6]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO — Cinematic full-bleed
      ═══════════════════════════════════════════ */}
      <main ref={heroRef} className="relative h-screen overflow-hidden">

        {/* ── Full-bleed background with parallax zoom ── */}
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src="/Hero.png"
            alt="ThinkTx Office"
            fill
            sizes="100vw"
            className="object-cover object-right-top"
            priority
          />
        </motion.div>

        {/* ── Cinematic overlay — dark bottom gradient for text legibility ── */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />
        {/* Bottom-heavy gradient for content zone */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 via-[40%] to-transparent pointer-events-none" />
        {/* Left-bottom concentrated blur for text legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_15%_85%,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.3)_40%,transparent_70%)] pointer-events-none" />
        {/* Subtle left edge for logo area */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent via-[30%] to-transparent pointer-events-none" />

        {/* ── Top-left logo ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="absolute top-6 left-5 sm:top-8 sm:left-8 md:left-12 z-20"
        >
          <Image
            src="/Thinktx-full.png"
            alt="ThinkTx"
            width={320}
            height={96}
            className="object-contain h-14 sm:h-16 md:h-20 w-auto brightness-0 invert origin-left"
          />
        </motion.div>

        {/* ── Bottom content zone ── */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 flex flex-col justify-center sm:justify-end z-10"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pb-0 sm:pb-12 md:pb-16 w-full mt-16 sm:mt-0">

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-end">

              {/* Left — Headline + CTAs */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease }}
                  className="text-[clamp(2.4rem,8vw,5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-4 sm:mb-5 min-h-[3.3em] sm:min-h-[2.1em] text-center sm:text-left w-full"
                >
                  ThinkTx for{" "}
                  <br />
                  <TypewriterEffect
                    words={["Tax Excellence", "Simplifying Complexities", "Maximizing Opportunities"]}
                    className="text-accent"
                  />
                </motion.h1>

                {/* Body */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease }}
                  className="text-[15px] sm:text-base md:text-lg text-white/55 leading-relaxed max-w-[500px] mb-8 sm:mb-10"
                >
                  We help SMEs, startups, and corporations navigate complexities
                  with expert accounting, tax advisory, and business strategy
                  solutions.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 w-full sm:w-auto mt-2"
                >
                  <Link
                    href="/contact"
                    className="group relative flex justify-center items-center gap-3 px-8 py-4 rounded-full bg-accent text-white font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(238,32,70,0.4)] hover:-translate-y-0.5 w-full sm:w-auto"
                    style={{ "--pulse-color": "rgba(238,32,70,0.6)", "--duration": "1.5s" } as React.CSSProperties}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Free Consultation
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute top-1/2 left-1/2 w-full h-full rounded-full bg-accent animate-pulse-ring -translate-x-1/2 -translate-y-1/2" />
                  </Link>
                  <Link
                    href="/services"
                    className="flex justify-center items-center gap-3 px-8 py-4 rounded-full bg-white/[0.08] border border-white/[0.15] text-white font-bold tracking-wide text-sm backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] hover:-translate-y-0.5 w-full sm:w-auto"
                  >
                    Explore Services
                  </Link>
                </motion.div>
              </div>

              {/* Right — Stats column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease }}
                className="hidden lg:flex flex-col gap-6 pb-2"
              >
                {[
                  { value: "40+", label: "Years Experience" },
                  { value: "500+", label: "Clients Served" },
                  { value: "98%", label: "Client Retention" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4"
                  >
                    {/* Thin vertical accent */}
                    <div
                      className="w-[2px] h-10 rounded-full"
                      style={{
                        background:
                          i === 0
                            ? "var(--accent)"
                            : "rgba(255,255,255,0.15)",
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-2xl font-extrabold tracking-tight text-white">
                        {stat.value}
                      </span>
                      <span className="text-[10px] text-white/40 font-semibold tracking-[0.15em] uppercase">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center mt-10"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-white/25" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>


      {/* COMPANY QUOTE + TABS */}
      <div className="relative z-10 bg-background">
        <CompanyQuote />
      </div>

      {/* WHO WE SERVE */}
      <div className="relative z-10 bg-background">
        <WhoWeServe />
      </div>

      {/* INDUSTRIES */}
      <div className="relative z-10 bg-background">
        <Industries />
      </div>

      {/* NUMBERS / STATS */}
      <div className="relative z-10 bg-background">
        <Info />
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

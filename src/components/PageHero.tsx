import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

interface PageHeroProps {
  /** Badge text shown above the heading */
  badge: string;
  /** Main heading — pass JSX for accent spans */
  heading: React.ReactNode;
  /** Subtitle paragraph */
  subtitle: string;
  /** Background image path (e.g. "/Services-hero.png") */
  image: string;
  /** Alt text for the background image */
  imageAlt?: string;
  /** Optional: override object-position (default "center") */
  imagePosition?: string;
  /** Optional: extra content below subtitle (e.g. quick-link buttons) */
  children?: React.ReactNode;
}

export default function PageHero({
  badge,
  heading,
  subtitle,
  image,
  imageAlt = "",
  imagePosition = "center",
  children,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[75vh] flex items-end overflow-hidden">
      {/* ── Full-bleed background ── */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
          priority
        />
      </div>

      {/* ── Cinematic overlays ── */}
      {/* Base darkening */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      {/* Bottom-heavy gradient for text zone */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 via-[45%] to-transparent pointer-events-none" />
      {/* Left-bottom radial for extra text contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_10%_90%,rgba(0,0,0,0.5)_0%,transparent_70%)] pointer-events-none" />
      {/* Top edge fade for navbar blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent via-[15%] to-transparent pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-32 sm:pt-40 pb-12 sm:pb-16 md:pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full text-[13px] font-bold uppercase tracking-[0.16em] text-white/90 bg-white/[0.10] border border-white/[0.18] backdrop-blur-md shadow-[0_2px_16px_rgba(0,0,0,0.18)]">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_rgba(238,32,70,0.7)]" />
            {badge}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold tracking-[-0.025em] leading-[1.05] text-white mb-5 max-w-3xl"
        >
          {heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="text-base md:text-lg text-white/55 leading-relaxed max-w-xl mb-8"
        >
          {subtitle}
        </motion.p>

        {/* Optional extra content */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

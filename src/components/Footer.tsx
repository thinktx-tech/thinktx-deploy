import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

const navLinks = [
    { label: "Homepage", href: "/" },
    { label: "All Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Milestones", href: "/milestones" },
    { label: "Learning Hub", href: "/learning-hub" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
];



const socials = [
    { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61563547175526" },
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/thinktx_consultants?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/company/thinktx/" },
    { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/60149649633" },
];

export default function Footer({ hideCtaButton, hideContact }: { hideCtaButton?: boolean; hideContact?: boolean }) {
    return (
        <footer className="relative bg-background border-t border-foreground/[0.06] overflow-hidden">

            {/* ── CTA Band ── */}
            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-[600px] h-[200px] rounded-full bg-accent/5 blur-[100px]" />
                </div>
                <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-10">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-2xl">
                        Let&apos;s redefine your{" "}
                        <span className="text-accent">tax strategy.</span>
                    </h2>
                    {!hideCtaButton && (
                        <div className="flex-shrink-0">
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-2xl text-sm font-bold text-white bg-accent transition-all duration-300 hover:shadow-[0_0_32px_rgba(238,32,70,0.35)] hover:-translate-y-1"
                                style={{ "--pulse-color": "rgba(238,32,70,0.6)", "--duration": "1.5s" } as React.CSSProperties}
                            >
                                <span className="relative z-10 inline-flex items-center gap-3">
                                    Book a Free Consultation
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                                <span className="absolute top-1/2 left-1/2 w-full h-full rounded-2xl bg-accent animate-pulse-ring -translate-x-1/2 -translate-y-1/2" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Divider ── */}
            <div className="mx-6 sm:mx-8 h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />

            {/* ── Main Grid ── */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-20">

                {/* Brand Info */}
                <div className="flex-1 max-w-sm">
                    <Link href="/" className="inline-block mb-8">
                        <Image
                            src="/Thinktx-full.png"
                            alt="ThinkTx"
                            width={320}
                            height={96}
                            className="object-contain h-20 sm:h-24 w-auto"
                        />
                    </Link>

                    <div className="flex items-center gap-3">
                        {socials.map(({ icon: Icon, label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                title={label}
                                className="w-10 h-10 rounded-xl flex items-center justify-center bg-background text-foreground/40 hover:text-accent transition-all duration-300 hover:-translate-y-1"
                                style={{ boxShadow: "var(--neu-raised-sm)" }}
                            >
                                <Icon className="w-4 h-4" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact & Location */}
                {!hideContact && (
                    <div className="flex-1 max-w-xs">
                        <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground/30 mb-6">
                            Contact & Location
                        </h4>
                        <p className="text-base text-foreground/55 leading-relaxed mb-6">
                            Suite B-16-3, Level 16, Tower B<br />
                            Wisma Pantai, Bangsar Trade Centre<br />
                            No. 5, Jalan 4/83A, Off Jalan Pantai Baharu<br />
                            59200 Kuala Lumpur
                        </p>
                        <ul className="flex flex-col gap-4">
                            {[
                                { icon: Mail, label: "info@thinktx.my", href: "mailto:info@thinktx.my" },
                                { icon: Phone, label: "+603 6262 9633", href: "tel:+60362629633" },
                            ].map(({ icon: Icon, label, href }) => (
                                <li key={href}>
                                    <Link href={href} className="inline-flex items-center gap-3 text-base font-medium text-foreground/60 hover:text-accent transition-colors duration-200">
                                        <Icon className="w-5 h-5 text-accent/80 flex-shrink-0" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Quick Links */}
                <div className="md:min-w-[140px]">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-foreground/30 mb-6">
                        Quick Links
                    </h4>
                    <ul className="flex flex-col gap-3.5">
                        {navLinks.map(({ label, href }) => (
                            <li key={label}>
                                <Link href={href} className="group flex items-center gap-2.5 text-base font-medium text-foreground/55 hover:text-accent transition-colors duration-200">
                                    <span className="w-1 h-1 rounded-full bg-foreground/20 group-hover:bg-accent/60 transition-colors" />
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* ── Bottom Bar ── */}
            <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left" style={{ backgroundColor: "#41445B" }}>
                <p className="text-[11px] text-white/80 tracking-wide">
                    © {new Date().getFullYear()} ThinkTx | All rights reserved.
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest shiny-text">
                    Redefining Tax Excellence
                </p>
            </div>

        </footer>
    );
}

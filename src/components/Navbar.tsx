import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

const CARD_ITEMS = [
    {
        label: "Taxation",
        bgColor: "rgba(238,32,70,0.10)",
        textColor: "var(--foreground)",
        href: "/services#taxation",
        links: [
            { label: "Tax Advisory", href: "/services#taxation" },
            { label: "Transfer Pricing", href: "/services#taxation" },
            { label: "Tax Dispute Resolution", href: "/services#taxation" },
            { label: "e-Invoicing", href: "/services#taxation" },
        ],
    },
    {
        label: "Corporate Advisory",
        bgColor: "transparent",
        textColor: "var(--foreground)",
        href: "/services#corporate-advisory",
        links: [
            { label: "Restructuring Advisory", href: "/services#corporate-advisory" },
            { label: "Financial Due Diligence", href: "/services#corporate-advisory" },
            { label: "Company Secretarial", href: "/services#corporate-advisory" },
            { label: "Immigration", href: "/services#corporate-advisory" },
        ],
    },
    {
        label: "Outsourcing",
        bgColor: "rgba(65,68,91,0.45)",
        textColor: "var(--foreground)",
        href: "/services#outsourcing",
        links: [
            { label: "Accounting", href: "/services#outsourcing" },
            { label: "Payroll", href: "/services#outsourcing" },
            { label: "SST Services", href: "/services#outsourcing" },
        ],
    },
];

const NAV_LINKS = [
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Milestones", href: "/milestones" },
    { label: "Learning Hub", href: "/learning-hub" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
];

const EASE = "back.out(1.7)";

interface NavbarProps {
    alwaysVisible?: boolean;
}

export default function Navbar({ alwaysVisible = false }: NavbarProps) {
    const [scrolled, setScrolled] = useState(alwaysVisible);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const navRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Show navbar after scrolling past hero (only on homepage)
    useEffect(() => {
        if (alwaysVisible) {
            setScrolled(true);
            return;
        }
        const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [alwaysVisible]);

    const createTimeline = useCallback(() => {
        const navEl = navRef.current;
        if (!navEl) return null;

        // Use "auto" so it adapts to content height at any breakpoint
        gsap.set(navEl, { height: 64, overflow: "hidden" });
        gsap.set(cardsRef.current.filter(Boolean), { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });
        tl.to(navEl, { height: "auto", duration: 0.45, ease: EASE });
        tl.to(cardsRef.current.filter(Boolean), { y: 0, opacity: 1, duration: 0.4, ease: EASE, stagger: 0.08 }, "-=0.15");
        return tl;
    }, []);

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;
        return () => { tl?.kill(); tlRef.current = null; };
    }, [createTimeline]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsOpen(false);
            tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const closeMenu = () => {
        if (!isOpen) return;
        const tl = tlRef.current;
        if (!tl) return;
        setIsOpen(false);
        tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
        tl.reverse();
    };

    return (
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] max-w-7xl
                transition-all duration-500 ease-in-out pointer-events-none
                ${scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4"}`}
        >
            <div
                ref={navRef}
                className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-sm shadow-black/5"
                style={{ height: 64, overflow: "hidden" }}
            >
                {/* Top bar — 3 equal columns */}
                <div className="h-16 grid grid-cols-3 items-center px-3 sm:px-4">

                    {/* Left: Hamburger */}
                    <button
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        className="flex flex-col justify-center items-start gap-[6px] w-10 h-10"
                    >
                        <span
                            className="block w-[26px] h-[2px] bg-foreground rounded-full transition-all duration-300 origin-center"
                            style={{ transform: isOpen ? "translateY(4px) rotate(45deg)" : "none" }}
                        />
                        <span
                            className="block w-[26px] h-[2px] bg-foreground rounded-full transition-all duration-300 origin-center"
                            style={{ transform: isOpen ? "translateY(-4px) rotate(-45deg)" : "none" }}
                        />
                    </button>

                    {/* Center: Logo */}
                    <Link href="/" className="flex justify-center" onClick={closeMenu}>
                        <Image
                            src="/thinktx-logo.png"
                            alt="ThinkTx"
                            width={120}
                            height={36}
                            className="object-contain h-8 sm:h-9 w-auto"
                            priority
                        />
                    </Link>

                    <div className="flex justify-end" />
                </div>

                {/* Expanded section */}
                <div
                    className="px-2 pb-2 flex flex-col gap-2"
                    style={{ visibility: isExpanded ? "visible" : "hidden", pointerEvents: isExpanded ? "auto" : "none" }}
                >
                    {/* Nav links row — wraps on mobile */}
                    <div className="flex flex-wrap items-center gap-0.5 px-1 py-1.5 border-b border-foreground/8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={closeMenu}
                                className="group relative px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium text-foreground/55 hover:text-foreground transition-colors duration-200"
                            >
                                <span className="relative z-10">{link.label}</span>
                                <span className="absolute inset-0 rounded-full bg-foreground/0 group-hover:bg-foreground/6 transition-colors duration-200" />
                            </Link>
                        ))}
                    </div>

                    {/* Service cards — stack on mobile, row on md+ */}
                    <div className="flex flex-col sm:flex-row gap-3 max-h-[50vh] overflow-y-auto sm:overflow-visible">
                        {CARD_ITEMS.map((card, i) => (
                            <div
                                key={card.label}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className="flex-1 rounded-xl p-3 sm:p-4 flex flex-col gap-2"
                                style={{ backgroundColor: card.bgColor, color: card.textColor, border: card.label === "Corporate Advisory" ? "1px solid rgba(150,150,150,0.25)" : "none" }}
                            >
                                <p className="text-lg sm:text-xl font-semibold tracking-tight mb-1">{card.label}</p>
                                <div className="flex flex-col gap-1 mt-auto">
                                    {card.links.map((lnk) => (
                                        <a
                                            key={lnk.label}
                                            href={lnk.href}
                                            onClick={closeMenu}
                                            className="inline-flex items-center gap-1.5 text-sm text-foreground/65 hover:text-accent transition-colors"
                                        >
                                            <GoArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
                                            {lnk.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

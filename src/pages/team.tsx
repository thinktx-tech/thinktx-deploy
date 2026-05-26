import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import CompanyTabs from "@/components/CompanyTabs";
import Footer from "@/components/Footer";

/* ────────────────────────────────────────────────────────────
   Team data
   ──────────────────────────────────────────────────────────── */

interface TeamMember {
    name: string;
    title: string;
    image: string;
    linkedin: string;
    bio: string[];
    specialties: string[];
    background: string[];
}

const team: TeamMember[] = [
    {
        name: "Thomas Teoh",
        title: "Senior Advisor",
        image: "/Thomas.jpg",
        linkedin: "https://www.linkedin.com/in/thomas-teoh-477b711a6/",
        bio: [
            "With over 20 years of experience in corporate and international taxation, Thomas Teoh is a highly respected tax professional known for his deep expertise and strategic approach. He has successfully guided businesses through complex tax landscapes, helping them navigate challenges, optimize tax efficiencies, and achieve long-term financial success.",
            "Beyond his technical expertise, Thomas is recognized for his approachable demeanor, practical insights, and hands-on approach. He is committed to simplifying complex tax matters, providing clear, strategic guidance, and delivering tailored solutions that align with his clients’ business objectives.",
            "With a strong track record of success and a client-centric mindset, Thomas continues to be a trusted advisor for businesses seeking expert tax solutions and strategic financial guidance.",
        ],
        specialties: [
            "Corporate Tax",
            "Corporate Restructuring Exercises",
            "Initial Public Offerings",
            "Mergers & Acquisitions",
            "International Tax",
            "Tax Incentive",
            "Tax Audits and Investigations",
            "Expatriate Tax",
            "Represents clients including large corporations and multinationals from diverse industries",
        ],
        background: [
            "Member of Malaysian Institute of Accountants (MIA)",
            "Member of Chartered Tax Institute of Malaysia (CTIM)",
        ],
    },
    {
        name: "Pugaleshwaran Raja Kumaran",
        title: "Executive Director, Tax",
        image: "/Pugal.jpg",
        linkedin: "https://www.linkedin.com/in/pugaleshwaran-rajakumaran-6a1b55155/",
        bio: [
            "With extensive experience in tax audits, investigations, and dispute resolution, Pugaleshwaran Raja Kumaran is a highly regarded tax professional known for his strategic insights and results-driven approach. He has built a strong reputation for successfully navigating complex tax disputes and providing clients with effective, tailored solutions that minimize risk and maximize compliance.",
            "His expertise extends to advising high-net-worth individuals, multinational corporations, and businesses across various industries, ensuring that they remain fully compliant with Malaysia’s evolving tax landscape while optimizing their tax positions.",
            "Beyond his client work, Pugaleshwaran is a recognized thought leader in the tax industry. He frequently writes, speaks, and conducts seminars on Malaysia’s tax policies, regulatory updates, and best practices, helping businesses and individuals stay informed about emerging tax developments. His contributions as an Industrial Advisor for various organizations further highlight his influence and commitment to shaping Malaysia’s tax landscape.",
        ],
        specialties: [
            "Tax Controversy",
            "Tax Scrutinization (tax audits and investigations)",
            "Dispute Resolution Proceedings (with the IRBM)",
            "Represents clients for tax appeals before the SCIT and CAT for customs duties and GST matters",
            "High Net Worth Tax Assignments (individuals and companies)",
            "Tax Incentive",
        ],
        background: [
            "Member of Chartered Tax Institute of Malaysia (CTIM)",
            "Member of International Fiscal Association (IFA)",
            "Licensed tax agent by Ministry of Finance (MOF)",
            "Industry Advisor, Accounting and Finance Programme – HELP Academy",
            "Bachelor’s Degree in Accounting and Finance",
        ],
    },
    {
        name: "Steffi Manisha Arokiam",
        title: "Tax Director",
        image: "/Steffi.jpg",
        linkedin: "https://www.linkedin.com/in/steffi-manisha-arokiam-507291158/",
        bio: [
            "Steffi Manisha Arokiam is a highly skilled tax professional with a strong academic foundation, holding dual degrees in Accountancy. With extensive experience in tax audits, investigations, and dispute resolution, she has successfully guided clients through complex tax matters, ensuring compliance while optimizing tax efficiencies.",
            "Her attention to detail, analytical mindset, and deep technical expertise allow her to provide comprehensive insights that help clients mitigate risks, resolve disputes, and maintain compliance with Malaysia’s evolving tax landscape.",
            "Beyond her technical expertise, Steffi is known for her approachable nature, client-focused approach, and commitment to delivering tailored solutions. She takes the time to understand each client’s unique needs and provides clear, practical guidance to help them navigate the ever-changing tax environment with confidence.",
        ],
        specialties: [
            "Leads Transfer Pricing",
            "RPGT, Stamp Duty & Estate Tax",
            "Expatriate Tax",
            "Tax Dispute (for individuals & companies)",
            "Tax Scrutinization Processes & Dispute Resolution Proceedings with the IRBM",
            "Tax Controversy & Advisory",
            "Tax Audit & Investigation",
            "Preparation of papers & representation before the SCIT & CAT",
            "Special assignments for government authorities",
        ],
        background: [
            "Member of Malaysian Institute of Accountants (MIA)",
            "ASEAN Chartered Professional Accountant (ASEAN CPA)",
            "Member of Chartered Tax Institute of Malaysia (CTIM)",
            "Member of International Fiscal Association (IFA)",
            "HRD Corp Accredited Trainer",
            "Bachelor’s Degree in Accountancy & Bachelor’s Degree in Arts (Major Accountancy) (UK)",
        ],
    },
    {
        name: "Surendren Supamaniam",
        title: "Associate Director",
        image: "/Surendren.png",
        linkedin: "https://www.linkedin.com/in/surendren-supamaniam-29b2a7199/",
        bio: [
            "Surendren Supamaniam is a highly experienced tax professional with a strong background in corporate taxation. He has worked across various industries, providing expert guidance on tax compliance and helping businesses implement effective tax strategies to achieve optimal efficiency.",
            "Beyond his technical expertise, Surendren is skilled in developing and maintaining compliance frameworks, ensuring that businesses adhere to relevant tax laws and regulations. He is also dedicated to knowledge sharing, designing training programs and conducting regular tax workshops for finance teams.",
            "In addition to his tax advisory work, Surendren has extensive experience managing both internal and external audits. He also leads specialized assignments in areas such as e-Invoicing and forensic accounting, supporting businesses in navigating complex financial and regulatory challenges.",
        ],
        specialties: [
            "Corporate Tax",
            "Withholding Tax",
            "Sales & Services Tax",
            "Indirect Tax",
            "Transfer Pricing",
        ],
        background: [
            "Advance Diploma in Accounting (ACCA)",
        ],
    },
    {
        name: "Deviyah Jakanathan",
        title: "Tax Associate",
        image: "/Deviyah.jpg",
        linkedin: "https://www.linkedin.com/in/deviyah-jakanathan-42234527a/",
        bio: [
            "With a strong foundation in audit and company secretarial practices, a dedicated tax professional with extensive hands-on experience in managing a full spectrum of tax compliance and reporting matters. Known for precision, reliability and a proactive approach, ensures clients meet their tax obligations efficiently and in full compliance with regulatory requirements. Experienced in preparing audited financial statements for both dormant and active companies.",
            "Having handled tax issues on a full-time basis, highly skilled in processing tax payments and returns, computing taxes, and preparing comprehensive tax computations and returns for companies, partnerships, and individuals. Also experienced in preparing estimated tax payables and managing revisions of tax estimates to ensure timely and accurate submissions to the Inland Revenue Board (IRB).",
        ],
        specialties: [
            "Tax Compliance and Computation",
            "Corporate, Partnership, and Individual Tax Returns",
            "Estimated Tax Payable and Revision of Tax Estimate",
            "Tax Payment Processing and Submissions (IRB)",
            "EA Form and Form E Preparation",
            "Preparation of Audited Financial Statements (Dormant and Active Companies)",
        ],
        background: [
            "Advance Diploma in Accounting (ACCA)",
        ],
    },
];

/* ────────────────────────────────────────────────────────────
   Animation
   ──────────────────────────────────────────────────────────── */

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
    }),
};

/* ────────────────────────────────────────────────────────────
   Team Modal
   ──────────────────────────────────────────────────────────── */

function TeamModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
    const overlayRef = useRef<HTMLDivElement>(null);

    // Lock background scrolling natively without interfering with modal touch events
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <motion.div
            ref={overlayRef}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8 overflow-hidden bg-foreground/15"
            onClick={onClose}
        >

            {/* Modal card */}
            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                data-modal-body
                data-lenis-prevent="true" // <-- THIS IS THE FIX: Forces Lenis to ignore this container
                className="relative w-full max-w-2xl max-h-[100vh] sm:max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-background border border-foreground/[0.06] scrollbar-hide overscroll-contain"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
                {/* Sticky header */}
                <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-lg rounded-t-3xl border-b border-foreground/[0.06]">
                    <div className="flex items-center gap-4 p-6 md:p-8 pb-5 md:pb-6">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight truncate">{member.name}</h3>
                            <p className="text-xs font-semibold text-accent uppercase tracking-wide">{member.title}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-xl flex items-center justify-center bg-background text-foreground/40 hover:text-accent transition-colors duration-200 flex-shrink-0"
                            style={{ boxShadow: "var(--neu-raised-sm)" }}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 pt-5 md:pt-6">
                    {/* Photo + LinkedIn */}
                    <div className="flex flex-col items-center mb-6">
                        <div
                            className="relative w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden mb-4"
                            style={{ boxShadow: "var(--neu-raised)" }}
                        >
                            <Image src={member.image} alt={member.name} fill className="object-cover object-top" />
                        </div>
                        <Link
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background text-foreground/50 hover:text-[#0A66C2] transition-all duration-200 text-sm font-medium"
                            style={{ boxShadow: "var(--neu-raised-sm)" }}
                        >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn Profile
                        </Link>
                    </div>

                    {/* Bio */}
                    <div className="flex flex-col gap-4 mb-6">
                        {member.bio.map((para, pi) => (
                            <p key={pi} className="text-sm md:text-[15px] text-foreground/60 leading-relaxed">
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-background mb-6" style={{ boxShadow: "var(--neu-inset-sm)" }} />

                    {/* Specialty + Background */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Specialty */}
                        <div className="p-5 rounded-2xl bg-background" style={{ boxShadow: "var(--neu-raised)" }}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
                                    Specialty
                                </h4>
                            </div>
                            <ul className="flex flex-col gap-2.5">
                                {member.specialties.map((item, si) => (
                                    <li key={si} className="flex items-start gap-2.5 text-sm text-foreground/55 leading-relaxed">
                                        <span className="w-1 h-1 rounded-full bg-foreground/20 mt-2 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Professional Background */}
                        <div className="p-5 rounded-2xl bg-background" style={{ boxShadow: "var(--neu-raised)" }}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
                                    Professional Background
                                </h4>
                            </div>
                            <ul className="flex flex-col gap-2.5">
                                {member.background.map((item, bi) => (
                                    <li key={bi} className="flex items-start gap-2.5 text-sm text-foreground/55 leading-relaxed">
                                        <span className="w-1 h-1 rounded-full bg-foreground/20 mt-2 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */

export default function TeamPage() {
    const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
    const lenis = useLenis();

    useEffect(() => {
        if (activeMember) lenis?.stop();
        else lenis?.start();
    }, [activeMember, lenis]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            <Navbar alwaysVisible />

            {/* ── Modal ── */}
            <AnimatePresence>
                {activeMember && (
                    <TeamModal member={activeMember} onClose={() => setActiveMember(null)} />
                )}
            </AnimatePresence>

            {/* ── Hero ── */}
            <PageHero
                badge="Our Team"
                heading={<>The People Behind <span className="text-accent">Your Success.</span></>}
                subtitle="A team of experienced chartered accountants, licensed tax agents, and financial consultants dedicated to delivering excellence across every engagement."
                image="/team.png"
                imageAlt="ThinkTX Team"
                imagePosition="center 30%"
            />

            {/* ── Divider ── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
            </div>

            {/* ── Team Members ── */}
            <section className="relative z-10 bg-background">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-28">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member, idx) => (
                            <motion.button
                                key={member.name}
                                custom={idx}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                whileHover={{ y: -4 }}
                                onClick={() => setActiveMember(member)}
                                className="group relative p-6 rounded-2xl bg-background overflow-hidden text-left cursor-pointer"
                                style={{ boxShadow: "var(--neu-raised)" }}
                            >
                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ boxShadow: "inset 0 0 40px rgba(238, 32, 70, 0.06)" }}
                                />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Photo */}
                                    <div
                                        className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-5"
                                        style={{ boxShadow: "var(--neu-inset-sm)" }}
                                    >
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-lg font-bold tracking-tight group-hover:text-accent transition-colors duration-300">
                                        {member.name}
                                    </h3>

                                    {/* Title */}
                                    <p className="text-sm font-semibold text-accent tracking-wide uppercase mt-1">
                                        {member.title}
                                    </p>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What Sets Us Apart / Mission & Vision / Core Values ── */}
            <div className="relative z-10 bg-background">
                <CompanyTabs />
            </div>

            {/* ── Footer ── */}
            <Footer />
        </div>
    );
}
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import {
    Calculator, Briefcase, FileText, FileCheck, UserCheck, ArrowLeftRight,
    ShieldCheck, Receipt, Landmark, Building2, Banknote, Scale,
    Search, FlaskConical, Compass, BadgeCheck, Globe,
    BookOpen, CreditCard, ClipboardList, ArrowUpRight, X, GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */

interface DetailPoint {
    title: string;
    text: string;
}

interface ServiceItem {
    title: string;
    desc: string;
    icon: LucideIcon;
    intro?: string;
    sectionTitle?: string;
    details?: DetailPoint[];
    secondaryIntro?: string;
}

/* ────────────────────────────────────────────────────────────
   Taxation service data — real content
   ──────────────────────────────────────────────────────────── */

const taxation: ServiceItem[] = [
    {
        title: "Tax Advisory",
        desc: "Expert tax advisory services helping businesses and individuals improve tax efficiency while ensuring full compliance.",
        icon: Calculator,
        intro: "At ThinkTx, we provide expert tax advisory services in Malaysia, helping businesses and individuals improve tax efficiency while ensuring full compliance with Malaysia’s tax regulations. Our team of experienced tax consultants collaborates with you to develop tailored strategies that optimises tax exposure and enhance overall financial outcomes.",
        sectionTitle: "What ThinkTx Offers for Your Tax Advisory Needs",
        details: [
            { title: "Tax Optimization Strategies", text: "Improve tax efficiency while ensuring full compliance with Malaysian tax regulations." },
            { title: "Regulatory Updates & Compliance Guidance", text: "Stay ahead of evolving tax laws with proactive insights and expert guidance." },
            { title: "Tax Position & High-Level Advisory and Review", text: "Evaluate and enhance your overall tax position and structure through comprehensive reviews, supporting strategic decision-making and effective risk mitigation." },
            { title: "Ad Hoc Tax Advisory", text: "Get tailored advice on specific matters such as venture capital, remuneration packages, Employee Share Option Schemes (ESOS), or industry-specific scenarios." },
        ],
    },
    {
        title: "e-Invoicing",
        desc: "End-to-end e-Invoicing implementation services to help businesses seamlessly adapt to Malaysia’s digital invoicing framework.",
        icon: FileText,
        intro: "As Malaysia transitions to a mandatory e-Invoicing system under IRBM, businesses must ensure full compliance with new digital invoicing standards. At ThinkTx, we provide end-to-end e-Invoicing implementation services to help businesses seamlessly adapt to the new framework whether via MyInvois Portal or Application Programming Interface (API) integration with their existing accounting or Enterprise Resource Planning (ERP) systems.",
        sectionTitle: "ThinkTx Solutions for e-Invoicing Compliance",
        details: [
            { title: "Preliminary Assessment & Gap Analysis", text: "We conduct a detailed review of your business model, transaction flows, invoicing practices, and internal documentation to identify gaps and determine required changes for e-Invoicing compliance." },
            { title: "Custom Implementation Support", text: "We assist with registration on the MyInvois Portal or integration via API, guide updates to your SOPs and invoicing processes, and help you prepare data collection protocols to meet IRBM requirements." },
            { title: "Regulatory Advisory & Process Updates", text: "ThinkTx advises on the correct type of e-Invoices to issue (e-Invoice, Credit Note, Debit Note, etc.) and recommends workflow updates to align with current and future IRBM guidelines." },
            { title: "Hands-On Training & e-Invoicing Kits", text: "We provide practical training for your internal team, including materials such as checklists, templates, SOP guides, and e-Invoicing Kits to support smooth day-to-day execution." },
            { title: "Post-Implementation Support", text: "Our team offers post-implementation support after your system goes live, addressing technical issues, troubleshooting errors, and regulatory compliance." },
        ],
    },
    {
        title: "Tax Compliance",
        desc: "Comprehensive tax compliance services ensuring accurate filings, timely submissions, and full adherence to tax laws.",
        icon: FileCheck,
        intro: "Staying compliant with Malaysia’s tax regulations is essential to avoiding penalties, audits, and reputational risks. At ThinkTx, we offer comprehensive tax compliance services for both corporations and individuals, ensuring accurate filings, timely submissions, and full adherence to local and international tax laws.",
        secondaryIntro: "For Corporate Tax Compliance, our team manages everything from tax return preparation to submission, including fulfilling employer tax obligations such as employee-related tax reporting and compliance.\n\nFor Individual & Partnership Tax Compliance, we support individuals with both business income (e.g., sole proprietors) and non-business income (e.g., salaried employees). We also assist with tax compliance and filing for societies, associations, trusts, estates, partnerships, and LLPs.",
        sectionTitle: "How ThinkTx Supports Your Tax Compliance Needs",
        details: [
            { title: "Corporate Tax Filing & Submission", text: "We manage and file all corporate tax returns, ensuring complete compliance." },
            { title: "Employer Tax Obligations", text: "Fulfillment of all employer-related tax responsibilities under Malaysian regulations." },
            { title: "Personal Tax Compliance", text: "Accurate and timely tax filings for individuals with business or employment income." },
            { title: "Declaration of All Income Sources", text: "Ensure rental, interest, dividend, and other income are reported as required." },
            { title: "Deadline Tracking", text: "Never miss a tax due date with our automated tracking and reminders." },
            { title: "Local & International Compliance", text: "Stay aligned with Malaysia’s tax framework and applicable global tax laws." },
        ],
    },
    {
        title: "Tax Dispute Resolution",
        desc: "Expert tax dispute resolution services helping businesses and individuals navigate tax challenges efficiently.",
        icon: Scale,
        intro: "Facing a tax audit, dispute, or unexpected tax bill? At ThinkTx, we provide expert tax dispute resolution services in Malaysia, helping businesses and individuals navigate tax challenges efficiently. Our experienced tax consultants work closely with you to identify issues, negotiate with the IRBM, and find the best resolution to resolve the matter amicably.",
        sectionTitle: "Strategic Tax Dispute Resolution from ThinkTx",
        details: [
            { title: "Tax Audit & Investigation Representation", text: "We represent and defend your interests during tax audits and investigations with Malaysian tax authorities." },
            { title: "Negotiation & Settlement", text: "We manage discussions with IRBM to resolve tax discrepancies and reach the most favourable outcomes." },
            { title: "Tax Debt & Penalty Solutions", text: "We help structure payment plans, reduce penalties, and manage appeals to ease financial burdens." },
            { title: "Statutory Appeals", text: "We handle the full appeal process, from Form N and Q submission to IRBM, Branch and State-level coordination." },
            { title: "Representation", text: "We represent you during Dispute Resolution Proceeding (DRP) sessions, liaise with IRBM Legal Department, and appear before the Special Commissioners of Income Tax (SCIT) when required." },
            { title: "Revision Applications", text: "We assist with submitting revision applications for excessive or incorrect tax assessments." },
        ],
    },
    {
        title: "Expatriate Tax",
        desc: "Comprehensive expatriate tax solutions ensuring compliance with local and international tax laws.",
        icon: UserCheck,
        intro: "Navigating expatriate tax in Malaysia can be complex, especially when dealing with dual tax obligations, international tax treaties, and compliance requirements. At ThinkTx, we provide comprehensive expatriate tax solutions, ensuring you remain compliant with local and international tax laws while maximizing available tax benefits.",
        sectionTitle: "ThinkTx Solutions for Expatriate Tax Matters",
        details: [
            { title: "Cross-Border Tax Compliance", text: "We help expatriates understand Malaysia’s tax laws and their home country’s tax obligations." },
            { title: "Personal Tax Filing", text: "We manage the preparation and submission of your personal income tax returns in Malaysia, ensuring accuracy, timeliness, and full compliance." },
            { title: "Double Taxation Management", text: "Our experts ensure you avoid double taxation by leveraging tax treaties and exemptions." },
            { title: "Tax Optimization for Expatriates", text: "We advise on available tax benefits, deductions, and exemptions." },
            { title: "Tax Clearance Assistance", text: "We assist in the tax clearance application process when you’re planning to leave Malaysia and return to your home country, ensuring a smooth and compliant exit." },
            { title: "Residence Status Advisory", text: "We provide guidance on determining and maintaining your Malaysian tax residence status, ensuring eligibility for preferential tax treatments where applicable." },
        ],
    },
    {
        title: "Transfer Pricing",
        desc: "Tax-efficient transfer pricing strategies ensuring fair and legally compliant inter-company transactions.",
        icon: ArrowLeftRight,
        intro: "For multinational companies in Malaysia, transfer pricing compliance is crucial to avoid tax penalties and align with the Organisation for Economic Co-operation and Development (OECD) and IRBM regulations. At ThinkTx, we help businesses develop tax-efficient transfer pricing strategies, ensuring fair and legally compliant inter-company transactions across multiple jurisdictions.",
        sectionTitle: "Managing Transfer Pricing with ThinkTx",
        details: [
            { title: "Strategic Transfer Pricing", text: "We structure inter-company transactions to comply with Malaysia’s transfer pricing guidelines and international tax laws." },
            { title: "Transfer Pricing Documentation & Compliance", text: "Our team prepares detailed reports and documentation to minimize risks." },
            { title: "Dispute Resolution & Risk Mitigation", text: "Assisting in resolving transfer pricing disputes and proactively managing pricing risks between related entities." },
            { title: "End-to-End Transfer Pricing Analysis & Support", text: "Comprehensive review of business model, intercompany transactions, and stakeholder roles. Functional, Asset and Risk (FAR) Analysis and benchmarking to determine appropriate pricing methods. Preparation of defensible documentation in line with the OECD and IRBM requirements." },
        ],
    },
    {
        title: "Tax Incentives",
        desc: "Identifying and securing the best tax incentives tailored to your business or industry.",
        icon: Banknote,
        intro: "The Malaysian government offers various tax incentives to encourage business growth, investments, and innovation. These can include tax deductions, exemptions, and rebates that help reduce your overall tax burden. At ThinkTx, we specialize in identifying and securing the best tax incentives tailored to your business or industry, ensuring you fully benefit from government incentive schemes while remaining tax compliant.",
        sectionTitle: "Maximizing Tax Incentives with ThinkTx",
        details: [
            { title: "Identify Eligible Tax Incentives", text: "We assess your business activities to determine eligibility for government tax relief programs, investment incentives, and sector-specific exemptions." },
            { title: "Optimize Tax Credits & Deductions", text: "We help you claim tax credits, grants, and double deductions to maximize savings." },
            { title: "Ensure Compliance & Documentation", text: "Our experts guide you through the application process, ensuring you meet all legal requirements and avoid missed opportunities." },
            { title: "Liaison with Relevant Authorities", text: "We communicate directly with key government bodies including the IRBM, Malaysian Investment Development Authority (MIDA), and Securities Commission Malaysia (SC), streamlining the application process." },
            { title: "Pioneer Status Incentive", text: "We assist businesses in applying for Pioneer Status, which offers partial tax exemptions for companies engaged in promoted activities or producing promoted products under the Promotion of Investments Act 1986." },
            { title: "Investment Tax Allowance (ITA)", text: "We support your application for Investment Tax Allowance, allowing companies investing in approved projects to offset qualifying capital expenditures against their taxable income." },
        ],
    },
    {
        title: "Withholding Tax",
        desc: "Comprehensive withholding tax services ensuring accurate deduction and timely compliance.",
        icon: ShieldCheck,
        intro: "Withholding tax in Malaysia can be complex, especially for businesses making cross-border payments. At ThinkTx, we provide comprehensive withholding tax services to ensure both accurate deduction and timely compliance with the IRBM requirements.",
        sectionTitle: "Managing Withholding Tax Obligations with ThinkTx",
        details: [
            { title: "Withholding Tax Advisory", text: "We guide you on the correct withholding tax rates applicable based on payment types and tax treaties. Our experts help you determine obligations for royalties, technical fees, interest, and other payments." },
            { title: "Withholding Tax Compliance", text: "We ensure timely preparation and submission of Form CP37 and related documents to IRBM. Our team monitors deadlines and manages follow-ups to avoid penalties and ensure full compliance with Malaysian tax laws." },
        ],
    },
    {
        title: "Stamp Duty",
        desc: "Comprehensive stamp duty advisory and processing services for businesses and individuals.",
        icon: Receipt,
        intro: "Stamp duty is a mandatory tax on legal documents, including property transfers, business agreements, and financial instruments in Malaysia. Ensuring accurate stamp duty assessment and compliance is crucial to avoid penalties and unnecessary costs. At ThinkTx, we provide comprehensive stamp duty advisory and processing services, helping businesses and individuals navigate complex stamp duty regulations efficiently.",
        sectionTitle: "Stamp Duty Advisory & Services by ThinkTx",
        details: [
            { title: "Stamp Duty Assessment & Advisory", text: "We analyze your transactions, property transfers, and agreements to determine applicable stamp duty rates and exemptions." },
            { title: "Exemptions & Relief Applications", text: "Our tax professionals help you identify eligible stamp duty reliefs and assist with exemption applications." },
            { title: "Stamp Duty Advisory & Submission", text: "We ensure accurate assessment and timely filing to prevent delays, errors, or penalties imposed by the IRBM." },
            { title: "Property & Business Transaction Support", text: "We advise on deal structuring and manage the full stamp duty process for property, share transfers, and agreements to ensure compliance and efficiency." },
        ],
    },
    {
        title: "Real Property Gains Tax (RPGT)",
        desc: "Comprehensive RPGT advisory and tax filing services for individuals, investors, and businesses.",
        icon: Landmark,
        intro: "Malaysia’s RPGT applies to profits earned from the disposal of real property or shares in real property companies. Understanding your RPGT obligations is essential to avoid penalties and ensure timely and accurate compliance. At ThinkTx, we provide comprehensive RPGT advisory and tax filing services tailored for individuals, property investors, and businesses.",
        sectionTitle: "Managing RPGT Obligations with ThinkTx",
        details: [
            { title: "Transaction Advisory", text: "Strategic tax advice for property disposals, transfers, and restructuring to ensure compliance and tax efficiency." },
            { title: "RPGT Form Filing", text: "End-to-end assistance in preparing and filing CKHT forms for both buyers and sellers to ensure compliance and efficiency." },
            { title: "Tax Computation & Documentation", text: "Accurate calculation of chargeable gains, exemptions, and reliefs." },
            { title: "RPGT Compliance Management", text: "Timely submissions and communication with the IRBM." },
        ],
    },
    {
        title: "Estate Tax",
        desc: "Expert estate tax services supporting wealth transition and regulatory compliance.",
        icon: Building2,
        intro: "Navigating estate tax matters requires careful planning and compliance, especially when managing assets across generations. At ThinkTx, we provide expert estate tax services in Malaysia, supporting individuals and families with comprehensive solutions for wealth transition and regulatory compliance.",
        sectionTitle: "How ThinkTx Supports Your Estate Tax Needs",
        details: [
            { title: "Estate Tax Advisory", text: "We assist in legacy planning by helping you structure asset distribution in a tax-efficient manner. Our team offers tailored advice to preserve family wealth and estate-related tax exposure." },
            { title: "Estate Tax Compliance", text: "We manage all necessary estate tax filings and declarations with the IRBM, ensuring that all legal obligations are fulfilled accurately and on time." },
        ],
    },
    {
        title: "Indirect Tax",
        desc: "Expert guidance ensuring businesses remain compliant while optimizing their indirect tax strategy.",
        icon: ClipboardList,
        intro: "Indirect taxes apply to goods and services rather than income. Managing indirect tax compliance can be complex, especially for businesses involved in cross-border transactions. At ThinkTx, we provide expert guidance to ensure businesses in Malaysia remain compliant while optimizing their indirect tax strategy to avoid overpayment and reduce risks.",
        sectionTitle: "ThinkTx Solutions for Indirect Tax Compliance",
        details: [
            { title: "SST Advisory", text: "Expert guidance on Malaysia’s Sales and Service Tax (SST) and other indirect taxes affecting your business." },
            { title: "Tax-Efficient Transaction Structuring", text: "We help businesses optimize supply chain structures and reduce unnecessary costs." },
            { title: "Cross-Border Compliance", text: "Ensuring that your import/export activities, international sales, and multinational operations meet all regional and global tax regulations." },
            { title: "Indirect Tax Appeals & Representation", text: "We support clients through the full tax appeal process for indirect tax matters. Our services include managing Customs audits, handling Customs verification processes, SST registration and deregistration, and representing clients at the Customs Appeal Tribunal (CAT)." },
        ],
    },
    {
        title: "Knowledge Sharing",
        desc: "Empowering businesses and professionals with up-to-date tax knowledge through ThinkTx Academy.",
        icon: GraduationCap,
        intro: "ThinkTx Academy is dedicated to empowering businesses, professionals, and individuals with up-to-date tax knowledge through webinars, seminars, and workshops. As tax regulations in Malaysia continue to evolve, staying informed is crucial for ensuring compliance, tax efficiency, and strategic financial planning. Our expert-led sessions provide valuable insights into corporate tax, personal tax, e-Invoicing, SST compliance, tax incentives, transfer pricing, and more.",
        sectionTitle: "Our ThinkTx Academy Offers",
        details: [
            { title: "Live Webinars & Seminars", text: "Covering the latest Malaysian tax laws, corporate tax advisory, and regulatory updates to keep businesses compliant and competitive." },
            { title: "Expert-Led Training", text: "Learn from seasoned tax professionals, licensed tax agents, and financial consultants with years of industry experience." },
            { title: "Practical Insights & Case Studies", text: "Understand real-world tax scenarios, dispute resolution strategies, and tax-saving opportunities to make informed business decisions." },
            { title: "Custom Tax Training for Businesses", text: "Tailored tax compliance and financial management programs for companies looking to upskill their finance teams." },
        ],
    },
];

const advisory: ServiceItem[] = [
    {
        title: "Restructuring Advisory",
        desc: "Helping businesses navigate financial challenges, improve operational efficiency, and regain stability.",
        icon: Compass,
        intro: "We specialize in restructuring advisory services in Malaysia, helping businesses navigate financial challenges, improve operational efficiency, and regain stability. Whether facing cash flow issues, declining profitability, high debt burdens, or stakeholder pressure, our expert team provides strategic restructuring solutions tailored to your unique situation.",
        sectionTitle: "ThinkTx Solutions for Business Restructuring",
        details: [
            { title: "Financial Restructuring", text: "We analyze your financial position, optimize cash flow, and develop sustainable strategies." },
            { title: "Corporate Restructuring", text: "We assist with company reorganization, mergers, and acquisitions to enhance business performance." },
            { title: "Turnaround Strategy", text: "Our experts create customized turnaround plans to restore profitability and business viability." },
        ],
    },
    {
        title: "Financial Due Diligence",
        desc: "In-depth financial analysis to help businesses make informed and risk-free decisions.",
        icon: Search,
        intro: "Before making any major business decisions whether it’s a merger, acquisition, investment, or partnership, it’s crucial to have a clear understanding of the financial health of the target company. At ThinkTx, our financial due diligence services provide in-depth financial analysis to help businesses make informed and risk-free decisions.",
        secondaryIntro: "We also perform financial due diligence for companies evaluating their own financial position, which is essential in planning for corporate restructuring, strategic pivots, or operational improvements.",
        sectionTitle: "Ensuring Thorough Financial Due Diligence with ThinkTx",
        details: [
            { title: "Comprehensive Financial Analysis", text: "We conduct a thorough review of financial statements, cash flow and revenue trends to assess financial stability." },
            { title: "Tax & Regulatory Compliance Check", text: "Ensure that the company adheres to Malaysia’s tax laws, and regulatory requirements to avoid legal complications." },
            { title: "Mergers & Acquisitions (M&A) Due Diligence", text: "Help investors and companies evaluate M&A opportunities, and transaction risks before finalizing a deal." },
            { title: "Investor Due Diligence & Valuation Support", text: "Assist private equity firms, venture capitalists, and corporate investors in making data-driven investment decisions." },
        ],
    },
    {
        title: "Forensic Accounting",
        desc: "Expert forensic accounting services helping businesses uncover financial misconduct and strengthen controls.",
        icon: FlaskConical,
        intro: "Financial fraud, mismanagement, and accounting discrepancies can severely impact a business’s reputation and financial stability. ThinkTx offers expert forensic accounting services in Malaysia, helping businesses uncover financial misconduct, and strengthen internal controls.",
        sectionTitle: "Ensuring Accurate Forensic Accounting with ThinkTx",
        details: [
            { title: "Fraud Investigation & Detection", text: "Identify embezzlement, financial fraud, asset misappropriation, and accounting irregularities through in-depth forensic analysis." },
            { title: "Forensic Audits & Risk Assessments", text: "Conduct detailed forensic audits to detect errors, and financial misstatements." },
            { title: "Corporate Governance & Compliance Checks", text: "Ensure businesses meet Malaysia’s financial regulations." },
            { title: "Employee Misconduct & Internal Fraud Investigations", text: "Investigate financial misconduct, and non-compliance to protect company assets and reputation." },
        ],
    },
    {
        title: "Industry Specific Advisory",
        desc: "Tailored solutions to streamline licensing and ensure regulatory compliance across sectors.",
        icon: Briefcase,
        intro: "ThinkTx specializes in helping businesses navigate the complexities of obtaining industry-specific licenses and ensuring regulatory compliance in Malaysia. We provide tailored solutions to streamline the licensing process, ensuring your business meets all necessary legal requirements.",
        sectionTitle: "How ThinkTx Supports Your Industry-Specific Business Advisory Needs",
        details: [
            { title: "Industry-Specific License Application", text: "We assist businesses in applying for and securing the required licenses and permits for their specific industry. For example, businesses in the transportation sector can rely on us to obtain transport ministry licenses and other related certifications." },
            { title: "Regulatory Compliance Advisory", text: "We help you understand and comply with sector-specific regulations issued by authorities such as the Bank Negara Malaysia, Ministry of Finance, Companies Commission of Malaysia (CCM), and other local authorities and regulatory bodies." },
            { title: "Operational Readiness Assessment", text: "Before application, we assess your business operations to ensure readiness for inspections or audits that may be required by licensing authorities." },
            { title: "End-to-End Licensing Support", text: "From preparing documentation to engaging with regulators and tracking approval status, we offer full-cycle support throughout the licensing process." },
            { title: "Post-Licensing Compliance Monitoring", text: "We assist in maintaining ongoing compliance by monitoring key deadlines, filing obligations, and renewals to avoid penalties or interruptions to your operations." },
            { title: "Sector-Specific Advisory", text: "Our consultants provide tailored guidance for regulated industries such as finance, transportation, logistics, food & beverage, and others ensuring that your business operates within the legal framework." },
        ],
    },
    {
        title: "Company Secretarial",
        desc: "Professional company secretarial services supporting compliance with the Companies Act 2016.",
        icon: BadgeCheck,
        intro: "We provide professional company secretarial services in Malaysia, supporting businesses in staying compliant with the Companies Act 2016 and other regulatory requirements. Our team of licensed company secretaries offers end-to-end support for company formation, statutory filings, and corporate governance, ensuring your business operations remain smooth, transparent, and fully compliant.",
        secondaryIntro: "We also assist with the incorporation of various business entities, including private limited companies (Sdn Bhd), sole proprietorships, partnerships (LLP), tailored to suit your business structure and goals.",
        sectionTitle: "Ensuring Compliance with Company Secretarial Services from ThinkTx",
        details: [
            { title: "Company Incorporation & Registration", text: "We assist with business registration in Malaysia, ensuring compliance with the Companies Commission of Malaysia (CCM)." },
            { title: "Statutory Compliance & Filings", text: "We manage annual returns, board resolutions, and regulatory filings, keeping your company up to date." },
            { title: "Corporate Governance & Advisory", text: "We provide guidance on directors’ duties, shareholder rights, and corporate governance best practices." },
            { title: "Business Expansion Support", text: "Whether you’re a startup, SME, or multinational company, we help you navigate corporate secretarial requirements for expansion in Malaysia." },
            { title: "Company Registration for Foreign Investors", text: "We assist in setting up foreign-owned businesses in Malaysia, including company incorporation and business licensing." },
        ],
    },
    {
        title: "Immigration",
        desc: "Comprehensive immigration services ensuring smooth visa applications, renewals, and compliance.",
        icon: Globe,
        intro: "Navigating Malaysia’s immigration regulations can be complex for businesses and individuals. At ThinkTx, we provide comprehensive immigration services, ensuring smooth visa applications, renewals, and compliance with the latest Malaysian immigration laws.",
        sectionTitle: "Immigration Advisory & Services by ThinkTx",
        details: [
            { title: "Employment Pass & Work Visa Applications", text: "We assist businesses in obtaining Employment Passes (EP), Professional Visit Passes (PVP), and Dependent Passes (DP) for expatriates and their families." },
            { title: "Malaysia My Second Home (MM2H) Visa", text: "Guidance and processing support for individuals seeking long-term residency under the MM2H program." },
            { title: "Business & Investor Visa Applications", text: "We facilitate Malaysia business visas, investor visas, and entrepreneur visas for foreign professionals and companies expanding in Malaysia." },
            { title: "Visa Renewal & Compliance", text: "We handle visa renewals, special passes, and other expatriate matters, ensuring businesses and individuals comply with Malaysia’s immigration policies." },
            { title: "Appeals & Immigration Advisory", text: "Support for visa rejections, appeals, and immigration compliance audits to prevent legal complications." },
        ],
    },
];

const outsourcing: ServiceItem[] = [
    {
        title: "Accounting",
        desc: "Outsourced finance services to streamline operations, improve accuracy, and ensure regulatory compliance.",
        icon: BookOpen,
        intro: "Managing in-house finance functions can be time-consuming, costly, and prone to compliance risks especially for growing businesses. At ThinkTx, we offer outsourced finance services to help companies streamline financial operations, improve accuracy, and ensure full compliance with local regulatory requirements.",
        secondaryIntro: "Our experienced team of finance professionals works as an extension of your internal team, delivering timely, reliable, and strategic support so you can focus on your core business objectives.",
        sectionTitle: "ThinkTx Solutions for Accounting Services",
        details: [
            { title: "Bookkeeping & Accounting", text: "Accurate recording of financial transactions, account reconciliations, and preparation of financial statements." },
            { title: "Monthly Management Reporting", text: "Timely financial reports, including P&L statements, balance sheets, and cash flow analysis for better decision-making." },
            { title: "Cash Flow & Budget Monitoring", text: "Monitor and manage your company’s cash flow, working capital, and budgets to support financial stability and growth." },
            { title: "Process & System Improvements", text: "Evaluate current financial workflows and recommend improvements to enhance efficiency, accuracy, and automation." },
        ],
    },
    {
        title: "Payroll",
        desc: "End-to-end payroll services ensuring statutory compliance and streamlined salary processing.",
        icon: CreditCard,
        intro: "We provide end-to-end payroll services, ensuring businesses meet statutory payroll compliance while streamlining salary processing. Our payroll outsourcing solutions help businesses save time, reduce administrative burdens, and ensure accurate employee payments.",
        sectionTitle: "Ensuring Smooth Payroll Management with ThinkTx",
        details: [
            { title: "Monthly Payroll Processing", text: "We handle salary calculations, allowances, and deductions ensuring accurate and timely payroll disbursement." },
            { title: "Statutory Compliance & Tax Filings", text: "We manage EPF, SOCSO, EIS, Monthly Tax Deductions (MTD), and HRDF contributions, ensuring compliance with the IRBM and regulatory authorities." },
            { title: "Timely Statutory Payments", text: "We ensure your statutory payments are made on time to avoid penalties, late payment interest, or compliance issues." },
            { title: "Payslip Generation & Reports", text: "We provide secure digital payslips and detailed payroll reports for record-keeping." },
        ],
    },
    {
        title: "Sales & Service Tax (SST)",
        desc: "Comprehensive SST services to keep your business fully compliant with Customs requirements.",
        icon: ClipboardList,
        intro: "The SST regime in Malaysia requires businesses to meet specific registration, reporting, and filing obligations. At ThinkTx, we offer comprehensive SST services in Malaysia to help your business stay fully compliant with the Customs requirements while optimizing tax efficiency.",
        secondaryIntro: "Our SST experts guide you through every step of the process from registration and classification to bi-monthly reporting and audit support ensuring peace of mind and avoiding costly penalties.",
        sectionTitle: "How ThinkTx Supports Your SST-Related Needs",
        details: [
            { title: "SST Registration & Advisory", text: "We determine your eligibility for SST, assist with registration, and advise on classification for goods and services." },
            { title: "SST Return Preparation & Filing", text: "Accurate preparation and timely submission of SST-02 returns, in line with statutory deadlines." },
            { title: "Sales & Service Tax Computation", text: "Precise calculation of SST on taxable goods and services, ensuring full compliance and correct tax reporting." },
            { title: "SST Audit Support", text: "We assist with Customs audits by preparing the necessary documentation and managing communication with authorities." },
            { title: "Transaction Review & Compliance Check", text: "Review your business transactions and invoicing practices to ensure alignment with SST rules and avoid exposure to penalties." },
            { title: "Ongoing Advisory & Updates", text: "Stay informed of regulatory changes and SST updates that may affect your operations." },
        ],
    },
];

const categories = [
    {
        id: "taxation",
        label: "Taxation",
        tagline: "Navigate Complexity with Confidence",
        description: "From strategic planning to dispute resolution, our taxation practice covers the full spectrum of direct and indirect tax services — helping businesses and individuals optimise outcomes while staying fully compliant.",
        services: taxation,
    },
    {
        id: "corporate-advisory",
        label: "Corporate Advisory",
        tagline: "Strategic Insight for Every Stage",
        description: "Our advisory team partners with businesses through restructuring, due diligence, governance, and sector-specific challenges — delivering clarity and confidence at every inflection point.",
        services: advisory,
    },
    {
        id: "outsourcing",
        label: "Outsourcing Services",
        tagline: "Efficiency Without Compromise",
        description: "Offload your accounting, payroll, and compliance operations to our dedicated team. We deliver precision and reliability so you can focus on what you do best.",
        services: outsourcing,
    },
];

/* ────────────────────────────────────────────────────────────
   Animation variants
   ──────────────────────────────────────────────────────────── */

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.06, ease: "easeOut" as const },
    }),
};

/* ────────────────────────────────────────────────────────────
   Service Detail Modal
   ──────────────────────────────────────────────────────────── */

function ServiceModal({ svc, onClose }: { svc: ServiceItem; onClose: () => void }) {
    const Icon = svc.icon;
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
                data-lenis-prevent="true"
                className="relative w-full max-w-2xl max-h-[100dvh] sm:max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-t-3xl sm:rounded-3xl bg-background border border-foreground/[0.06] scrollbar-hide overscroll-contain"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
                {/* Sticky header */}
                <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-lg rounded-t-3xl border-b border-foreground/[0.06]">
                    <div className="flex items-center gap-4 p-6 md:p-8 pb-5 md:pb-6">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center bg-background flex-shrink-0"
                            style={{ boxShadow: "var(--neu-inset-sm)" }}
                        >
                            <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight truncate">{svc.title}</h3>
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
                    {/* Intro paragraph */}
                    {svc.intro && (
                        <p className="text-sm md:text-[15px] text-foreground/60 leading-relaxed mb-6">
                            {svc.intro}
                        </p>
                    )}

                    {/* Secondary intro (for Tax Compliance corporate/individual split) */}
                    {svc.secondaryIntro && (
                        <div className="mb-6 p-5 rounded-2xl bg-foreground/[0.02] border border-foreground/[0.05]">
                            {svc.secondaryIntro.split("\n\n").map((para, pi) => (
                                <p key={pi} className={`text-sm text-foreground/55 leading-relaxed ${pi > 0 ? "mt-3" : ""}`}>
                                    {para}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Section title */}
                    {svc.sectionTitle && (
                        <div className="flex items-center gap-3 mb-5 w-full">
                            <div className="h-px flex-1 bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent text-center shrink">
                                {svc.sectionTitle}
                            </span>
                            <div className="h-px flex-1 bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                        </div>
                    )}

                    {/* Detail points */}
                    {svc.details && (
                        <div className="flex flex-col gap-4">
                            {svc.details.map((detail, di) => (
                                <motion.div
                                    key={di}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: 0.1 + di * 0.04, ease: "easeOut" as const }}
                                    className="flex items-start gap-3.5"
                                >
                                    <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-accent/10 text-accent text-[10px] font-bold flex-shrink-0 mt-0.5">
                                        {String(di + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-foreground/85 mb-0.5">{detail.title}</p>
                                        <p className="text-sm text-foreground/50 leading-relaxed">{detail.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */

export default function ServicesPage() {
    const [activeService, setActiveService] = useState<ServiceItem | null>(null);
    const lenis = useLenis();

    // Lock page scroll (both Lenis + native) when modal is open
    useEffect(() => {
        if (activeService) {
            lenis?.stop();
        } else {
            lenis?.start();
        }
    }, [activeService, lenis]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            <Navbar alwaysVisible />

            {/* Service detail modal */}
            <AnimatePresence>
                {activeService && (
                    <ServiceModal svc={activeService} onClose={() => setActiveService(null)} />
                )}
            </AnimatePresence>

            {/* ── Hero ── */}
            <PageHero
                badge="Our Services"
                heading={<>Comprehensive Solutions, <span className="text-accent">Tailored for You.</span></>}
                subtitle="From tax strategy to corporate advisory and outsourced operations, we deliver end-to-end expertise that empowers businesses to thrive."
                image="/S-hero.png"
                imageAlt="ThinkTX Services"
                imagePosition="22% 44%"
            >
                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`#${cat.id}`}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/20 hover:border-accent hover:bg-accent hover:text-white transition-all duration-300 bg-white/[0.08] backdrop-blur-md text-white"
                        >
                            {cat.label}
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </div>
            </PageHero>

            {/* ── Category Sections ── */}
            {categories.map((cat, catIdx) => (
                <section
                    key={cat.id}
                    id={cat.id}
                    className="relative z-10 bg-background"
                >
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-28">
                        {/* Divider */}
                        {catIdx === 0 && (
                            <div className="mb-28 h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                        )}

                        {/* Category Header */}
                        <div className="mb-16 md:mb-20 max-w-3xl">
                            <motion.span
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5 }}
                                className="inline-block text-base md:text-lg font-extrabold uppercase tracking-[0.2em] text-accent mb-4"
                            >
                                {String(catIdx + 1).padStart(2, "0")} — {cat.label}
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, delay: 0.05 }}
                                className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
                            >
                                {cat.tagline}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-lg text-foreground/55 leading-relaxed"
                            >
                                {cat.description}
                            </motion.p>
                        </div>

                        {/* Service Cards — clickable if service has details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cat.services.map((svc, i) => {
                                const Icon = svc.icon;
                                const hasDetails = !!svc.details;
                                const Wrapper = hasDetails ? motion.button : motion.div;

                                return (
                                    <Wrapper
                                        key={svc.title}
                                        custom={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-60px" }}
                                        whileHover={{ y: -4 }}
                                        {...(hasDetails ? { onClick: () => setActiveService(svc) } : {})}
                                        className={`group relative p-7 rounded-2xl bg-background overflow-hidden transition-all duration-500 text-left ${hasDetails ? "cursor-pointer" : ""}`}
                                        style={{ boxShadow: "var(--neu-raised)" }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{ boxShadow: "inset 0 0 40px rgba(238, 32, 70, 0.06)" }}
                                        />
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-5">
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-background transition-all duration-300 group-hover:scale-110"
                                                    style={{ boxShadow: "var(--neu-inset-sm)" }}
                                                >
                                                    <Icon className="w-5 h-5 text-accent" />
                                                </div>
                                                {hasDetails && (
                                                    <div
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-background opacity-50 group-hover:opacity-100 transition-all duration-300"
                                                        style={{ boxShadow: "var(--neu-raised-sm)" }}
                                                    >
                                                        <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40 group-hover:text-accent transition-colors" />
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                                                {svc.title}
                                            </h3>
                                            <p className="text-sm text-foreground/55 leading-relaxed">
                                                {svc.desc}
                                            </p>
                                        </div>
                                    </Wrapper>
                                );
                            })}
                        </div>

                        {/* Divider after each category except last */}
                        {catIdx < categories.length - 1 && (
                            <div className="mt-28 h-px bg-background" style={{ boxShadow: "var(--neu-inset-sm)" }} />
                        )}
                    </div>
                </section>
            ))}

            {/* ── Footer ── */}
            <Footer />
        </div>
    );
}
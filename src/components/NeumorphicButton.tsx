import { motion } from "framer-motion";
import Link from "next/link";

interface NeumorphicButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    isAccent?: boolean;
    className?: string;
    href?: string;
}

export default function NeumorphicButton({ children, onClick, isAccent = false, className = "", href }: NeumorphicButtonProps) {
    const Comp = href ? motion.create(Link) : motion.button;

    return (
        <Comp
            {...(href ? { href } : {})}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`
                relative px-8 py-4 rounded-full font-bold tracking-wide transition-all duration-300
                ${isAccent
                    ? "bg-accent text-white"
                    : "bg-background text-foreground"
                }
                ${className}
            `}
            style={{
                boxShadow: isAccent
                    ? "var(--neu-accent-raised)"
                    : "var(--neu-raised)",
            }}
            onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = isAccent
                    ? "var(--neu-accent-inset)"
                    : "var(--neu-inset)";
            }}
            onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = isAccent
                    ? "var(--neu-accent-raised)"
                    : "var(--neu-raised)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = isAccent
                    ? "var(--neu-accent-raised)"
                    : "var(--neu-raised)";
            }}
        >
            {children}
        </Comp>
    );
}

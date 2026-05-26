"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Phase = "typing" | "paused" | "deleting" | "waiting";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorClassName?: string;
}

export function TypewriterEffect({
  words,
  className,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  cursorClassName,
}: TypewriterEffectProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(words[0].length);
  const [phase, setPhase] = useState<Phase>("paused");

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;

    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    switch (phase) {
      case "typing":
        if (charIndex < currentWord.length) {
          timeout = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
        } else {
          setPhase("paused");
        }
        break;

      case "paused":
        timeout = setTimeout(() => setPhase("deleting"), pauseDuration);
        break;

      case "deleting":
        if (charIndex > 0) {
          timeout = setTimeout(() => setCharIndex((c) => c - 1), deletingSpeed);
        } else {
          setPhase("waiting");
        }
        break;

      case "waiting":
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, 150);
        break;
    }

    return () => clearTimeout(timeout);
  }, [isMounted, phase, charIndex, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  const currentWord = words[wordIndex % words.length];
  const displayText = isMounted ? currentWord.slice(0, charIndex) : words[0];

  return (
    <span className={cn(className)} aria-label={currentWord}>
      {displayText}
      <motion.span
        className={cn(
          "inline-block ml-[2px] w-[3px] h-[0.8em] bg-current align-middle rounded-full translate-y-[0.05em]",
          cursorClassName
        )}
        animate={{
          opacity: phase === "paused" ? [1, 0, 1] : 1,
        }}
        transition={
          phase === "paused"
            ? { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
            : { duration: 0.1 }
        }
      />
    </span>
  );
}

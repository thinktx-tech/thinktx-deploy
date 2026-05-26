# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Architecture

**ThinkTX Revamp** is a Next.js 16 tax services marketing site using the **Pages Router** (not App Router).

- **TypeScript** with strict mode; path alias `@/*` → `./src/*`
- **Tailwind CSS v4** — no `tailwind.config.js`; configured via PostCSS plugin (`@tailwindcss/postcss`)
- **Framer Motion** for animations
- **Lenis** for momentum smooth scrolling (configured in `src/components/providers.tsx` with `lerp: 0.08`)
- **next-themes** for dark/light mode (defaults to dark, uses `class` strategy)

### Provider Architecture

All global context lives in `src/components/providers.tsx`, which wraps the app via `src/pages/_app.tsx`. The `Providers` component handles:
1. `NextThemesProvider` — theme management
2. `ReactLenis` — smooth scrolling

Both providers include hydration safety: rendering is deferred until after mount to prevent hydration mismatches. Follow this same pattern in any new components that access `useTheme` or browser-only APIs.


# Project Context: ThinkTx Website Revamp

## 1. Project Overview
* **Client:** ThinkTx (Boutique Tax Consulting & Corporate Advisory Firm in Malaysia)
* **Goal:** Revamp the existing website into a highly modern, luxury, and professional digital experience. 
* **Vibe:** High-end, bespoke, minimalistic, highly interactive, trustworthy. Move away from standard corporate templates to a dynamic, animated, and premium aesthetic.

## 2. Tech Stack & Architecture
* **Framework:** Next.js (Pages Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Theming:** `next-themes` (Dark/Light mode support)
* **Animation Engine:** Framer Motion
* **Smooth Scrolling:** Lenis (`lenis/react`)
* **Component Libraries:** * Shadcn UI (for base accessible components)
  * Aceternity UI (for complex, luxury 3D and animated sections)

## 3. Design System & Theme Tokens
* **Typography:** * Headings: Sophisticated serif or clean modern sans-serif (e.g., Playfair Display, Inter, or Geist).
  * Body: Highly readable sans-serif.
* **Color Palette:**
  * **Light Mode:**
    * Background: `#ffffff`
    * Foreground/Text: `#111111`
  * **Dark Mode:**
    * Background: `#41445B` (Deep, premium midnight tone)
    * Foreground/Text: `#ffffff`
  * **Universal Accent:**
    * Brand Red: `#EE2046` (Used strictly for CTAs, highlights, and micro-interactions to make elements pop against the dark/light backgrounds).

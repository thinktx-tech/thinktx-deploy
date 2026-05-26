"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { ReactLenis, useLenis } from "lenis/react";

function ScrollToTop() {
    const lenis = useLenis();
    const router = useRouter();

    useEffect(() => {
        const onRouteChange = () => {
            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo(0, 0);
            }
        };
        router.events.on("routeChangeComplete", onRouteChange);
        return () => router.events.off("routeChangeComplete", onRouteChange);
    }, [lenis, router.events]);

    return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
            <ScrollToTop />
            {children}
        </ReactLenis>
    );
}
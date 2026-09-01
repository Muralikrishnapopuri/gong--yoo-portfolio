"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let rafId: number;
    let lenisInstance: Lenis | null = null;

    try {
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisRef.current = lenisInstance;

      function raf(time: number) {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      // Handle window resize
      const handleResize = () => {
        lenisInstance?.resize();
      };
      window.addEventListener("resize", handleResize);

      // Smooth scroll on anchor link clicks
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest("a");
        if (anchor) {
          const href = anchor.getAttribute("href");
          if (href && href.startsWith("#") && href.length > 1) {
            const element = document.querySelector(href);
            if (element) {
              e.preventDefault();
              lenisInstance?.scrollTo(element as HTMLElement, { offset: -60, duration: 1.2 });
            }
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("click", handleAnchorClick);
        lenisInstance?.destroy();
        lenisRef.current = null;
      };
    } catch (error) {
      console.warn("SmoothScroll Lenis fallback to native:", error);
    }
  }, []);

  return <>{children}</>;
}


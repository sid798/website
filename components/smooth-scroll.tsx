"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

export function SmoothScroll() {
  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.__motionReady = true;
    if (reduced) {
      document.documentElement.removeAttribute("data-motion");
      return;
    }
    // React's dev remount clears attributes the inline script set on <html>.
    document.documentElement.setAttribute("data-motion", "on");

    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: 0 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}

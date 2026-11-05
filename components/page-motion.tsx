"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Runs the reveal choreography for every [data-reveal] and [data-fade] on the page. */
export function PageMotion() {
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      const words = el.querySelectorAll<HTMLElement>(".r-word");
      const mode = el.dataset.reveal;
      const delay = Number(el.dataset.delay ?? 0);

      if (mode === "scrub") {
        gsap.set(words, { y: 0, yPercent: 0, opacity: 0.14 });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        });
        return;
      }

      gsap.to(words, {
        yPercent: 0,
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.045,
        delay,
        scrollTrigger: mode === "view" ? { trigger: el, start: "top 88%", once: true } : undefined,
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          delay: parseFloat(el.dataset.fade ?? "") || 0,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        },
      );
    });
  });

  return null;
}

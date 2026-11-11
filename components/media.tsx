"use client";

import { useEffect, useRef } from "react";
import type { Visual } from "@/lib/content";

/** A project visual: a looping video when one exists, else an image, else a tone block. */
export function Media({ visual, className = "" }: { visual: Visual; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (visual.video) {
    return (
      <video
        ref={video}
        className={`size-full object-cover ${className}`}
        src={visual.video}
        poster={visual.image}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
    );
  }

  if (visual.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={`size-full object-cover ${className}`} src={visual.image} alt="" loading="lazy" />;
  }

  return <div className={`size-full ${className}`} style={{ background: visual.tone }} />;
}

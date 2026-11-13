"use client";

import { useEffect, useRef } from "react";
import type { Visual } from "@/lib/content";

/** Where the transparent screen sits inside /work/device-phone.png (1666 × 3393). */
const phoneScreen = { left: "5.2%", top: "2.2%", width: "89.7%", height: "95.6%" };

function Fill({ visual }: { visual: Visual }) {
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

  if (visual.video?.length) {
    return (
      <video
        ref={video}
        className="size-full object-cover"
        poster={visual.image}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        {visual.video.map((src) => (
          <source key={src} src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        ))}
      </video>
    );
  }

  if (visual.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="size-full object-cover" src={visual.image} alt="" loading="lazy" />;
  }

  return null;
}

/** A project visual: a looping video when one exists, else an image, else a tone block. */
export function Media({ visual, className = "" }: { visual: Visual; className?: string }) {
  if (visual.device === "phone") {
    return (
      <div className={`flex size-full items-center justify-center ${className}`} style={{ background: visual.tone }}>
        <div className="relative aspect-[1666/3393] h-[86%]">
          <div className="absolute overflow-hidden rounded-[13%/6.4%]" style={phoneScreen}>
            <Fill visual={visual} />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="absolute inset-0 size-full" src="/work/device-phone.png" alt="" loading="lazy" />
        </div>
      </div>
    );
  }

  return (
    <div className={`size-full ${className}`} style={{ background: visual.tone }}>
      <Fill visual={visual} />
    </div>
  );
}

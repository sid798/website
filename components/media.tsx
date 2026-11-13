"use client";

import { useEffect, useRef } from "react";
import type { Screen, Visual } from "@/lib/content";

/** Where the transparent screen sits inside /work/device-phone.png (1666 × 3393). */
const phoneScreen = { left: "5.2%", top: "2.2%", width: "89.7%", height: "95.6%" };

function Fill({ screen }: { screen: Screen }) {
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

  if (screen.video?.length) {
    return (
      <video
        ref={video}
        className="size-full object-cover"
        poster={screen.image}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        {screen.video.map((src) => (
          <source key={src} src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        ))}
      </video>
    );
  }

  if (screen.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="size-full object-cover" src={screen.image} alt="" loading="lazy" />;
  }

  return null;
}

function Phone({ screen }: { screen: Screen }) {
  return (
    <div className="relative aspect-[1666/3393] h-full">
      <div className="absolute overflow-hidden rounded-[13%/6.4%]" style={phoneScreen}>
        <Fill screen={screen} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="absolute inset-0 size-full" src="/work/device-phone.png" alt="" loading="lazy" />
    </div>
  );
}

/** A project visual: a looping video when one exists, else an image, else a tone block. */
export function Media({ visual, className = "" }: { visual: Visual; className?: string }) {
  if (visual.phones?.length) {
    return (
      <div
        className={`flex size-full items-center justify-center gap-[3%] ${className}`}
        style={{ background: visual.tone }}
      >
        {visual.phones.map((screen, i) => (
          <div key={i} className={visual.phones!.length > 1 ? "h-[78%]" : "h-[86%]"}>
            <Phone screen={screen} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`size-full ${className}`} style={{ background: visual.tone }}>
      <Fill screen={visual} />
    </div>
  );
}

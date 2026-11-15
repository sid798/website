"use client";

import { useEffect, useRef } from "react";
import type { Screen, Visual } from "@/lib/content";

/** Where the transparent screen sits inside /work/device-phone.png (1666 × 3393). */
const phoneScreen = { left: "5.2%", top: "2.2%", width: "89.7%", height: "95.6%" };

function Fill({ screen, fit = "object-cover" }: { screen: Screen; fit?: string }) {
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
        className={`size-full ${fit}`}
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
    return <img className={`size-full ${fit}`} src={screen.image} alt="" loading="lazy" />;
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

/** Where the screen sits inside /work/device-laptop.webp (4864 × 2938); the screen there is opaque. */
const laptopScreen = { left: "10.3%", top: "2.2%", width: "79.4%", height: "87.3%" };

function Laptop({ screen }: { screen: Screen }) {
  return (
    <div className="relative aspect-[4864/2938] w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="absolute inset-0 size-full" src="/work/device-laptop.webp" alt="" loading="lazy" />
      <div className="absolute overflow-hidden" style={laptopScreen}>
        <Fill screen={screen} />
      </div>
    </div>
  );
}

/** A project visual: a looping video when one exists, else an image, else a tone block. */
export function Media({ visual, className: extra = "" }: { visual: Visual; className?: string }) {
  const className = visual.border ? `rounded-[inherit] border border-line ${extra}` : extra;

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

  if (visual.corner) {
    return (
      <div className={`relative size-full overflow-hidden ${className}`} style={{ background: visual.tone }}>
        <div className="absolute left-[8.6%] top-[11.6%] aspect-[1600/996] w-[110%] overflow-hidden rounded-tl-[6px]">
          <Fill screen={visual.corner} fit="object-cover object-left-top" />
        </div>
      </div>
    );
  }

  if (visual.laptop) {
    return (
      <div className={`flex size-full items-center justify-center ${className}`} style={{ background: visual.tone }}>
        <div className="w-[87%]">
          <Laptop screen={visual.laptop} />
        </div>
      </div>
    );
  }

  if (visual.fit === "inset") {
    return (
      <div className={`flex size-full items-center justify-center p-[6%] ${className}`} style={{ background: visual.tone }}>
        <Fill screen={visual} fit="object-contain" />
      </div>
    );
  }

  return (
    <div className={`size-full ${className}`} style={{ background: visual.tone }}>
      <Fill screen={visual} fit={visual.fit === "contain" ? "object-contain" : "object-cover"} />
    </div>
  );
}

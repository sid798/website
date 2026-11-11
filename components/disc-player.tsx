"use client";

import { useRef, useState } from "react";
import type { Track } from "@/lib/content";

/** An iridescent disc that spins while the track plays. */
export function DiscPlayer({ track, label = "Most played this month" }: { track: Track; label?: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const el = audio.current;
    if (playing) {
      el?.pause();
      setPlaying(false);
    } else {
      el?.play().catch(() => {});
      setPlaying(true);
    }
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
        className="group relative aspect-square w-full rounded-full transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.98]"
      >
        <span
          className="absolute inset-0 rounded-full shadow-[0_20px_40px_-20px_rgb(40_44_60/0.45)] motion-safe:animate-[spin_5s_linear_infinite]"
          style={{
            animationPlayState: playing ? "running" : "paused",
            background:
              "conic-gradient(from 20deg, #d9dbe3, #f3d9c9, #c9e3dc, #d4cdea, #f0e3b8, #c8d7ea, #ead0dc, #d9dbe3)",
          }}
        >
          <span
            className="absolute inset-0 rounded-full opacity-60 mix-blend-overlay"
            style={{
              background:
                "repeating-radial-gradient(circle at center, rgb(255 255 255 / 0.5) 0 1px, transparent 1px 3px)",
            }}
          />
          <span
            className="absolute inset-[30%] overflow-hidden rounded-full bg-[#e7e3dc] bg-cover bg-center ring-1 ring-black/5"
            style={track.cover ? { backgroundImage: `url(${track.cover})` } : undefined}
          />
          <span className="absolute inset-[44%] rounded-full bg-[#f4f1ec] ring-1 ring-black/10" />
          <span className="absolute inset-[48.5%] rounded-full bg-[#cfcac2]" />
        </span>
      </button>

      <div className="mt-6 w-full text-center">
        <p className="text-[11px] uppercase tracking-[0.14em] opacity-60">{label}</p>
        <p className="mt-2 uppercase tracking-[0.06em]">{track.title}</p>
        <p className="opacity-60">{track.artist}</p>
        <div className="mt-4 flex items-center justify-center gap-5 text-[11px] uppercase tracking-[0.14em]">
          <button type="button" onClick={toggle} className="transition-opacity hover:opacity-60">
            {playing ? "Pause" : "Play"}
          </button>
          {track.url ? (
            <a href={track.url} target="_blank" rel="noreferrer" className="opacity-60 transition-opacity hover:opacity-100">
              Spotify ↗
            </a>
          ) : null}
        </div>
      </div>

      {track.preview ? <audio ref={audio} src={track.preview} preload="none" onEnded={() => setPlaying(false)} /> : null}
    </div>
  );
}

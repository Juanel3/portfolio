"use client";

import { useEffect, useState } from "react";

export function NotesWindow() {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setEnter(true);
      return;
    }

    const frame = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`hero-window w-full ${
        enter ? "hero-window--enter" : "hero-window--pending"
      }`}
    >
      <div className="hero-glass relative overflow-hidden rounded-[28px] border border-white/90 font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] shadow-[0_24px_64px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(255,255,255,0.4)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/75 via-white/55 to-white/65" />

        <div className="relative flex items-center gap-3 border-b border-white/60 bg-white/45 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <span className="text-sm font-medium tracking-tight text-zinc-500">
              Notas
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div className="relative flex items-center gap-1.5 border-b border-white/50 bg-white/35 px-5 py-2.5 backdrop-blur-md">
          <div className="h-7 w-7 rounded-lg bg-white/50" />
          <div className="h-7 w-7 rounded-lg bg-white/35" />
          <div className="ml-auto h-7 w-24 rounded-lg bg-white/30" />
        </div>

        <div className="relative px-10 pb-14 pt-10 text-center sm:px-16 sm:pb-16 sm:pt-12">
          <div className="pointer-events-none absolute inset-0 bg-[#fffef8]/50 backdrop-blur-sm" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.2)_40%,transparent_100%)]" />

          <div className="relative space-y-6">
            <h1 className="text-xl font-normal tracking-tight text-zinc-500 sm:text-2xl">
              ¡Hola, soy Juan Flores!
            </h1>
            <p className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
              Diseñador UX/UI
            </p>
            <p className="text-lg leading-relaxed text-zinc-500 sm:text-xl">
              Bienvenido a mi portafolio
              <span className="hero-cursor ml-1 inline-block h-[1.05em] w-0.5 translate-y-px align-middle bg-zinc-400/70" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

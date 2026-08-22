"use client";

import { useEffect, useRef, useState } from "react";

type ScrollFillTitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function ScrollFillTitle({
  children,
  className = "",
  as: Tag = "h2",
}: ScrollFillTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 1.65;
      const end = vh * -0.35;
      const next = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, next)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`scroll-fill-title ${className}`.trim()}
      style={{ "--fill": `${progress * 100}%` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

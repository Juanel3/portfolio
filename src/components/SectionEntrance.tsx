"use client";

import { useEffect, useRef, useState } from "react";

type SectionEntranceProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionEntrance({
  children,
  className = "",
  delay = 0,
}: SectionEntranceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section-enter ${visible ? "section-enter-visible" : ""} ${className}`.trim()}
      style={{ "--section-enter-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

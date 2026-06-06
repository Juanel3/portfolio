"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type SitePreviewLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClose: () => void;
};

export function SitePreviewLightbox({
  src,
  alt,
  width,
  height,
  onClose,
}: SitePreviewLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragOrigin = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, onClose]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !scrollRef.current) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    dragOrigin.current = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: scrollRef.current.scrollLeft,
      scrollTop: scrollRef.current.scrollTop,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !scrollRef.current) return;

    scrollRef.current.scrollLeft =
      dragOrigin.current.scrollLeft - (event.clientX - dragOrigin.current.x);
    scrollRef.current.scrollTop =
      dragOrigin.current.scrollTop - (event.clientY - dragOrigin.current.y);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="site-preview-lightbox fixed inset-0 z-[200]"
      role="dialog"
      aria-modal="true"
      aria-label="Vista del sitio web"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 bg-black/85"
        onClick={onClose}
        aria-label="Cerrar"
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-black/70 sm:right-8 sm:top-8"
        aria-label="Cerrar"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="pointer-events-none absolute bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/45 px-4 py-1.5 text-xs text-white/80">
        Desliza para explorar
      </p>

      <div
        ref={scrollRef}
        className={`absolute inset-0 z-10 overflow-auto overscroll-contain ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="flex justify-center px-4 py-16">
          <div className="w-[min(88vw,1200px)] shrink-0">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto w-full select-none rounded-xl shadow-2xl"
              draggable={false}
              priority
              sizes="(max-width: 1200px) 88vw, 1200px"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

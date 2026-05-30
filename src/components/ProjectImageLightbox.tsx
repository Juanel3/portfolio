"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectGalleryImage } from "@/lib/projects";

type ProjectImageLightboxProps = {
  images: ProjectGalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

function LightboxButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={direction === "prev" ? "Imagen anterior" : "Imagen siguiente"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-black/70 sm:h-11 sm:w-11"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {direction === "prev" ? (
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export function ProjectImageLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: ProjectImageLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const image = images[activeIndex];
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasMultiple) goPrev();
      if (event.key === "ArrowRight" && hasMultiple) goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, onClose, goPrev, goNext, hasMultiple]);

  if (!image || !mounted) return null;

  const width = image.width ?? 1920;
  const height = image.height ?? 1080;

  return createPortal(
    <div
      className="project-lightbox fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de imagen"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 bg-black/80"
        onClick={onClose}
        aria-label="Cerrar"
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-black/70 sm:right-8 sm:top-8"
        aria-label="Cerrar"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="relative z-10 flex w-full max-w-6xl items-center justify-center gap-2 sm:gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        {hasMultiple ? (
          <LightboxButton direction="prev" onClick={goPrev} />
        ) : (
          <div className="hidden w-10 shrink-0 sm:block sm:w-11" aria-hidden />
        )}

        <div className="flex min-w-0 flex-1 flex-col items-center">
          <div
            className="relative w-full bg-white"
            style={{
              aspectRatio: `${width} / ${height}`,
              maxHeight: "85vh",
              maxWidth: `min(100%, calc(85vh * ${width} / ${height}))`,
            }}
          >
            <Image
              key={`${activeIndex}-${image.src}`}
              src={image.src}
              alt={image.alt ?? `Imagen ${activeIndex + 1}`}
              fill
              className="rounded-xl object-contain object-center shadow-2xl"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          {hasMultiple && (
            <p className="mt-4 text-sm text-white/70">
              {activeIndex + 1} / {images.length}
            </p>
          )}
        </div>

        {hasMultiple ? (
          <LightboxButton direction="next" onClick={goNext} />
        ) : (
          <div className="hidden w-10 shrink-0 sm:block sm:w-11" aria-hidden />
        )}
      </div>
    </div>,
    document.body,
  );
}

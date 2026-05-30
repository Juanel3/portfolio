"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectGalleryImage } from "@/lib/projects";

type ProjectImageCarouselProps = {
  images: ProjectGalleryImage[];
  projectTitle: string;
  onImageClick: (index: number) => void;
};

function GalleryThumb({
  image,
  projectTitle,
  index,
  onClick,
}: {
  image: ProjectGalleryImage;
  projectTitle: string;
  index: number;
  onClick: () => void;
}) {
  const movedRef = useRef(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      onPointerDown={() => {
        movedRef.current = false;
      }}
      onPointerMove={() => {
        movedRef.current = true;
      }}
      onClick={() => {
        if (!movedRef.current) onClick();
      }}
      className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-lg border border-zinc-200/80 bg-white text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:border-[#007aff]/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
      aria-label={`Ver ${image.alt ?? `${projectTitle} — imagen ${index + 1}`} en grande`}
    >
      <Image
        src={image.src}
        alt={image.alt ?? `${projectTitle} — imagen ${index + 1}`}
        fill
        draggable={false}
        className="pointer-events-none object-contain object-center transition group-hover:scale-[1.02]"
        sizes="(max-width: 1024px) 45vw, 250px"
      />
    </div>
  );
}

function CarouselButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      disabled={disabled}
      aria-label={direction === "prev" ? "Foto anterior" : "Foto siguiente"}
      className="project-carousel-btn flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200/90 bg-white/95 text-zinc-600 shadow-md transition hover:border-[#007aff]/30 hover:text-[#007aff] disabled:cursor-not-allowed disabled:opacity-35"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {direction === "prev" ? (
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export function ProjectImageCarousel({
  images,
  projectTitle,
  onImageClick,
}: ProjectImageCarouselProps) {
  const galleryImages = images.slice(0, 2);
  const isScrollable = images.length > 2;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !isScrollable) return;
    emblaApi.reInit();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, isScrollable, images.length, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (images.length === 0) return null;

  if (!isScrollable) {
    return (
      <div className="project-gallery mt-4 w-full">
        <div className="grid grid-cols-2 gap-2">
          {galleryImages.map((image, index) => (
            <GalleryThumb
              key={`${image.src}-${index}`}
              image={image}
              projectTitle={projectTitle}
              index={index}
              onClick={() => onImageClick(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="project-gallery mt-4 w-full">
      <div className="relative">
        <div ref={emblaRef} className="cursor-grab overflow-hidden active:cursor-grabbing">
          <div className="-ml-2 flex touch-pan-y">
            {images.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="min-w-0 shrink-0 grow-0 basis-1/2 pl-2"
              >
                <GalleryThumb
                  image={image}
                  projectTitle={projectTitle}
                  index={index}
                  onClick={() => onImageClick(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-1">
          <div className="pointer-events-auto">
            <CarouselButton direction="prev" onClick={scrollPrev} disabled={!canScrollPrev} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center pr-1">
          <div className="pointer-events-auto">
            <CarouselButton direction="next" onClick={scrollNext} disabled={!canScrollNext} />
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            className={`h-1 rounded-full transition-all ${
              selectedIndex === index
                ? "w-4 bg-[#007aff]"
                : "w-1 bg-zinc-300 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

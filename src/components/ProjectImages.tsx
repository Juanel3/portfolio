"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ProjectImageCarousel } from "@/components/ProjectImageCarousel";
import { ProjectImageLightbox } from "@/components/ProjectImageLightbox";
import type { ProjectGalleryImage } from "@/lib/projects";

type ProjectImagesProps = {
  projectTitle: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  gallery?: ProjectGalleryImage[];
};

export function ProjectImages({
  projectTitle,
  image,
  imageWidth,
  imageHeight,
  gallery = [],
}: ProjectImagesProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allImages = useMemo<ProjectGalleryImage[]>(() => {
    const main: ProjectGalleryImage = {
      src: image,
      alt: projectTitle,
      width: imageWidth,
      height: imageHeight,
    };
    return [main, ...gallery];
  }, [image, projectTitle, imageWidth, imageHeight, gallery]);

  const openLightbox = (index: number) => setLightboxIndex(index);

  return (
    <>
      <div className="mx-auto w-full max-w-lg">
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="group block w-full cursor-zoom-in text-left"
          aria-label={`Ver ${projectTitle} en grande`}
        >
          <Image
            src={image}
            alt={projectTitle}
            width={imageWidth ?? 1920}
            height={imageHeight ?? 1080}
            className="h-auto w-full rounded-2xl border border-zinc-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
            sizes="(max-width: 1024px) 100vw, 520px"
            priority
          />
        </button>

        {gallery.length > 0 && (
          <ProjectImageCarousel
            images={gallery}
            projectTitle={projectTitle}
            onImageClick={(index) => openLightbox(index + 1)}
          />
        )}
      </div>

      {lightboxIndex !== null && (
        <ProjectImageLightbox
          images={allImages}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

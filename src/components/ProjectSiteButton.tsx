"use client";

import { useState } from "react";
import { SitePreviewLightbox } from "@/components/SitePreviewLightbox";

type ProjectSiteButtonProps = {
  projectTitle: string;
  siteUrl?: string;
  sitePreview?: string;
  sitePreviewWidth?: number;
  sitePreviewHeight?: number;
};

export function ProjectSiteButton({
  projectTitle,
  siteUrl,
  sitePreview,
  sitePreviewWidth,
  sitePreviewHeight,
}: ProjectSiteButtonProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (sitePreview) {
    return (
      <>
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="project-site-btn mt-5 inline-flex items-center justify-center gap-1.5"
        >
          Ver sitio
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {previewOpen && (
          <SitePreviewLightbox
            src={sitePreview}
            alt={`${projectTitle} — sitio web`}
            width={sitePreviewWidth ?? 1920}
            height={sitePreviewHeight ?? 1080}
            onClose={() => setPreviewOpen(false)}
          />
        )}
      </>
    );
  }

  if (!siteUrl) return null;

  return (
    <a
      href={siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="project-site-btn mt-5 inline-flex items-center justify-center gap-1.5 no-underline"
    >
      Ver sitio
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

import Link from "next/link";
import { ProjectImages } from "@/components/ProjectImages";
import type { Project } from "@/lib/projects";

function MacWindowTitleBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-200/70 bg-white/70 px-5 py-3.5">
      <div className="flex items-center gap-2">
        <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
      </div>
      <p className="flex-1 truncate text-center text-sm font-medium tracking-tight text-zinc-500">
        {title}
      </p>
      <div className="w-[52px]" aria-hidden />
    </div>
  );
}

export function ProjectView({ project }: { project: Project }) {
  return (
    <section className="project-page relative overflow-hidden bg-white px-6 pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-blob absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-blue-400/40 blur-[100px]" />
        <div className="hero-blob hero-blob-2 absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-sky-300/45 blur-[90px]" />
        <div className="hero-blob hero-blob-3 absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-indigo-300/35 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/#proyectos"
          className="project-back-link mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-[#007aff]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Proyectos
        </Link>

        <div className="project-window overflow-hidden rounded-[28px] border border-white/90 bg-white/80 font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] shadow-[0_24px_64px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl">
          <MacWindowTitleBar title={project.title} />

          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="border-b border-zinc-200/70 bg-[#f5f5f7]/80 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              {project.image ? (
                <ProjectImages
                  projectTitle={project.title}
                  image={project.image}
                  imageWidth={project.imageWidth}
                  imageHeight={project.imageHeight}
                  gallery={project.gallery}
                />
              ) : (
                <div className="project-preview-mock mx-auto flex aspect-[4/3] w-full max-w-lg items-center justify-center rounded-2xl border border-zinc-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <div className="w-[78%] space-y-3 p-6">
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-300/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-300/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-300/80" />
                    </div>
                    <div className="h-3 w-2/3 rounded-full bg-zinc-200" />
                    <div className="h-3 w-full rounded-full bg-zinc-100" />
                    <div className="h-3 w-5/6 rounded-full bg-zinc-100" />
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="h-14 rounded-lg bg-zinc-100" />
                      <div className="h-14 rounded-lg bg-zinc-100" />
                      <div className="h-14 rounded-lg bg-zinc-100" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col bg-white p-6 sm:p-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  {project.title}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-zinc-600">
                  {project.shortDescription}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="project-tag rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.siteUrl && (
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-site-btn mt-5 inline-flex items-center justify-center gap-1.5 no-underline"
                  >
                    Ver sitio
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>

              <div className="mt-8 border-t border-zinc-200/70 pt-8">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#007aff]">
                  Resumen
                </h2>
                <p className="mt-3 text-base leading-relaxed text-zinc-700">
                  {project.overview}
                </p>
              </div>

              <div className="mt-8 border-t border-zinc-200/70 pt-8">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#007aff]">
                  Proceso
                </h2>
                <ol className="mt-4 space-y-3">
                  {project.process.map((step, index) => (
                    <li
                      key={step}
                      className="project-process-step flex items-start gap-3 text-sm leading-relaxed text-zinc-700 sm:text-base"
                    >
                      <span className="project-process-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ScrollFillTitle } from "@/components/ScrollFillTitle";
import { SectionEntrance } from "@/components/SectionEntrance";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section
      id="proyectos"
      className="projects-section relative overflow-hidden bg-white px-6 pt-24 pb-32 sm:pb-36"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-blob absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-blue-400/40 blur-[100px]" />
        <div className="hero-blob hero-blob-2 absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-sky-300/45 blur-[90px]" />
        <div className="hero-blob hero-blob-3 absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-indigo-300/35 blur-[100px]" />
        <div className="hero-blob hero-blob-4 absolute right-1/4 top-16 h-56 w-56 rounded-full bg-blue-200/40 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center sm:mb-14">
          <SectionEntrance>
            <ScrollFillTitle
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              mobileStart={2.15}
              mobileEnd={-0.1}
            >
              Del problema a la solución
            </ScrollFillTitle>
          </SectionEntrance>
          <SectionEntrance delay={120}>
            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 sm:text-lg">
              Una muestra de mi trabajo en diseño UX/UI. Selecciona un proyecto
              para ver más detalles.
            </p>
          </SectionEntrance>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, index) => (
            <SectionEntrance
              key={project.id}
              delay={260 + index * 100}
              className="h-full"
            >
              <Link
                href={`/proyectos/${project.slug}`}
                className="project-card group flex h-full no-underline"
              >
              <div className="project-card-window flex h-full w-full flex-col overflow-hidden rounded-[22px] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1">
                <div className="p-3 sm:p-3.5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                        Sin imagen
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-5 py-4 sm:px-5 sm:py-5">
                  <h3 className="text-base font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-sky-600 sm:text-lg">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {project.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
            </SectionEntrance>
          ))}
        </div>
      </div>
    </section>
  );
}

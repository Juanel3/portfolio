import Link from "next/link";
import { projects, type FolderColor } from "@/lib/projects";

const titleHoverClass = "group-hover:text-sky-700";

function FolderIcon({ color }: { color: FolderColor }) {
  return (
    <div className={`folder-icon folder-icon--${color}`} aria-hidden>
      <div className="folder-shadow" />
      <div className="folder-back" />
      <div className="folder-contents">
        <div className="folder-paper" />
      </div>
      <div className="folder-lid">
        <div className="folder-tab" />
        <div className="folder-cover">
          <div className="folder-shine" />
        </div>
      </div>
    </div>
  );
}

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
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Proyectos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 sm:text-lg">
            Una muestra de mi trabajo en diseño UX/UI. Selecciona una carpeta para
            ver cada proyecto.
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-8 sm:gap-x-16 lg:gap-y-14 xl:gap-y-16">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={`/proyectos/${project.slug}`}
              className={`project-folder project-folder--${project.color} group flex w-[220px] flex-col items-center text-center sm:w-[260px]`}
            >
              <div className="project-folder-visual h-36 w-44 sm:h-44 sm:w-52">
                <FolderIcon color={project.color} />
              </div>

              <p
                className={`mt-5 max-w-[220px] text-base font-semibold leading-snug text-zinc-900 transition-colors sm:text-lg ${titleHoverClass}`}
              >
                {project.title}
              </p>

              <div className="project-folder-panel glass-inner mt-4 hidden w-full translate-y-2 rounded-2xl p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:block sm:p-5">
                <p className="text-sm leading-relaxed text-zinc-700">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass-inner rounded-full px-2.5 py-1 text-xs font-medium text-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

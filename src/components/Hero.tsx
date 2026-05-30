import { Dock } from "@/components/Dock";
import { NotesWindow } from "@/components/NotesWindow";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] flex-col items-center justify-center gap-6 overflow-hidden bg-white px-6 pb-12 pt-24 sm:gap-8 sm:pb-16 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-blob hero-blob-1 absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-blue-400/45 blur-[100px]" />
        <div className="hero-blob hero-blob-2 absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-sky-300/50 blur-[90px]" />
        <div className="hero-blob hero-blob-3 absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-indigo-300/40 blur-[100px]" />
        <div className="hero-blob hero-blob-4 absolute right-1/4 top-16 h-56 w-56 rounded-full bg-blue-200/45 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <NotesWindow />
      </div>

      <div className="relative z-10 -mt-2 sm:-mt-4">
        <Dock />
      </div>
    </section>
  );
}

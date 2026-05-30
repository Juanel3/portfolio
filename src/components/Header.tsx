"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-4 sm:top-6">
      <div ref={menuRef} className="pointer-events-auto relative w-[calc(100vw-2rem)] md:w-auto">
        <nav className="nav-glass hidden items-center gap-0.5 overflow-hidden rounded-full px-2 py-2 md:flex md:gap-1 md:px-2.5 md:py-2.5">
          <span className="nav-glass-surface" aria-hidden />
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-white/50 hover:text-zinc-900 md:px-4 md:py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="nav-glass relative flex h-11 w-full items-center justify-end overflow-hidden rounded-full px-4 text-zinc-700 transition-colors hover:text-zinc-900"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className="nav-glass-surface" aria-hidden />
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <>
                  <path d="M4 7h16" strokeLinecap="round" />
                  <path d="M4 12h16" strokeLinecap="round" />
                  <path d="M4 17h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>

          {menuOpen && (
            <>
              <button
                type="button"
                className="nav-mobile-backdrop fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              />
              <nav
                id="mobile-nav"
                className="nav-glass nav-mobile-menu absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 w-full overflow-hidden rounded-2xl p-2"
              >
                <span className="nav-glass-surface" aria-hidden />
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-center text-sm text-zinc-600 transition-colors hover:bg-white/50 hover:text-zinc-900"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

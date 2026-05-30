"use client";

import Image from "next/image";

const dockItems = [
  {
    label: "Finder",
    href: "#inicio",
    icon: "/dock/finder.png",
    active: false,
  },
  {
    label: "Safari",
    href: "#proyectos",
    icon: "/dock/safari.png",
    active: false,
  },
  {
    label: "Mail",
    href: "#contacto",
    icon: "/dock/mail.png",
    active: false,
  },
  {
    label: "Notas",
    href: "#inicio",
    icon: "/dock/notes.png",
    active: true,
  },
  {
    label: "Fotos",
    href: "#proyectos",
    icon: "/dock/photos.png",
    active: false,
  },
  {
    label: "Ajustes",
    href: "#sobre-mi",
    icon: "/dock/settings.png",
    active: false,
  },
];

export function Dock() {
  const handleNotesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="dock-enter flex justify-center pb-2 sm:pb-3">
      <div className="hero-dock flex items-end gap-1.5 rounded-2xl px-2.5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:gap-2 sm:px-3 sm:py-2.5">
        {dockItems.map((item) => {
          const isNotes = item.label === "Notas";

          return (
            <a
              key={item.label}
              id={isNotes ? "dock-notes-icon" : undefined}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              onClick={isNotes ? handleNotesClick : undefined}
              className="dock-item group relative flex flex-col items-center"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={52}
                height={52}
                className="h-11 w-11 rounded-[14px] object-contain transition-transform duration-200 ease-out group-hover:-translate-y-2 group-hover:scale-110 sm:h-12 sm:w-12"
                draggable={false}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

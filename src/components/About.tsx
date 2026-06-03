import Image from "next/image";

const software = [
  { name: "Figma", iconUrl: "/software/figma.svg" },
  { name: "Adobe XD", iconUrl: "/software/adobe-xd.svg" },
  { name: "Adobe Illustrator", iconUrl: "/software/adobe-illustrator.svg" },
];

const education = [
  {
    title: "Ing. en desarrollo de software",
    place: "Universidad Tecmilenio",
    date: "2021-2025",
  },
];

const skills = [
  "Diseño UX/UI",
  "Edición de video",
  "UX Research",
  "Marketing digital",
  "Wireframing",
  "Fotografía",
];

const certificates = [
  "Desarrollo de apps móviles",
  "Diseño multimedia",
  "Programación de videojuegos",
  "Curso de marketing digital",
  "Curso de community manager",
  "Curso de diseño UX/UI",
];

function InfoBlock({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-inner rounded-2xl p-4 sm:p-5 ${className}`}>
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-100/80 text-sky-600 [&_svg]:h-3.5 [&_svg]:w-3.5">
          {icon}
        </span>
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function FloatingInfoBlock({
  cardClass,
  title,
  icon,
  children,
}: {
  cardClass: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`about-floating-card ${cardClass}`}>
      <InfoBlock title={title} icon={icon}>
        {children}
      </InfoBlock>
    </div>
  );
}

function AboutInfoCards() {
  return (
    <div className="about-floating-cards">
      <FloatingInfoBlock
        title="Software"
        cardClass="about-floating-card--1"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="3" y="5" width="18" height="12" rx="2" />
            <path d="M2 19h20" strokeLinecap="round" />
          </svg>
        }
      >
        <ul className="space-y-2">
          {software.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-2.5 text-sm text-zinc-700"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/90 shadow-sm ring-1 ring-zinc-200/60">
                <img
                  src={item.iconUrl}
                  alt=""
                  className="h-4 w-4 object-contain"
                  loading="lazy"
                />
              </span>
              {item.name}
            </li>
          ))}
        </ul>
      </FloatingInfoBlock>

      <FloatingInfoBlock
        title="Educación"
        cardClass="about-floating-card--2"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 3L2 8l10 5 10-5-10-5z" strokeLinejoin="round" />
            <path d="M6 11v4c0 2 2.5 3 6 3s6-1 6-3v-4" strokeLinecap="round" />
          </svg>
        }
      >
        <ul className="space-y-3">
          {education.map((item) => (
            <li key={item.title}>
              <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
              <p className="mt-0.5 text-sm text-zinc-500">{item.place}</p>
              <p className="mt-0.5 text-sm text-zinc-500">{item.date}</p>
            </li>
          ))}
        </ul>
      </FloatingInfoBlock>

      <FloatingInfoBlock
        title="Habilidades"
        cardClass="about-floating-card--3"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" strokeLinejoin="round" />
          </svg>
        }
      >
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="glass-inner rounded-full px-2.5 py-1 text-xs font-medium text-zinc-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </FloatingInfoBlock>

      <FloatingInfoBlock
        title="Certificados"
        cardClass="about-floating-card--4"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="9" r="5" />
            <path d="M8.5 14.5L7 22l5-2.5L17 22l-1.5-7.5" strokeLinejoin="round" />
          </svg>
        }
      >
        <div className="flex flex-wrap gap-1.5">
          {certificates.map((cert) => (
            <span
              key={cert}
              className="glass-inner rounded-full px-2.5 py-1 text-xs font-medium text-zinc-700"
            >
              {cert}
            </span>
          ))}
        </div>
      </FloatingInfoBlock>
    </div>
  );
}

export function About() {
  return (
    <section
      id="sobre-mi"
      className="about-section relative overflow-hidden bg-white px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-blob absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-blue-400/40 blur-[100px]" />
        <div className="hero-blob hero-blob-2 absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-sky-300/45 blur-[90px]" />
        <div className="hero-blob hero-blob-3 absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-indigo-300/35 blur-[100px]" />
        <div className="hero-blob hero-blob-4 absolute right-1/4 top-16 h-56 w-56 rounded-full bg-blue-200/40 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-center text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Sobre mí
          </h2>
          <div className="mx-auto mt-8 flex max-w-4xl flex-row items-center gap-5 sm:gap-10">
            <div className="about-floating-photo relative h-24 w-24 shrink-0 sm:h-36 sm:w-36">
              <Image
                src="/persona.png"
                alt="Juan Flores"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 96px, 144px"
                priority
              />
            </div>
            <p className="min-w-0 flex-1 text-left text-base leading-[1.8] text-zinc-900 sm:text-lg">
              Diseñador UX/UI con formación en ingeniería en desarrollo de
              software. Especializado en crear experiencias digitales modernas,
              intuitivas y visualmente atractivas. También cuento con experiencia
              en marketing digital y creación de contenido, desarrollando
              proyectos alineados con la identidad y objetivos de las marcas.
            </p>
          </div>
        </div>

        <AboutInfoCards />
      </div>
    </section>
  );
}

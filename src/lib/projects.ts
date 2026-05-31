export type FolderColor = "sky" | "indigo" | "cyan";

export type ProjectGalleryImage = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  color: FolderColor;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  gallery?: ProjectGalleryImage[];
  siteUrl?: string;
  overview: string;
  solution: string;
  process: string[];
};

export const projects: Project[] = [
  {
    id: "clarity",
    slug: "clarity",
    title: "Clarity",
    shortDescription:
      "App móvil para organizar mejor tu dinero y tomar el control de tus finanzas personales.",
    description:
      "App móvil para organizar mejor tu dinero y tomar el control de tus finanzas personales.",
    tags: ["Diseño UX/UI", "UX Research", "Prototipado"],
    color: "sky",
    image: "/clarity_imagen.webp",
    imageWidth: 1920,
    imageHeight: 1440,
    gallery: [
      {
        src: "/proyectoclarity.webp",
        alt: "Clarity — pantalla 1",
        width: 1920,
        height: 1440,
      },
      {
        src: "/proyectoclarity2.webp",
        alt: "Clarity — pantalla 2",
        width: 1920,
        height: 1440,
      },
      {
        src: "/proyectoclarity4.webp",
        alt: "Clarity — pantalla 4",
        width: 1920,
        height: 1440,
      },
      {
        src: "/proyectoclarity6.webp",
        alt: "Clarity — pantalla 6",
        width: 1920,
        height: 1440,
      },
    ],
    overview:
      "Clarity es una app móvil de finanzas personales pensada para ayudar a organizar el dinero, entender en qué se gasta y tomar el control de las finanzas del día a día. El reto fue diseñar una experiencia clara y accesible que convirtiera la gestión del dinero en un hábito simple, sin abrumar al usuario con información innecesaria.",
    solution:
      "Diseñé una interfaz mobile-first con navegación simple, visualización clara de gastos e ingresos y categorías fáciles de entender. Organicé la información por prioridad, añadí feedback visual inmediato y prototipé los flujos principales en Figma para validar que la app fuera intuitiva desde el primer uso.",
    process: [
      "Research y mapa de journey",
      "Wireframes de baja fidelidad",
      "UI kit y prototipo interactivo",
      "Pruebas de usabilidad",
      "Handoff y QA visual",
    ],
  },
  {
    id: "imprenta-alatorre",
    slug: "imprenta-alatorre",
    title: "Imprenta Alatorre",
    shortDescription:
      "Rediseño web para mostrar los servicios que ofrece la empresa.",
    description:
      "Rediseño web para mostrar los servicios que ofrece la empresa.",
    tags: ["Diseño UX/UI", "UX Research", "Prototipado"],
    color: "sky",
    image: "/proyecto_imprenta.webp",
    imageWidth: 1920,
    imageHeight: 1440,
    siteUrl: "https://imprentaalatorre.com",
    overview:
      "Rediseño del sitio web de Imprenta Alatorre para presentar con claridad sus servicios de impresión. El enfoque estuvo en organizar la información de forma intuitiva, mejorar la navegación y crear una experiencia visual que reflejara la calidad y profesionalismo de la empresa.",
    solution:
      "Reorganicé el funnel en etapas visibles, añadí resumen persistente del carrito y microcopy orientado a confianza. Diseñé estados de stock, promociones y confirmación con feedback visual consistente.",
    process: [
      "Auditoría heurística del sitio anterior",
      "Benchmark de competidores",
      "Prototipo mobile-first",
      "Test A/B de checkout",
      "Entrega a desarrollo",
    ],
  },
  {
    id: "jm-estudio",
    slug: "jm-estudio",
    title: "JM Estudio",
    shortDescription:
      "Página web moderna y funcional que muestre los servicios de una agencia.",
    description:
      "Página web moderna y funcional que muestre los servicios de una agencia.",
    tags: ["Diseño UX/UI", "UX Research", "Prototipado"],
    color: "sky",
    image: "/proyecto-jmestudio.webp",
    imageWidth: 1920,
    imageHeight: 1440,
    siteUrl: "https://jmestudio-web.vercel.app",
    overview:
      "JM Estudio es una agencia que necesitaba una página web para dar a conocer sus servicios. El proyecto consistió en diseñar un sitio moderno, funcional y fácil de navegar, con una presentación clara de la propuesta de la agencia.",
    solution:
      "Estructuré la información por niveles: KPIs principales, tendencias y detalle bajo demanda. Definí una paleta funcional para gráficos, filtros globales y patrones de exportación visibles.",
    process: [
      "Entrevistas con stakeholders",
      "Card sorting de métricas",
      "Wireframes del layout principal",
      "UI de gráficos y filtros",
      "Documentación de estados y edge cases",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

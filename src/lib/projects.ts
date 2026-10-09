export type FolderColor = "sky" | "indigo" | "cyan";

export type ProjectGalleryImage = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type CaseStudySection = {
  number?: string;
  title: string;
  paragraphs: string[];
  itemsIntro?: string;
  items?: string[];
  afterItems?: string[];
  quote?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  description: string;
  tags: string[];
  color: FolderColor;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  gallery?: ProjectGalleryImage[];
  siteUrl?: string;
  sitePreview?: string;
  sitePreviewWidth?: number;
  sitePreviewHeight?: number;
  overview: string;
  solution: string;
  process: string[];
  caseStudy?: {
    intro: string;
    sections: CaseStudySection[];
  };
};

export const projects: Project[] = [
  {
    id: "clarity",
    slug: "clarity",
    title: "Clarity",
    subtitle: "App de finanzas personales",
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
      "Investigación",
      "Definición del problema",
      "Arquitectura y flujo",
      "Wireframes",
      "Diseño UI",
      "Prototipado y evaluación",
    ],
    caseStudy: {
      intro:
        "Clarity es una app móvil de finanzas personales pensada para ayudar a organizar el dinero, entender en qué se gasta y tomar el control de las finanzas del día a día. El reto fue diseñar una experiencia clara y accesible que convirtiera la gestión del dinero en un hábito simple, sin abrumar al usuario con información innecesaria.",
      sections: [
        {
          number: "1",
          title: "Investigación",
          paragraphs: [
            "El proceso comenzó buscando comprender cómo las personas administran actualmente su dinero, qué dificultades encuentran al registrar sus gastos y qué información consideran más importante para conocer su situación financiera.",
            "A partir de entrevistas y encuestas se identificaron necesidades relacionadas con el control de gastos, seguimiento de ingresos, organización financiera y visualización del progreso.",
          ],
        },
        {
          number: "2",
          title: "Definición del problema",
          paragraphs: [
            "Con la información recopilada se definió el problema principal:",
          ],
          quote:
            "Las personas necesitan una forma sencilla y clara de conocer cómo están utilizando su dinero, sin tener que revisar información financiera complicada.",
          afterItems: [
            "Por ello, Clarity se planteó como una experiencia enfocada en simplicidad, claridad y acceso rápido a la información más relevante.",
          ],
        },
        {
          number: "3",
          title: "Arquitectura y flujo",
          paragraphs: [
            "Se definió la estructura de la aplicación y los principales flujos que permitirían al usuario realizar sus tareas de manera rápida.",
          ],
          itemsIntro: "Entre las funciones principales se contemplaron:",
          items: [
            "Registro de ingresos.",
            "Registro y categorización de gastos.",
            "Consulta del balance financiero.",
            "Seguimiento de ahorros.",
            "Recordatorios.",
            "Visualización de gastos mediante gráficas.",
            "Resumen de la situación financiera.",
          ],
          afterItems: [
            "El objetivo fue reducir pasos innecesarios y facilitar que las acciones más frecuentes fueran accesibles desde la pantalla principal.",
          ],
        },
        {
          number: "4",
          title: "Wireframes",
          paragraphs: [
            "Se crearon wireframes para explorar diferentes alternativas de distribución y jerarquía de contenido antes de trabajar en la interfaz visual.",
            "Esta etapa permitió validar la estructura de las pantallas y detectar oportunidades de mejora en los flujos de navegación.",
          ],
        },
        {
          number: "5",
          title: "Diseño UI",
          paragraphs: [
            "Posteriormente se desarrolló la interfaz visual buscando transmitir una sensación de claridad, orden y confianza.",
          ],
          itemsIntro: "Se trabajó en:",
          items: [
            "Jerarquía visual.",
            "Componentes reutilizables.",
            "Tipografía.",
            "Iconografía.",
            "Colores.",
            "Tarjetas y elementos de información.",
            "Gráficas para representar datos financieros.",
            "Diseño responsive/adaptable.",
          ],
          afterItems: [
            "La interfaz fue diseñada para que el usuario pudiera identificar rápidamente cuánto dinero tiene, cuánto ha gastado y cómo se distribuyen sus gastos.",
          ],
        },
        {
          number: "6",
          title: "Prototipado y evaluación",
          paragraphs: [
            "Se creó un prototipo interactivo para simular las principales acciones dentro de la aplicación.",
            "El prototipo permitió evaluar aspectos como la facilidad para registrar un gasto, consultar información financiera y navegar entre las diferentes secciones.",
            "A partir de la evaluación se realizaron ajustes en la organización de los elementos y en algunos flujos para hacer la experiencia más intuitiva.",
          ],
        },
        {
          title: "Resultado",
          paragraphs: [
            "El resultado fue una propuesta de aplicación financiera centrada en hacer que la gestión del dinero sea más sencilla y comprensible.",
            "Más que mostrar grandes cantidades de información, Clarity busca presentar los datos financieros de forma visual y organizada para que el usuario pueda entender su situación, identificar sus hábitos de gasto y tomar decisiones con mayor claridad.",
          ],
        },
      ],
    },
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
    sitePreview: "/foto-imprenta.jpg",
    sitePreviewWidth: 2880,
    sitePreviewHeight: 18102,
    overview:
      "Rediseño del sitio web de Imprenta Alatorre para presentar con claridad sus servicios de impresión. El enfoque estuvo en organizar la información de forma intuitiva, mejorar la navegación y crear una experiencia visual que reflejara la calidad y profesionalismo de la empresa.",
    solution:
      "Reorganicé el funnel en etapas visibles, añadí resumen persistente del carrito y microcopy orientado a confianza. Diseñé estados de stock, promociones y confirmación con feedback visual consistente.",
    process: [
      "Investigación del sitio anterior",
      "Estructura del contenido",
      "Wireframes y prototipado web",
      "Diseño UI en Figma",
      "Entrega a desarrollo",
    ],
  },
  {
    id: "jm-estudio",
    slug: "jm-estudio",
    title: "JM Estudio",
    subtitle: "Sitio web para agencia",
    shortDescription:
      "Sitio web para dar a conocer una agencia y facilitar que los clientes den el primer paso.",
    description:
      "Sitio web para dar a conocer una agencia y facilitar que los clientes den el primer paso.",
    tags: ["Diseño UX/UI", "UX Research", "Prototipado"],
    color: "sky",
    image: "/proyecto-jmestudio.webp",
    imageWidth: 1920,
    imageHeight: 1440,
    siteUrl: "https://jmestudio-web.vercel.app",
    overview:
      "JM Estudio es una agencia que necesitaba una página web para atraer clientes y explicar sus servicios con claridad. El reto fue diseñar una experiencia simple, visual y fácil de usar, sin perder la personalidad de la marca.",
    solution:
      "Se diseñó y desarrolló un sitio web moderno y funcional que presenta con claridad los servicios de la agencia, facilita la navegación y refuerza su identidad visual.",
    process: [
      "Investigación",
      "Definición del problema",
      "Arquitectura y flujo",
      "Wireframes",
      "Diseño UI",
      "Prototipado y evaluación",
    ],
    caseStudy: {
      intro:
        "JM Estudio es una agencia que necesitaba una página web para atraer clientes y explicar sus servicios con claridad. El reto fue diseñar una experiencia simple, visual y fácil de usar, sin perder la personalidad de la marca.",
      sections: [
        {
          number: "1",
          title: "Investigación",
          paragraphs: [
            "El proceso comenzó por comprender a la agencia y a quienes llegan a su sitio: qué necesitan saber, qué dudas tienen y qué los convence de contactar.",
            "Se revisaron los servicios, la identidad de la marca y las expectativas de un visitante al buscar una agencia, para detectar en qué puntos la comunicación debía ser más clara.",
          ],
        },
        {
          number: "2",
          title: "Definición del problema",
          paragraphs: [
            "Con lo observado se definió el problema a resolver:",
          ],
          quote:
            "JM Estudio necesitaba una presencia web que presentara sus servicios con claridad, transmitiera una imagen moderna y profesional, y hiciera sencillo el camino hacia una colaboración.",
          afterItems: [
            "Esa definición guió las decisiones posteriores: qué mostrar primero, qué dejar en segundo plano y cómo orientar cada sección hacia el contacto.",
          ],
        },
        {
          number: "3",
          title: "Arquitectura y flujo",
          paragraphs: [
            "Se definió la estructura del sitio y los principales flujos que permitirían al usuario conocer la agencia, revisar sus servicios y contactar de manera rápida.",
          ],
          itemsIntro: "Entre las secciones principales se contemplaron:",
          items: [
            "Inicio y presentación de la agencia.",
            "Servicios y propuesta de valor.",
            "Proyectos o trabajo destacado.",
            "Información de contacto.",
            "Llamados a la acción.",
          ],
          afterItems: [
            "El objetivo fue reducir pasos innecesarios y facilitar que las acciones más frecuentes, como conocer los servicios o escribir a la agencia, estuvieran accesibles desde el recorrido principal.",
          ],
        },
        {
          number: "4",
          title: "Wireframes",
          paragraphs: [
            "Se crearon wireframes para explorar distintas formas de distribuir el contenido antes de trabajar en la interfaz visual.",
            "Esta etapa permitió validar la estructura de las secciones y detectar mejoras en los flujos de navegación.",
          ],
        },
        {
          number: "5",
          title: "Diseño UI",
          paragraphs: [
            "Después se desarrolló la interfaz visual en Figma, buscando un resultado moderno, funcional y alineado con la identidad de la agencia.",
          ],
          itemsIntro: "Se trabajó en:",
          items: [
            "Jerarquía visual.",
            "Tipografía y color.",
            "Componentes reutilizables.",
            "Secciones de servicios y contacto.",
            "Diseño responsive/adaptable.",
          ],
          afterItems: [
            "La interfaz se diseñó para que el usuario identificara rápido qué hace la agencia, qué servicios ofrece y cómo puede contactarla.",
          ],
        },
        {
          number: "6",
          title: "Prototipado y evaluación",
          paragraphs: [
            "Se armó un prototipo interactivo para recorrer las principales acciones del sitio.",
            "Eso permitió evaluar si era fácil entender la propuesta, encontrar los servicios y llegar al contacto.",
            "Con esa revisión se ajustaron algunos bloques y el peso visual de las acciones principales, y el diseño se llevó a un sitio web funcional.",
          ],
        },
        {
          title: "Resultado",
          paragraphs: [
            "El resultado fue un sitio web que presenta a JM Estudio con una identidad clara, una navegación sencilla y un recorrido pensado para conocer la agencia sin perderse.",
            "Más que listar servicios, el sitio organiza la información para que el visitante entienda qué hace la agencia, cómo trabaja y cómo iniciar una colaboración en pocos pasos.",
          ],
        },
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

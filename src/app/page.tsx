import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const About = dynamic(() =>
  import("@/components/About").then((mod) => mod.About),
);

const Projects = dynamic(() =>
  import("@/components/Projects").then((mod) => mod.Projects),
);

const Contact = dynamic(() =>
  import("@/components/Contact").then((mod) => mod.Contact),
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

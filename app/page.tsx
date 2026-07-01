


import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";
import PaletteSwitcher from "@/components/PaletteSwitcher";
import Particles from "@/components/Particles";
import CanvasCursor from "@/components/CanvasCursor";
import RevealObserver from "@/components/RevealObserver";

export default function Page() {
  return (
    <>
      <Particles />
      <CanvasCursor />
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main className="shell">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <PaletteSwitcher />
      <RevealObserver />
    </>
  );
}

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SectionReveal from "@/components/SectionReveal";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden cursor-none md:cursor-none">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <SectionReveal>
        <AboutSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <ProjectsSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <ContactSection />
      </SectionReveal>
      <Footer />
    </main>
  );
};

export default Index;

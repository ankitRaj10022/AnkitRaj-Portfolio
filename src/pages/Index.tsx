import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SectionReveal from "@/components/SectionReveal";
import Preloader from "@/components/Preloader";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden cursor-none md:cursor-none">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={handleComplete} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
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
      </motion.div>
    </main>
  );
};

export default Index;

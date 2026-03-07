import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import MarqueeBanner from "@/components/MarqueeBanner";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
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
        <AboutSection />
        <MarqueeBanner text="Games — SaaS — Design — Development — " />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </main>
  );
};

export default Index;

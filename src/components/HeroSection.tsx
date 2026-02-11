import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, skewY: 5 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "power4.out", delay: 0.3 }
      );
    }
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 }
      );
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Abstract geometric art background"
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Floating blobs */}
      <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-56 h-56 md:w-80 md:h-80 bg-secondary/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 w-40 h-40 md:w-64 md:h-64 bg-accent/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-body text-sm md:text-base font-medium">
            👋 Welcome to my world
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="section-heading text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.9] mb-6"
          style={{ opacity: 0 }}
        >
          Creative
          <br />
          <span className="text-gradient">Developer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-body text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
          style={{ opacity: 0 }}
        >
          I craft beautiful digital experiences with clean code and bold design.
          Let's build something extraordinary together.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            View My Work
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full bg-card text-foreground font-body font-semibold text-lg border-2 border-border hover:border-primary hover:text-primary transition-all duration-300"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

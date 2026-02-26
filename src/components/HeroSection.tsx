import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

const HeroSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    if (!titleRef.current) return;
    const lines = titleRef.current.querySelectorAll(".hero-line");
    gsap.fromTo(
      lines,
      { y: 120, opacity: 0, rotate: -8, scale: 0.7 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.12,
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden halftone-bg"
    >
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-primary comic-circle"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <motion.div
          className="absolute top-1/4 -left-8 w-24 h-24 bg-secondary comic-circle"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-16 h-16 bg-primary rotate-12"
          style={{ border: '3px solid hsl(var(--foreground))' }}
          animate={{ rotate: [12, -12, 12] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-6 h-6 bg-secondary comic-circle"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        {/* Star decoration */}
        <motion.div
          className="absolute top-32 right-1/4 w-12 h-12 bg-secondary comic-star"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
      </div>

      {/* Main comic panel */}
      <motion.div
        className="relative z-10 w-[90%] max-w-5xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="comic-panel p-6 md:p-12 lg:p-16 relative">
          {/* Panel corner decorations */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-primary" />
          <div className="absolute top-2 right-2 w-3 h-3 bg-primary" />
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-primary" />
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-primary" />

          <div ref={titleRef} className="text-center space-y-4">
            {/* Action word */}
            <motion.div
              className="hero-line"
              style={{ opacity: 0 }}
            >
              <span className="inline-block bg-primary text-primary-foreground font-display text-sm md:text-base px-4 py-1 -rotate-2 border-2 border-foreground">
                ★ GAME DEV & SAAS BUILDER ★
              </span>
            </motion.div>

            {/* Main title */}
            <div className="overflow-hidden">
              <h1
                className="hero-line font-display text-[16vw] md:text-[12vw] lg:text-[10vw] leading-[0.9] text-foreground comic-outline-thick"
                style={{ opacity: 0 }}
              >
                ANKIT
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                className="hero-line font-display text-[16vw] md:text-[12vw] lg:text-[10vw] leading-[0.9] text-primary comic-outline-thick"
                style={{ opacity: 0 }}
              >
                RAJ
              </h1>
            </div>

            {/* Subtitle in speech bubble style */}
            <motion.div
              className="hero-line flex justify-center mt-6"
              style={{ opacity: 0 }}
            >
              <div className="speech-bubble max-w-md">
                <p className="font-body text-sm md:text-base text-foreground font-bold text-center">
                  Crafting immersive games & scalable SaaS products that people love to use!
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="hero-line flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              style={{ opacity: 0 }}
            >
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="font-display text-base md:text-lg text-primary-foreground bg-primary px-8 py-3 comic-btn"
              >
                VIEW MY WORK →
              </button>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="font-display text-base md:text-lg text-foreground bg-secondary px-8 py-3 comic-btn"
              >
                LET'S TALK!
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating action words */}
        <motion.span
          className="absolute -top-6 -left-6 md:-left-12 action-burst text-2xl md:text-4xl -rotate-12"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        >
          BUILD!
        </motion.span>
        <motion.span
          className="absolute -bottom-6 -right-6 md:-right-12 action-burst text-2xl md:text-4xl rotate-6"
          initial={{ scale: 0, rotate: 30 }}
          animate={{ scale: 1, rotate: 6 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        >
          SHIP!
        </motion.span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="font-display text-xs text-foreground/80">SCROLL DOWN</span>
        <motion.div
          className="w-6 h-10 border-3 border-foreground rounded-full flex justify-center"
          style={{ border: '3px solid hsl(var(--foreground))' }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full mt-1.5"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

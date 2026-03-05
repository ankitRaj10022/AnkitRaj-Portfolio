import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { SpeedLines } from "./ComicEffects";

const HeroSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Speed lines radiating background */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <SpeedLines />
      </motion.div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large pulsing circle */}
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-primary/30 comic-circle"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        {/* Bouncing secondary circle */}
        <motion.div
          className="absolute top-1/4 -left-12 w-32 h-32 bg-secondary/40 comic-circle"
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        {/* Spinning square */}
        <motion.div
          className="absolute bottom-20 right-20 w-20 h-20 bg-primary/40"
          style={{ border: '3px solid hsl(var(--foreground))' }}
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
        {/* Multiple floating dots */}
        {[
          { top: "30%", left: "15%", size: 8, delay: 0 },
          { top: "70%", left: "80%", size: 12, delay: 0.5 },
          { top: "20%", left: "70%", size: 6, delay: 1 },
          { top: "80%", left: "25%", size: 10, delay: 1.5 },
          { top: "50%", left: "90%", size: 5, delay: 2 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute bg-foreground/20 rounded-full"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: dot.delay }}
          />
        ))}
        {/* Stars */}
        <motion.div
          className="absolute top-24 right-1/4 w-16 h-16 bg-secondary comic-star"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-10 h-10 bg-primary comic-star"
          animate={{ rotate: [360, 0], scale: [1, 1.3, 1] }}
          transition={{ rotate: { repeat: Infinity, duration: 12, ease: "linear" }, scale: { repeat: Infinity, duration: 3 } }}
        />
        {/* Halftone gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      {/* Main comic panel */}
      <motion.div
        className="relative z-10 w-[92%] max-w-5xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="comic-panel p-6 md:p-12 lg:p-16 relative halftone-bg">
          {/* Panel corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-primary" />
          <div className="absolute top-2 right-2 w-4 h-4 bg-primary" />
          <div className="absolute bottom-2 left-2 w-4 h-4 bg-primary" />
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-primary" />

          <div ref={titleRef} className="text-center space-y-4 relative z-10">
            {/* Badge */}
            <motion.div className="hero-line" style={{ opacity: 0 }}>
              <span className="inline-block bg-primary text-primary-foreground font-display text-sm md:text-base px-5 py-1.5 -rotate-2 border-2 border-foreground"
                style={{ boxShadow: '3px 3px 0px hsl(var(--foreground))' }}
              >
                ★ GAME DEV & SAAS BUILDER ★
              </span>
            </motion.div>

            {/* Main title with thick outline */}
            <div className="overflow-hidden">
              <h1
                className="hero-line font-display text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] text-foreground comic-outline-thick"
                style={{ opacity: 0 }}
              >
                ANKIT
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                className="hero-line font-display text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] text-primary comic-outline-thick"
                style={{ opacity: 0 }}
              >
                RAJ
              </h1>
            </div>

            {/* Speech bubble subtitle */}
            <motion.div className="hero-line flex justify-center mt-8" style={{ opacity: 0 }}>
              <div className="speech-bubble max-w-lg">
                <p className="font-body text-sm md:text-base text-foreground font-bold text-center">
                  Crafting immersive games & scalable SaaS products that people love to use!
                </p>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="hero-line flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
              style={{ opacity: 0 }}
            >
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="font-display text-base md:text-lg text-primary-foreground bg-primary px-10 py-3.5 comic-btn"
              >
                VIEW MY WORK →
              </button>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="font-display text-base md:text-lg text-foreground bg-secondary px-10 py-3.5 comic-btn"
              >
                LET'S TALK!
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating action bursts */}
        <motion.div
          className="absolute -top-8 -left-4 md:-left-14"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        >
          <div className="starburst">
            <span className="font-display text-2xl md:text-4xl text-foreground relative z-10">BUILD!</span>
          </div>
        </motion.div>
        <motion.div
          className="absolute -bottom-8 -right-4 md:-right-14"
          initial={{ scale: 0, rotate: 30 }}
          animate={{ scale: 1, rotate: 8 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        >
          <div className="starburst">
            <span className="font-display text-2xl md:text-4xl text-foreground relative z-10">SHIP!</span>
          </div>
        </motion.div>
        {/* Extra burst */}
        <motion.div
          className="absolute top-1/2 -right-6 md:-right-20 hidden md:block"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [5, -5, 5] }}
          transition={{ delay: 1.8, type: "spring", stiffness: 200, rotate: { repeat: Infinity, duration: 2 } }}
        >
          <span className="action-burst text-xl md:text-2xl">PLAY!</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span
          className="font-display text-xs text-foreground/80"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          SCROLL DOWN
        </motion.span>
        <motion.div
          className="w-6 h-10 flex justify-center"
          style={{ border: '3px solid hsl(var(--foreground))', borderRadius: '20px' }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full mt-1.5"
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

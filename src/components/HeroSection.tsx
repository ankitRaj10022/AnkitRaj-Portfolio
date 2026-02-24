import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    if (!titleRef.current) return;
    const lines = titleRef.current.querySelectorAll(".hero-line");
    gsap.fromTo(
      lines,
      { y: 140, opacity: 0, skewY: 4 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen flex items-end justify-start overflow-hidden"
    >
      {/* Full-screen background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale, y: bgY }}>
        <img
          src={heroBg}
          alt="Dark atmospheric background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-10 md:right-20 z-10 hidden md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
      >
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      </motion.div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-10 lg:px-16 pb-12 md:pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div ref={titleRef} className="space-y-0">
          <div className="overflow-hidden">
            <p
              className="hero-line font-body text-xs md:text-sm uppercase tracking-[0.3em] text-accent mb-4 md:mb-6"
              style={{ opacity: 0 }}
            >
              ● Creative Developer & Designer
            </p>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-line font-display text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] text-foreground uppercase tracking-tight"
              style={{ opacity: 0 }}
            >
              BY.ANKIT
            </h1>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line flex items-baseline gap-4" style={{ opacity: 0 }}>
              <span className="font-display text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] text-foreground uppercase tracking-tight">
                _RAJ
              </span>
              <span className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-accent">
                ®
              </span>
            </div>
          </div>
          <div className="overflow-hidden mt-4">
            <motion.div
              className="hero-line flex items-center gap-8"
              style={{ opacity: 0 }}
            >
              <div className="hidden md:block w-24 h-[1px] bg-foreground/30" />
              <p className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-widest max-w-xs">
                Software Engineer — Full-Stack & Game Development
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom row */}
        <motion.div
          className="flex items-end justify-between mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/60">
              Available for work
            </span>
          </div>

          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-foreground border border-foreground/20 px-6 py-3 md:px-10 md:py-4 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 cursor-none group"
          >
            <span className="flex items-center gap-2">
              Let's Talk
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            className="w-[1px] h-12 bg-foreground/20 relative overflow-hidden"
          >
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent"
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

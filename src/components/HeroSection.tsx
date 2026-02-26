import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
      { y: 140, opacity: 0, skewY: 6, rotationX: -20 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        rotationX: 0,
        duration: 1.6,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.2,
      }
    );

    // Stats counter animation
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll(".stat-num");
      counters.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0");
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target,
          duration: 2,
          delay: 1.8,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function() {
            el.textContent = Math.round(parseFloat(el.textContent || "0")).toString();
          }
        });
      });
    }
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
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </motion.div>

      {/* Floating glitch lines */}
      <motion.div
        className="absolute top-1/4 right-0 w-[40%] h-[1px] bg-accent/20 hidden md:block"
        initial={{ scaleX: 0, originX: 1 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute top-[35%] right-[10%] w-[20%] h-[1px] bg-accent/10 hidden md:block"
        initial={{ scaleX: 0, originX: 1 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

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
              ● Game Developer & SaaS Builder
            </p>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-line font-display text-[20vw] md:text-[15vw] lg:text-[12vw] leading-[0.82] text-foreground uppercase tracking-tight"
              style={{ opacity: 0 }}
            >
              ANKIT
            </h1>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line flex items-baseline gap-4" style={{ opacity: 0 }}>
              <span className="font-display text-[20vw] md:text-[15vw] lg:text-[12vw] leading-[0.82] text-foreground uppercase tracking-tight">
                _RAJ
              </span>
              <span className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-accent">
                ®
              </span>
            </div>
          </div>
          <div className="overflow-hidden mt-6">
            <motion.div
              className="hero-line flex items-center gap-8"
              style={{ opacity: 0 }}
            >
              <div className="hidden md:block w-24 h-[1px] bg-foreground/20" />
              <p className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-widest max-w-sm">
                Crafting immersive games & scalable SaaS products
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          className="flex items-center gap-10 md:gap-16 mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="flex flex-col">
            <span className="font-display text-3xl md:text-5xl text-accent stat-num" data-target="12">0</span>
            <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Projects shipped</span>
          </div>
          <div className="w-[1px] h-10 bg-foreground/10" />
          <div className="flex flex-col">
            <span className="font-display text-3xl md:text-5xl text-accent stat-num" data-target="5">0</span>
            <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Games released</span>
          </div>
          <div className="w-[1px] h-10 bg-foreground/10 hidden md:block" />
          <div className="hidden md:flex flex-col">
            <span className="font-display text-3xl md:text-5xl text-accent stat-num" data-target="3">0</span>
            <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mt-1">SaaS products</span>
          </div>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          className="flex items-end justify-between mt-8 md:mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/60">
              Open for freelance
            </span>
          </div>

          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-foreground border border-foreground/20 px-6 py-3 md:px-10 md:py-4 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 cursor-none group"
          >
            <span className="flex items-center gap-2">
              Let's Build
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
          <motion.div className="w-[1px] h-12 bg-foreground/20 relative overflow-hidden">
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

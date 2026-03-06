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
      {/* Speed lines */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <SpeedLines />
      </motion.div>

      {/* Dense background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating shapes */}
        <motion.div
          className="absolute -top-10 -right-10 w-80 h-80 rounded-full border-[6px] border-primary/30"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -left-20 w-48 h-48 bg-primary/20 rounded-full"
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-secondary/30"
          style={{ border: '4px solid hsl(var(--foreground))' }}
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        />

        {/* Scattered icons / badges */}
        {[
          { top: "10%", right: "8%", text: "✕", size: "text-2xl", color: "text-primary-foreground/30" },
          { top: "20%", right: "20%", text: "✕", size: "text-lg", color: "text-primary-foreground/20" },
          { top: "15%", left: "8%", text: "✦", size: "text-xl", color: "text-secondary/40" },
          { bottom: "25%", left: "5%", text: "◆", size: "text-sm", color: "text-primary/30" },
          { top: "65%", right: "5%", text: "★", size: "text-2xl", color: "text-secondary/30" },
          { bottom: "15%", right: "30%", text: "●", size: "text-xs", color: "text-primary-foreground/20" },
        ].map((item, i) => (
          <motion.span
            key={i}
            className={`absolute font-display ${item.size} ${item.color}`}
            style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right }}
            animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: i * 0.3 }}
          >
            {item.text}
          </motion.span>
        ))}

        {/* Floating tag stickers */}
        <motion.div
          className="absolute top-[12%] right-[12%] bg-secondary text-secondary-foreground font-display text-[10px] px-3 py-1 border-2 border-foreground hidden md:block"
          style={{ boxShadow: '2px 2px 0 hsl(var(--foreground))' }}
          animate={{ rotate: [5, -5, 5], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          GOODLUCK ☺
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] left-[8%] bg-primary text-primary-foreground font-display text-[10px] px-3 py-1 border-2 border-foreground hidden md:block"
          style={{ boxShadow: '2px 2px 0 hsl(var(--foreground))' }}
          animate={{ rotate: [-3, 3, -3], y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5 }}
        >
          ★ LUCKY ★
        </motion.div>
        <motion.div
          className="absolute top-[60%] right-[15%] bg-foreground text-card font-display text-[9px] px-2 py-0.5 rounded-full hidden md:block"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ▸▸▸ PEACE
        </motion.div>

        {/* Floating stars */}
        <motion.div
          className="absolute top-20 right-1/4 w-14 h-14 bg-secondary comic-star"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-28 left-1/3 w-8 h-8 bg-primary comic-star"
          animate={{ rotate: [360, 0], scale: [1, 1.3, 1] }}
          transition={{ rotate: { repeat: Infinity, duration: 12, ease: "linear" }, scale: { repeat: Infinity, duration: 3 } }}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      {/* Main comic panel */}
      <motion.div
        className="relative z-10 w-[92%] max-w-5xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="comic-panel p-6 md:p-12 lg:p-16 relative halftone-bg stripe-pattern">
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-5 h-5 bg-primary" />
          <div className="absolute top-2 right-2 w-5 h-5 bg-secondary" />
          <div className="absolute bottom-2 left-2 w-5 h-5 bg-secondary" />
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-primary" />

          <div ref={titleRef} className="text-center space-y-4 relative z-10">
            {/* Top info strip */}
            <motion.div className="hero-line flex items-center justify-center gap-3 flex-wrap" style={{ opacity: 0 }}>
              <span className="bg-foreground text-card font-display text-[10px] px-3 py-0.5 rounded-full">ILLUSTRATION</span>
              <span className="bg-primary text-primary-foreground font-display text-[10px] px-3 py-0.5 border border-foreground">▶ 2024</span>
              <span className="font-display text-[10px] text-card-foreground/60">✕ ✕ ✕</span>
              <span className="bg-secondary text-secondary-foreground font-display text-[10px] px-3 py-0.5">GOODLUCK ☺</span>
            </motion.div>

            {/* Badge */}
            <motion.div className="hero-line" style={{ opacity: 0 }}>
              <span className="inline-block bg-primary text-primary-foreground font-display text-sm md:text-base px-5 py-1.5 -rotate-2 border-2 border-foreground"
                style={{ boxShadow: '3px 3px 0px hsl(var(--foreground))' }}
              >
                ★ GAME DEV & SAAS BUILDER ★
              </span>
            </motion.div>

            {/* Main title */}
            <div className="overflow-hidden">
              <h1
                className="hero-line font-display text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] text-card-foreground comic-outline-thick"
                style={{ opacity: 0 }}
              >
                ANKIT
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                className="hero-line font-display text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] text-primary comic-outline-thick poster-glitch"
                data-text="RAJ"
                style={{ opacity: 0 }}
              >
                RAJ
              </h1>
            </div>

            {/* Subtitle info row */}
            <motion.div className="hero-line flex items-center justify-center gap-2 flex-wrap" style={{ opacity: 0 }}>
              <span className="font-display text-[10px] text-card-foreground/50">09.19 SUN</span>
              <span className="text-primary font-display text-[10px]">→</span>
              <span className="font-display text-[10px] text-card-foreground/50">09.21 TUE</span>
              <span className="w-1 h-1 bg-secondary rounded-full" />
              <span className="font-display text-[10px] text-card-foreground/60 tracking-wider">ANKIT RAJ ILLUSTRATION</span>
            </motion.div>

            {/* Speech bubble subtitle */}
            <motion.div className="hero-line flex justify-center mt-6" style={{ opacity: 0 }}>
              <div className="speech-bubble max-w-lg">
                <p className="font-body text-sm md:text-base text-card-foreground font-bold text-center">
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
                className="font-display text-base md:text-lg text-secondary-foreground bg-secondary px-10 py-3.5 comic-btn"
              >
                LET'S TALK!
              </button>
            </motion.div>

            {/* Bottom icons row */}
            <motion.div className="hero-line flex items-center justify-center gap-4 mt-4" style={{ opacity: 0 }}>
              {["✦", "◆", "★", "●", "✕"].map((c, i) => (
                <motion.span
                  key={i}
                  className="text-card-foreground/30 text-sm"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                >
                  {c}
                </motion.span>
              ))}
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

        {/* Character mascot placeholder */}
        <motion.div
          className="absolute -right-6 md:-right-16 top-1/4 hidden lg:flex flex-col items-center"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8, type: "spring" }}
        >
          <motion.div
            className="w-16 h-16 bg-foreground rounded-full border-3 border-foreground flex items-center justify-center"
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <span className="text-2xl">👾</span>
          </motion.div>
          <motion.div
            className="mt-1 bg-secondary text-secondary-foreground font-display text-[8px] px-2 py-0.5 border border-foreground"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            PLAY!
          </motion.div>
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
          className="font-display text-xs text-card-foreground/80"
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

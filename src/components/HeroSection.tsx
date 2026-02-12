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

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!titleRef.current) return;
    const children = titleRef.current.children;
    gsap.fromTo(
      children,
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen flex items-end justify-start overflow-hidden"
    >
      {/* Full-screen background image */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale }}>
        <img
          src={heroBg}
          alt="Renaissance baroque painting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/30" />
      </motion.div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-10 lg:px-16 pb-10 md:pb-16"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div ref={titleRef} className="overflow-hidden">
          <p
            className="font-serif italic text-lg md:text-2xl text-accent mb-2 md:mb-4"
            style={{ opacity: 0 }}
          >
            creative
          </p>
          <h1
            className="font-display text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] text-foreground uppercase tracking-tight"
            style={{ opacity: 0 }}
          >
            Designer
          </h1>
          <div className="flex items-baseline gap-4" style={{ opacity: 0 }}>
            <span className="font-serif italic text-2xl md:text-4xl text-accent">&</span>
            <h1 className="font-display text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] text-foreground uppercase tracking-tight">
              Developer
            </h1>
          </div>
        </div>

        {/* Bottom right contact button */}
        <motion.div
          className="absolute bottom-10 md:bottom-16 right-6 md:right-10 lg:right-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-body text-sm md:text-base uppercase tracking-widest text-foreground border border-foreground/30 px-6 py-3 md:px-8 md:py-4 hover:bg-foreground hover:text-background transition-all duration-500 cursor-none"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          className="absolute top-1/3 right-6 md:right-10 lg:right-16 hidden md:flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-body text-xs uppercase tracking-widest text-foreground/70">
            Available for work
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

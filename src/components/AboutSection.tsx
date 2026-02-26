import { useRef, useEffect, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BustScene from "./BustScene";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0.08 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const aboutText =
    "I build worlds — both virtual and digital. From immersive game experiences that push creative boundaries to SaaS platforms that solve real problems at scale. Every project is a system designed to perform, engage, and endure.";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-10 lg:px-16 relative"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-accent">
            ● About
          </span>
          <div className="w-12 h-[1px] bg-accent/40" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          {/* Left: 3D Bust */}
          <div className="order-2 lg:order-1 relative h-[400px] md:h-[550px] lg:h-[650px]">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              }
            >
              <BustScene sectionRef={sectionRef} />
            </Suspense>
            <div className="absolute inset-4 border border-foreground/5 pointer-events-none" />
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2 lg:pl-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug text-foreground mb-10"
            >
              Building immersive
              <br />
              <span className="text-accent italic">(games)</span> &amp; scalable
              <br />
              <span className="text-accent italic">(SaaS)</span> products
              <br />
              from the ground up.
            </motion.h2>

            <div ref={textRef} className="max-w-lg mb-12">
              <p className="font-body text-sm md:text-base leading-relaxed text-muted-foreground">
                {aboutText.split(" ").map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-sm text-accent">01.</span>
                <span className="font-body text-sm text-foreground/70">Game Developer — Unity / Unreal</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-sm text-accent">02.</span>
                <span className="font-body text-sm text-foreground/70">Full-Stack SaaS Engineer</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-sm text-accent">03.</span>
                <span className="font-body text-sm text-foreground/70">Systems & Architecture Design</span>
              </div>
            </motion.div>

            {/* Tech stack badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {["Unity", "Unreal", "React", "Node.js", "TypeScript", "C#", "C++", "AWS"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="font-body text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-3 py-1.5 hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

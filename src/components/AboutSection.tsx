import { useRef, useEffect, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BustScene from "./BustScene";
import { SpeedLines } from "./ComicEffects";

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
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
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
    "I build worlds — both virtual and digital. From immersive game experiences with Unity and Unreal to SaaS platforms that solve real problems at scale. Every project is an adventure designed to perform and endure.";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-12 relative"
    >
      <SpeedLines className="opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section badge */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={isInView ? { scale: 1, rotate: -3 } : {}}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block bg-primary text-primary-foreground font-display text-sm px-4 py-1 mb-8 border-2 border-foreground"
          style={{ boxShadow: '3px 3px 0px hsl(var(--foreground))' }}
        >
          ★ ORIGIN STORY ★
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6">
          {/* Left: 3D Bust in comic panel */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: -1 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="order-2 lg:order-1 relative"
          >
            <div className="comic-panel p-2 h-[420px] md:h-[560px] lg:h-[620px] relative overflow-hidden">
              {/* Inner speed lines for dramatic effect */}
              <div className="absolute inset-0 z-[1] pointer-events-none">
                <svg className="w-full h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i / 24) * Math.PI * 2;
                    return (
                      <line
                        key={i}
                        x1="50" y1="50"
                        x2={50 + Math.cos(angle) * 70}
                        y2={50 + Math.sin(angle) * 70}
                        stroke="hsl(0 0% 8%)"
                        strokeWidth="0.4"
                      />
                    );
                  })}
                </svg>
              </div>
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center bg-card">
                    <motion.span
                      className="font-display text-xl text-foreground"
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      LOADING...
                    </motion.span>
                  </div>
                }
              >
                <BustScene sectionRef={sectionRef} />
              </Suspense>
            </div>
            {/* Caption speech bubble */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 speech-bubble"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <span className="font-body text-xs text-foreground font-bold whitespace-nowrap">
                That's me... kinda!
              </span>
            </motion.div>

            {/* Decorative corner burst */}
            <motion.div
              className="absolute -top-5 -right-5"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1, rotate: [0, 10, 0] } : {}}
              transition={{ delay: 0.8, type: "spring", rotate: { repeat: Infinity, duration: 3 } }}
            >
              <div className="starburst">
                <span className="font-display text-sm text-foreground relative z-10">3D!</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2 lg:pl-4">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 1 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="comic-panel p-6 md:p-8 mb-6"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
                Building immersive{" "}
                <motion.span
                  className="text-primary inline-block"
                  animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                >
                  GAMES
                </motion.span>{" "}
                &amp; scalable{" "}
                <motion.span
                  className="text-primary inline-block"
                  animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 3, delay: 1 }}
                >
                  SAAS
                </motion.span>{" "}
                from the ground up!
              </h2>
            </motion.div>

            <motion.div
              ref={textRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="comic-panel p-5 md:p-6 mb-6"
            >
              <p className="font-body text-sm md:text-base leading-relaxed text-foreground">
                {aboutText.split(" ").map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </p>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {["Unity", "Unreal", "React", "Node.js", "TypeScript", "C#", "C++", "AWS"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.06, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.15, rotate: -3, y: -3 }}
                  className="font-display text-xs text-foreground border-2 border-foreground bg-card px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer"
                  style={{ boxShadow: '2px 2px 0px hsl(var(--foreground))' }}
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

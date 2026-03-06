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
      className="py-24 md:py-32 px-4 md:px-8 lg:px-12 relative bg-foreground"
    >
      <SpeedLines className="opacity-20" />

      {/* Scattered decorative elements */}
      <motion.div
        className="absolute top-8 right-8 font-display text-[10px] text-card/30 tracking-wider hidden md:block"
        style={{ writingMode: "vertical-rl" }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ILLUSTRATION ★ FX ★ WISEMIND
      </motion.div>
      <motion.div
        className="absolute bottom-12 left-6 font-display text-[9px] text-card/20 hidden md:block"
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        ✕ ✕ ✕
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section badge with extra stickers */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={isInView ? { scale: 1, rotate: -3 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block bg-primary text-primary-foreground font-display text-sm px-4 py-1 border-2 border-card"
            style={{ boxShadow: '3px 3px 0px hsl(var(--card))' }}
          >
            ★ ORIGIN STORY ★
          </motion.div>
          <motion.span
            className="font-display text-[10px] text-card/40 hidden md:inline"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            PART 01
          </motion.span>
          <motion.div
            className="flex gap-1 hidden md:flex"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            {["✦", "◆", "★"].map((c, i) => (
              <motion.span
                key={i}
                className="text-primary/50 text-xs"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
              >
                {c}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6">
          {/* Left: 3D Bust */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: -1 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="order-2 lg:order-1 relative"
          >
            <div className="border-4 border-card bg-card/10 p-2 h-[420px] md:h-[560px] lg:h-[620px] relative overflow-hidden"
              style={{ boxShadow: '8px 8px 0px hsl(var(--primary) / 0.4)' }}
            >
              {/* Scanline effect */}
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-primary/30 z-10"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
              <div className="absolute inset-0 z-[1] pointer-events-none cross-pattern" />
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center bg-foreground">
                    <motion.span
                      className="font-display text-xl text-card"
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

              {/* Corner markers */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary z-10" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary z-10" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary z-10" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary z-10" />
            </div>

            {/* Caption */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card border-2 border-foreground text-card-foreground font-body text-xs font-bold px-4 py-1.5"
              style={{ borderRadius: '20px', boxShadow: '2px 2px 0 hsl(var(--foreground))' }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring" }}
            >
              That's me... kinda!
            </motion.div>

            {/* Corner burst */}
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
              className="border-4 border-card bg-card/10 p-6 md:p-8 mb-6"
              style={{ boxShadow: '6px 6px 0px hsl(var(--primary) / 0.3)' }}
            >
              {/* "LINEART" style header */}
              <span className="font-display text-[10px] text-primary tracking-wider">"ORIGIN"</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-card leading-tight mb-4">
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
                  className="text-secondary inline-block"
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
              className="border-4 border-card bg-card/10 p-5 md:p-6 mb-6"
              style={{ boxShadow: '4px 4px 0px hsl(var(--primary) / 0.2)' }}
            >
              <p className="font-body text-sm md:text-base leading-relaxed text-card/90">
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
                  className="font-display text-xs text-card border-2 border-card bg-card/10 px-3 py-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 cursor-pointer"
                  style={{ boxShadow: '2px 2px 0px hsl(var(--primary) / 0.3)' }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Bottom info strip */}
            <motion.div
              className="mt-6 flex items-center gap-2 text-card/30"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <span className="font-display text-[9px]">2012</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="font-display text-[9px] text-primary"
              >
                →→→
              </motion.span>
              <span className="font-display text-[9px]">FUTURE</span>
              <span className="ml-auto font-display text-[8px]">★ MID-AUTUMN FESTIVAL</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary py-1 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="font-display text-[10px] text-primary-foreground/70 tracking-widest px-4">
              ★ #GAMEDEV ★ @ANKITRAJ ★ NINTH ★ ▸▸▸ ★ #SAAS ★ @ANKITRAJ ★ BUILD ★ ▸▸▸ ★ #GAMEDEV ★ @ANKITRAJ ★ NINTH ★ ▸▸▸ ★ #SAAS ★ @ANKITRAJ ★ BUILD ★ ▸▸▸
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

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
        { opacity: 0.15 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
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
    "I use my passion and skills to create digital products and experiences. National and international customers rely on me for design, implementation, and management of their digital products. As an independent, I work with web agencies, companies, startups and individuals to create a blueprint for the digital business.";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-10 lg:px-16 relative min-h-screen"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-start">
          {/* Left: Text Content */}
          <div className="order-1">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight text-foreground mb-12 md:mb-16"
            >
              Hello. I am
              <br />
              <span className="font-serif italic normal-case text-accent">
                Ankit Raj
              </span>
            </motion.h2>

            <div ref={textRef} className="max-w-xl">
              <p className="font-display text-lg md:text-xl lg:text-2xl leading-relaxed uppercase tracking-wide text-foreground/80">
                {aboutText.split(" ").map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Right: 3D Bust */}
          <div className="order-2 relative h-[500px] md:h-[600px] lg:h-[700px] lg:-mt-16">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              }
            >
              <BustScene sectionRef={sectionRef} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
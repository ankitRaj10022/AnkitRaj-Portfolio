import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      className="py-32 md:py-48 px-6 md:px-10 lg:px-16 relative"
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl uppercase tracking-tight text-foreground mb-16"
        >
          Hello. I am
          <br />
          <span className="font-serif italic normal-case text-accent">
            Your Name Here
          </span>
        </motion.h2>

        <div ref={textRef} className="max-w-4xl">
          <p className="font-body text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/80">
            {aboutText.split(" ").map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

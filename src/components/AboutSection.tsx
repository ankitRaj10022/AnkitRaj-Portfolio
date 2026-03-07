import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-foreground/10" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-body text-lg md:text-xl text-foreground/50 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Hello. I am Ankit Raj
        </motion.h2>

        <motion.p
          className="font-body text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground leading-[1.15] tracking-tight max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I use my passion and skills to create digital products and experiences. I work with companies, startups and individuals to design, build and ship games and SaaS platforms that people love.
        </motion.p>

        <motion.div
          className="mt-16 flex flex-wrap gap-x-12 gap-y-4 text-sm text-foreground/40 font-body uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span>Unity</span>
          <span>Unreal</span>
          <span>React</span>
          <span>Node.js</span>
          <span>TypeScript</span>
          <span>C#</span>
          <span>C++</span>
          <span>AWS</span>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

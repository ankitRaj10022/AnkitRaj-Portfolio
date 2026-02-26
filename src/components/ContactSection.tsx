import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = ["LET'S", "BUILD", "SOMETHING", "EPIC!"];

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4 md:px-8 lg:px-12 overflow-hidden halftone-bg">
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 bg-secondary comic-circle hidden md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-12 h-12 bg-primary rotate-45 hidden md:block"
        style={{ border: '3px solid hsl(var(--foreground))' }}
        animate={{ rotate: [45, 90, 45] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto" ref={ref}>
        {/* Comic panel */}
        <div className="comic-panel p-8 md:p-12 lg:p-16 text-center">
          {/* Section badge */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: -3 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block bg-secondary text-foreground font-display text-sm px-4 py-1 mb-8 border-2 border-foreground"
          >
            ★ NEXT CHAPTER ★
          </motion.div>

          {/* Giant CTA text */}
          <div className="space-y-1 mb-8">
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  initial={{ y: 100, opacity: 0, rotate: -5 }}
                  animate={isInView ? { y: 0, opacity: 1, rotate: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.08,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="font-display text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.95] text-foreground comic-outline"
                >
                  {word}
                </motion.h2>
              </div>
            ))}
          </div>

          {/* Speech bubble */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.6, type: "spring" }}
            className="inline-block speech-bubble mb-10"
          >
            <p className="font-body text-sm md:text-base text-foreground font-bold">
              Games, SaaS, or something wild — let's make it happen!
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="mailto:hello@ankitraj.dev"
              data-cursor="Email"
              className="font-display text-base md:text-lg text-primary-foreground bg-primary px-10 py-4 comic-btn inline-flex items-center gap-3"
            >
              START A PROJECT
              <motion.span
                className="inline-block text-xl"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.span>
            </a>
            <span className="font-body text-sm text-foreground/70 font-bold">
              hello@ankitraj.dev
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

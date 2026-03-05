import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SpeedLines } from "./ComicEffects";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = ["LET'S", "BUILD", "SOMETHING", "EPIC!"];

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4 md:px-8 lg:px-12 overflow-hidden">
      <SpeedLines className="opacity-20" />

      {/* Animated decorative shapes */}
      <motion.div
        className="absolute top-10 right-10 w-24 h-24 bg-secondary comic-circle hidden md:block"
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 bg-primary rotate-45 hidden md:block"
        style={{ border: '3px solid hsl(var(--foreground))' }}
        animate={{ rotate: [45, 135, 45] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute top-1/3 left-[5%] w-10 h-10 bg-secondary comic-star hidden md:block"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto" ref={ref}>
        <div className="comic-panel p-8 md:p-12 lg:p-16 text-center halftone-bg">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: -3 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block bg-secondary text-foreground font-display text-sm px-4 py-1 mb-8 border-2 border-foreground"
            style={{ boxShadow: '3px 3px 0px hsl(var(--foreground))' }}
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
            <motion.a
              href="mailto:hello@ankitraj.dev"
              data-cursor="Email"
              className="font-display text-base md:text-lg text-primary-foreground bg-primary px-10 py-4 comic-btn inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START A PROJECT
              <motion.span
                className="inline-block text-xl"
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.span>
            </motion.a>
            <span className="font-body text-sm text-foreground/70 font-bold">
              hello@ankitraj.dev
            </span>
          </motion.div>

          {/* Burst decoration */}
          <motion.div
            className="absolute -top-6 -right-6 hidden md:block"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 1, type: "spring" }}
          >
            <div className="starburst">
              <span className="font-display text-base text-foreground relative z-10">WOW!</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

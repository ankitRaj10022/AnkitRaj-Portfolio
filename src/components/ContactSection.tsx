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

      {/* Animated shapes */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 bg-secondary/30 rounded-full border-2 border-foreground/20 hidden md:block"
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-14 h-14 bg-primary/30 rotate-45 hidden md:block"
        style={{ border: '3px solid hsl(var(--foreground) / 0.2)' }}
        animate={{ rotate: [45, 135, 45] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute top-1/3 left-[5%] w-8 h-8 bg-secondary comic-star hidden md:block opacity-30"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />

      {/* Scattered marks */}
      {["✕", "✦", "◆"].map((c, i) => (
        <motion.span
          key={i}
          className={`absolute font-display text-card-foreground/15 hidden md:block ${
            i === 0 ? "top-8 left-20 text-lg" : i === 1 ? "bottom-16 right-16 text-xl" : "top-1/2 right-8 text-sm"
          }`}
          animate={{ opacity: [0.1, 0.3, 0.1], rotate: [0, 180, 360] }}
          transition={{ repeat: Infinity, duration: 4 + i, delay: i * 0.5 }}
        >
          {c}
        </motion.span>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto" ref={ref}>
        <div className="comic-panel p-8 md:p-12 lg:p-16 text-center halftone-bg stripe-pattern relative">
          {/* Badge row */}
          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={isInView ? { scale: 1, rotate: -3 } : {}}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block bg-secondary text-secondary-foreground font-display text-sm px-4 py-1 border-2 border-foreground"
              style={{ boxShadow: '3px 3px 0px hsl(var(--foreground))' }}
            >
              ★ NEXT CHAPTER ★
            </motion.div>
            <motion.span
              className="font-display text-[9px] text-card-foreground/40 hidden md:inline"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
            >
              PART 04
            </motion.span>
          </div>

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
                  className="font-display text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.95] text-card-foreground comic-outline poster-glitch"
                  data-text={word}
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
            <p className="font-body text-sm md:text-base text-card-foreground font-bold">
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
            <span className="font-body text-sm text-card-foreground/70 font-bold">
              hello@ankitraj.dev
            </span>
          </motion.div>

          {/* Bottom icons */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            {["✦", "★", "◆", "●", "✕"].map((c, i) => (
              <motion.span
                key={i}
                className="text-card-foreground/20 text-xs"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              >
                {c}
              </motion.span>
            ))}
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

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = ["LET'S", "BRING", "YOUR", "IDEAS", "TO LIFE"];

  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 overflow-hidden">
      {/* Dark gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-accent">
            ● Ready to elevate your brand?
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-body text-sm md:text-base text-muted-foreground max-w-md mb-16"
        >
          Drop me a message and let's start building something amazing together.
        </motion.p>

        {/* Giant CTA text */}
        <div className="space-y-0">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                initial={{ y: 120, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-[16vw] md:text-[12vw] lg:text-[10vw] leading-[0.9] uppercase tracking-tight text-foreground"
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* CTA button & email */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-8"
        >
          <a
            href="mailto:hello@ankitraj.dev"
            data-cursor="Email"
            className="font-body text-sm md:text-base uppercase tracking-[0.2em] text-foreground border border-foreground/20 px-10 py-5 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 cursor-none group inline-flex items-center gap-3"
          >
            Get in Touch
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </a>
          <span className="font-body text-xs text-muted-foreground uppercase tracking-widest">
            hello@ankitraj.dev
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

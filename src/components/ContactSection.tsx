import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-10 lg:px-16 border-t border-foreground/10" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          className="font-body text-sm text-foreground/40 uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Let's work together
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-[16vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] text-foreground"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Get in touch
          </motion.h2>
        </div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Marquee button */}
          <motion.a
            href="mailto:hello@ankitraj.dev"
            className="marquee-btn w-64 md:w-80 inline-flex items-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              {[0, 1, 2, 3].map((k) => (
                <span key={k} className="font-body text-sm text-foreground px-4">
                  Contact me
                </span>
              ))}
            </motion.div>
          </motion.a>
        </motion.div>

        <motion.p
          className="mt-8 font-body text-sm text-foreground/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          hello@ankitraj.dev
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;

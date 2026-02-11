import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-6">
            ✦ Let's work together
          </p>

          <h2 className="font-display text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tight text-foreground leading-[0.9] mb-8">
            Get in
            <br />
            <span className="font-serif italic normal-case text-accent">touch</span>
          </h2>

          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12">
            I'm always excited to work on new projects and collaborate with amazing people.
            Drop me a message and let's create something incredible.
          </p>

          <motion.a
            href="mailto:hello@portfolio.dev"
            className="inline-flex items-center gap-3 font-body text-sm md:text-base uppercase tracking-widest text-foreground border border-foreground/30 px-8 py-4 md:px-12 md:py-5 hover:bg-foreground hover:text-background transition-all duration-500 group"
            whileHover={{ scale: 1.02 }}
          >
            Contact me
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

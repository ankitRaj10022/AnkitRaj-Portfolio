import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { num: "01", title: "GAME DEV", description: "Immersive 3D/2D games in Unity & Unreal — concept to release.", icon: "🎮", color: "bg-primary" },
  { num: "02", title: "SAAS BUILD", description: "Auth, billing, dashboards, APIs — built for scale from day one.", icon: "🚀", color: "bg-secondary" },
  { num: "03", title: "FULL-STACK", description: "React, Node, TypeScript, cloud. Clean code, shipped on time.", icon: "⚡", color: "bg-primary" },
  { num: "04", title: "SYSTEMS", description: "Multiplayer backends, real-time pipelines, scalable architecture.", icon: "🔧", color: "bg-secondary" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 md:py-32 px-4 md:px-8 lg:px-12 relative halftone-bg cross-pattern">
      {/* Scattered decorative marks */}
      <motion.div
        className="absolute top-6 right-10 font-display text-card-foreground/15 text-xl hidden md:block"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-8 font-display text-card-foreground/10 text-sm hidden md:block"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ✕ ✕ ✕
      </motion.div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header row */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <motion.div
            initial={{ scale: 0, rotate: 10 }}
            animate={isInView ? { scale: 1, rotate: -2 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block bg-secondary text-secondary-foreground font-display text-sm px-4 py-1 border-2 border-foreground"
            style={{ boxShadow: '3px 3px 0px hsl(var(--foreground))' }}
          >
            ★ SUPER POWERS ★
          </motion.div>
          <motion.span
            className="font-display text-[9px] text-card-foreground/40 hidden md:inline"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            PART 02
          </motion.span>
          <motion.div
            className="hidden md:block bg-foreground text-card font-display text-[8px] px-2 py-0.5 rounded-full"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            ▸▸▸ SKILLS
          </motion.div>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="comic-panel p-6 md:p-8 mb-10 max-w-2xl relative"
        >
          <span className="font-display text-[10px] text-primary tracking-wider">"PACKAGE DESIGN"</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-card-foreground leading-tight">
            I ship{" "}
            <motion.span
              className="text-primary inline-block"
              animate={isInView ? { rotate: [0, -3, 3, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
            >
              GAMES
            </motion.span>{" "}
            people play and{" "}
            <motion.span
              className="text-secondary inline-block"
              animate={isInView ? { rotate: [0, 3, -3, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 2, delay: 1 }}
            >
              SOFTWARE
            </motion.span>{" "}
            teams rely on!
          </h2>
          {/* Mini floating sticker */}
          <motion.div
            className="absolute -top-3 -right-3 bg-primary text-primary-foreground font-display text-[8px] px-2 py-0.5 border border-foreground rotate-6"
            animate={{ rotate: [6, -6, 6] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            WOW!
          </motion.div>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -0.5 : 0.5, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, type: "spring" }}
              whileHover={{ scale: 1.03, rotate: 0, y: -5 }}
              className="comic-panel p-6 md:p-8 group hover:bg-primary transition-colors duration-200 cursor-pointer relative overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute -bottom-4 -right-2 font-display text-[120px] text-foreground/[0.04] leading-none select-none poster-glitch" data-text={service.num}>
                {service.num}
              </span>

              {/* Stripe overlay */}
              <div className="absolute inset-0 stripe-pattern opacity-50" />

              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  transition={{ type: "spring" }}
                >
                  <span className="text-3xl md:text-4xl">{service.icon}</span>
                  <motion.div
                    className="absolute -inset-2 border-2 border-primary/30 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                  />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-lg text-primary group-hover:text-primary-foreground transition-colors">{service.num}</span>
                    <h3 className="font-display text-2xl md:text-3xl text-card-foreground group-hover:text-primary-foreground transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-card-foreground/80 group-hover:text-primary-foreground/80 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration row */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <div className="starburst">
            <span className="font-display text-lg text-foreground relative z-10">KAPOW!</span>
          </div>
          <motion.div
            className="flex gap-1 ml-4"
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span className="font-display text-primary text-sm">→</span>
            <span className="font-display text-primary text-sm">→</span>
            <span className="font-display text-primary text-sm">→</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

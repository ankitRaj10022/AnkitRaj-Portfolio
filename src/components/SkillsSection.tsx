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
    <section id="skills" className="py-24 md:py-32 px-4 md:px-8 lg:px-12 relative halftone-bg">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section badge */}
        <motion.div
          initial={{ scale: 0, rotate: 10 }}
          animate={isInView ? { scale: 1, rotate: -2 } : {}}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block bg-secondary text-foreground font-display text-sm px-4 py-1 mb-8 border-2 border-foreground"
          style={{ boxShadow: '3px 3px 0px hsl(var(--foreground))' }}
        >
          ★ SUPER POWERS ★
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="comic-panel p-6 md:p-8 mb-10 max-w-2xl"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
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
              className="text-primary inline-block"
              animate={isInView ? { rotate: [0, 3, -3, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 2, delay: 1 }}
            >
              SOFTWARE
            </motion.span>{" "}
            teams rely on!
          </h2>
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
              className="comic-panel p-6 md:p-8 group hover:bg-secondary transition-colors duration-200 cursor-pointer relative overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute -bottom-4 -right-2 font-display text-[120px] text-foreground/[0.04] leading-none select-none">
                {service.num}
              </span>
              
              <div className="flex items-start gap-4 relative z-10">
                <motion.span
                  className="text-3xl md:text-4xl"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  transition={{ type: "spring" }}
                >
                  {service.icon}
                </motion.span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-lg text-primary">{service.num}</span>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-foreground/80">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action burst decoration */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <div className="starburst">
            <span className="font-display text-lg text-foreground relative z-10">KAPOW!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { num: "01", title: "GAME DEV", description: "Immersive 3D/2D games in Unity & Unreal — concept to release.", icon: "🎮" },
  { num: "02", title: "SAAS BUILD", description: "Auth, billing, dashboards, APIs — built for scale from day one.", icon: "🚀" },
  { num: "03", title: "FULL-STACK", description: "React, Node, TypeScript, cloud. Clean code, shipped on time.", icon: "⚡" },
  { num: "04", title: "SYSTEMS", description: "Multiplayer backends, real-time pipelines, scalable architecture.", icon: "🔧" },
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
            I ship <span className="text-primary">GAMES</span> people play and{" "}
            <span className="text-primary">SOFTWARE</span> teams rely on!
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -0.5 : 0.5 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, type: "spring" }}
              className="comic-panel p-6 md:p-8 group hover:bg-secondary transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl md:text-4xl">{service.icon}</span>
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
      </div>
    </section>
  );
};

export default SkillsSection;

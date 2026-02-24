import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { num: "01", title: "Digital Design", description: "Crafting pixel-perfect interfaces and immersive digital experiences that captivate users." },
  { num: "02", title: "Full-Stack Dev", description: "Building robust, scalable applications with modern frameworks and clean architecture." },
  { num: "03", title: "Game Development", description: "Creating interactive game experiences with Unity, Unreal, and custom engines." },
  { num: "04", title: "Strategy Research", description: "Data-driven insights and strategic planning to maximize digital product impact." },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-32 md:py-48 px-6 md:px-10 lg:px-16 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-accent">
            ● Our services
          </span>
          <div className="w-12 h-[1px] bg-accent/40" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug text-foreground mb-20 max-w-3xl"
        >
          We're the studio that transforms{" "}
          <span className="text-accent italic">(creative)</span> visions, honoring{" "}
          <span className="text-accent italic">(originality)</span> in every detail.
        </motion.h2>

        {/* Services list */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              className="group border-t border-border py-8 md:py-12 cursor-none"
              data-cursor="View"
            >
              <div className="flex items-start md:items-center gap-6 md:gap-12">
                <span className="font-display text-4xl md:text-6xl lg:text-7xl text-accent/80 group-hover:text-accent transition-colors duration-500 leading-none">
                  {service.num}
                </span>
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h3 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground max-w-xs md:text-right">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

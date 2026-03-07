import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const awards = [
  { award: "Game of the Year Nominee", platform: "Indie Awards", project: "Void Engine" },
  { award: "Best SaaS Product", platform: "Product Hunt", project: "ShipFast" },
  { award: "Honorable Mention", platform: "Awwwards", project: "MetricFlow" },
  { award: "Best Game Design", platform: "Indie Showcase", project: "Neon Drift" },
  { award: "UX Design Excellence", platform: "CSS Design Awards", project: "ShipFast" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-10 lg:px-16 border-t border-foreground/10" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <motion.h2
            className="font-body text-lg md:text-xl text-foreground/50 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            I win awards sometimes
          </motion.h2>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <motion.svg
              className="w-6 h-6 text-foreground"
              viewBox="0 0 24 24"
              fill="currentColor"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              <path d="M12 0L13.5 8.5L22 7L15 12L22 17L13.5 15.5L12 24L10.5 15.5L2 17L9 12L2 7L10.5 8.5L12 0Z" />
            </motion.svg>
            <span className="font-display text-4xl md:text-6xl text-foreground">{awards.length}</span>
            <div className="flex flex-col">
              <span className="font-body text-[10px] text-foreground/40 uppercase leading-tight">awards</span>
              <span className="font-body text-[10px] text-foreground/40 uppercase leading-tight">won</span>
            </div>
          </motion.div>
        </div>

        {/* Awards table */}
        <div className="border-t border-foreground/10">
          {/* Header row */}
          <div className="grid grid-cols-3 py-4 border-b border-foreground/10">
            <span className="font-body text-xs text-foreground/30 uppercase tracking-wider">Award</span>
            <span className="font-body text-xs text-foreground/30 uppercase tracking-wider">Platform</span>
            <span className="font-body text-xs text-foreground/30 uppercase tracking-wider">Project</span>
          </div>
          {awards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="grid grid-cols-3 py-5 border-b border-foreground/10 group hover:bg-foreground/[0.02] transition-colors cursor-default"
            >
              <span className="font-body text-sm text-foreground">{item.award}</span>
              <span className="font-body text-sm text-foreground/50">{item.platform}</span>
              <span className="font-body text-sm text-foreground/50">{item.project}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

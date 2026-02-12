import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { category: "Design", items: ["UI/UX Design", "Brand Identity", "Motion Design", "Prototyping", "Design Systems"] },
  { category: "Development", items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Node.js", "REST & GraphQL"] },
  { category: "Tools", items: ["Figma", "Adobe Suite", "Git & GitHub", "Framer", "Webflow"] },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 md:py-48 px-6 md:px-10 lg:px-16 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
            ✦ Expertise
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-foreground mb-16 md:mb-24"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + gi * 0.15 }}
              className="border-t border-border pt-6"
            >
              <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-accent mb-6">
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.items.map((skill, si) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + gi * 0.1 + si * 0.05 }}
                    className="font-body text-base md:text-lg text-foreground/80 flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 bg-accent/60 group-hover:bg-accent transition-colors duration-300" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  { title: "Void Engine", category: "Game Development", image: project1 },
  { title: "ShipFast", category: "SaaS, Development", image: project2 },
  { title: "Neon Drift", category: "Game Development", image: project3 },
  { title: "MetricFlow", category: "UX/UI Design, Development", image: project4 },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-10 lg:px-16">
      {/* Star + Selected cases header */}
      <div className="flex items-center gap-4 mb-16">
        <motion.svg
          className="w-8 h-8 md:w-10 md:h-10 text-foreground"
          viewBox="0 0 24 24"
          fill="currentColor"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <path d="M12 0L13.5 8.5L22 7L15 12L22 17L13.5 15.5L12 24L10.5 15.5L2 17L9 12L2 7L10.5 8.5L12 0Z" />
        </motion.svg>
        <span className="font-body text-sm text-foreground/50 uppercase tracking-wider">Selected cases</span>
      </div>

      {/* Project list */}
      <div ref={ref} className="space-y-0">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="project-card group border-b border-foreground/10 cursor-pointer"
          >
            {/* Hover image */}
            <div className="project-image z-10">
              <div className="absolute inset-0 flex items-center justify-center p-16">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover max-w-2xl rounded-sm"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="relative z-20 py-8 md:py-12 flex items-center justify-between">
              <div>
                <h3 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground group-hover:text-foreground/60 transition-colors duration-500">
                  {project.title}
                </h3>
              </div>
              <span className="font-body text-xs md:text-sm text-foreground/40 uppercase tracking-wider hidden md:block">
                {project.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project detail cards with image reveals */}
      <div className="mt-32 space-y-32">
        {projects.map((project, i) => (
          <motion.div
            key={`detail-${project.title}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  loading="lazy"
                />
              </div>
            </div>
            <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <h3 className="font-display text-4xl md:text-6xl text-foreground mb-4">
                {project.title}
              </h3>
              <p className="font-body text-base text-foreground/60 mb-6 leading-relaxed">
                A bespoke {project.category.toLowerCase()} project showcasing creative design and technical excellence.
              </p>
              <span className="font-body text-xs text-foreground/30 uppercase tracking-widest">
                {project.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

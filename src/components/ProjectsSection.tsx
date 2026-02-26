import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "VOID ENGINE",
    category: "Game Dev",
    tags: "Unity, C#, Multiplayer",
    image: project1,
    year: "2025",
    type: "🎮 GAME",
  },
  {
    title: "SHIPFAST",
    category: "SaaS",
    tags: "React, Node, Stripe",
    image: project2,
    year: "2024",
    type: "🚀 SAAS",
  },
  {
    title: "NEON DRIFT",
    category: "Game Dev",
    tags: "Unreal, C++, Racing",
    image: project3,
    year: "2024",
    type: "🎮 GAME",
  },
  {
    title: "METRICFLOW",
    category: "SaaS",
    tags: "Analytics, Dashboard",
    image: project1,
    year: "2024",
    type: "🚀 SAAS",
  },
];

const ProjectsSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { x: -60, opacity: 0, rotate: -3 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 px-4 md:px-8 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block bg-primary text-primary-foreground font-display text-sm px-4 py-1 mb-8 border-2 border-foreground -rotate-2"
        >
          ★ FEATURED EPISODES ★
        </motion.div>

        {/* Heading */}
        <div
          ref={headingRef}
          className="comic-panel p-6 md:p-8 mb-12 md:mb-16 inline-block"
          style={{ opacity: 0 }}
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.9]">
            MY <span className="text-primary">WORK!</span>
          </h2>
        </div>

        {/* Project grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title + i}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -1 : 1, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -0.5 : 0.5, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, type: "spring" }}
              className="group cursor-pointer"
              data-cursor="View"
            >
              <div className="comic-panel overflow-hidden">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Type badge */}
                  <div className="absolute top-3 left-3 font-display text-xs text-primary-foreground bg-primary px-3 py-1 border-2 border-foreground">
                    {project.type}
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-400 flex items-center justify-center">
                    <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <span className="font-display text-2xl md:text-3xl text-card action-burst">
                        VIEW!
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-center justify-between p-4 bg-card">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-foreground/70 mt-0.5">
                      {project.tags}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-xs text-foreground/60 font-bold">
                      {project.year}
                    </span>
                    <div className="w-8 h-8 border-2 border-foreground bg-card flex items-center justify-center group-hover:bg-primary transition-all duration-200">
                      <ArrowUpRight className="w-4 h-4 group-hover:text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

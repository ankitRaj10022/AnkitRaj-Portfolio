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
    title: "Project Alpha",
    category: "UX/UI Design",
    tags: "Design, Development",
    image: project1,
    year: "2025",
    size: "large",
  },
  {
    title: "Project Beta",
    category: "Branding",
    tags: "UX/UI Design, Development",
    image: project2,
    year: "2024",
    size: "small",
  },
  {
    title: "Project Gamma",
    category: "Development",
    tags: "Full-Stack, Game Dev",
    image: project3,
    year: "2024",
    size: "small",
  },
  {
    title: "Project Delta",
    category: "Motion Design",
    tags: "Interaction Design, Motion",
    image: project1,
    year: "2024",
    size: "large",
  },
];

const ProjectsSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
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
    <section id="projects" className="py-32 md:py-48 px-6 md:px-10 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-accent">
            ● Selected cases
          </span>
          <div className="w-12 h-[1px] bg-accent/40" />
        </div>

        {/* Heading with count */}
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <h2
            ref={headingRef}
            className="font-display text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tight text-foreground leading-[0.85]"
            style={{ opacity: 0 }}
          >
            Selected
            <br />
            Works
          </h2>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-display text-4xl md:text-6xl text-accent hidden md:block"
          >
            {String(projects.length).padStart(2, "0")}
          </motion.span>
        </div>

        {/* Project grid — 2 columns, alternating sizes */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title + i}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden cursor-none ${
                project.size === "large" ? "md:row-span-1" : ""
              }`}
              data-cursor="View"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-500 flex items-center justify-center">
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2"
                  >
                    <span className="font-body text-sm uppercase tracking-widest text-foreground">
                      View Project
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-accent" />
                  </motion.div>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {project.tags}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-body text-xs text-muted-foreground">
                    {project.category}
                  </span>
                  <div className="w-8 h-8 border border-border rounded-full flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <ArrowUpRight className="w-3 h-3 group-hover:text-accent-foreground" />
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

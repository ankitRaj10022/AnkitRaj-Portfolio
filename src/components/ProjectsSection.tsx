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
    description: "A bespoke website to spotlight branding & art direction prowess.",
    tags: "UX/UI Design, Development",
    image: project1,
    year: "2025",
  },
  {
    title: "Project Beta",
    description: "A new website with tailored design and development for an emerging brand.",
    tags: "UX/UI Design, Development",
    image: project2,
    year: "2024",
  },
  {
    title: "Project Gamma",
    description: "Tailored user-friendly and visually appealing UX/UI for a fintech platform.",
    tags: "UX/UI Design",
    image: project3,
    year: "2024",
  },
];

const ProjectsSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { x: -100, opacity: 0 },
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
    <section
      id="projects"
      className="py-32 md:py-48 px-6 md:px-10 lg:px-16 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
            ✦ Selected cases
          </span>
        </div>

        <h2
          ref={headingRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-foreground mb-16 md:mb-24"
          style={{ opacity: 0 }}
        >
          Works
        </h2>

        {/* Project list */}
        <div ref={ref} className="space-y-0 border-t border-border">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group border-b border-border cursor-pointer"
            >
              <div className="flex items-center justify-between py-6 md:py-8">
                <div className="flex-1">
                  <h3 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {project.tags}
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="hidden md:block font-body text-sm text-muted-foreground">
                    {project.year}
                  </span>
                  <div className="w-10 h-10 border border-border rounded-full flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Expandable image on hover (desktop) */}
              <div className="hidden md:block overflow-hidden max-h-0 group-hover:max-h-[400px] transition-all duration-700 ease-in-out">
                <div className="pb-8 flex gap-8">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-1/2 h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1 flex items-end">
                    <p className="font-body text-base text-muted-foreground max-w-md">
                      {project.description}
                    </p>
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

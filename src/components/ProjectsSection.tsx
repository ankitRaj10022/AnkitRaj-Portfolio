import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Dashboard Pro",
    description: "A modern analytics dashboard with real-time data visualization and dark theme support.",
    tags: ["React", "TypeScript", "D3.js"],
    image: project1,
    color: "card-vibrant" as const,
  },
  {
    title: "ShopFlow",
    description: "E-commerce mobile app with intuitive product browsing and seamless checkout experience.",
    tags: ["React Native", "Node.js", "Stripe"],
    image: project2,
    color: "card-pink" as const,
  },
  {
    title: "Artfolio",
    description: "Creative portfolio platform with bold typography and editorial-style photography layouts.",
    tags: ["Next.js", "Framer Motion", "Sanity"],
    image: project3,
    color: "card-vibrant" as const,
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
        { x: 200, opacity: 0 },
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
    <section id="projects" className="py-24 md:py-32 px-4 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 ref={headingRef} className="section-heading text-right mb-16" style={{ opacity: 0 }}>
          Projects
        </h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60, rotate: 2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              className={`${project.color} overflow-hidden group cursor-pointer`}
            >
              <div className="relative overflow-hidden rounded-xl mb-5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
                    <Github className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </div>

              <h3 className="font-heading text-3xl md:text-4xl mb-2">{project.title}</h3>
              <p className="font-body text-sm opacity-80 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-body font-medium bg-background/20 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

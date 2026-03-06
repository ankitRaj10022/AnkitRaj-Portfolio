import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "VOID ENGINE", category: "Game Dev", tags: "Unity, C#, Multiplayer", image: project1, year: "2025", type: "🎮 GAME" },
  { title: "SHIPFAST", category: "SaaS", tags: "React, Node, Stripe", image: project2, year: "2024", type: "🚀 SAAS" },
  { title: "NEON DRIFT", category: "Game Dev", tags: "Unreal, C++, Racing", image: project3, year: "2024", type: "🎮 GAME" },
  { title: "METRICFLOW", category: "SaaS", tags: "Analytics, Dashboard", image: project4, year: "2024", type: "🚀 SAAS" },
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
          x: 0, opacity: 1, rotate: 0,
          duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 px-4 md:px-8 lg:px-12 relative bg-foreground">
      {/* Top marquee */}
      <div className="absolute top-0 left-0 right-0 bg-secondary py-1 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="font-display text-[10px] text-secondary-foreground/70 tracking-widest px-4">
              ★ FEATURED WORK ★ VOID ENGINE ★ SHIPFAST ★ NEON DRIFT ★ METRICFLOW ★ ▸▸▸ ★ FEATURED WORK ★ VOID ENGINE ★ SHIPFAST ★ NEON DRIFT ★ METRICFLOW ★ ▸▸▸
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scattered marks */}
      <motion.div
        className="absolute top-16 right-8 font-display text-card/15 text-2xl hidden md:block"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      >
        ✦
      </motion.div>

      <div className="max-w-7xl mx-auto pt-4">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block bg-primary text-primary-foreground font-display text-sm px-4 py-1 border-2 border-card -rotate-2"
            style={{ boxShadow: '3px 3px 0px hsl(var(--card))' }}
          >
            ★ FEATURED EPISODES ★
          </motion.div>
          <motion.span className="font-display text-[9px] text-card/40 hidden md:inline">PART 03</motion.span>
          <motion.div
            className="hidden md:flex gap-1 items-center"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="font-display text-[9px] text-primary">▸▸▸</span>
            <span className="font-display text-[8px] text-card/30">SCROLL</span>
          </motion.div>
        </div>

        {/* Heading in dark panel */}
        <div
          ref={headingRef}
          className="border-4 border-card bg-card/10 p-6 md:p-8 mb-12 md:mb-16 inline-block relative"
          style={{ opacity: 0, boxShadow: '8px 8px 0px hsl(var(--primary) / 0.3)' }}
        >
          <span className="font-display text-[10px] text-primary tracking-wider">"ILLUSTRATION"</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-card leading-[0.9] poster-glitch" data-text="MY WORK!">
            MY <span className="text-primary">WORK!</span>
          </h2>
          {/* Floating sticker */}
          <motion.div
            className="absolute -top-3 -right-3 bg-secondary text-secondary-foreground font-display text-[8px] px-2 py-0.5 border border-foreground rotate-12"
            animate={{ rotate: [12, 6, 12] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            NEW!
          </motion.div>
        </div>

        {/* Project grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title + i}
              initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -2 : 2, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -0.5 : 0.5, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, type: "spring" }}
              whileHover={{ scale: 1.02, rotate: 0, y: -5 }}
              className="group cursor-pointer"
              data-cursor="View"
            >
              <div className="border-4 border-card overflow-hidden relative"
                style={{ boxShadow: '8px 8px 0px hsl(var(--primary) / 0.3)' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                  />
                  {/* Type badge */}
                  <div className="absolute top-3 left-3 font-display text-xs text-primary-foreground bg-primary px-3 py-1 border-2 border-foreground"
                    style={{ boxShadow: '2px 2px 0px hsl(var(--foreground))' }}
                  >
                    {project.type}
                  </div>
                  {/* Year badge */}
                  <div className="absolute top-3 right-3 font-display text-xs text-secondary-foreground bg-secondary px-2 py-1 border-2 border-foreground">
                    {project.year}
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-300 flex items-center justify-center">
                    <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="starburst">
                        <span className="font-display text-2xl md:text-4xl text-card relative z-10">VIEW!</span>
                      </div>
                    </motion.div>
                  </div>
                  {/* Corner markers */}
                  <div className="absolute bottom-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {["✦", "◆"].map((c, j) => (
                      <span key={j} className="text-primary-foreground text-xs">{c}</span>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-center justify-between p-4 bg-card/10 border-t-4 border-card">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-card group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-card/60 mt-0.5">
                      {project.tags}
                    </p>
                  </div>
                  <motion.div
                    className="w-10 h-10 border-2 border-card bg-card/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-200"
                    style={{ boxShadow: '2px 2px 0px hsl(var(--primary) / 0.3)' }}
                    whileHover={{ rotate: 45 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-card group-hover:text-primary-foreground" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary py-1 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="font-display text-[10px] text-primary-foreground/70 tracking-widest px-4">
              ★ @ANKITRAJ ★ ILLUSTRATION ★ FX ★ WISEMIND ★ NINTH ★ ▸▸▸ ★ @ANKITRAJ ★ ILLUSTRATION ★ FX ★ WISEMIND ★ NINTH ★ ▸▸▸
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

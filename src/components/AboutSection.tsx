import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Zap, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Code2, title: "Development", desc: "React, TypeScript, Node.js, and modern web technologies." },
  { icon: Palette, title: "Design", desc: "UI/UX design with attention to detail and user experience." },
  { icon: Zap, title: "Performance", desc: "Optimized, fast-loading apps with smooth animations." },
  { icon: Globe, title: "Responsive", desc: "Pixel-perfect on every device, from mobile to desktop." },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { x: -200, opacity: 0 },
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
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2 ref={headingRef} className="section-heading mb-16" style={{ opacity: 0 }}>
          About Me
        </h2>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="card-vibrant">
              <h3 className="font-heading text-4xl md:text-5xl mb-6">
                Hello there! 👋
              </h3>
              <p className="font-body text-base md:text-lg leading-relaxed opacity-90 mb-4">
                I'm a passionate full-stack developer and designer who loves turning ideas into
                beautiful, functional digital products. With years of experience in modern web
                technologies, I bring creativity and technical expertise to every project.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed opacity-90">
                When I'm not coding, you'll find me exploring new design trends, contributing
                to open source, or enjoying a good cup of coffee while sketching new ideas.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading text-2xl mb-2 text-foreground">{skill.title}</h4>
                <p className="font-body text-sm text-muted-foreground">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

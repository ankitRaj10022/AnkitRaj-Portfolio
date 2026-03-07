import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EyeIllustration = () => (
  <div className="flex items-center gap-2 md:gap-3">
    {/* Star */}
    <motion.svg
      className="w-6 h-6 md:w-8 md:h-8 text-foreground"
      viewBox="0 0 24 24"
      fill="currentColor"
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
    >
      <path d="M12 0L13.5 8.5L22 7L15 12L22 17L13.5 15.5L12 24L10.5 15.5L2 17L9 12L2 7L10.5 8.5L12 0Z" />
    </motion.svg>
    {/* Eyes */}
    <div className="flex gap-1 md:gap-2">
      <div className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-foreground relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-background rounded-t-full flex items-center justify-center">
          <motion.div
            className="w-8 h-4 md:w-14 md:h-7 bg-foreground rounded-full"
            animate={{ x: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-foreground relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-background rounded-t-[60%] flex items-center justify-center">
          <motion.div
            className="w-10 h-5 md:w-16 md:h-8 bg-foreground rounded-full"
            animate={{ x: [3, -3, 3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
    {/* Month badge */}
    <div className="hidden md:flex flex-col items-start ml-2">
      <span className="font-body text-sm font-bold text-foreground">mar</span>
      <span className="font-body text-[10px] text-foreground/50 leading-tight">available</span>
      <span className="font-body text-[10px] text-foreground/50 leading-tight">for work</span>
    </div>
  </div>
);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 lg:px-16 pt-24 pb-12"
    >
      <motion.div style={{ y, opacity }} className="flex-1 flex flex-col justify-between">
        {/* Top area: Eyes on right */}
        <motion.div
          className="flex justify-end mt-8 md:mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <EyeIllustration />
        </motion.div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 mt-auto">
          {/* Left: Giant title */}
          <div className="flex-1">
            <motion.p
              className="font-accent italic text-xl md:text-2xl lg:text-3xl text-foreground/70 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              creative
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] tracking-tight text-foreground uppercase"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Designer
              </motion.h1>
            </div>
            <div className="flex items-baseline gap-4">
              <div className="overflow-hidden flex-1">
                <motion.h1
                  className="font-display text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] tracking-tight text-foreground uppercase"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-accent italic text-[5vw] md:text-[3.5vw] lg:text-[2.5vw] text-foreground/50 mr-2 normal-case">&</span>
                  developer
                </motion.h1>
              </div>
            </div>
          </div>

          {/* Right: Description + CTA */}
          <motion.div
            className="lg:max-w-md xl:max-w-lg flex flex-col justify-end pb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <p className="font-body text-sm md:text-base lg:text-lg text-foreground/80 uppercase leading-relaxed tracking-wide mb-8">
              I am a developer and game designer based in India. I have many years of experience building immersive games and scalable SaaS products. I love minimal and brutalist design. I love technology, gaming and art.
            </p>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="pill-btn inline-flex items-center justify-center w-fit group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Contact me</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

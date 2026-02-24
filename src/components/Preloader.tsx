import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "revealing">("counting");

  useEffect(() => {
    const duration = 2200;
    const steps = 100;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(Math.round((step / steps) ** 2 * 100), 100);
      setCount(progress);
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setPhase("revealing"), 400);
        setTimeout(() => onComplete(), 1600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const name = "ANKIT RAJ";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Curtain left */}
        <motion.div
          className="absolute top-0 left-0 bottom-0 bg-accent z-20"
          initial={{ width: "0%" }}
          animate={phase === "revealing" ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Curtain right overlay */}
        <motion.div
          className="absolute top-0 left-0 bottom-0 bg-background z-30"
          initial={{ width: "0%" }}
          animate={phase === "revealing" ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        />

        {/* Counter */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <motion.div
            className="overflow-hidden"
            animate={phase === "revealing" ? { opacity: 0, y: -40 } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-baseline gap-2">
              {name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="font-display text-[8vw] md:text-[5vw] leading-none text-foreground uppercase"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={phase === "counting" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="w-48 h-[2px] bg-foreground/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <span className="font-display text-2xl tracking-widest text-accent tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;

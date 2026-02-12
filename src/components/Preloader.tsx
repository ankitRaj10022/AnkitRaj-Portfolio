import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "revealing">("counting");

  useEffect(() => {
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Eased progress for a natural feel
      const progress = Math.min(Math.round((step / steps) ** 1.5 * 100), 100);
      setCount(progress);
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setPhase("revealing"), 300);
        setTimeout(() => onComplete(), 1400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "revealing" ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top curtain */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-background z-10"
          initial={{ height: "50%" }}
          animate={phase === "revealing" ? { height: "0%" } : { height: "50%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        />
        {/* Bottom curtain */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-background z-10"
          initial={{ height: "50%" }}
          animate={phase === "revealing" ? { height: "0%" } : { height: "50%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        />

        {/* Center content */}
        <div className="relative z-20 flex flex-col items-center gap-6">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 1 }}
            animate={phase === "revealing" ? { opacity: 0, y: -30 } : {}}
            transition={{ duration: 0.4 }}
          >
            <motion.h1
              className="font-display text-[20vw] md:text-[12vw] leading-none text-foreground uppercase tracking-tight"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Portfolio
            </motion.h1>
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={phase === "counting" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="w-32 h-[1px] bg-foreground/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <span className="font-body text-xs tracking-widest text-muted-foreground tabular-nums w-8">
              {count}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;

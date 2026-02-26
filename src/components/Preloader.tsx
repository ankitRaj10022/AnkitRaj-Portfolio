import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "revealing">("counting");

  useEffect(() => {
    const duration = 2000;
    const steps = 100;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(Math.round((step / steps) ** 2 * 100), 100);
      setCount(progress);
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setPhase("revealing"), 300);
        setTimeout(() => onComplete(), 1200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-secondary halftone-dense"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Comic panel exit */}
        <motion.div
          className="absolute inset-0 bg-primary z-20"
          initial={{ scaleX: 0 }}
          animate={phase === "revealing" ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-background z-30"
          initial={{ scaleX: 0 }}
          animate={phase === "revealing" ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Name in comic style */}
          <motion.div
            className="overflow-hidden"
            animate={phase === "revealing" ? { opacity: 0, scale: 1.5 } : {}}
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              className="font-display text-[12vw] md:text-[8vw] text-foreground comic-outline-thick leading-none"
              initial={{ y: 100, opacity: 0, rotate: -5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              ANKIT RAJ
            </motion.h1>
          </motion.div>

          {/* Speech bubble */}
          <motion.div
            className="speech-bubble"
            initial={{ opacity: 0, scale: 0 }}
            animate={phase === "counting" ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <span className="font-body text-sm text-foreground font-bold">Loading adventure...</span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={phase === "counting" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="w-48 h-4 border-3 border-foreground bg-card relative overflow-hidden"
              style={{ border: '3px solid hsl(var(--foreground))' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <span className="font-display text-2xl text-foreground tabular-nums">
              {count}%
            </span>
          </motion.div>
        </div>

        {/* Decorative dots */}
        <motion.div
          className="absolute top-10 right-10 w-8 h-8 bg-primary comic-circle"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        />
        <motion.div
          className="absolute bottom-16 left-12 w-5 h-5 bg-secondary comic-circle"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;

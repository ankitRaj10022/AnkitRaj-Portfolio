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
    const steps = 100;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(Math.round((step / steps) ** 2 * 100), 100);
      setCount(progress);
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setPhase("revealing"), 200);
        setTimeout(() => onComplete(), 900);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-foreground"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Reveal wipe */}
        <motion.div
          className="absolute inset-0 bg-background z-20"
          initial={{ scaleY: 0 }}
          animate={phase === "revealing" ? { scaleY: 1 } : { scaleY: 0 }}
          style={{ originY: 1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <motion.h1
            className="font-display text-[14vw] md:text-[8vw] text-primary-foreground leading-none"
            initial={{ y: 40, opacity: 0 }}
            animate={phase === "counting" ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Ankit Raj
          </motion.h1>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={phase === "counting" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-32 h-[2px] bg-primary-foreground/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary-foreground"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="font-body text-xs text-primary-foreground/50 tabular-nums w-8">
              {count}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;

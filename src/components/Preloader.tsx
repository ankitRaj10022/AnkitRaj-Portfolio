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
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-foreground cross-pattern"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Wipe transitions */}
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
          {/* Title */}
          <motion.div
            className="overflow-hidden"
            animate={phase === "revealing" ? { opacity: 0, scale: 1.5 } : {}}
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              className="font-display text-[12vw] md:text-[8vw] text-card leading-none poster-glitch"
              data-text="ANKIT RAJ"
              initial={{ y: 100, opacity: 0, rotate: -5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              ANKIT RAJ
            </motion.h1>
          </motion.div>

          {/* Info strip */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={phase === "counting" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-primary text-primary-foreground font-display text-[10px] px-3 py-0.5 border border-card/30">GAME DEV</span>
            <span className="text-card/30 font-display text-[10px]">✕</span>
            <span className="bg-secondary text-secondary-foreground font-display text-[10px] px-3 py-0.5 border border-card/30">SAAS</span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={phase === "counting" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="w-48 h-4 border-3 border-card bg-card/10 relative overflow-hidden"
              style={{ border: '3px solid hsl(var(--card))' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <span className="font-display text-2xl text-card tabular-nums">
              {count}%
            </span>
          </motion.div>

          {/* Loading text */}
          <motion.span
            className="font-body text-xs text-card/40 font-bold"
            initial={{ opacity: 0 }}
            animate={phase === "counting" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7 }}
          >
            Loading adventure...
          </motion.span>
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-6 left-6 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {["✦", "◆", "★"].map((c, i) => (
            <motion.span
              key={i}
              className="text-primary text-xs"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
            >
              {c}
            </motion.span>
          ))}
        </motion.div>
        <motion.span
          className="absolute top-6 right-6 font-display text-[9px] text-card/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          ✕ ✕ ✕
        </motion.span>
        <motion.span
          className="absolute bottom-6 left-6 font-display text-[8px] text-card/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          2024 ▸▸▸ FUTURE
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;

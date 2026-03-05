import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Click explosion effect - shows POW/ZAP/BAM on click
const clickWords = ["POW!", "ZAP!", "BAM!", "BOOM!", "WHAM!", "CRACK!", "KAPOW!"];
const colors = [
  "hsl(348 90% 55%)",
  "hsl(48 100% 60%)",
  "hsl(210 100% 56%)",
  "hsl(145 63% 49%)",
];

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  word: string;
  color: string;
  rotation: number;
}

export const ComicClickEffects = () => {
  const [effects, setEffects] = useState<ClickEffect[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, textarea, select")) return;

    const newEffect: ClickEffect = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      word: clickWords[Math.floor(Math.random() * clickWords.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 30 - 15,
    };

    setEffects((prev) => [...prev.slice(-4), newEffect]);
    setTimeout(() => {
      setEffects((prev) => prev.filter((e) => e.id !== newEffect.id));
    }, 800);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      <AnimatePresence>
        {effects.map((effect) => (
          <motion.div
            key={effect.id}
            className="absolute"
            style={{ left: effect.x, top: effect.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0, rotate: effect.rotation - 20, opacity: 1 }}
            animate={{ scale: 1.2, rotate: effect.rotation, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, y: -30 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              {/* Starburst behind */}
              <div
                className="absolute inset-[-20px] bg-current"
                style={{
                  color: effect.color,
                  clipPath:
                    "polygon(50% 0%, 63% 13%, 80% 5%, 78% 25%, 98% 30%, 87% 45%, 100% 60%, 83% 65%, 85% 85%, 68% 78%, 55% 95%, 48% 78%, 30% 90%, 30% 72%, 10% 68%, 22% 52%, 2% 40%, 20% 32%, 12% 15%, 32% 18%, 40% 2%)",
                }}
              />
              <span
                className="relative font-display text-2xl md:text-3xl text-foreground"
                style={{
                  textShadow: `
                    -2px -2px 0 ${effect.color},
                     2px -2px 0 ${effect.color},
                    -2px  2px 0 ${effect.color},
                     2px  2px 0 ${effect.color}
                  `,
                }}
              >
                {effect.word}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Speed lines background component
export const SpeedLines = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    <svg className="w-full h-full opacity-[0.07]" viewBox="0 0 100 100" preserveAspectRatio="none">
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const x2 = 50 + Math.cos(angle) * 80;
        const y2 = 50 + Math.sin(angle) * 80;
        return (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={x2}
            y2={y2}
            stroke="hsl(0 0% 8%)"
            strokeWidth="0.3"
          />
        );
      })}
    </svg>
  </div>
);

// Floating comic decorations
export const ComicDecorations = () => (
  <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
    {/* Floating stars */}
    <motion.div
      className="absolute top-[15%] left-[5%] w-8 h-8 bg-secondary comic-star opacity-20"
      animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
      transition={{ rotate: { repeat: Infinity, duration: 12, ease: "linear" }, scale: { repeat: Infinity, duration: 3 } }}
    />
    <motion.div
      className="absolute top-[60%] right-[8%] w-6 h-6 bg-primary comic-star opacity-15"
      animate={{ rotate: [360, 0], y: [0, -20, 0] }}
      transition={{ rotate: { repeat: Infinity, duration: 15, ease: "linear" }, y: { repeat: Infinity, duration: 4 } }}
    />
    <motion.div
      className="absolute bottom-[20%] left-[12%] w-4 h-4 bg-secondary comic-circle opacity-20"
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ repeat: Infinity, duration: 2.5 }}
    />
    <motion.div
      className="absolute top-[40%] right-[15%] w-3 h-3 bg-primary comic-circle opacity-15"
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
    />
  </div>
);

export default ComicClickEffects;

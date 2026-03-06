import { motion } from "framer-motion";

const posterData = [
  {
    text: "BOOM",
    top: "8%",
    left: "3%",
    rotate: -12,
    size: "w-28 h-36 md:w-36 md:h-44",
    bg: "bg-primary",
    delay: 0,
  },
  {
    text: "ZAP!",
    top: "25%",
    right: "4%",
    rotate: 8,
    size: "w-24 h-32 md:w-32 md:h-40",
    bg: "bg-secondary",
    delay: 0.5,
  },
  {
    text: "POW",
    top: "55%",
    left: "2%",
    rotate: 6,
    size: "w-20 h-28 md:w-28 md:h-36",
    bg: "bg-accent",
    delay: 1,
  },
  {
    text: "WHAM",
    top: "70%",
    right: "3%",
    rotate: -10,
    size: "w-24 h-30 md:w-30 md:h-38",
    bg: "bg-primary",
    delay: 1.5,
  },
  {
    text: "CRACK",
    top: "42%",
    left: "6%",
    rotate: -5,
    size: "w-22 h-28 md:w-28 md:h-34",
    bg: "bg-secondary",
    delay: 2,
  },
  {
    text: "BANG",
    top: "88%",
    right: "6%",
    rotate: 14,
    size: "w-20 h-26 md:w-26 md:h-32",
    bg: "bg-accent",
    delay: 0.8,
  },
];

const PosterCard = ({
  text,
  top,
  left,
  right,
  rotate,
  size,
  bg,
  delay,
}: {
  text: string;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  size: string;
  bg: string;
  delay: number;
}) => (
  <motion.div
    className={`absolute ${size} pointer-events-none`}
    style={{ top, left, right }}
    initial={{ opacity: 0, scale: 0.5, rotate: rotate - 20 }}
    animate={{ opacity: 1, scale: 1, rotate }}
    transition={{ delay: delay + 0.5, duration: 0.7, type: "spring", stiffness: 120 }}
  >
    <motion.div
      className={`w-full h-full ${bg} border-[3px] border-foreground relative overflow-hidden`}
      style={{ boxShadow: "6px 6px 0px hsl(var(--foreground))" }}
      animate={{
        y: [0, -8, 0],
        rotate: [rotate, rotate + 3, rotate - 2, rotate],
      }}
      transition={{
        y: { repeat: Infinity, duration: 3 + delay, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 5 + delay, ease: "easeInOut" },
      }}
    >
      {/* Halftone dots overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.4) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Diagonal stripes */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 4px, hsl(var(--foreground) / 0.3) 4px, hsl(var(--foreground) / 0.3) 5px)",
        }}
      />

      {/* Starburst shape behind text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[80%] h-[60%] bg-card/90"
          style={{
            clipPath:
              "polygon(50% 0%, 63% 13%, 80% 5%, 78% 25%, 98% 30%, 87% 45%, 100% 60%, 83% 65%, 85% 85%, 68% 78%, 55% 95%, 48% 78%, 30% 90%, 30% 72%, 10% 68%, 22% 52%, 2% 40%, 20% 32%, 12% 15%, 32% 18%, 40% 2%)",
          }}
        />
      </div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="font-display text-lg md:text-2xl text-foreground comic-outline relative z-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 + delay * 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-4 h-4 bg-foreground" />
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-foreground" />
    </motion.div>
  </motion.div>
);

const MotionPosters = () => (
  <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden opacity-40 dark:opacity-25">
    {posterData.map((poster, i) => (
      <PosterCard key={i} {...poster} />
    ))}
  </div>
);

export default MotionPosters;

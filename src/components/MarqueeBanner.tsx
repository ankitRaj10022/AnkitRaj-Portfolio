import { motion } from "framer-motion";

interface MarqueeBannerProps {
  text?: string;
  speed?: number;
  className?: string;
}

const MarqueeBanner = ({
  text = "Design — Develop — Create — Innovate — ",
  speed = 25,
  className = "",
}: MarqueeBannerProps) => {
  const repeated = Array(6).fill(text).join("");

  return (
    <div className={`overflow-hidden py-6 md:py-8 border-y border-foreground/10 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        <span className="font-display text-4xl md:text-6xl lg:text-8xl text-foreground/10 px-4">
          {repeated}
        </span>
        <span className="font-display text-4xl md:text-6xl lg:text-8xl text-foreground/10 px-4">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;

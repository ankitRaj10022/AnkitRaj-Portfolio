import { motion } from "framer-motion";

interface MarqueeBannerProps {
  text?: string;
  speed?: number;
  className?: string;
}

const MarqueeBanner = ({
  text = "DESIGN — DEVELOP — CREATE — INNOVATE — ",
  speed = 20,
  className = "",
}: MarqueeBannerProps) => {
  const repeated = Array(6).fill(text).join("");

  return (
    <div className={`overflow-hidden py-4 md:py-6 border-y-4 border-foreground bg-secondary ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        <span className="font-display text-3xl md:text-5xl lg:text-7xl text-foreground px-4">
          {repeated}
        </span>
        <span className="font-display text-3xl md:text-5xl lg:text-7xl text-foreground px-4">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;

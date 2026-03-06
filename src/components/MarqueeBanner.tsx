import { motion } from "framer-motion";

interface MarqueeBannerProps {
  text?: string;
  speed?: number;
  className?: string;
  variant?: "default" | "dark" | "accent";
}

const MarqueeBanner = ({
  text = "DESIGN — DEVELOP — CREATE — INNOVATE — ",
  speed = 20,
  className = "",
  variant = "default",
}: MarqueeBannerProps) => {
  const repeated = Array(6).fill(text).join("");

  const bgClass = variant === "dark"
    ? "bg-foreground"
    : variant === "accent"
    ? "bg-primary"
    : "bg-secondary";

  const textClass = variant === "dark"
    ? "text-card"
    : variant === "accent"
    ? "text-primary-foreground"
    : "text-secondary-foreground";

  return (
    <div className={`overflow-hidden py-4 md:py-6 border-y-4 border-foreground ${bgClass} relative ${className}`}>
      {/* Stripe overlay */}
      <div className="absolute inset-0 stripe-pattern opacity-30" />
      <motion.div
        className="flex whitespace-nowrap relative z-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        <span className={`font-display text-3xl md:text-5xl lg:text-7xl ${textClass} px-4`}>
          {repeated}
        </span>
        <span className={`font-display text-3xl md:text-5xl lg:text-7xl ${textClass} px-4`}>
          {repeated}
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;

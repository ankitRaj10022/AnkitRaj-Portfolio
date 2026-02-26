import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 400, mass: 0.3 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select");
      if (interactive) {
        setIsHovering(true);
        setHoverText(interactive.getAttribute("data-cursor") || "");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor], input, textarea, select")) {
        setIsHovering(false);
        setHoverText("");
      }
    };

    const handleLeave = () => setIsHidden(true);
    const handleEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHidden ? 0 : isHovering ? 0.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-4 h-4 bg-foreground border-2 border-card" style={{ borderRadius: 0 }} />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHidden ? 0 : isHovering ? 2 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div
          className="w-10 h-10 border-3 border-foreground bg-primary/30 flex items-center justify-center"
          style={{ border: '3px solid hsl(var(--foreground))' }}
        >
          {hoverText && isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[7px] uppercase font-display text-foreground whitespace-nowrap"
            >
              {hoverText}
            </motion.span>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;

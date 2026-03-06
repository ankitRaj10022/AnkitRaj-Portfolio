import { motion } from "framer-motion";

// ── Floating sticker elements ──
const Sticker = ({
  children,
  className = "",
  delay = 0,
  floatRange = 10,
  rotateRange = 5,
  duration = 4,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatRange?: number;
  rotateRange?: number;
  duration?: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    initial={{ scale: 0, opacity: 0, rotate: -20 }}
    animate={{ scale: 1, opacity: 1, rotate: 0 }}
    transition={{ delay: delay + 1, type: "spring", stiffness: 120 }}
  >
    <motion.div
      animate={{
        y: [0, -floatRange, 0],
        rotate: [-rotateRange, rotateRange, -rotateRange],
      }}
      transition={{
        y: { repeat: Infinity, duration, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: duration + 1.5, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

// ── Poster Card ──
const PosterCard = ({
  style,
  rotate,
  delay,
  children,
  width,
  height,
}: {
  style: React.CSSProperties;
  rotate: number;
  delay: number;
  children: React.ReactNode;
  width: string;
  height: string;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${width} ${height}`}
    style={style}
    initial={{ opacity: 0, scale: 0.3, rotate: rotate - 30 }}
    animate={{ opacity: 1, scale: 1, rotate }}
    transition={{ delay: delay + 0.8, duration: 0.9, type: "spring", stiffness: 80, damping: 12 }}
  >
    <motion.div
      className="w-full h-full relative"
      animate={{
        y: [0, -12, 0],
        rotate: [rotate, rotate + 4, rotate - 3, rotate],
      }}
      transition={{
        y: { repeat: Infinity, duration: 4.5 + delay, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 6 + delay, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

// ── Marquee strip ──
const MiniMarquee = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`overflow-hidden whitespace-nowrap ${className}`}>
    <motion.div
      className="flex gap-4"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
    >
      {[0, 1].map((k) => (
        <span key={k} className="font-display text-[8px] md:text-[10px] tracking-widest shrink-0">
          {text}
        </span>
      ))}
    </motion.div>
  </div>
);

// ── Poster 1: Hero-style title poster (top-left) ──
const Poster1 = () => (
  <PosterCard
    style={{ top: "3%", left: "1%" }}
    rotate={-8}
    delay={0}
    width="w-44 md:w-60 lg:w-72"
    height="h-56 md:h-72 lg:h-80"
  >
    <div className="w-full h-full bg-primary border-[3px] border-foreground relative overflow-hidden poster-noise"
      style={{ boxShadow: "8px 8px 0px hsl(var(--foreground))" }}>
      {/* Diagonal stripe bg */}
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 6px, hsl(var(--foreground) / 0.2) 6px, hsl(var(--foreground) / 0.2) 7px)",
      }} />
      {/* Top marquee */}
      <div className="bg-foreground text-card py-0.5 px-1">
        <MiniMarquee text="★ GAME DEV ★ SAAS ★ CODE ★ GAME DEV ★ SAAS ★ CODE ★ " />
      </div>
      {/* Main title stack */}
      <div className="p-3 md:p-4 relative z-10">
        <motion.span
          className="inline-block bg-secondary text-foreground font-display text-[8px] md:text-[10px] px-2 py-0.5 border border-foreground mb-2"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ▶ 2024 LIMITED EDITION
        </motion.span>
        <motion.h3
          className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground comic-outline leading-[0.85] mb-1"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          BUILD
        </motion.h3>
        <h3 className="font-display text-2xl md:text-4xl lg:text-5xl text-secondary leading-[0.85] comic-outline">
          WORLDS
        </h3>
        {/* Starburst accent */}
        <motion.div
          className="absolute top-8 right-2 w-10 h-10 md:w-14 md:h-14 bg-secondary"
          style={{
            clipPath: "polygon(50% 0%, 63% 13%, 80% 5%, 78% 25%, 98% 30%, 87% 45%, 100% 60%, 83% 65%, 85% 85%, 68% 78%, 55% 95%, 48% 78%, 30% 90%, 30% 72%, 10% 68%, 22% 52%, 2% 40%, 20% 32%, 12% 15%, 32% 18%, 40% 2%)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          <span className="absolute inset-0 flex items-center justify-center font-display text-[7px] md:text-[9px] text-foreground">
            NEW!
          </span>
        </motion.div>
      </div>
      {/* Bottom icons row */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-1">
        <div className="flex gap-1">
          {["✦", "◆", "●", "★"].map((c, i) => (
            <motion.span
              key={i}
              className="text-primary-foreground/60 text-[10px]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
            >
              {c}
            </motion.span>
          ))}
        </div>
        <span className="font-display text-[7px] text-primary-foreground/50">ANKIT RAJ</span>
      </div>
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-5 h-5 bg-secondary border-l-[2px] border-b-[2px] border-foreground" />
      <div className="absolute bottom-0 left-0 w-5 h-5 bg-secondary border-r-[2px] border-t-[2px] border-foreground" />
    </div>
  </PosterCard>
);

// ── Poster 2: Illustration style (top-right) ──
const Poster2 = () => (
  <PosterCard
    style={{ top: "8%", right: "1%" }}
    rotate={10}
    delay={0.6}
    width="w-36 md:w-52 lg:w-60"
    height="h-48 md:h-64 lg:h-72"
  >
    <div className="w-full h-full bg-secondary border-[3px] border-foreground relative overflow-hidden poster-noise"
      style={{ boxShadow: "-6px 8px 0px hsl(var(--foreground))" }}>
      {/* Halftone */}
      <div className="absolute inset-0 halftone-dense" />
      {/* Content */}
      <div className="p-3 md:p-4 relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="font-display text-[8px] text-foreground tracking-wider">ILLUSTRATION</span>
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="font-display text-[8px] text-foreground tracking-wider">FX</span>
          </div>
          <motion.div
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[0.8]"
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="poster-glitch" data-text="POW">POW</div>
          </motion.div>
          <div className="font-display text-lg md:text-xl text-primary leading-[0.8] mt-1">
            ER!
          </div>
        </div>
        {/* Doodle circles */}
        <div className="flex gap-2 items-end">
          {[12, 8, 16, 6].map((s, i) => (
            <motion.div
              key={i}
              className="border-2 border-foreground rounded-full"
              style={{ width: s, height: s }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
            />
          ))}
          <motion.span
            className="font-display text-[8px] text-foreground ml-auto"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            2024 ▸▸▸ FUTURE
          </motion.span>
        </div>
      </div>
      {/* Vertical text */}
      <motion.div
        className="absolute top-0 right-1 font-display text-[8px] text-foreground/30 tracking-[0.3em] writing-vertical"
        style={{ writingMode: "vertical-rl" }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        PACKAGE DESIGN
      </motion.div>
    </div>
  </PosterCard>
);

// ── Poster 3: Line-art / dark poster (mid-left) ──
const Poster3 = () => (
  <PosterCard
    style={{ top: "48%", left: "0%" }}
    rotate={5}
    delay={1.2}
    width="w-36 md:w-48 lg:w-56"
    height="h-44 md:h-56 lg:h-64"
  >
    <div className="w-full h-full bg-foreground border-[3px] border-foreground relative overflow-hidden poster-noise"
      style={{ boxShadow: "6px 6px 0px hsl(var(--primary))" }}>
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary-foreground) / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground) / 0.2) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />
      <div className="p-3 md:p-4 relative z-10 h-full flex flex-col">
        <span className="font-display text-[8px] text-primary tracking-wider mb-1">"LINEART"</span>
        <motion.div
          className="font-display text-3xl md:text-4xl lg:text-5xl text-card leading-[0.85]"
          animate={{ textShadow: [
            "0 0 10px hsl(348 100% 60% / 0)",
            "0 0 20px hsl(348 100% 60% / 0.6)",
            "0 0 10px hsl(348 100% 60% / 0)",
          ]}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          CODE
        </motion.div>
        <span className="font-display text-sm md:text-base text-primary leading-[0.8]">& CREATE</span>
        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-primary/40"
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
        {/* Bottom marquee */}
        <div className="mt-auto">
          <div className="bg-primary text-foreground py-0.5 -mx-3 md:-mx-4 px-1">
            <MiniMarquee text="★ #GAMEDEV ★ @ANKITRAJ ★ NINTH ★ ▸▸▸ ★ #GAMEDEV ★ @ANKITRAJ ★ " />
          </div>
        </div>
      </div>
      {/* Glowing corner */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 bg-primary/30"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
    </div>
  </PosterCard>
);

// ── Poster 4: Package design style (bottom-right) ──
const Poster4 = () => (
  <PosterCard
    style={{ top: "55%", right: "1%" }}
    rotate={-6}
    delay={1.8}
    width="w-40 md:w-52 lg:w-64"
    height="h-52 md:h-64 lg:h-72"
  >
    <div className="w-full h-full bg-accent border-[3px] border-foreground relative overflow-hidden poster-noise"
      style={{ boxShadow: "-8px 8px 0px hsl(var(--foreground))" }}>
      {/* Cross-hatch */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, hsl(var(--foreground) / 0.15) 4px, hsl(var(--foreground) / 0.15) 5px), repeating-linear-gradient(-45deg, transparent, transparent 4px, hsl(var(--foreground) / 0.15) 4px, hsl(var(--foreground) / 0.15) 5px)",
      }} />
      <div className="p-3 md:p-4 relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            className="w-6 h-6 md:w-8 md:h-8 bg-foreground rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            <span className="text-card text-[8px] md:text-[10px] font-display">AR</span>
          </motion.div>
          <div>
            <span className="font-display text-[7px] md:text-[9px] text-accent-foreground block leading-none">WISEMIND</span>
            <span className="font-display text-[6px] md:text-[8px] text-accent-foreground/60 block leading-none">ILLUSTRATION</span>
          </div>
        </div>
        <motion.div
          className="font-display text-3xl md:text-4xl lg:text-5xl text-accent-foreground leading-[0.8] mt-auto"
          animate={{ scale: [1, 1.03, 1], x: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 3.5 }}
        >
          SHIP
        </motion.div>
        <div className="font-display text-xl md:text-2xl text-foreground leading-[0.8]">
          FAST!
        </div>
        {/* Arrow animation */}
        <motion.div
          className="flex items-center gap-1 mt-2"
          animate={{ x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <span className="text-accent-foreground font-display text-xs">→</span>
          <span className="text-accent-foreground font-display text-xs">→</span>
          <span className="text-accent-foreground font-display text-xs">→</span>
          <span className="font-display text-[8px] text-accent-foreground/60">DEPLOY</span>
        </motion.div>
      </div>
      {/* Tape strip effect */}
      <motion.div
        className="absolute -top-1 left-1/4 w-12 h-4 bg-secondary/80 border border-foreground/30 rotate-[-5deg]"
        animate={{ rotate: [-5, -3, -5] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
    </div>
  </PosterCard>
);

// ── Poster 5: Mini badge poster (mid area) ──
const Poster5 = () => (
  <PosterCard
    style={{ top: "82%", left: "3%" }}
    rotate={-12}
    delay={2.2}
    width="w-28 md:w-36 lg:w-44"
    height="h-36 md:h-44 lg:h-52"
  >
    <div className="w-full h-full bg-card border-[3px] border-foreground relative overflow-hidden"
      style={{ boxShadow: "5px 5px 0px hsl(var(--foreground))" }}>
      <div className="p-2 md:p-3 relative z-10 h-full flex flex-col items-center justify-center text-center">
        <motion.div
          className="w-14 h-14 md:w-18 md:h-18 bg-primary rounded-full border-[3px] border-foreground flex items-center justify-center mb-2"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <span className="font-display text-lg md:text-xl text-primary-foreground">✦</span>
        </motion.div>
        <motion.span
          className="font-display text-xs md:text-sm text-foreground"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          9TH
        </motion.span>
        <span className="font-display text-[8px] text-foreground/50">ANNIVERSARY</span>
        {/* Radiating lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 100 100">
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return (
              <line key={i} x1="50" y1="50" x2={50 + Math.cos(a) * 50} y2={50 + Math.sin(a) * 50}
                stroke="hsl(0 0% 8%)" strokeWidth="0.5" />
            );
          })}
        </svg>
      </div>
    </div>
  </PosterCard>
);

// ── Poster 6: Bottom-right small poster ──
const Poster6 = () => (
  <PosterCard
    style={{ top: "85%", right: "2%" }}
    rotate={8}
    delay={2.5}
    width="w-32 md:w-40 lg:w-48"
    height="h-20 md:h-24 lg:h-28"
  >
    <div className="w-full h-full bg-primary border-[3px] border-foreground relative overflow-hidden"
      style={{ boxShadow: "4px 4px 0px hsl(var(--foreground))" }}>
      <div className="bg-foreground text-card py-0.5">
        <MiniMarquee text="◆ REACT ◆ UNITY ◆ UNREAL ◆ NODE ◆ TYPESCRIPT ◆ C# ◆ " />
      </div>
      <div className="p-2 flex items-center gap-2">
        <motion.span
          className="font-display text-xl md:text-2xl text-primary-foreground"
          animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          LUCKY
        </motion.span>
        <div className="flex gap-0.5">
          {["★", "★", "★"].map((s, i) => (
            <motion.span
              key={i}
              className="text-secondary text-xs"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  </PosterCard>
);

// ── Scattered floating stickers ──
const FloatingStickers = () => (
  <>
    {/* Emoji-style stickers */}
    <Sticker className="top-[18%] left-[20%] hidden lg:block" delay={1.5} floatRange={15}>
      <div className="w-8 h-8 bg-secondary border-2 border-foreground rounded-full flex items-center justify-center">
        <span className="text-sm">👾</span>
      </div>
    </Sticker>
    <Sticker className="top-[35%] right-[18%] hidden lg:block" delay={2} floatRange={12} rotateRange={8}>
      <div className="bg-primary text-primary-foreground font-display text-[9px] px-2 py-0.5 border-2 border-foreground" style={{ boxShadow: "2px 2px 0 hsl(var(--foreground))" }}>
        GOODLUCK ☺
      </div>
    </Sticker>
    <Sticker className="top-[65%] left-[22%] hidden lg:block" delay={2.5} floatRange={8}>
      <motion.div
        className="w-6 h-6 bg-accent border-2 border-foreground"
        style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />
    </Sticker>
    <Sticker className="top-[75%] right-[20%] hidden lg:block" delay={3} floatRange={10}>
      <div className="bg-foreground text-card font-display text-[8px] px-2 py-0.5 rounded-full">
        ▸▸▸ PEACE
      </div>
    </Sticker>
    {/* Floating arrow */}
    <Sticker className="top-[45%] left-[12%] hidden xl:block" delay={1.8} floatRange={20} duration={5}>
      <motion.span
        className="font-display text-2xl text-primary/40"
        animate={{ x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        →
      </motion.span>
    </Sticker>
    {/* X marks */}
    <Sticker className="top-[5%] right-[25%] hidden lg:block" delay={0.8}>
      <span className="font-display text-foreground/20 text-lg">✕</span>
    </Sticker>
    <Sticker className="top-[92%] left-[30%] hidden lg:block" delay={3.2}>
      <span className="font-display text-foreground/20 text-sm">✕ ✕ ✕</span>
    </Sticker>
  </>
);

const MotionPosters = () => (
  <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden opacity-50 dark:opacity-30">
    <Poster1 />
    <Poster2 />
    <Poster3 />
    <Poster4 />
    <Poster5 />
    <Poster6 />
    <FloatingStickers />
  </div>
);

export default MotionPosters;

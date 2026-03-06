import { Github, Linkedin, Twitter, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="py-8 md:py-10 px-4 md:px-8 lg:px-12 border-t-4 border-foreground bg-foreground relative overflow-hidden">
    {/* Top marquee strip */}
    <div className="absolute top-0 left-0 right-0 bg-secondary py-0.5 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[0, 1].map((k) => (
          <span key={k} className="font-display text-[8px] text-secondary-foreground/60 tracking-widest px-4">
            ★ @ANKITRAJ ★ GAME DEV ★ SAAS ★ REACT ★ UNITY ★ UNREAL ★ NODE ★ ▸▸▸ ★ @ANKITRAJ ★ GAME DEV ★ SAAS ★ REACT ★ UNITY ★ UNREAL ★ NODE ★ ▸▸▸
          </span>
        ))}
      </motion.div>
    </div>

    <div className="max-w-7xl mx-auto pt-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-display text-2xl text-card poster-glitch" data-text="ANKIT RAJ">
            ANKIT RAJ
          </span>
          <span className="font-body text-xs text-card/50 font-bold uppercase">
            Game Dev · SaaS Builder
          </span>
          <div className="flex gap-1 mt-1">
            {["✦", "◆", "★"].map((c, i) => (
              <motion.span
                key={i}
                className="text-primary/40 text-[10px]"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Github, label: "GitHub" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: Twitter, label: "Twitter" },
            { icon: Gamepad2, label: "Itch.io" },
          ].map(({ icon: Icon, label }) => (
            <motion.a
              key={label}
              href="#"
              className="w-9 h-9 border-2 border-card bg-card/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200 text-card"
              style={{ boxShadow: '2px 2px 0px hsl(var(--primary) / 0.3)' }}
              aria-label={label}
              whileHover={{ y: -3, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col md:items-end gap-1">
          <p className="font-body text-xs text-card/50 font-bold">
            © 2026 All rights reserved.
          </p>
          <p className="font-body text-[10px] text-card/30 font-bold uppercase">
            Designed & Built by Ankit Raj
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

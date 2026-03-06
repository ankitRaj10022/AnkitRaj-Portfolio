import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Moon, Sun } from "lucide-react";

const navItems = [
  { label: "WORK", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-foreground/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleClick("#hero")}
            className="font-display text-2xl md:text-3xl text-card-foreground hover:text-primary transition-colors poster-glitch"
            data-text="ANKIT!"
          >
            ANKIT<span className="text-primary">!</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-foreground/80 border-3 px-2 py-1"
              style={{ border: '3px solid hsl(var(--card))' }}
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="font-display text-sm text-card hover:bg-primary hover:text-primary-foreground px-3 py-1.5 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <motion.button
              onClick={() => setDark(!dark)}
              className="ml-3 w-10 h-10 border-2 border-card bg-foreground/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-card"
              style={{ boxShadow: '2px 2px 0px hsl(var(--primary) / 0.4)' }}
              whileTap={{ scale: 0.85, rotate: 20 }}
              whileHover={{ rotate: -10 }}
              aria-label="Toggle dark mode"
              data-cursor="Theme"
            >
              <AnimatePresence mode="wait">
                {dark ? (
                  <motion.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2, type: "spring" }}>
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }} transition={{ duration: 0.2, type: "spring" }}>
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <a
              href="/resume.pdf"
              download
              className="ml-3 inline-flex items-center gap-2 font-display text-sm text-primary-foreground bg-primary px-5 py-2 comic-btn"
              data-cursor="Download"
            >
              <Download size={14} />
              RESUME
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={() => setDark(!dark)}
              className="text-card p-2 border-2 border-card bg-foreground/80"
              whileTap={{ scale: 0.85, rotate: 20 }}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <button
              className="text-card p-2 border-2 border-card bg-foreground/80"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-foreground border-b-4 border-card"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="font-display text-lg text-card hover:text-primary transition-colors text-left px-2 py-1"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 font-display text-base text-primary mt-2"
              >
                <Download size={16} />
                DOWNLOAD RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

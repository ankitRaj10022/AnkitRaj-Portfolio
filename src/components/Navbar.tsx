import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const navItems = [
  { label: "WORK", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        scrolled ? "bg-secondary/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleClick("#hero")}
            className="font-display text-2xl md:text-3xl text-foreground comic-outline hover:text-primary transition-colors"
          >
            ANKIT<span className="text-primary">!</span>
          </button>

          {/* Desktop nav - comic panel style */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-card border-3 border-foreground px-2 py-1"
              style={{ border: '3px solid hsl(var(--foreground))' }}
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="font-display text-sm text-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1.5 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <a
              href="/resume.pdf"
              download
              className="ml-4 inline-flex items-center gap-2 font-display text-sm text-primary-foreground bg-primary px-5 py-2 comic-btn"
              data-cursor="Download"
            >
              <Download size={14} />
              RESUME
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground p-2 border-2 border-foreground bg-card"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b-4 border-foreground"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="font-display text-lg text-foreground hover:text-primary transition-colors text-left px-2 py-1"
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

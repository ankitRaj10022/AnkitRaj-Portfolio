import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const navItems = [
  { label: "works", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
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
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-14 md:h-20">
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => handleClick("#hero")}
              className="font-display text-xl md:text-2xl text-foreground hover:text-accent transition-colors uppercase tracking-tight"
            >
              ANKIT<span className="text-accent">.</span>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="font-body text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-accent transition-colors duration-300 px-1"
              >
                {item.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              download
              className="ml-4 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-background bg-accent px-5 py-2.5 hover:bg-foreground transition-all duration-300 cursor-none"
              data-cursor="Download"
            >
              <Download size={12} />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground p-2"
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
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="font-body text-base text-foreground hover:text-accent transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 font-body text-sm text-accent"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

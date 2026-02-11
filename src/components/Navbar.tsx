import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "works", href: "#projects" },
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-14 md:h-20">
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => handleClick("#hero")}
              className="font-serif text-sm md:text-base text-foreground hover:text-primary transition-colors"
            >
              Patrick David
            </button>
            <span className="hidden md:inline font-body text-xs uppercase tracking-widest text-muted-foreground">
              UX/UI Designer, Developer
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <span key={item.href} className="flex items-center">
                <button
                  onClick={() => handleClick(item.href)}
                  className="font-body text-sm text-foreground hover:text-primary transition-colors px-2"
                >
                  {item.label}
                </button>
                {i < navItems.length - 1 && (
                  <span className="text-muted-foreground text-xs">,</span>
                )}
              </span>
            ))}
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
                  className="font-body text-base text-foreground hover:text-primary transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

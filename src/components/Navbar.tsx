import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const navItems = [
{ label: "works", href: "#projects" },
{ label: "skills", href: "#skills" },
{ label: "about", href: "#about" },
{ label: "contact", href: "#contact" }];


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
      scrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"}`
      }>

      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-14 md:h-20">
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => handleClick("#hero")}
              className="font-serif text-lg md:text-base text-foreground hover:text-primary transition-colors">

              ​Ankit Raj 
            </button>
            <span className="hidden md:inline font-body text-xs uppercase tracking-widest text-muted-foreground">
              Software Engineer | Full-Stack & Game Development
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) =>
            <span key={item.href} className="flex items-center">
                <button
                onClick={() => handleClick(item.href)}
                className="font-body text-sm text-foreground hover:text-primary transition-colors px-2">

                  {item.label}
                </button>
                {i < navItems.length - 1 &&
              <span className="text-muted-foreground text-xs">,</span>
              }
              </span>
            )}
            <a
              href="/resume.pdf"
              download
              className="ml-4 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-background bg-foreground px-4 py-2 hover:bg-accent hover:text-background transition-all duration-300 cursor-none border-4 border-double rounded-full"
              data-cursor="Download">

              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}>

            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">

            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) =>
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="font-body text-base text-foreground hover:text-primary transition-colors text-left">
                  {item.label}
                </button>
            )}
              <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 font-body text-sm text-foreground hover:text-primary transition-colors">

                <Download size={16} />
                Download Resume
              </a>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.nav>);

};

export default Navbar;
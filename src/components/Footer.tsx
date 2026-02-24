import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="py-8 md:py-12 px-6 md:px-10 lg:px-16 border-t border-border bg-card">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left */}
        <div className="flex flex-col gap-2">
          <span className="font-display text-2xl text-foreground uppercase tracking-tight">
            Ankit Raj
          </span>
          <span className="font-body text-xs text-muted-foreground uppercase tracking-widest">
            Software Engineer
          </span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300" aria-label="GitHub">
            <Github className="w-4 h-4" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-300" aria-label="Twitter">
            <Twitter className="w-4 h-4" />
          </a>
        </div>

        {/* Right */}
        <div className="flex flex-col md:items-end gap-1">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 All rights reserved.
          </p>
          <p className="font-body text-[10px] text-muted-foreground/50 uppercase tracking-widest">
            Designed & Developed by Ankit Raj
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

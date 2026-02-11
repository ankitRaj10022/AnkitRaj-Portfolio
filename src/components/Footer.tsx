import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="py-8 px-4 border-t border-border bg-card/50">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-heading text-2xl text-primary font-bold">Portfolio</span>
      <div className="flex items-center gap-4">
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
          <Github className="w-5 h-5" />
        </a>
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
          <Twitter className="w-5 h-5" />
        </a>
      </div>
      <p className="font-body text-sm text-muted-foreground">
        © 2026 All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;

import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () =>
<footer className="py-8 px-6 md:px-10 lg:px-16 border-t border-border">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-serif text-sm text-foreground">​AnkitRaj</span>
      <div className="flex items-center gap-6">
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
          <Github className="w-4 h-4" />
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
          <Twitter className="w-4 h-4" />
        </a>
      </div>
      <p className="font-body text-xs text-muted-foreground">
        © 2026 All rights reserved.
      </p>
    </div>
  </footer>;


export default Footer;
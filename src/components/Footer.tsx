import { Github, Linkedin, Twitter, Gamepad2 } from "lucide-react";

const Footer = () => (
  <footer className="py-8 md:py-10 px-4 md:px-8 lg:px-12 border-t-4 border-foreground bg-card">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-display text-2xl text-foreground comic-outline">
            ANKIT RAJ
          </span>
          <span className="font-body text-xs text-foreground/70 font-bold uppercase">
            Game Dev · SaaS Builder
          </span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: Github, label: "GitHub" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: Twitter, label: "Twitter" },
            { icon: Gamepad2, label: "Itch.io" },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="w-9 h-9 border-2 border-foreground bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-foreground"
              style={{ boxShadow: '2px 2px 0px hsl(var(--foreground))' }}
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <div className="flex flex-col md:items-end gap-1">
          <p className="font-body text-xs text-foreground/70 font-bold">
            © 2026 All rights reserved.
          </p>
          <p className="font-body text-[10px] text-foreground/50 font-bold uppercase">
            Designed & Built by Ankit Raj
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

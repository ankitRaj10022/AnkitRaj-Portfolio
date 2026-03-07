import { Github, Linkedin, Twitter, Gamepad2 } from "lucide-react";

const Footer = () => (
  <footer className="py-8 px-6 md:px-10 lg:px-16 border-t border-foreground/10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <span className="font-body text-sm text-foreground/50">© 2026 Ankit Raj</span>
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
            className="text-foreground/30 hover:text-foreground transition-colors duration-300"
            aria-label={label}
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;

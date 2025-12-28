import { Github, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-slate-900 bg-slate-950 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-center md:text-left">
          <p className="text-sm text-slate-500">
            © 2025 QR Master. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Built with Next.js & Tailwind by <span className="text-slate-400 font-medium">Gökhan Yıldan</span>.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <SocialLink href="https://www.gokhanyildan.com" icon={Globe} label="Website" />
          <SocialLink href="https://www.linkedin.com/in/gokhanyildan" icon={Linkedin} label="LinkedIn" />
          <SocialLink href="https://github.com/gokhanyildan" icon={Github} label="GitHub" />
        </div>

      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-slate-500 hover:text-indigo-400 transition-colors"
      aria-label={label}
    >
      <Icon size={20} />
    </a>
  );
}
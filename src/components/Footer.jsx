import { Github, Linkedin, Mail, Send, MapPin, Phone, MessageCircle, ArrowUp } from "lucide-react";
import { personalInfo, socialLinks } from "../data/personalData";

const Footer = () => {
  const year = new Date().getFullYear();
  const iconMap = { Github, Linkedin, Send, Mail };

  return (
    <footer className="relative border-t border-white/6 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-emerald-500/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-black text-sm font-black">
                S
              </span>
              <h3 className="text-xl font-bold text-white">
                {personalInfo.name}
                <span className="text-emerald-400">.</span>
              </h3>
            </div>
            <p className="text-neutral-500 text-sm mb-5 max-w-sm">
              Fullstack developer crafting modern, fast and user-friendly web experiences.
            </p>

            <div className="space-y-2 text-sm text-neutral-400">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400" /> {personalInfo.location}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400" /> {personalInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-400" /> {personalInfo.email}
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="md:text-right">
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-3 md:justify-end">
              <a
                href="https://t.me/shahriyorjs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Channel"
                title="Telegram Channel"
                className="p-2.5 rounded-xl glass text-neutral-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:-translate-y-1 transition-all"
              >
                <MessageCircle size={18} />
              </a>
              {socialLinks.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="p-2.5 rounded-xl glass text-neutral-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:-translate-y-1 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <p className="text-sm text-neutral-600">
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="p-2.5 rounded-xl glass text-neutral-400 hover:text-emerald-300 hover:border-emerald-500/40 transition-all"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Github, Linkedin, Mail, Send, MapPin, Phone, MessageCircle } from "lucide-react";
import { personalInfo, socialLinks } from "../data/personalData";

const Footer = () => {
  const year = new Date().getFullYear();
  const iconMap = { Github, Linkedin, Send, Mail };

  return (
    <footer className="bg-black border-t border-neutral-900">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {personalInfo.name}
            </h3>

            <div className="space-y-2 text-sm text-neutral-400">
              <p className="flex items-center gap-2">
                <MapPin size={14} /> {personalInfo.location}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> {personalInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} /> {personalInfo.email}
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="md:text-right">
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-3 md:justify-end">
              <a
                href="https://t.me/shahriyor_js"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Channel"
                className="p-2 border border-neutral-800 text-neutral-500 hover:text-white hover:border-neutral-600 transition-colors"
                title="Telegram Channel"
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
                    className="p-2 border border-neutral-800 text-neutral-500 hover:text-white hover:border-neutral-600 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-neutral-600">
            © {year} {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

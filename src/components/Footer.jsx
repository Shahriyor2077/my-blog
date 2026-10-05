import { ArrowUp, ArrowUpRight } from "lucide-react";
import { personalInfo, socialLinks } from "../data/personalData";
import { Accent, TashkentTime } from "./ui";

const nav = [
  { id: "portfolio", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-semibold leading-tight tracking-tight">
              Let's build something <Accent>worth</Accent> remembering.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group mt-4 inline-flex items-center gap-2 py-2 text-mute transition-colors hover:text-acid"
            >
              {personalInfo.email}
              <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-dim">Navigation</p>
            <ul className="space-y-0.5">
              {nav.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToSection(l.id)}
                    className="inline-block py-1.5 text-mute transition-colors hover:text-bone"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-dim">Socials</p>
            <ul className="space-y-0.5">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 py-1.5 text-mute transition-colors hover:text-bone"
                  >
                    {s.name}
                    <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45 group-hover:text-acid" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-16 select-none bg-linear-to-b from-white/14 to-transparent bg-clip-text text-center font-display text-[18vw] font-bold leading-[0.8] tracking-[-0.06em] text-transparent"
      >
        Shahriyor
      </p>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personalInfo.name}. Crafted in Tashkent.
          </p>
          <p className="font-mono text-xs">
            Tashkent · <TashkentTime /> GMT+5
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 py-2 transition-colors hover:text-bone"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

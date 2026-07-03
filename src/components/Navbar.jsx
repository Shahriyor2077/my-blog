import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      for (let i = links.length - 1; i >= 0; i--) {
        const el = document.getElementById(links[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(links[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-lg font-bold text-white group"
          >
            <span className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-black text-sm font-black group-hover:rotate-6 transition-transform">
              S
            </span>
            Shahriyor
            <span className="text-emerald-400">.</span>
          </button>

          <div className="hidden md:flex items-center gap-1 p-1 rounded-full glass">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className={`relative px-4 py-1.5 text-sm rounded-full transition-colors ${
                  activeSection === l.id
                    ? "text-black font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {activeSection === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-400 to-teal-400"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/10 transition-colors"
          >
            <Sparkles size={14} />
            Hire Me
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-white/6"
            >
              <div className="py-4 space-y-1">
                {links.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollToSection(l.id)}
                    className={`block w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors ${
                      activeSection === l.id
                        ? "text-emerald-400 bg-emerald-500/10 font-medium"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm rounded-xl text-emerald-300 border border-emerald-500/30 mt-2"
                >
                  <Sparkles size={14} />
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

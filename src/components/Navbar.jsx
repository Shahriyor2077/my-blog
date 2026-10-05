import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { socialLinks } from "../data/personalData";

const links = [
  { id: "portfolio", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) current = l.id;
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = (id) => {
    document.body.style.overflow = "";
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    document.body.style.overflow = "";
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-acid"
      />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pl-2 pr-2 transition-all duration-500 ${
            scrolled || isOpen
              ? "border-white/10 bg-ink/75 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <button onClick={scrollToTop} className="group flex items-center gap-2.5" aria-label="Back to top">
            <span className="grid size-9 place-items-center rounded-full bg-acid font-display text-sm font-bold text-ink transition-transform duration-700 group-hover:rotate-360">
              SZ
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight">
              Shahriyor<span className="text-acid">.</span>
            </span>
          </button>

          <div className="hidden items-center md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className={`relative px-4 py-2 text-sm transition-colors ${
                  active === l.id ? "text-bone" : "text-mute hover:text-bone"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-dot"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-acid"
                  />
                )}
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection("contact")}
              className="group hidden items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-acid sm:inline-flex"
            >
              Let's talk
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="grid size-10 place-items-center rounded-full border border-white/10 text-bone md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 md:hidden"
          >
            <nav className="flex flex-col">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 * i + 0.1, ease }}
                  onClick={() => scrollToSection(l.id)}
                  className="flex items-baseline gap-4 border-b border-white/8 py-4 text-left"
                >
                  <span className="font-mono text-xs text-acid">0{i + 1}</span>
                  <span
                    className={`font-display text-4xl font-semibold tracking-tight ${
                      active === l.id ? "text-acid" : ""
                    }`}
                  >
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-mute"
                >
                  {s.name}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

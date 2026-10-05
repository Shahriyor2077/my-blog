import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowDown, ArrowUpRight } from "lucide-react";
import { personalInfo, projects, skills } from "../../data/personalData";
import { Magnetic, TashkentTime, CountUp } from "../ui";

const ease = [0.22, 1, 0.36, 1];
const words = ["convert.", "scale.", "perform.", "stand out."];

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const host = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

// One headline line that slides up from behind a mask
const Line = ({ children, delay }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
);

const RotatingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-flex overflow-hidden pb-[0.12em] pr-[0.12em] align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="font-serif font-normal italic tracking-normal text-acid"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// A floating browser-window screenshot that drifts with the cursor
const StackCard = ({ project, mx, my, depth, className, tilt }) => {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);

  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <div
        className={`rounded-xl border border-white/10 bg-ink-2/90 p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur ${tilt}`}
      >
        <div className="flex items-center gap-1.5 px-2 pb-1.5 pt-0.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="ml-2 truncate font-mono text-[10px] text-dim">{host(project.url)}</span>
        </div>
        <img
          src={project.image}
          alt={project.title}
          className="aspect-16/10 w-full rounded-lg object-cover object-top"
        />
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 });

  const techCount = skills.technicalSkills.reduce((n, c) => n + c.skills.length, 0);
  // Skip the 3 featured projects so the hero doesn't repeat what "Selected work" shows
  const stack = projects.length > 6 ? projects.slice(3, 6) : projects.slice(0, 3);

  const stats = [
    { value: <CountUp to={projects.length} suffix="+" />, label: "Projects shipped" },
    { value: <CountUp to={techCount} suffix="+" />, label: "Technologies" },
    { value: <CountUp to={1} suffix="+" />, label: "Years of experience" },
    { value: <TashkentTime />, label: "Local time in Tashkent" },
  ];

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
    mxRaw.set(x / r.width - 0.5);
    myRaw.set(y / r.height - 0.5);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMove}
      className="relative flex min-h-svh flex-col overflow-hidden pt-28"
    >
      {/* Backdrop */}
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(650px circle at var(--x, 70%) var(--y, 35%), rgba(200,245,59,0.08), transparent 45%)",
        }}
      />
      <div className="pointer-events-none absolute -right-40 -top-40 size-[600px] rounded-full bg-acid/10 blur-[160px]" />

      <div className="relative mx-auto grid w-full grid-cols-1 max-w-6xl flex-1 items-center gap-12 px-6 lg:grid-cols-12">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-acid/30 bg-acid/10 px-3.5 py-1.5 text-xs font-medium text-acid">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-acid opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-acid" />
              </span>
              Available for new projects
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-dim">
              {personalInfo.title} — Tashkent
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.9rem,7.2vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            <Line delay={0.1}>I build digital</Line>
            <Line delay={0.18}>products that</Line>
            <Line delay={0.26}>
              <RotatingWord />
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-mute"
          >
            I'm <span className="text-bone">{personalInfo.name}</span> — a fullstack developer
            from Tashkent. I design and ship fast, polished web apps with React, Next.js and
            NestJS, from first idea to launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <Magnetic>
              <a
                href="#contact"
                onClick={scrollTo("contact")}
                className="group inline-flex items-center gap-3 rounded-full bg-acid py-2 pl-6 pr-2 font-medium text-ink shadow-[0_15px_50px_-15px_rgba(200,245,59,0.55)]"
              >
                Start a project
                <span className="grid size-10 place-items-center rounded-full bg-ink text-acid transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowRight size={17} />
                </span>
              </a>
            </Magnetic>
            <a
              href="#portfolio"
              onClick={scrollTo("portfolio")}
              className="group inline-flex items-center gap-2 py-2 font-medium text-bone"
            >
              <span className="border-b border-white/25 pb-0.5 transition-colors group-hover:border-acid">
                See my work
              </span>
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
            </a>
          </motion.div>
        </div>

        {/* Floating project stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
          className="relative hidden h-[520px] lg:col-span-5 lg:block"
        >
          {stack[0] && (
            <StackCard project={stack[0]} mx={mx} my={my} depth={-18} tilt="rotate-5" className="right-0 top-0 w-[86%]" />
          )}
          {stack[1] && (
            <StackCard project={stack[1]} mx={mx} my={my} depth={28} tilt="-rotate-6" className="left-0 top-[30%] z-10 w-[80%]" />
          )}
          {stack[2] && (
            <StackCard project={stack[2]} mx={mx} my={my} depth={48} tilt="rotate-2" className="bottom-0 right-[4%] z-20 w-[74%]" />
          )}

          <a
            href="#contact"
            onClick={scrollTo("contact")}
            aria-label="Contact me"
            className="group absolute -left-6 bottom-4 z-30 grid size-32 place-items-center rounded-full bg-acid text-ink shadow-[0_20px_60px_-15px_rgba(200,245,59,0.5)]"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_16s_linear_infinite]" aria-hidden="true">
              <defs>
                <path id="hero-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fill="currentColor" style={{ fontSize: "8.4px", letterSpacing: "1.9px", fontFamily: "var(--font-mono)" }}>
                <textPath href="#hero-circle">AVAILABLE FOR WORK • LET'S TALK • </textPath>
              </text>
            </svg>
            <ArrowUpRight size={28} className="transition-transform duration-500 group-hover:rotate-45" />
          </a>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative mx-auto mt-16 w-full max-w-6xl px-6 pb-10"
      >
        <div className="grid grid-cols-2 gap-y-6 border-t border-white/8 pt-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

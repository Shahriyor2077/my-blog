import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, useSpring } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// Fades and lifts its children into view once
export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

// Italic serif highlight used inside display headings
export const Accent = ({ children }) => (
  <em className="font-serif font-normal italic tracking-normal text-acid">{children}</em>
);

export const SectionHeader = ({ index, label, title, aside }) => (
  <div className="mb-14 grid grid-cols-1 gap-6 md:mb-20 md:grid-cols-12 md:items-end">
    <div className="md:col-span-8">
      <Reveal>
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          <span className="text-acid">({index})</span> — {label}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
          {title}
        </h2>
      </Reveal>
    </div>
    {aside && (
      <Reveal delay={0.1} className="md:col-span-4">
        <p className="leading-relaxed text-mute md:text-right">{aside}</p>
      </Reveal>
    )}
  </div>
);

// Pulls its child slightly toward the cursor
export const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

const tashkentFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Tashkent",
  hour: "2-digit",
  minute: "2-digit",
});

export const TashkentTime = ({ className = "" }) => {
  const [time, setTime] = useState(() => tashkentFormat.format(new Date()));

  useEffect(() => {
    const t = setInterval(() => setTime(tashkentFormat.format(new Date())), 15000);
    return () => clearInterval(t);
  }, []);

  return <span className={className}>{time}</span>;
};

// Counts from 0 to `to` the first time it scrolls into view
export const CountUp = ({ to, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

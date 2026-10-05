import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../../data/personalData";
import { Reveal, SectionHeader, Accent } from "../ui";

const shortNames = {
  "Programming Languages": "Languages",
  Frontend: "Frontend",
  "Backend & Databases": "Backend",
  "Tools & Others": "Tools",
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const Toolbox = () => {
  const [active, setActive] = useState(1);
  const categories = skills.technicalSkills;
  const total = categories.reduce((n, c) => n + c.skills.length, 0);

  return (
    <section id="skills" className="relative border-t border-white/8 py-20 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index="04"
          label="Toolbox"
          title={
            <>
              The <Accent>stack</Accent> I work with
            </>
          }
          aside={`${total} technologies I use day to day — chosen for speed, reliability and a great developer experience.`}
        />

        <Reveal className="mb-10 flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button
              key={c.category}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active === i ? "text-ink" : "border border-white/10 text-mute hover:text-bone"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="toolbox-tab"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-acid"
                />
              )}
              <span className="relative">
                {shortNames[c.category] || c.category}
                <span className="ml-2 font-mono text-xs opacity-60">{c.skills.length}</span>
              </span>
            </button>
          ))}
        </Reveal>

        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={list}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-wrap gap-3"
            >
              {categories[active].skills.map((s) => (
                <motion.span
                  key={s.name}
                  variants={item}
                  className="cursor-default rounded-2xl border border-white/10 bg-ink-2 px-6 py-4 font-display text-xl font-medium tracking-tight transition-colors hover:border-acid hover:text-acid md:text-2xl"
                >
                  {s.name}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Toolbox;

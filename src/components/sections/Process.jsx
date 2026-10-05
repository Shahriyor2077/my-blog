import { processSteps } from "../../data/personalData";
import { Reveal, SectionHeader, Accent } from "../ui";

const Process = () => (
  <section id="process" className="relative border-t border-white/8 py-20 sm:py-28 md:py-36">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeader
        index="05"
        label="Process"
        title={
          <>
            How we'll <Accent>work</Accent> together
          </>
        }
        aside="A simple, transparent process — you always know what's happening and what comes next."
      />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08} className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-ink-2">
            <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-acid transition-transform duration-700 group-hover:scale-x-100" />
            <p className="text-outline mb-10 font-display md:mb-16 text-6xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-acid">
              0{i + 1}
            </p>
            <h3 className="mb-3 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="text-sm leading-relaxed text-mute">{s.description}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Process;

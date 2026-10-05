import { AppWindow, Rocket, Server, Plus } from "lucide-react";
import { services } from "../../data/personalData";
import { Reveal, SectionHeader, Accent } from "../ui";

const icons = { AppWindow, Rocket, Server };

const Services = () => (
  <section id="services" className="relative border-t border-white/8 py-20 sm:py-28 md:py-36">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeader
        index="02"
        label="Services"
        title={
          <>
            What I can <Accent>do</Accent> for you
          </>
        }
        aside="End-to-end development — I can take your idea from a blank page to a production-ready product, or join your team where you need it."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon] || AppWindow;
          return (
            <Reveal key={s.id} delay={i * 0.08} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-ink-2 p-8 transition-colors duration-500 hover:border-acid/40">
                <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-acid/0 blur-3xl transition-colors duration-700 group-hover:bg-acid/15" />

                <div className="relative mb-12 flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/10 text-acid transition-all duration-500 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
                    <Icon size={22} />
                  </span>
                  <span className="font-mono text-xs text-dim">0{i + 1}</span>
                </div>

                <h3 className="relative mb-3 font-display text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="relative mb-8 text-sm leading-relaxed text-mute">{s.description}</p>

                <ul className="relative space-y-2.5 border-t border-white/8 pt-6">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-sm text-bone/80">
                      <Plus size={14} className="shrink-0 text-acid" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;

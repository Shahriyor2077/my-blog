import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { projects } from "../../data/personalData";
import { Reveal, SectionHeader, Accent } from "../ui";

const FEATURED = 3;
const INITIAL = 6;
const ease = [0.22, 1, 0.36, 1];

const host = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const Chips = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items?.map((t) => (
      <span
        key={t}
        className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-mute"
      >
        {t}
      </span>
    ))}
  </div>
);

const FeaturedProject = ({ project, index }) => {
  const flip = index % 2 === 1;

  return (
    <Reveal className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className={`relative block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      >
        <div className="absolute -inset-6 rounded-[2rem] bg-acid/0 blur-3xl transition-colors duration-700 group-hover:bg-acid/10" />
        <div className="relative rounded-2xl border border-white/10 bg-ink-2 p-2 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2">
          <div className="flex items-center gap-1.5 px-2.5 pb-2 pt-1">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-xs text-dim">
              {host(project.url)}
            </span>
          </div>
          <div className="aspect-11/5 overflow-hidden rounded-xl bg-ink-3">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-1200 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </a>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          <span className="text-acid">{String(index + 1).padStart(2, "0")}</span> / Featured
        </p>
        <h3 className="mb-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {project.title}
        </h3>
        <p className="mb-6 max-w-md leading-relaxed text-mute">{project.description}</p>
        <Chips items={project.technologies} />
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-8 inline-flex items-center gap-3 font-medium"
        >
          <span className="border-b border-acid/50 pb-0.5 transition-colors group-hover/link:border-acid">
            Visit live site
          </span>
          <span className="grid size-9 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover/link:border-acid group-hover/link:bg-acid group-hover/link:text-ink">
            <ArrowUpRight size={16} />
          </span>
        </a>
      </div>
    </Reveal>
  );
};

const ProjectCard = ({ project, number }) => {
  const Wrapper = project.url ? "a" : "div";
  const linkProps = project.url
    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-2 transition-colors duration-500 hover:border-acid/40"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-ink-3">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink-2 via-transparent to-transparent" />
        {project.url && (
          <span className="absolute right-4 top-4 grid size-10 scale-50 place-items-center rounded-full bg-acid text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-acid">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-dim">{number}</span>
        </div>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-mute">{project.description}</p>
        <div className="mt-auto">
          <Chips items={project.technologies?.slice(0, 3)} />
        </div>
      </div>
    </Wrapper>
  );
};

const Work = () => {
  const [showAll, setShowAll] = useState(false);
  const featured = projects.slice(0, FEATURED);
  const rest = projects.slice(FEATURED);
  const visible = showAll ? rest : rest.slice(0, INITIAL);

  const toggle = () => {
    if (showAll) document.getElementById("more-projects")?.scrollIntoView({ behavior: "smooth" });
    setShowAll((v) => !v);
  };

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index="01"
          label="Selected work"
          title={
            <>
              Projects I'm <Accent>proud</Accent> of
            </>
          }
          aside={`${projects.length} shipped products — from AI-powered sales platforms to marketplaces, dashboards and landing pages.`}
        />

        <div className="space-y-24 md:space-y-32">
          {featured.map((p, i) => (
            <FeaturedProject key={p.id} project={p} index={i} />
          ))}
        </div>

        {rest.length > 0 && (
          <div id="more-projects" className="mt-28 scroll-mt-28 md:mt-36">
            <Reveal className="mb-10 flex items-end justify-between gap-6 border-b border-white/8 pb-6">
              <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                More projects
              </h3>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-dim">
                {rest.length} more
              </span>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                >
                  <ProjectCard project={p} number={String(i + FEATURED + 1).padStart(2, "0")} />
                </motion.div>
              ))}
            </div>

            {rest.length > INITIAL && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={toggle}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition-colors hover:border-acid hover:text-acid"
                >
                  {showAll ? (
                    <>
                      Show less <Minus size={16} />
                    </>
                  ) : (
                    <>
                      Show all {rest.length} projects
                      <Plus size={16} className="transition-transform duration-300 group-hover:rotate-90" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;

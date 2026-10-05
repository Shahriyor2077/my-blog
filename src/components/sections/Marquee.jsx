const items = [
  "React",
  "Next.js",
  "TypeScript",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Prisma",
  "Docker",
];

// Two identical halves make the -50% loop seamless
const Row = ({ reverse, itemClass }) => (
  <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
    {[0, 1].map((half) => (
      <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
        {items.map((t) => (
          <span
            key={t}
            className={`flex items-center whitespace-nowrap font-display text-3xl font-semibold uppercase tracking-tight md:text-5xl ${itemClass}`}
          >
            {t}
            <span className="mx-6 text-2xl md:mx-8 md:text-3xl">✦</span>
          </span>
        ))}
      </div>
    ))}
  </div>
);

const Marquee = () => (
  <section aria-label="Technologies I use" className="relative h-44 overflow-hidden md:h-56">
    <div className="absolute left-[-5%] top-1/2 w-[110%] -translate-y-1/2 rotate-2 border-y border-white/8 bg-ink-2 py-4">
      <Row reverse itemClass="text-outline" />
    </div>
    <div className="absolute left-[-5%] top-1/2 w-[110%] -translate-y-1/2 -rotate-3 bg-acid py-4">
      <Row itemClass="text-ink" />
    </div>
  </section>
);

export default Marquee;

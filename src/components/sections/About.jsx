import { Briefcase, GraduationCap, Trophy, MapPin, Download, Sparkles, Heart } from "lucide-react";
import {
  personalInfo,
  workExperience,
  education,
  awards,
  skills,
} from "../../data/personalData";
import { Reveal, SectionHeader, Accent, TashkentTime } from "../ui";

const Card = ({ className = "", delay = 0, children }) => (
  <Reveal
    delay={delay}
    className={`relative overflow-hidden rounded-3xl border border-white/8 bg-ink-2 p-7 md:p-8 ${className}`}
  >
    {children}
  </Reveal>
);

const CardLabel = ({ icon: Icon, children }) => (
  <p className="mb-6 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-dim">
    <Icon size={14} className="text-acid" />
    {children}
  </p>
);

const About = () => (
  <section id="about" className="relative border-t border-white/8 py-20 sm:py-28 md:py-36">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeader
        index="03"
        label="About"
        title={
          <>
            A little about <Accent>me</Accent>
          </>
        }
        aside="Who I am, where I work, what I've learned — and what I'm proud of so far."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
        {/* Intro */}
        <Card className="flex flex-col md:col-span-2 lg:col-span-7 lg:row-span-2">
          <CardLabel icon={Sparkles}>Hello there</CardLabel>
          <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-[2.5rem]">
            I'm Shahriyor — a fullstack developer who turns <Accent>ideas</Accent> into fast,
            reliable products people enjoy using.
          </p>
          <p className="mt-6 max-w-lg leading-relaxed text-mute">{personalInfo.bio}</p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-10">
            {personalInfo.resume && (
              <a
                href={personalInfo.resume}
                download
                className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-acid"
              >
                <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
                Download resume
              </a>
            )}
            <span className="text-sm text-dim">{personalInfo.email}</span>
          </div>
        </Card>

        {/* Experience */}
        <Card delay={0.08} className="lg:col-span-5">
          <CardLabel icon={Briefcase}>Experience</CardLabel>
          <div className="space-y-6">
            {workExperience.map((w) => (
              <div key={w.id}>
                <span className="mb-3 inline-block rounded-full bg-acid/10 px-3 py-1 font-mono text-xs text-acid">
                  {w.duration}
                </span>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{w.position}</h3>
                <p className="mb-3 text-sm text-mute">
                  {w.company} · {w.type}
                </p>
                <p className="text-sm leading-relaxed text-dim">{w.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Location & time */}
        <Card delay={0.12} className="lg:col-span-5">
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-64">
            <span className="absolute inset-0 rounded-full border border-acid/20" />
            <span className="absolute inset-8 rounded-full border border-acid/25" />
            <span className="absolute inset-16 rounded-full border border-acid/30" />
            <span className="absolute inset-26 animate-ping rounded-full bg-acid/40" />
            <span className="absolute inset-29 rounded-full bg-acid" />
          </div>
          <CardLabel icon={MapPin}>Based in</CardLabel>
          <p className="font-display text-2xl font-semibold tracking-tight">{personalInfo.location}</p>
          <p className="mt-6 font-display text-6xl font-semibold tracking-tight">
            <TashkentTime />
          </p>
          <p className="mt-2 text-sm text-dim">Local time · GMT+5</p>
        </Card>

        {/* Education */}
        <Card delay={0.04} className="lg:col-span-4">
          <CardLabel icon={GraduationCap}>Education</CardLabel>
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={e.id} className="border-l border-white/10 pl-4">
                <p className="font-medium">{e.program}</p>
                <p className="text-sm text-mute">
                  {e.institution} · <span className="font-mono text-xs">{e.duration}</span>
                </p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Awards */}
        <Card delay={0.08} className="lg:col-span-4">
          <CardLabel icon={Trophy}>Awards</CardLabel>
          <ul className="space-y-4">
            {awards.map((a) => (
              <li key={a.id} className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-acid text-ink">
                  <Trophy size={18} />
                </span>
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-mute">
                    {a.issuer} · <span className="font-mono text-xs">{a.date}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Soft skills */}
        <Card delay={0.12} className="md:col-span-2 lg:col-span-4">
          <CardLabel icon={Heart}>How I work</CardLabel>
          <ul className="space-y-3">
            {skills.softSkills.map((s) => (
              <li key={s.name} className="flex items-start gap-3 text-sm">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-acid" />
                <span>
                  <span className="text-bone">{s.name}</span>
                  <span className="block text-dim">{s.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  </section>
);

export default About;

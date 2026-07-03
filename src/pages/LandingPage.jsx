import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
    Download,
    Github,
    Linkedin,
    Mail,
    Send,
    MapPin,
    Phone,
    Briefcase,
    GraduationCap,
    Award,
    ExternalLink,
    MessageCircle,
    ArrowRight,
    Code2,
    Layers,
    Database,
    Wrench,
    Heart,
} from "lucide-react";
import {
    personalInfo,
    socialLinks,
    seoData,
    skills,
    workExperience,
    education,
    awards,
    projects,
} from "../data/personalData";

const iconMap = { Github, Linkedin, Send, Mail };
const categoryIcons = {
    "Programming Languages": Code2,
    Frontend: Layers,
    "Backend & Databases": Database,
    "Tools & Others": Wrench,
};

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5 },
};

const SectionHeading = ({ eyebrow, title, subtitle }) => (
    <motion.div {...fadeUp} className="mb-14 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-emerald-300 border border-emerald-500/25 bg-emerald-500/6 mb-4">
            {eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        {subtitle && (
            <p className="mt-3 text-neutral-400 max-w-xl mx-auto">{subtitle}</p>
        )}
    </motion.div>
);

const LandingPage = () => {
    const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    const allTech = skills.technicalSkills.flatMap((c) => c.skills.map((s) => s.name));

    const sendToTelegram = async (data) => {
        const text = `New Message:\nName: ${data.name}\nPhone: ${data.phone}\nSubject: ${data.subject || "None"}\nMessage: ${data.message}`;
        const res = await fetch(
            `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
                    text,
                }),
            }
        );
        return res.ok;
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.phone.trim()) e.phone = "Phone is required";
        else if (!/^[\d\s\-\+\(\)]+$/.test(form.phone)) e.phone = "Invalid phone number";
        if (!form.message.trim()) e.message = "Message is required";
        else if (form.message.length < 10) e.message = "Min 10 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        setStatus(null);
        try {
            const ok = await sendToTelegram(form);
            if (ok) {
                setStatus("success");
                setForm({ name: "", phone: "", subject: "", message: "" });
                setTimeout(() => setStatus(null), 5000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
        setSubmitting(false);
    };

    const scrollTo = (id) => (e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const inputClass = (field) =>
        `w-full px-4 py-3 rounded-xl bg-white/3 border text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-colors ${errors[field] ? "border-red-500/60" : "border-white/10"
        }`;

    return (
        <>
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
            </Helmet>

            {/* ============ HERO ============ */}
            <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-grid" />
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/15 blur-[130px] animate-orb" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[120px] animate-orb" style={{ animationDelay: "-4s" }} />

                <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-neutral-300 mb-6"
                            >
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                                </span>
                                Available for work
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6"
                            >
                                Hi, I'm{" "}
                                <span className="text-gradient">Shahriyor</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-neutral-300 mb-4 font-medium"
                            >
                                {personalInfo.title}
                                <span className="text-neutral-600"> · </span>
                                <span className="text-neutral-500">{personalInfo.location}</span>
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-neutral-400 mb-10 max-w-lg leading-relaxed"
                            >
                                {personalInfo.bio}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap gap-4 mb-12"
                            >
                                <a
                                    href="#portfolio"
                                    onClick={scrollTo("portfolio")}
                                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-emerald-400 to-teal-400 text-black font-semibold hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.6)] transition-shadow"
                                >
                                    View Work
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                {personalInfo.resume && (
                                    <a
                                        href={personalInfo.resume}
                                        download
                                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-white hover:border-emerald-500/40 transition-colors"
                                    >
                                        <Download size={18} />
                                        Resume
                                    </a>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex gap-3"
                            >
                                {socialLinks.map((s) => {
                                    const Icon = iconMap[s.icon];
                                    return (
                                        <a
                                            key={s.name}
                                            href={s.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.name}
                                            className="p-3 rounded-xl glass text-neutral-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:-translate-y-1 transition-all"
                                        >
                                            <Icon size={20} />
                                        </a>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Code window */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="hidden lg:flex justify-center"
                        >
                            <div className="animate-float w-[26rem] rounded-2xl glass glow-emerald overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-white/2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    <span className="ml-2 text-xs text-neutral-500">developer.js</span>
                                </div>
                                <div className="p-6 font-mono text-[15px] leading-7">
                                    <p className="text-neutral-600">{"// Welcome to my portfolio"}</p>
                                    <p>
                                        <span className="text-purple-400">const</span>{" "}
                                        <span className="text-white">developer</span>{" "}
                                        <span className="text-neutral-500">= {"{"}</span>
                                    </p>
                                    <p className="pl-5">
                                        <span className="text-sky-300">name</span>
                                        <span className="text-neutral-500">:</span>{" "}
                                        <span className="text-emerald-400">'Shahriyor'</span>
                                        <span className="text-neutral-500">,</span>
                                    </p>
                                    <p className="pl-5">
                                        <span className="text-sky-300">role</span>
                                        <span className="text-neutral-500">:</span>{" "}
                                        <span className="text-emerald-400">'Fullstack'</span>
                                        <span className="text-neutral-500">,</span>
                                    </p>
                                    <p className="pl-5">
                                        <span className="text-sky-300">available</span>
                                        <span className="text-neutral-500">:</span>{" "}
                                        <span className="text-orange-400">true</span>
                                        <span className="text-neutral-500">,</span>
                                    </p>
                                    <p className="pl-5">
                                        <span className="text-sky-300">skills</span>
                                        <span className="text-neutral-500">: [</span>
                                        <span className="text-emerald-400">'React'</span>
                                        <span className="text-neutral-500">,</span>{" "}
                                        <span className="text-emerald-400">'Node'</span>
                                        <span className="text-neutral-500">]</span>
                                    </p>
                                    <p>
                                        <span className="text-neutral-500">{"};"}</span>
                                    </p>
                                    <p className="mt-3 flex items-center">
                                        <span className="text-emerald-400">▸</span>
                                        <span className="ml-2 w-2.5 h-5 bg-emerald-400 animate-pulse rounded-[2px]" />
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ TECH MARQUEE ============ */}
            <section className="py-6 border-y border-white/5 bg-white/[0.015] marquee-mask overflow-hidden">
                <div className="flex w-max animate-marquee gap-4">
                    {[...allTech, ...allTech].map((t, i) => (
                        <span
                            key={i}
                            className="px-5 py-2 rounded-full text-sm text-neutral-400 border border-white/7 whitespace-nowrap"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </section>

            {/* ============ STATS ============ */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[
                            { value: `${projects.length}+`, label: "Projects Completed" },
                            { value: `${allTech.length}+`, label: "Technologies" },
                            { value: "6+", label: "Months Experience" },
                        ].map((s, i) => (
                            <motion.div
                                key={s.label}
                                {...fadeUp}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="glass card-hover rounded-2xl p-8 text-center"
                            >
                                <p className="text-5xl font-extrabold text-gradient mb-2">{s.value}</p>
                                <p className="text-neutral-400">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ ABOUT ============ */}
            <section id="about" className="py-24 relative overflow-hidden">
                <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-emerald-500/7 blur-[120px]" />
                <div className="relative max-w-6xl mx-auto px-6">
                    <SectionHeading
                        eyebrow="About"
                        title="About Me"
                        subtitle="A quick look at who I am, where I've worked and what I've achieved."
                    />

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Bio card */}
                        <motion.div {...fadeUp} className="glass rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                                    <Heart size={20} />
                                </span>
                                <h3 className="text-lg font-semibold text-white">Who I Am</h3>
                            </div>
                            <p className="text-neutral-400 leading-relaxed mb-6">{personalInfo.bio}</p>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <MapPin size={17} className="text-emerald-400 shrink-0" />
                                    {personalInfo.location}
                                </div>
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <Phone size={17} className="text-emerald-400 shrink-0" />
                                    {personalInfo.phone}
                                </div>
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <Mail size={17} className="text-emerald-400 shrink-0" />
                                    {personalInfo.email}
                                </div>
                            </div>
                        </motion.div>

                        {/* Experience card */}
                        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                                    <Briefcase size={20} />
                                </span>
                                <h3 className="text-lg font-semibold text-white">Experience</h3>
                            </div>
                            <div className="space-y-6">
                                {workExperience.map((w) => (
                                    <div key={w.id} className="relative pl-6 border-l border-emerald-500/25">
                                        <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                                        <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 mb-2">
                                            {w.duration}
                                        </span>
                                        <h4 className="text-white font-medium">{w.position}</h4>
                                        <p className="text-neutral-400 text-sm mb-2">
                                            {w.company} · {w.type}
                                        </p>
                                        <p className="text-neutral-500 text-sm leading-relaxed">{w.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Education card */}
                        <motion.div {...fadeUp} className="glass rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                                    <GraduationCap size={20} />
                                </span>
                                <h3 className="text-lg font-semibold text-white">Education</h3>
                            </div>
                            <div className="space-y-6">
                                {education.map((e) => (
                                    <div key={e.id} className="relative pl-6 border-l border-emerald-500/25">
                                        <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                                        <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 mb-2">
                                            {e.duration}
                                        </span>
                                        <h4 className="text-white font-medium">{e.program}</h4>
                                        <p className="text-neutral-400 text-sm">{e.institution}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Awards card */}
                        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                                    <Award size={20} />
                                </span>
                                <h3 className="text-lg font-semibold text-white">Awards</h3>
                            </div>
                            <div className="space-y-6">
                                {awards.map((a) => (
                                    <div key={a.id} className="relative pl-6 border-l border-emerald-500/25">
                                        <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                                        <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 mb-2">
                                            {a.date}
                                        </span>
                                        <h4 className="text-white font-medium">{a.title}</h4>
                                        <p className="text-neutral-400 text-sm">{a.issuer}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ SKILLS ============ */}
            <section id="skills" className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/6 blur-[120px]" />
                <div className="relative max-w-6xl mx-auto px-6">
                    <SectionHeading
                        eyebrow="Expertise"
                        title="Skills & Technologies"
                        subtitle="The tools and technologies I use to bring ideas to life."
                    />

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {skills.technicalSkills.map((cat, i) => {
                            const CatIcon = categoryIcons[cat.category] || Code2;
                            return (
                                <motion.div
                                    key={cat.category}
                                    {...fadeUp}
                                    transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                                    className="glass card-hover rounded-2xl p-8"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                                            <CatIcon size={20} />
                                        </span>
                                        <h3 className="text-lg font-semibold text-white">{cat.category}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.skills.map((s) => (
                                            <span
                                                key={s.name}
                                                className="px-3.5 py-1.5 text-sm rounded-full bg-white/3 border border-white/8 text-neutral-300 hover:border-emerald-500/50 hover:text-emerald-300 hover:bg-emerald-500/6 transition-colors cursor-default"
                                            >
                                                {s.name}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div {...fadeUp} className="glass rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                                <Heart size={20} />
                            </span>
                            <h3 className="text-lg font-semibold text-white">Soft Skills</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {skills.softSkills.map((s) => (
                                <div
                                    key={s.name}
                                    className="p-4 rounded-xl bg-white/2 border border-white/6 hover:border-emerald-500/30 transition-colors"
                                >
                                    <p className="text-white text-sm font-medium mb-1">{s.name}</p>
                                    <p className="text-neutral-500 text-xs leading-relaxed">{s.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ============ PORTFOLIO ============ */}
            <section id="portfolio" className="py-24 relative overflow-hidden">
                <div className="absolute top-1/4 -left-40 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
                <div className="relative max-w-6xl mx-auto px-6">
                    <SectionHeading
                        eyebrow="Work"
                        title="Featured Projects"
                        subtitle="A selection of products, platforms and landing pages I've built."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                                viewport={{ once: true, margin: "-40px" }}
                                className="group glass card-hover rounded-2xl overflow-hidden flex flex-col"
                            >
                                <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover object-top group-hover:scale-[1.06] transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-700">
                                            <span className="text-4xl font-bold">{p.title[0]}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {p.url && (
                                        <a
                                            href={p.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View ${p.title} live`}
                                            className="absolute bottom-3 right-3 p-2.5 rounded-full bg-emerald-400 text-black opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                                        {p.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm line-clamp-2 mb-4">{p.description}</p>
                                    <div className="mt-auto flex items-center justify-between gap-3">
                                        <div className="flex flex-wrap gap-1.5">
                                            {p.technologies?.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2.5 py-0.5 text-[11px] rounded-full bg-white/4 border border-white/7 text-neutral-400"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        {p.url && (
                                            <a
                                                href={p.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="shrink-0 inline-flex items-center gap-1 text-emerald-400 text-sm hover:text-emerald-300"
                                            >
                                                Live
                                                <ArrowRight size={13} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ CONTACT ============ */}
            <section id="contact" className="py-24 relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/8 blur-[130px]" />
                <div className="relative max-w-6xl mx-auto px-6">
                    <SectionHeading
                        eyebrow="Contact"
                        title="Let's Work Together"
                        subtitle="Have a project in mind? Drop me a message — I usually reply within a day."
                    />

                    <div className="grid lg:grid-cols-5 gap-6">
                        {/* Info */}
                        <motion.div {...fadeUp} className="lg:col-span-2 space-y-4">
                            {[
                                {
                                    icon: Mail,
                                    label: "Email",
                                    value: personalInfo.email,
                                    href: `mailto:${personalInfo.email}`,
                                },
                                {
                                    icon: Phone,
                                    label: "Phone",
                                    value: personalInfo.phone,
                                    href: `tel:${personalInfo.phone}`,
                                },
                                {
                                    icon: Send,
                                    label: "Telegram",
                                    value: "@shahriyorjs",
                                    href: "https://t.me/shahriyorjs",
                                    external: true,
                                },
                                {
                                    icon: MapPin,
                                    label: "Location",
                                    value: personalInfo.location,
                                },
                            ].map((item) => {
                                const Wrapper = item.href ? "a" : "div";
                                return (
                                    <Wrapper
                                        key={item.label}
                                        {...(item.href
                                            ? {
                                                href: item.href,
                                                ...(item.external
                                                    ? { target: "_blank", rel: "noopener noreferrer" }
                                                    : {}),
                                            }
                                            : {})}
                                        className="flex items-center gap-4 p-4 rounded-2xl glass card-hover"
                                    >
                                        <span className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                                            <item.icon size={20} />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs text-neutral-500 uppercase tracking-wide">{item.label}</p>
                                            <p className="text-white text-sm truncate">{item.value}</p>
                                        </div>
                                    </Wrapper>
                                );
                            })}

                            <div className="flex gap-3 pt-2">
                                <a
                                    href="https://t.me/shahriyorjs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Telegram Channel"
                                    title="Telegram Channel"
                                    className="p-3 rounded-xl glass text-neutral-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:-translate-y-1 transition-all"
                                >
                                    <MessageCircle size={18} />
                                </a>
                                {socialLinks.map((s) => {
                                    const Icon = iconMap[s.icon];
                                    return (
                                        <a
                                            key={s.name}
                                            href={s.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.name}
                                            className="p-3 rounded-xl glass text-neutral-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:-translate-y-1 transition-all"
                                        >
                                            <Icon size={18} />
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="lg:col-span-3 glass rounded-2xl p-8"
                        >
                            <h3 className="text-lg font-semibold text-white mb-1">Send a Message</h3>
                            <p className="text-neutral-500 text-sm mb-6">
                                Fill out the form and it lands straight in my Telegram.
                            </p>

                            {status === "success" && (
                                <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/7 text-emerald-300 text-sm">
                                    ✓ Message sent successfully!
                                </div>
                            )}

                            {status === "error" && (
                                <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl border border-red-500/30 bg-red-500/7 text-red-400 text-sm">
                                    ✕ Failed to send. Please try again.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-neutral-400 mb-2">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className={inputClass("name")}
                                            placeholder="Your name"
                                        />
                                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-neutral-400 mb-2">Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className={inputClass("phone")}
                                            placeholder="+998 (XX) XXX XXXX"
                                        />
                                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        className={inputClass("subject")}
                                        placeholder="Optional"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Message *</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange}
                                        className={`${inputClass("message")} resize-none`}
                                        placeholder="Tell me about your project..."
                                    />
                                    {errors.message && (
                                        <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                                    )}
                                    <p className="text-neutral-600 text-xs mt-1">{form.message.length}/500</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`w-full py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${submitting
                                        ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                                        : "bg-linear-to-r from-emerald-400 to-teal-400 text-black hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.6)]"
                                        }`}
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;

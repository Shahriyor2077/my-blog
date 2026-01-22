import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Download, Github, Linkedin, Mail, Send, MapPin, Phone, Briefcase, GraduationCap, Award, ExternalLink, MessageCircle } from "lucide-react";
import { personalInfo, socialLinks, seoData, skills, workExperience, education, awards, projects } from "../data/personalData";

const LandingPage = () => {
    const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    const iconMap = { Github, Linkedin, Send, Mail };

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

    return (
        <>
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
            </Helmet>

            {/* Hero */}
            <section id="home" className="min-h-screen flex items-center bg-black pt-16">
                <div className="max-w-6xl mx-auto px-6 py-24 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-emerald-500 font-medium mb-4"
                            >
                                Hello, I'm
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl lg:text-7xl font-bold text-white mb-6"
                            >
                                {personalInfo.name}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-neutral-400 mb-4"
                            >
                                {personalInfo.title}
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
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="px-6 py-3 bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors"
                                >
                                    View Work
                                </a>
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="px-6 py-3 border border-neutral-700 text-white hover:border-neutral-500 transition-colors"
                                >
                                    Contact Me
                                </a>
                                {personalInfo.resume && (
                                    <a
                                        href={personalInfo.resume}
                                        download
                                        className="px-6 py-3 border border-neutral-700 text-white hover:border-neutral-500 transition-colors flex items-center gap-2"
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
                                className="flex gap-4"
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
                                            className="p-3 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                        >
                                            <Icon size={20} />
                                        </a>
                                    );
                                })}
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="hidden lg:flex justify-center"
                        >
                            <div className="w-96 border border-neutral-800">
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    <span className="ml-2 text-xs text-neutral-600">developer.js</span>
                                </div>
                                <div className="p-5 font-mono text-base">
                                    <p className="text-neutral-500">{"// Welcome"}</p>
                                    <p className="mt-2">
                                        <span className="text-purple-400">const</span>{" "}
                                        <span className="text-white">developer</span>{" "}
                                        <span className="text-neutral-500">=</span>{" "}
                                        <span className="text-neutral-500">{"{"}</span>
                                    </p>
                                    <p className="pl-4">
                                        <span className="text-neutral-400">name:</span>{" "}
                                        <span className="text-emerald-400">'Shahriyor'</span>
                                        <span className="text-neutral-500">,</span>
                                    </p>
                                    <p className="pl-4">
                                        <span className="text-neutral-400">role:</span>{" "}
                                        <span className="text-emerald-400">'Fullstack'</span>
                                        <span className="text-neutral-500">,</span>
                                    </p>
                                    <p className="pl-4">
                                        <span className="text-neutral-400">available:</span>{" "}
                                        <span className="text-orange-400">true</span>
                                        <span className="text-neutral-500">,</span>
                                    </p>
                                    <p className="pl-4">
                                        <span className="text-neutral-400">skills:</span>{" "}
                                        <span className="text-neutral-500">[</span>
                                        <span className="text-emerald-400">'React'</span>
                                        <span className="text-neutral-500">,</span>{" "}
                                        <span className="text-emerald-400">'Node'</span>
                                        <span className="text-neutral-500">]</span>
                                    </p>
                                    <p>
                                        <span className="text-neutral-500">{"}"}</span>
                                        <span className="text-neutral-500">;</span>
                                    </p>
                                    <p className="mt-3 flex items-center">
                                        <span className="text-emerald-500">▸</span>
                                        <span className="ml-2 w-2 h-4 bg-emerald-500 animate-pulse" />
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-neutral-950 border-y border-neutral-900">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold text-white mb-2">{projects.length}+</p>
                            <p className="text-neutral-400">Projects</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-2">
                                {skills.technicalSkills.reduce((a, c) => a + c.skills.length, 0)}+
                            </p>
                            <p className="text-neutral-400">Technologies</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-2">3+</p>
                            <p className="text-neutral-400">Months</p>
                        </div>
                    </div>
                </div>  
            </section>

            {/* About */}
            <section id="about" className="py-24 bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-emerald-500 font-medium mb-2">About</p>
                    <h2 className="text-3xl font-bold text-white mb-12">About Me</h2>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <p className="text-neutral-400 leading-relaxed mb-6">{personalInfo.bio}</p>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <MapPin size={18} className="text-emerald-500" />
                                    {personalInfo.location}
                                </div>
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <Phone size={18} className="text-emerald-500" />
                                    {personalInfo.phone}
                                </div>
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <Mail size={18} className="text-emerald-500" />
                                    {personalInfo.email}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Experience</h3>
                            <div className="space-y-6">
                                {workExperience.slice(0, 2).map((w) => (
                                    <div key={w.id} className="border-l-2 border-neutral-800 pl-4">
                                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                                            <Briefcase size={16} />
                                            <span className="text-sm">{w.duration}</span>
                                        </div>
                                        <h4 className="text-white font-medium">{w.position}</h4>
                                        <p className="text-neutral-400 text-sm">{w.company}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Education</h3>
                            <div className="space-y-4">
                                {education.map((e) => (
                                    <div key={e.id} className="border-l-2 border-neutral-800 pl-4">
                                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                                            <GraduationCap size={16} />
                                            <span className="text-sm">{e.duration}</span>
                                        </div>
                                        <h4 className="text-white font-medium">{e.program}</h4>
                                        <p className="text-neutral-400 text-sm">{e.institution}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Awards</h3>
                            <div className="space-y-4">
                                {awards.map((a) => (
                                    <div key={a.id} className="border-l-2 border-neutral-800 pl-4">
                                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                                            <Award size={16} />
                                            <span className="text-sm">{a.date}</span>
                                        </div>
                                        <h4 className="text-white font-medium">{a.title}</h4>
                                        <p className="text-neutral-400 text-sm">{a.issuer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="py-24 bg-neutral-950">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-emerald-500 font-medium mb-2">Expertise</p>
                    <h2 className="text-3xl font-bold text-white mb-12">Skills</h2>

                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 mb-16">
                        {skills.technicalSkills.map((cat) => (
                            <div key={cat.category}>
                                <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-neutral-800">
                                    {cat.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((s) => (
                                        <span
                                            key={s.name}
                                            className="px-3 py-1.5 text-sm border border-neutral-800 text-neutral-300 hover:border-emerald-500/50 hover:text-white transition-colors"
                                        >
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-neutral-800">
                            Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.softSkills.map((s) => (
                                <span
                                    key={s.name}
                                    className="px-3 py-1.5 text-sm border border-neutral-800 text-neutral-300 hover:border-emerald-500/50 hover:text-white transition-colors"
                                >
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio */}
            <section id="portfolio" className="py-24 bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-emerald-500 font-medium mb-2">Work</p>
                    <h2 className="text-3xl font-bold text-white mb-12">Featured Projects</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projects.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group border border-neutral-800 hover:border-neutral-700 transition-colors"
                            >
                                <div className="w-full h-80 bg-neutral-900 overflow-hidden">
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-700">
                                            <span className="text-4xl font-bold">{p.title[0]}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                                    <p className="text-neutral-400 text-sm line-clamp-2 mb-4">{p.description}</p>
                                    {p.technologies && p.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {p.technologies.slice(0, 3).map((tech, idx) => (
                                                <span key={idx} className="px-2 py-1 text-xs border border-neutral-700 text-neutral-400">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex gap-4">
                                        {p.url && (
                                            <a
                                                href={p.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`View ${p.title} live`}
                                                className="text-emerald-500 text-sm hover:text-emerald-400 flex items-center gap-1"
                                            >
                                                <ExternalLink size={14} />
                                                Live
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="py-24 bg-neutral-950">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-emerald-500 font-medium mb-2">Contact</p>
                    <h2 className="text-3xl font-bold text-white mb-12">Get In Touch</h2>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Info */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Contact Info</h3>

                            <div className="space-y-4 mb-10">
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    className="flex items-center gap-4 p-4 border border-neutral-800 hover:border-neutral-700 transition-colors"
                                >
                                    <Mail size={20} className="text-emerald-500" />
                                    <div>
                                        <p className="text-sm text-neutral-500">Email</p>
                                        <p className="text-white">{personalInfo.email}</p>
                                    </div>
                                </a>

                                <a
                                    href={`tel:${personalInfo.phone}`}
                                    className="flex items-center gap-4 p-4 border border-neutral-800 hover:border-neutral-700 transition-colors"
                                >
                                    <Phone size={20} className="text-emerald-500" />
                                    <div>
                                        <p className="text-sm text-neutral-500">Phone</p>
                                        <p className="text-white">{personalInfo.phone}</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-4 border border-neutral-800">
                                    <MapPin size={20} className="text-emerald-500" />
                                    <div>
                                        <p className="text-sm text-neutral-500">Location</p>
                                        <p className="text-white">{personalInfo.location}</p>
                                    </div>
                                </div>

                                <a
                                    href="https://t.me/shahriyorjs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 border border-neutral-800 hover:border-neutral-700 transition-colors"
                                >
                                    <Send size={20} className="text-emerald-500" />
                                    <div>
                                        <p className="text-sm text-neutral-500">Telegram</p>
                                        <p className="text-white">@shahriyorjs</p>
                                    </div>
                                </a>
                            </div>

                            <h3 className="text-sm font-semibold text-white mb-4">Connect</h3>
                            <div className="flex gap-3">
                                <a
                                    href="https://t.me/shahriyor_js"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Telegram Channel"
                                    className="p-3 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                    title="Telegram Channel"
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
                                            className="p-3 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                        >
                                            <Icon size={18} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="border border-neutral-800 p-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Send Message</h3>
                            <p className="text-neutral-500 text-sm mb-6">Fill out the form below</p>

                            {status === "success" && (
                                <div className="flex items-center gap-2 p-3 mb-6 border border-emerald-500/30 text-emerald-500 text-sm">
                                    ✓ Message sent successfully!
                                </div>
                            )}

                            {status === "error" && (
                                <div className="flex items-center gap-2 p-3 mb-6 border border-red-500/30 text-red-500 text-sm">
                                    ✕ Failed to send. Please try again.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-black border text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 ${errors.name ? "border-red-500" : "border-neutral-800"
                                            }`}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Phone *</label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 bg-black border text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 ${errors.phone ? "border-red-500" : "border-neutral-800"
                                                }`}
                                            placeholder="+998 (XX) XXX XXXX"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                                        placeholder="Optional"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Message *</label>
                                    <div className="relative">
                                        <Send size={16} className="absolute left-3 top-3 text-neutral-600" />
                                        <textarea
                                            name="message"
                                            rows={5}
                                            value={form.message}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 bg-black border text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 resize-none ${errors.message ? "border-red-500" : "border-neutral-800"
                                                }`}
                                            placeholder="Your message..."
                                        />
                                    </div>
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                    <p className="text-neutral-600 text-xs mt-1">{form.message.length}/500</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`w-full py-3 font-medium flex items-center justify-center gap-2 transition-colors ${submitting
                                        ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                                        : "bg-emerald-500 text-black hover:bg-emerald-400"
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;

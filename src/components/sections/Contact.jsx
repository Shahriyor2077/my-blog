import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import { personalInfo, socialLinks } from "../../data/personalData";
import { Reveal, Accent } from "../ui";

const topics = ["Web application", "Landing page", "Backend / API", "Telegram bot", "Something else"];
const emptyForm = { name: "", phone: "", subject: "", message: "" };

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

const Field = ({ label, error, hint, className = "", children }) => (
  <label className={`block ${className}`}>
    <span className="mb-1 flex justify-between font-mono text-xs uppercase tracking-[0.15em] text-dim">
      <span>{label}</span>
      {hint && <span>{hint}</span>}
    </span>
    {children}
    {error && <span className="mt-2 block text-xs text-red-400">{error}</span>}
  </label>
);

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const telegram = socialLinks.find((s) => s.name === "Telegram");
  const [emailUser, emailDomain] = personalInfo.email.split("@");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[\d\s\-+()]+$/.test(form.phone)) e.phone = "Invalid phone number";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.length < 10) e.message = "Min 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const toggleTopic = (t) => setForm((f) => ({ ...f, subject: f.subject === t ? "" : t }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const ok = await sendToTelegram(form);
      if (ok) {
        setStatus("success");
        setForm(emptyForm);
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(personalInfo.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  const inputClass = (field) =>
    `w-full border-b bg-transparent py-3 text-bone placeholder:text-dim/70 transition-colors focus:border-acid focus:outline-none ${
      errors[field] ? "border-red-400/70" : "border-white/15"
    }`;

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/8 py-20 sm:py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-acid/6 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-dim">
            <span className="text-acid">(06)</span> — Contact
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-[clamp(2.75rem,8vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            Have an idea?
            <br />
            Let's make it <Accent>real.</Accent>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Direct contacts */}
          <Reveal className="min-w-0 space-y-4 lg:col-span-5">
            <p className="flex items-center gap-2.5 text-sm text-mute">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-acid opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-acid" />
              </span>
              I usually reply within a day
            </p>

            <div className="rounded-3xl border border-white/8 bg-ink-2 p-5 sm:p-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-dim">Email</p>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="min-w-0 py-2 font-display text-sm font-medium transition-colors hover:text-acid sm:text-lg md:text-xl"
                >
                  {emailUser}
                  <wbr />@{emailDomain}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className={`grid size-10 shrink-0 place-items-center rounded-full border transition-colors ${
                    copied ? "border-acid bg-acid text-ink" : "border-white/10 hover:border-acid hover:text-acid"
                  }`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href={`tel:${personalInfo.phone.replace(/[^\d+]/g, "")}`}
                className="group rounded-3xl border border-white/8 bg-ink-2 p-5 transition-colors sm:p-6 hover:border-acid/40"
              >
                <p className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-[0.15em] text-dim">
                  Phone
                  <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45 group-hover:text-acid" />
                </p>
                <p className="font-medium">{personalInfo.phone}</p>
              </a>
              {telegram && (
                <a
                  href={telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-white/8 bg-ink-2 p-5 transition-colors sm:p-6 hover:border-acid/40"
                >
                  <p className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-[0.15em] text-dim">
                    Telegram
                    <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45 group-hover:text-acid" />
                  </p>
                  <p className="font-medium">@{telegram.url.split("/").pop()}</p>
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-mute transition-colors hover:border-acid hover:text-acid"
                >
                  {s.name}
                  <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-white/8 bg-ink-2 p-5 sm:p-6 md:p-10"
            >
              <p className="mb-4 text-sm text-mute">I'm interested in…</p>
              <div className="mb-10 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTopic(t)}
                    aria-pressed={form.subject === t}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
                      form.subject === t
                        ? "border-acid bg-acid text-ink"
                        : "border-white/10 text-mute hover:border-white/30 hover:text-bone"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <Field label="Your name *" error={errors.name}>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass("name")}
                    placeholder="John Doe"
                  />
                </Field>
                <Field label="Phone *" error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass("phone")}
                    placeholder="+998 (XX) XXX XX XX"
                  />
                </Field>
              </div>

              <Field
                label="About your project *"
                error={errors.message}
                hint={`${form.message.length}/500`}
                className="mt-8"
              >
                <textarea
                  name="message"
                  rows={4}
                  maxLength={500}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass("message")} resize-none`}
                  placeholder="Tell me what you'd like to build…"
                />
              </Field>

              <AnimatePresence>
                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
                      status === "success"
                        ? "border-acid/30 bg-acid/10 text-acid"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {status === "success"
                      ? "✓ Message sent — I'll get back to you soon!"
                      : "✕ Failed to send. Please try again or message me on Telegram."}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-3 rounded-full bg-acid py-2 pl-6 pr-2 font-medium text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send message"}
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-acid transition-transform duration-500 group-hover:rotate-45">
                    {submitting ? <Loader2 size={17} className="animate-spin" /> : <ArrowUpRight size={17} />}
                  </span>
                </button>
                <p className="text-xs text-dim">Goes straight to my Telegram.</p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;

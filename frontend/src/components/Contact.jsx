// frontend/src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mail,
  MapPin,
  Linkedin,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { contactInfo } from '../data/contactData';

// Base URL for API calls - comes from .env in development, Vercel env vars in production
const API_BASE = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [copySuccess, setCopySuccess] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopySuccess(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 }, colors: ['#c7f046', '#181612', '#a8a296'] });
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`${API_BASE}/api/v1/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 }, colors: ['#c7f046', '#181612', '#a8a296'] });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 border-t border-line/10">
      <div className="u-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left — statement + details */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="index-tag">08</span>
                <span className="w-8 h-px bg-line/20" />
                <span className="eyebrow">Contact</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight text-ink">
                Let's build <span className="italic font-normal">something.</span>
              </h2>
              <p className="mt-6 text-ink-soft text-base md:text-lg leading-relaxed max-w-md">
                Open to Software Engineer roles, MERN builds and automation initiatives. Based in{' '}
                <span className="text-ink font-semibold">{contactInfo.location}</span> — available
                remotely worldwide.
              </p>
            </motion.div>

            <div className="mt-10 border-t border-line/10">
              <button
                onClick={copyEmail}
                className="group w-full flex items-center justify-between gap-4 py-5 border-b border-line/10 text-left"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint mb-1">
                    Email
                  </span>
                  <span className="block text-[15px] font-medium text-ink truncate">
                    {contactInfo.email}
                  </span>
                </span>
                <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-line/12 text-ink-soft group-hover:text-ink group-hover:border-line/25 transition-colors">
                  {copySuccess ? <Check size={15} className="text-ink" /> : <Copy size={15} />}
                </span>
              </button>

              <div className="flex items-center justify-between gap-4 py-5 border-b border-line/10">
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint mb-1">
                    Location
                  </span>
                  <span className="block text-[15px] font-medium text-ink">{contactInfo.location}</span>
                </span>
                <MapPin size={18} className="text-ink-faint shrink-0" />
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group inline-flex items-center gap-2 rounded-full border border-line/12 pl-4 pr-3 py-2.5 text-sm font-medium text-ink hover:bg-paper-sunken transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
                <ArrowUpRight size={14} className="text-ink-faint group-hover:text-ink transition-colors" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                aria-label="Email"
                className="inline-flex items-center gap-2 rounded-full border border-line/12 px-4 py-2.5 text-sm font-medium text-ink hover:bg-paper-sunken transition-colors"
              >
                <Mail size={16} /> Mail
              </a>
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 surface p-7 md:p-10"
          >
            <form onSubmit={handleSend} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                    Your name
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Hiring Manager"
                    className="field mt-2"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="field mt-2"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                  Message
                </span>
                <textarea
                  rows="5"
                  placeholder="Briefly describe the opportunity or idea…"
                  className="field mt-2 resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </label>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full rounded-2xl px-7 py-4 text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-80 ${
                  status === 'success'
                    ? 'bg-accent text-accent-ink'
                    : status === 'error'
                    ? 'bg-[#c0392b] text-white'
                    : 'bg-ink text-paper hover:bg-accent hover:text-accent-ink'
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' ? (
                    <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </motion.span>
                  ) : status === 'success' ? (
                    <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <CheckCircle2 size={18} /> Message sent
                    </motion.span>
                  ) : status === 'error' ? (
                    <motion.span key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <AlertCircle size={18} /> Try again
                    </motion.span>
                  ) : (
                    <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Send message <Send size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
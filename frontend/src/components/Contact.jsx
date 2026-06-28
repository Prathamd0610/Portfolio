// frontend/src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mail,
  MapPin,
  Linkedin,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Copy,
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
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSend = async e => {
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
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
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
    <section className="relative py-32 bg-[#fbfbfd] dark:bg-[#0b0b10] overflow-hidden" id="contact">
      <div className="aurora-blob w-[480px] h-[480px] bottom-0 -left-20 bg-brand-400/15 dark:bg-brand-600/15" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left – contact info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label mb-4">// Let's Connect</span>
              <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-none mt-3">
                <span className="text-[#1d1d1f] dark:text-white">Get in </span>
                <span className="text-aurora">touch.</span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xl font-medium leading-relaxed mb-12 max-w-lg">
                Open to Software Engineer roles, MERN builds and automation initiatives. Based in{' '}
                <span className="text-[#1d1d1f] dark:text-white font-bold">
                  {contactInfo.location}
                </span>
                {' '}— available remotely worldwide.
              </p>
            </motion.div>

            <div className="space-y-6 mb-16">
              <div
                onClick={copyEmail}
                className="group flex items-center justify-between p-6 bg-white dark:bg-white/5 rounded-4xl border border-gray-100 dark:border-white/10 hover:border-brand-300/50 dark:hover:border-brand-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-violet shadow-glow flex items-center justify-center text-white">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-[0.2em]">
                      Email
                    </p>
                    <p className="text-lg font-bold text-[#1d1d1f] dark:text-white break-all">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
                <div className="text-gray-300 dark:text-gray-600 group-hover:text-brand-500 transition-colors shrink-0">
                  {copySuccess ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <Copy size={20} />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 bg-white dark:bg-white/5 rounded-4xl border border-gray-100 dark:border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-violet shadow-glow flex items-center justify-center text-white">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-[0.2em]">
                    Location
                  </p>
                  <p className="text-lg font-bold text-[#1d1d1f] dark:text-white">
                    {contactInfo.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-[#1d1d1f] dark:text-white hover:text-brand-500 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </motion.a>
              <motion.a
                href={`mailto:${contactInfo.email}`}
                whileHover={{ scale: 1.1, y: -3 }}
                className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-[#1d1d1f] dark:text-white hover:text-brand-500 transition-all shadow-sm"
                aria-label="Email"
              >
                <Mail />
              </motion.a>
            </div>
          </div>

          {/* Right – Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-500/10 dark:bg-brand-500/10 blur-3xl rounded-full z-0" />
            <motion.div
              className="relative z-10 bg-white dark:bg-[#1a1a24] p-8 md:p-12 rounded-5xl shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-white/10 gradient-border"
            >
              <form onSubmit={handleSend} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-4">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hiring Manager"
                    className="w-full px-7 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-[#0b0b10] focus:border-brand-500 outline-none font-semibold transition-all text-[#1d1d1f] dark:text-white"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-4">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-7 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-[#0b0b10] focus:border-brand-500 outline-none font-semibold transition-all text-[#1d1d1f] dark:text-white"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-4">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Briefly describe the opportunity or idea..."
                    className="w-full px-7 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-[#0b0b10] focus:border-brand-500 outline-none font-semibold transition-all text-[#1d1d1f] dark:text-white resize-none"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-glow transition-all ${
                    status === 'success'
                      ? 'bg-green-500 text-white'
                      : status === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-gradient-to-r from-brand-600 to-accent-violet text-white'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {status === 'loading' ? (
                      <motion.div key="l" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                        <Terminal size={20} />
                      </motion.div>
                    ) : status === 'success' ? (
                      <motion.span key="s" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                        <CheckCircle2 size={20} /> Message Sent
                      </motion.span>
                    ) : status === 'error' ? (
                      <motion.span key="e" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                        <AlertCircle size={20} /> Try Again
                      </motion.span>
                    ) : (
                      <motion.span key="i" className="flex items-center gap-3">
                        Send Message <Send size={18} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
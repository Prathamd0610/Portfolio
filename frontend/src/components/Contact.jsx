// frontend/src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mail,
  MapPin,
  Linkedin,
  Github,
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
    <section className="py-32 bg-white dark:bg-[#0a0a0a]" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left – contact info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#0071e3] font-mono text-sm font-bold tracking-[0.4em] uppercase mb-4">
                Secure Line
              </h2>
              <h3 className="text-6xl md:text-8xl font-black text-[#1d1d1f] dark:text-white tracking-tighter mb-10 leading-none">
                Get In Touch<span className="text-[#0071e3]">.</span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xl font-medium leading-relaxed mb-12 max-w-lg">
                Available for high-impact QA initiatives and MERN developments. Based in{' '}
                <span className="text-[#1d1d1f] dark:text-white font-bold underline decoration-[#0071e3] decoration-2">
                  {contactInfo.location}
                </span>
                .
              </p>
            </motion.div>

            <div className="space-y-6 mb-16">
              <div
                onClick={copyEmail}
                className="group flex items-center justify-between p-6 bg-gray-50 dark:bg-[#1c1c1e] rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-[#0071e3]/30 dark:hover:border-blue-900 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#2c2c2e] shadow-sm flex items-center justify-center text-[#0071e3]">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-[0.2em]">
                      Primary Node
                    </p>
                    <p className="text-xl font-black text-[#1d1d1f] dark:text-white">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
                <div className="text-gray-300 dark:text-gray-600 group-hover:text-[#0071e3] transition-colors">
                  {copySuccess ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <Copy size={20} />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-[#1c1c1e] rounded-[2rem] border border-gray-100 dark:border-gray-800">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#2c2c2e] shadow-sm flex items-center justify-center text-[#0071e3]">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-[0.2em]">
                    Geographic Hub
                  </p>
                  <p className="text-xl font-black text-[#1d1d1f] dark:text-white">
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
                whileHover={{ scale: 1.1, backgroundColor: '#0071e3', color: '#fff' }}
                className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#1c1c1e] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-[#1d1d1f] dark:text-white transition-all shadow-sm"
              >
                <Linkedin />
              </motion.a>
              <motion.a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: '#0071e3', color: '#fff' }}
                className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#1c1c1e] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-[#1d1d1f] dark:text-white transition-all shadow-sm"
              >
                <Github />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, backgroundColor: '#0071e3', color: '#fff' }}
                className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#1c1c1e] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-[#1d1d1f] dark:text-white transition-all shadow-sm"
              >
                <Terminal />
              </motion.a>
            </div>
          </div>

          {/* Right – Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-50/50 dark:bg-blue-900/10 blur-3xl rounded-full z-0" />
            <motion.div
              className="relative z-10 bg-white dark:bg-[#1c1c1e] p-12 rounded-[3.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-gray-800"
            >
              <form onSubmit={handleSend} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-4">
                    Identification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hiring Manager"
                    className="w-full px-8 py-5 rounded-2.5xl bg-gray-50 dark:bg-[#2c2c2e] border border-transparent focus:bg-white dark:focus:bg-[#0a0a0a] focus:border-[#0071e3] outline-none font-bold transition-all text-[#1d1d1f] dark:text-white"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-4">
                    Return Path (Email)
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-8 py-5 rounded-2.5xl bg-gray-50 dark:bg-[#2c2c2e] border border-transparent focus:bg-white dark:focus:bg-[#0a0a0a] focus:border-[#0071e3] outline-none font-bold transition-all text-[#1d1d1f] dark:text-white"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-4">
                    Inquiry Details
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Briefly describe the collaboration opportunity..."
                    className="w-full px-8 py-5 rounded-2.5xl bg-gray-50 dark:bg-[#2c2c2e] border border-transparent focus:bg-white dark:focus:bg-[#0a0a0a] focus:border-[#0071e3] outline-none font-bold transition-all text-[#1d1d1f] dark:text-white resize-none"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                  className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-xl transition-all ${
                    status === 'success'
                      ? 'bg-green-500 text-white'
                      : status === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-[#1d1d1f] dark:bg-white dark:text-black text-white hover:bg-[#0071e3] dark:hover:bg-[#0071e3] dark:hover:text-white'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {status === 'loading' ? (
                      <motion.div key="l" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                        <Terminal size={20} />
                      </motion.div>
                    ) : status === 'success' ? (
                      <motion.span key="s" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                        <CheckCircle2 size={20} /> Sent
                      </motion.span>
                    ) : status === 'error' ? (
                      <motion.span key="e" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                        <AlertCircle size={20} /> Retry
                      </motion.span>
                    ) : (
                      <motion.span key="i" className="flex items-center gap-3">
                        Initiate Transmission <Send size={18} />
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
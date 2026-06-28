import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { contactInfo } from '../data/contactData';

const navLinks = [
  { name: 'About', to: 'about' },
  { name: 'Experience', to: 'experience' },
  { name: 'Projects', to: 'projects' },
  { name: 'Skills', to: 'skills' },
  { name: 'Contact', to: 'contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#fbfbfd] dark:bg-[#0b0b10] border-t border-gray-100 dark:border-white/10 overflow-hidden">
      <div className="aurora-blob w-[400px] h-[300px] -bottom-20 left-1/2 -translate-x-1/2 bg-brand-400/10 dark:bg-brand-600/10" />
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand */}
          <div>
            <p className="text-2xl font-display font-bold tracking-tight text-[#1d1d1f] dark:text-white">
              Pratham<span className="text-aurora">.</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs font-medium">
              Software Engineer @ Accenture — building scalable MERN apps & enterprise automation.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 grid place-items-center text-gray-500 hover:text-brand-500 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href={`mailto:${contactInfo.email}`} aria-label="Email" className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 grid place-items-center text-gray-500 hover:text-brand-500 transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick nav */}
          <div className="md:justify-self-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Navigate</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} smooth offset={-80} className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-brand-500 cursor-pointer transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:justify-self-end">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-accent-violet text-white text-xs font-bold uppercase tracking-widest shadow-glow"
            >
              <ChevronUp size={16} /> Back to top
            </motion.button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            © {currentYear} Pratham Dhingra. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
            Built with React · Vite · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
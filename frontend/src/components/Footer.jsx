import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { contactInfo } from '../data/contactData';

const navLinks = [
  { name: 'About', to: 'about' },
  { name: 'Education', to: 'education' },
  { name: 'Experience', to: 'experience' },
  { name: 'Projects', to: 'projects' },
  { name: 'Skills', to: 'skills' },
  { name: 'Certificates', to: 'certificates' },
  { name: 'Contact', to: 'contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-line/10 pt-20 pb-8 overflow-hidden">
      <div className="u-container">
        {/* Big CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-line/10">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-70 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
              </span>
              Available for work
            </p>
            <Link to="contact" smooth offset={-90} className="cursor-pointer group inline-block">
              <h2 className="font-serif text-5xl md:text-7xl tracking-tight text-ink leading-[0.98]">
                Let's build something
                <br />
                <span className="italic font-normal group-hover:text-ink-soft transition-colors">
                  worth shipping.
                </span>
              </h2>
            </Link>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${contactInfo.email}`} className="btn-accent">
                {contactInfo.email}
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:justify-items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint mb-4">
                Navigate
              </p>
              <ul className="space-y-2.5">
                {navLinks.slice(0, 4).map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} smooth offset={-90} className="text-sm text-ink-soft hover:text-ink cursor-pointer transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint mb-4">
                More
              </p>
              <ul className="space-y-2.5">
                {navLinks.slice(4).map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} smooth offset={-90} className="text-sm text-ink-soft hover:text-ink cursor-pointer transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${contactInfo.email}`} className="text-sm text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1.5">
                    <Mail size={13} /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-soft">
            © {currentYear} Pratham Dhingra
          </p>
          <p className="font-mono text-[11px] text-ink-faint tracking-[0.1em]">
            React · Vite · Tailwind · Framer Motion
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full border border-line/12 px-4 py-2 text-sm font-medium text-ink hover:bg-paper-sunken transition-colors"
          >
            Back to top <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>

      {/* oversized wordmark */}
      <p
        aria-hidden
        className="select-none pointer-events-none mt-10 text-center font-serif text-[19vw] leading-none tracking-tight text-ink/[0.035]"
      >
        Pratham
      </p>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const links = [
  { name: 'About', to: 'about' },
  { name: 'Education', to: 'education' },
  { name: 'Experience', to: 'experience' },
  { name: 'Projects', to: 'projects' },
  { name: 'Skills', to: 'skills' },
  { name: 'Certificates', to: 'certificates' },
  { name: 'Contact', to: 'contact' },
];

const IconToggle = ({ onClick, label, children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="grid place-items-center w-10 h-10 rounded-full border border-line/12 text-ink-soft hover:text-ink hover:border-line/25 hover:bg-paper-sunken transition-all duration-300"
  >
    {children}
  </button>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (favicon) favicon.href = dark ? '/favicon-dark.svg' : '/favicon-light.svg';
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 pt-4 px-4"
      >
        <div
          className={`u-container flex items-center justify-between transition-all duration-500 rounded-full ${
            scrolled
              ? 'py-2.5 px-4 md:px-5 border border-line/10 bg-paper/80 backdrop-blur-xl shadow-soft'
              : 'py-2.5 px-1'
          }`}
        >
          {/* Wordmark */}
          <Link to="hero" smooth offset={-120} className="flex items-center gap-3 cursor-pointer group">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-ink text-paper font-serif text-lg leading-none pt-0.5 transition-transform duration-500 group-hover:rotate-6">
              P
            </span>
            <span className="hidden sm:block font-serif text-[19px] tracking-tight text-ink">
              Pratham Dhingra
            </span>
          </Link>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                offset={-90}
                spy
                activeClass="!text-ink after:!w-4"
                className="relative px-3.5 py-2 text-[13px] font-medium text-ink-soft hover:text-ink transition-colors cursor-pointer after:absolute after:left-3.5 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <IconToggle onClick={toggleTheme} label="Toggle theme">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </IconToggle>

            <Link
              to="contact"
              smooth
              offset={-90}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-ink text-paper pl-4 pr-3 py-2 text-[13px] font-medium cursor-pointer hover:bg-accent hover:text-accent-ink transition-all duration-300"
            >
              Let's talk <ArrowUpRight size={15} />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-line/12 text-ink"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block w-4 h-px bg-current" />
                <span className="block w-4 h-px bg-current" />
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-paper lg:hidden"
          >
            <div className="grain pointer-events-none absolute inset-0 opacity-[0.04]" />
            <div className="relative flex items-center justify-between px-6 pt-6">
              <span className="font-serif text-xl text-ink">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid place-items-center w-11 h-11 rounded-full border border-line/15 text-ink"
              >
                <span className="relative w-4 h-4">
                  <span className="absolute top-1/2 left-0 w-4 h-px bg-current rotate-45" />
                  <span className="absolute top-1/2 left-0 w-4 h-px bg-current -rotate-45" />
                </span>
              </button>
            </div>

            <nav className="relative px-6 mt-8 flex flex-col">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  className="border-b border-line/10"
                >
                  <Link
                    to={link.to}
                    smooth
                    offset={-90}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline justify-between py-5 cursor-pointer group"
                  >
                    <span className="font-serif text-4xl text-ink group-hover:text-ink-soft transition-colors">
                      {link.name}
                    </span>
                    <span className="index-tag">{String(i + 1).padStart(2, '0')}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative px-6 mt-10"
            >
              <Link
                to="contact"
                smooth
                offset={-90}
                onClick={() => setMobileOpen(false)}
                className="btn-accent w-full"
              >
                Let's talk <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
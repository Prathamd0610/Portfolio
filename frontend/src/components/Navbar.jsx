import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { toggleMute, isMuted } from '../utils/sound';

const links = [
  { name: 'About', to: 'about' },
  { name: 'Education', to: 'education' },
  { name: 'Experience', to: 'experience' },
  { name: 'Projects', to: 'projects' },
  { name: 'Skills', to: 'skills' },
  { name: 'Certificates', to: 'certificates' },
  { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();
  const [soundOn, setSoundOn] = useState(!isMuted());

  // Favicon switcher
  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = dark ? '/favicon-dark.svg' : '/favicon-light.svg';
    }
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = toggleMute();
    setSoundOn(!muted);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-3 glass-panel' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: 90 }} className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-violet rounded-2xl flex items-center justify-center text-white shadow-glow">
            <Terminal size={20} />
          </motion.div>
          <span className="text-xl font-display font-bold tracking-tight">PRATHAM<span className="text-aurora">.</span></span>
        </div>

        {/* Desktop links – react‑scroll activeClass handles highlighting */}
        <div className="hidden lg:flex items-center gap-1 glass-panel p-1 rounded-2xl">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              offset={-80}
              spy={true}
              activeClass="!text-brand-600 dark:!text-brand-400 bg-gray-100 dark:bg-white/5"
              className="relative px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition cursor-pointer text-gray-400 hover:text-[#1d1d1f] dark:hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={handleSoundToggle}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl bg-gray-100 dark:bg-[#2c2c2e] text-gray-600 dark:text-gray-300"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </motion.button>
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl bg-gray-100 dark:bg-[#2c2c2e] text-gray-600 dark:text-gray-300"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full glass-panel p-8 flex flex-col gap-6 lg:hidden"
          >
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                offset={-80}
                spy={true}
                activeClass="!text-brand-500"
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-display font-bold tracking-tight text-gray-300 hover:text-brand-500 transition cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
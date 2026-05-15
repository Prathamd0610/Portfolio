import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-12 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-[#1d1d1f] dark:text-white tracking-tight">
            Pratham<span className="text-[#0071e3]">.</span>
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Built with React & Tailwind CSS</p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          © {currentYear} All rights reserved.
        </div>
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gray-100 dark:bg-[#1c1c1e] rounded-full text-gray-400 dark:text-gray-500 hover:text-[#0071e3] transition-colors shadow-sm"
        >
          <ChevronUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
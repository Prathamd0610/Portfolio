import { motion } from 'framer-motion';
import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed top-32 right-6 z-50 hidden lg:block cursor-grab active:cursor-grabbing"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-brand-500 transition-colors"
      >
        {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
        {copied ? 'Copied!' : 'Share'}
      </motion.button>
    </motion.div>
  );
};

export default ShareButton;
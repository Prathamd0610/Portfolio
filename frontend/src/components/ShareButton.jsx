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
      className="fixed top-24 right-6 z-40 hidden lg:block cursor-grab active:cursor-grabbing"
    >
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full border border-line/12 bg-paper/80 backdrop-blur-xl px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors shadow-soft"
      >
        {copied ? <Check size={14} className="text-ink" /> : <Share2 size={14} />}
        {copied ? 'Copied' : 'Share'}
      </motion.button>
    </motion.div>
  );
};

export default ShareButton;
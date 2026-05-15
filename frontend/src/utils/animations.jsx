import { motion } from 'framer-motion';

// 1. High-End Transition Physics
export const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 22,
  mass: 1
};

export const smoothBezier = {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96]
};

// 2. Standalone Export (This fixes the import error in Education.jsx)
export const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: smoothBezier 
  },
  viewport: { once: true, margin: "-100px" }
};

// 3. Global Motion Variants
export const variants = {
  // Stagger logic for Education/Projects lists
  container: {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  },
  
  // Reference the standalone fadeInUp here
  fadeInUp,

  // Apple-style button interaction
  buttonHover: {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

/**
 * REUSABLE COMPONENT: ScrollReveal
 * Wraps any section to give it high-end entrance motion
 */
export const ScrollReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ ...smoothBezier, delay }}
  >
    {children}
  </motion.div>
);
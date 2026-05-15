export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } }
};
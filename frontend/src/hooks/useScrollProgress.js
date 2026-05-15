import { useScroll, useSpring } from 'framer-motion';

export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
};
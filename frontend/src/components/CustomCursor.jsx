import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    // Skip entirely on touch / coarse-pointer devices (no custom cursor needed).
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    let last = false;
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const isHover = !!e.target.closest('a, button, .hoverable');
      if (isHover !== last) {
        last = isHover;
        setHovering(isHover);
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-500/40 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          scale: hovering ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-500 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

export default CustomCursor;
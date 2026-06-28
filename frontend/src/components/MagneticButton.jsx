import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, className, onClick, ...props }) => {
  const ref = useRef(null);
  // Motion values + springs avoid React re-renders on every mouse move.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
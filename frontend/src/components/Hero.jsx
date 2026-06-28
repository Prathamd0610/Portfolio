import React, { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Download, ArrowUpRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-scroll';
import MagneticButton from './MagneticButton';
import { playSound } from '../utils/sound';
import resumeFile from '../assets/resume.pdf';

// 3D scene is heavy (Three.js) — load it lazily so it stays out of the main bundle.
const Hero3D = React.lazy(() => import('./Hero3D'));

const AnimatedCounter = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 1500;
    const step = (end - start) / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 500], [0, -80]);
  const opacityContent = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleCard = useTransform(scrollY, [0, 400], [1, 0.95]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 30);
    mouseY.set((clientY / innerHeight - 0.5) * 30);
  };

  const stack = ['MERN Stack', 'Test Automation', 'Java', 'Agentic AI', 'Cloud'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden bg-white dark:bg-[#0b0b10]"
    >
      {/* aurora background (static — animating huge blurred blobs causes jank) */}
      <div className="aurora-blob w-[520px] h-[520px] top-0 -left-32 bg-brand-400/25 dark:bg-brand-600/20" />
      <div className="aurora-blob w-[460px] h-[460px] bottom-0 right-0 bg-accent-violet/20 dark:bg-accent-violet/20" />

      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 grid-bg opacity-[0.4] dark:opacity-[0.25] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left */}
        <motion.div
          style={{ y: yContent, opacity: opacityContent }}
          className="lg:col-span-7 z-10 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6">
            <span className="relative w-2 h-2">
              <span className="animate-ping absolute w-2 h-2 rounded-full bg-brand-500 opacity-75" />
              <span className="relative block w-2 h-2 rounded-full bg-brand-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300">
              Software Engineer @ Accenture
            </span>
          </motion.div>

          <motion.h2 variants={item} className="font-mono text-[11px] font-bold tracking-[0.35em] uppercase mb-4 text-gray-400 dark:text-gray-500">
            Full-Stack Development · Quality Engineering
          </motion.h2>

          <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.92] mb-6 text-[#1d1d1f] dark:text-white text-balance">
            Building software <br />
            that <span className="text-aurora">actually ships.</span>
          </motion.h1>

          <motion.p variants={item} className="max-w-xl text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 font-medium mx-auto lg:mx-0">
            I'm <span className="text-[#1d1d1f] dark:text-white font-bold">Pratham Dhingra</span> — a{' '}
            <span className="text-brand-600 dark:text-brand-400 font-semibold">Software Engineer</span> at Accenture.
            I pair high-performance{' '}
            <span className="text-brand-600 dark:text-brand-400 font-semibold">MERN</span> development with
            enterprise-grade <span className="text-brand-600 dark:text-brand-400 font-semibold">test automation</span>.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
            <MagneticButton>
              <Link to="projects" smooth offset={-80}>
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => playSound('click')}
                  className="px-8 py-4 bg-gradient-to-r from-brand-600 to-accent-violet text-white rounded-2xl font-bold text-[12px] uppercase tracking-widest flex items-center gap-3 shadow-glow cursor-pointer"
                >
                  View My Work <ArrowUpRight size={16} />
                </motion.span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <motion.a
                href={resumeFile}
                download="Pratham_Dhingra_Resume.pdf"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => playSound('click')}
                className="px-8 py-4 rounded-2xl font-bold text-[12px] uppercase tracking-widest flex items-center gap-3 border border-gray-200 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur-sm text-[#1d1d1f] dark:text-white"
              >
                Resume <Download size={16} />
              </motion.a>
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-3 mt-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-brand-500" /> Zero critical defects</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span className="flex items-center gap-1.5"><Zap size={13} className="text-brand-500" /> 40% faster QA</span>
          </motion.div>
        </motion.div>

        {/* Right - 3D object + animated counters */}
        <motion.div
          className="lg:col-span-5 relative hidden lg:block"
          style={{ scale: scaleCard }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full aspect-square max-w-[400px] ml-auto rounded-5xl overflow-hidden glass-panel gradient-border group"
          >
            <div className="absolute inset-0">
              <Suspense
                fallback={
                  <div className="w-full h-full grid place-items-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-accent-violet blur-2xl opacity-60 animate-float" />
                  </div>
                }
              >
                <Hero3D />
              </Suspense>
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10">
                <Sparkles size={12} className="text-brand-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white">Live Build</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-4xl">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="group/stat">
                    <p className="text-2xl font-display font-bold text-aurora">
                      <AnimatedCounter target="2" suffix="+" />
                    </p>
                    <p className="text-[8px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase mt-1">Years Exp</p>
                  </div>
                  <div className="border-x border-gray-200 dark:border-white/10 group/stat">
                    <p className="text-2xl font-display font-bold text-aurora">
                      <AnimatedCounter target="12" suffix="+" />
                    </p>
                    <p className="text-[8px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase mt-1">Projects</p>
                  </div>
                  <div className="group/stat">
                    <p className="text-2xl font-display font-bold text-aurora">
                      <AnimatedCounter target="40" suffix="%" />
                    </p>
                    <p className="text-[8px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase mt-1">Faster QA</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 w-full flex flex-wrap justify-center gap-x-8 gap-y-2 px-4"
      >
        {stack.map((label, i) => (
          <motion.span
            key={i}
            whileHover={{ y: -2, opacity: 1 }}
            className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600 cursor-default whitespace-nowrap opacity-50"
          >
            {label}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
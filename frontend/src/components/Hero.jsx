import React, { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Download, ArrowUpRight } from 'lucide-react';
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
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
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
    const duration = 1400;
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

const stats = [
  { target: '2', suffix: '+', label: 'Years shipping' },
  { target: '6', suffix: '', label: 'Projects delivered' },
  { target: '40', suffix: '%', label: 'Faster QA cycles' },
  { target: '0', suffix: '', label: 'Critical defects' },
];

const marquee = ['MERN Stack', 'Test Automation', 'Java', 'Selenium', 'Agentic AI', 'React', 'Node.js', 'Cloud', 'CI/CD'];

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 24);
    mouseY.set((clientY / innerHeight - 0.5) * 24);
  };

  const rise = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col pt-28 pb-8 overflow-hidden"
    >
      {/* masthead strip */}
      <div className="u-container w-full">
        <motion.div
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center justify-between gap-4 py-4 border-b border-line/10 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft"
        >
          <span>
            Portfolio <span className="text-ink-faint">© 2026</span>
          </span>
          <span className="hidden md:block">Software Engineer — Accenture</span>
          <span className="inline-flex items-center gap-2 text-ink">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-70 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
            </span>
            Available
          </span>
        </motion.div>
      </div>

      {/* main hero */}
      <div className="u-container w-full flex-1 flex items-center py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center w-full">
          {/* text column */}
          <div className="md:col-span-8">
            {/* eyebrow */}
            <motion.div variants={rise} initial="hidden" animate="visible" custom={1}>
              <span className="eyebrow">
                <span className="index-tag">01</span>
                <span className="w-6 h-px bg-line/20" />
                Introduction
              </span>
            </motion.div>

            {/* giant name */}
            <motion.h1
              variants={rise}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-6 font-serif font-medium tracking-tightest text-ink leading-[0.86] text-[15vw] sm:text-[12vw] md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem]"
            >
              Pratham
              <br />
              Dhingra<span className="text-accent">.</span>
            </motion.h1>

            {/* statement + CTAs */}
            <motion.div
              variants={rise}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-9 max-w-xl"
            >
              <p className="font-serif text-xl md:text-[26px] leading-snug text-ink-soft">
                Software Engineer building high-performance{' '}
                <span className="text-ink">MERN</span> products &amp; enterprise-grade{' '}
                <span className="text-ink">automation</span> that actually{' '}
                <span className="mark text-ink">ships.</span>
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <MagneticButton>
                  <Link to="projects" smooth offset={-90}>
                    <span onClick={() => playSound('click')} className="btn-primary cursor-pointer">
                      View selected work <ArrowUpRight size={16} />
                    </span>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href={resumeFile}
                    download="Pratham_Dhingra_Resume.pdf"
                    onClick={() => playSound('click')}
                    className="btn-ghost"
                  >
                    Résumé <Download size={16} />
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* 3D orb column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex md:col-span-4 flex-col items-center gap-4"
          >
            <motion.div
              style={{ x: springX, y: springY }}
              className="relative w-[200px] h-[200px] lg:w-[250px] xl:w-[300px] rounded-full border border-line/12 bg-paper-sunken/40 overflow-hidden"
            >
              <Suspense
                fallback={
                  <div className="w-full h-full grid place-items-center">
                    <div className="w-20 h-20 rounded-full border border-line/15 animate-float" />
                  </div>
                }
              >
                <Hero3D />
              </Suspense>
            </motion.div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
              Live · WebGL
            </span>
          </motion.div>
        </div>
      </div>

      {/* stat rail */}
      <div className="u-container w-full">
        <motion.div
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={4}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-line/10"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 md:py-7 ${i !== 0 ? 'md:border-l border-line/10 md:pl-6' : ''}`}
            >
              <p className="font-serif text-4xl md:text-5xl text-ink tabnum">
                <AnimatedCounter target={s.target} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-[13px] text-ink-soft">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* marquee ticker */}
      <div className="relative z-10 mt-8 overflow-hidden border-t border-line/10 py-3.5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...marquee, ...marquee].map((label, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.22em] text-ink-faint">
              {label}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
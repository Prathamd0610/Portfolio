import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Download, Layout, Zap, ShieldCheck, Globe } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { playSound } from '../utils/sound';
import resumeFile from '../assets/resume.pdf';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';

// 3D Scene
const ThreeDObject = () => (
  <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} style={{ height: '100%' }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={0.8} />
    <Torus args={[1, 0.3, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#0071e3" wireframe />
    </Torus>
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
  </Canvas>
);

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

  const stack = ["MERN Stack", "Automation QA", "Java Spring", "UI/UX Design"];

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
      className="relative min-h-screen flex items-center justify-center px-6 pt-12 pb-10 overflow-hidden bg-white dark:bg-[#0a0a0a]"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
      >
        <div className="w-full h-full bg-[radial-gradient(#0071e3_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left */}
        <motion.div
          style={{ y: yContent, opacity: opacityContent }}
          className="lg:col-span-7 z-10 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 mb-6">
            <span className="relative w-2 h-2">
              <span className="animate-ping absolute w-2 h-2 rounded-full bg-[#0071e3] opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-[#0071e3]" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#0071e3]">Associate Software Engineer @ Accenture</span>
          </motion.div>

          <motion.h2 variants={item} className="text-[#0071e3] font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-3">
            Software Quality & Development
          </motion.h2>

          <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6 text-[#1d1d1f] dark:text-white">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] to-blue-400">Precision.</span>
          </motion.h1>

          <motion.p variants={item} className="max-w-lg text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 font-medium mx-auto lg:mx-0">
            I'm <span className="text-[#1d1d1f] dark:text-white font-bold underline decoration-[#0071e3]/30 decoration-2 underline-offset-4">Pratham Dhingra</span>. 
            Bridging high-performance <span className="text-[#0071e3]">MERN</span> development with enterprise-grade <span className="text-[#0071e3]">Automation Testing</span>.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm">
              <div className="flex -space-x-2">
                {[ShieldCheck, Zap, Globe].map((Icon, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#0071e3]">
                    <Icon size={10} />
                  </div>
                ))}
              </div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stack Verified</span>
            </div>

            <MagneticButton>
              <motion.a
                href={resumeFile}
                download="Pratham_Dhingra_Resume.pdf"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => playSound('click')}
                className="px-8 py-4 bg-[#1d1d1f] dark:bg-white dark:text-black text-white rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all duration-300"
              >
                Download Resume <Download size={16} />
              </motion.a>
            </MagneticButton>
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
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-square max-w-[380px] ml-auto rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-gray-800 group"
          >
            <div className="absolute inset-0 bg-[#fbfbfd] dark:bg-[#1c1c1e]">
              {/* 3D object fills the container */}
              <ThreeDObject />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-gray-700 shadow-2xl">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="group/stat">
                    <p className="text-lg font-black text-[#1d1d1f] dark:text-white group-hover/stat:text-[#0071e3] transition-colors">
                      <AnimatedCounter target="2" suffix="+" />
                    </p>
                    <p className="text-[8px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase">Years</p>
                  </div>
                  <div className="border-x border-gray-200 dark:border-gray-700 group/stat">
                    <p className="text-lg font-black text-[#1d1d1f] dark:text-white group-hover/stat:text-[#0071e3] transition-colors">
                      <AnimatedCounter target="15" suffix="+" />
                    </p>
                    <p className="text-[8px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase">Projects</p>
                  </div>
                  <div className="group/stat">
                    <p className="text-lg font-black text-[#1d1d1f] dark:text-white group-hover/stat:text-[#0071e3] transition-colors">
                      <AnimatedCounter target="100" suffix="%" />
                    </p>
                    <p className="text-[8px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase">Commit</p>
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
        className="absolute bottom-6 w-full flex justify-center gap-8 px-4"
      >
        {stack.map((item, i) => (
          <motion.span
            key={i}
            whileHover={{ y: -2, opacity: 1 }}
            className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 cursor-default whitespace-nowrap opacity-40"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
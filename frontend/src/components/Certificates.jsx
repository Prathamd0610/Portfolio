import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Zap, FileCheck, Landmark } from 'lucide-react';
import { certificationsData } from '../data/certificationsData';
import MagneticButton from './MagneticButton';
import { playSound } from '../utils/sound';

const certData = certificationsData; // rename for consistency

const TiltCard = ({ cert, verifyingId, handleVerify }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const frame = useRef(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, white, transparent 60%)`;
      }
    });
  };
  const handleMouseLeave = () => {
    cancelAnimationFrame(frame.current);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out, background-color 0.4s ease, box-shadow 0.4s ease',
        willChange: 'transform',
      }}
      className="relative bg-[#f5f5f7] dark:bg-[#1a1a24] border border-gray-100 dark:border-white/10 p-8 rounded-5xl group hover:bg-white dark:hover:bg-[#1f1f2b] hover:shadow-glow overflow-hidden"
    >
      <div
        ref={glareRef}
        className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-300"
      />
      <div className="flex justify-between items-start mb-10">
        <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-[#2c2c2e] flex items-center justify-center text-3xl shadow-sm group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
          {/* Note: icons from old data won't work because we only have string data now. We'll use a fallback icon based on category */}
          {cert.category === 'Corporate' ? <ShieldCheck className="text-blue-500" /> : <Award className="text-purple-500" />}
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[9px] font-black uppercase tracking-widest mb-2 border border-green-200 dark:border-green-800">
            {cert.status}
          </span>
          <p className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase">
            UID: {cert.id}
          </p>
        </div>
      </div>

      <h4 className="text-2xl font-display font-bold mb-2 leading-tight min-h-[60px] text-[#1d1d1f] dark:text-white group-hover:text-brand-500 transition-colors">
        {cert.title}
      </h4>
      <p className="text-gray-500 dark:text-gray-400 font-bold text-sm mb-8 flex items-center gap-2">
        <Landmark size={14} className="text-brand-500" /> {cert.issuer}
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {cert.skills.map((skill, i) => (
          <span key={i} className="text-[9px] font-black uppercase px-3 py-1.5 bg-white dark:bg-[#2c2c2e] rounded-lg text-gray-500 dark:text-gray-300 tracking-widest border border-gray-100 dark:border-gray-700 group-hover:border-blue-100 dark:group-hover:border-blue-900 transition-all">
            {skill}
          </span>
        ))}
      </div>

      <MagneticButton className="w-full">
        <motion.button
          onClick={() => { handleVerify(cert.id); playSound('click'); }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
            verifyingId === cert.id
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-brand-600 to-accent-violet text-white shadow-glow'
          }`}
        >
          {verifyingId === cert.id ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> VERIFYING
            </>
          ) : (
            <>
              <FileCheck size={16} /> Check Integrity
            </>
          )}
        </motion.button>
      </MagneticButton>
    </div>
  );
};

const Certificates = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [verifyingId, setVerifyingId] = useState(null);
  const sectionRef = useRef(null);

  // Tabs derived from the data so they always stay in sync.
  const tabs = ['All', ...new Set(certData.map((c) => c.category))];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.02]);

  const filteredCerts = activeTab === 'All'
    ? certData
    : certData.filter(c => c.category === activeTab);

  const handleVerify = (id) => {
    setVerifyingId(id);
    setTimeout(() => setVerifyingId(null), 2500);
  };

  return (
    <section ref={sectionRef} className="py-32 bg-white dark:bg-[#0b0b10] relative overflow-hidden" id="certificates">
      <motion.div
        style={{ y: watermarkY, opacity: watermarkOpacity }}
        className="absolute top-0 right-0 w-full h-full pointer-events-none select-none"
      >
        <div className="absolute top-10 right-10 text-[18vw] font-black tracking-tighter text-[#1d1d1f] dark:text-white">
          VALIDATED
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="section-label mb-4">// Verification Layer</span>
            <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none mt-3">
              <span className="text-aurora">Certifications</span>
              <span className="text-[#1d1d1f] dark:text-white">.</span>
            </h3>
          </div>

          <div className="flex flex-wrap bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white dark:bg-white/10 text-brand-600 dark:text-brand-400 shadow-md'
                    : 'text-gray-400 dark:text-gray-500 hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <TiltCard cert={cert} verifyingId={verifyingId} handleVerify={handleVerify} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
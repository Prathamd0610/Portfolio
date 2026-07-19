import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { certificationsData } from '../data/certificationsData';

const certData = certificationsData;

const statusTone = (status) => {
  const s = status.toLowerCase();
  if (s.includes('verified')) return { dot: 'bg-accent', text: 'text-ink' };
  if (s.includes('progress') || s.includes('pursuing')) return { dot: 'bg-ink-faint', text: 'text-ink-soft' };
  return { dot: 'bg-ink-soft', text: 'text-ink-soft' };
};

const CertCard = ({ cert }) => {
  const tone = statusTone(cert.status);
  return (
    <div className="group surface p-7 h-full flex flex-col surface-hover">
      <div className="flex items-start justify-between gap-4 mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint leading-relaxed max-w-[70%]">
          {cert.issuer}
        </p>
        <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] ${tone.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
          {cert.status}
        </span>
      </div>

      <h3 className="font-serif text-2xl leading-tight tracking-tight text-ink mb-6 min-h-[3.5rem]">
        {cert.title}
      </h3>

      <div className="flex flex-wrap gap-1.5 mb-7">
        {cert.skills.map((skill, i) => (
          <span key={i} className="chip">{skill}</span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-5 border-t border-line/10">
        <span className="font-mono text-[11px] text-ink-faint tabnum">{cert.id}</span>
        <span className="font-mono text-[11px] text-ink-soft">{cert.date}</span>
      </div>
    </div>
  );
};

const Certificates = () => {
  const [activeTab, setActiveTab] = useState('All');
  const sectionRef = useRef(null);

  const tabs = ['All', ...new Set(certData.map((c) => c.category))];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const filteredCerts =
    activeTab === 'All' ? certData : certData.filter((c) => c.category === activeTab);

  const verifiedCount = certData.filter((c) => c.status.toLowerCase().includes('verified')).length;

  return (
    <section ref={sectionRef} id="certificates" className="relative py-28 md:py-36 border-t border-line/10 overflow-hidden">
      {/* editorial watermark */}
      <motion.span
        aria-hidden
        style={{ y: watermarkY }}
        className="pointer-events-none select-none absolute -right-6 top-10 font-serif italic text-[20vw] leading-none text-ink/[0.03]"
      >
        Verified
      </motion.span>

      <div className="u-container relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="index-tag">07</span>
              <span className="w-8 h-px bg-line/20" />
              <span className="eyebrow">Certifications</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight text-ink">
              Credentials <span className="italic font-normal">on record.</span>
            </h2>
            <p className="mt-5 text-ink-soft">
              {certData.length} certifications · {verifiedCount} verified across cloud, automation & AI.
            </p>
          </motion.div>

          {/* Editorial text tabs */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-1.5 text-sm font-medium transition-colors ${
                  activeTab === tab ? 'text-ink' : 'text-ink-faint hover:text-ink-soft'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    layoutId="certTab"
                    className="absolute left-0 -bottom-px h-[2px] w-full bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <CertCard cert={cert} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
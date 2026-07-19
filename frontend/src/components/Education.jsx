import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, MapPin, Plus } from 'lucide-react';
import { educationData } from '../data/educationData';

const Education = () => {
  // First entry open by default for immediate context.
  const [openId, setOpenId] = useState(educationData[0]?.id ?? null);

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section id="education" className="relative py-28 md:py-36 border-t border-line/10">
      <div className="u-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="index-tag">03</span>
            <span className="w-8 h-px bg-line/20" />
            <span className="eyebrow">Education</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight text-ink">
            A systematic path <span className="italic font-normal">of learning.</span>
          </h2>
          <p className="mt-5 text-ink-soft text-base md:text-lg leading-relaxed">
            From foundational commerce to advanced computational logic and full-stack engineering.
          </p>
        </motion.div>

        {/* Accordion list */}
        <div className="border-t border-line/10">
          {educationData.map((edu, index) => {
            const isOpen = openId === edu.id;
            // Split "AKTU University, Lucknow • Grade: 8.35 CGPA (Current)" into parts
            const parts = edu.subInfo.split('•').map((s) => s.trim());
            const gradePart = parts.find((p) => /grade/i.test(p));
            const gradeValue = gradePart ? gradePart.replace(/grade:\s*/i, '') : null;
            const affiliation = parts.filter((p) => p !== gradePart).join(' · ');
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="border-b border-line/10"
              >
                <button
                  onClick={() => toggle(edu.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-4 md:gap-8 items-start md:items-center py-8 group"
                >
                  <span className="font-mono text-sm text-ink-faint tabnum tracking-tight">
                    {edu.years}
                  </span>

                  <span className="min-w-0">
                    <span className="block font-serif text-2xl md:text-[32px] leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-ink-soft">
                      {edu.degree}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink-soft">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <GraduationCap size={15} /> {edu.institution}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-ink-faint">
                        <MapPin size={14} /> {edu.location}
                      </span>
                    </span>
                  </span>

                  <span
                    className={`justify-self-start md:justify-self-end grid place-items-center w-11 h-11 rounded-full border transition-all duration-500 ${
                      isOpen
                        ? 'bg-accent border-accent text-accent-ink rotate-45'
                        : 'border-line/15 text-ink-soft group-hover:border-line/30 group-hover:text-ink'
                    }`}
                  >
                    <Plus size={18} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="md:grid md:grid-cols-[160px_1fr] md:gap-8 pb-9">
                        {/* Left meta column — top-aligned so it never stretches */}
                        <div className="hidden md:block self-start space-y-5">
                          {affiliation && (
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint mb-1.5">
                                Affiliation
                              </p>
                              <p className="text-sm font-medium text-ink leading-snug">{affiliation}</p>
                            </div>
                          )}
                          {gradeValue && (
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint mb-1.5">
                                Grade
                              </p>
                              <p className="font-serif text-2xl text-ink leading-none">{gradeValue}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-[15px] md:text-base text-ink-soft leading-relaxed max-w-2xl">
                            {edu.description}
                          </p>
                          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                            {edu.modules.map((mod, mi) => (
                              <div
                                key={mi}
                                className="surface-sunken rounded-2xl p-4 hover:border-line/20 transition-colors"
                              >
                                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint mb-1.5">
                                  Module {String(mi + 1).padStart(2, '0')}
                                </p>
                                <p className="text-[13px] font-semibold text-ink leading-tight">{mod}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
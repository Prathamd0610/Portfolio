import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, MapPin, Star, ArrowUpRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/educationData';

const Education = () => {
  const [hovered, setHovered] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const handleArrowClick = (id) => {
    setExpandedId(id);
    setHovered(null);
  };

  const handleBack = () => {
    setExpandedId(null);
  };

  return (
    <section className="py-32 bg-white dark:bg-[#0b0b10] relative overflow-hidden" id="education">
      <div className="aurora-blob w-[440px] h-[440px] top-10 right-0 bg-brand-400/12 dark:bg-brand-600/12" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <div className="max-w-2xl">
            <span className="section-label mb-4">// Academic Lineage</span>
            <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none mb-8 mt-3">
              <span className="text-aurora">Education</span>
              <span className="text-[#1d1d1f] dark:text-white">.</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              A systematic approach to learning — from foundational commerce to advanced
              computational logic and full-stack engineering.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {educationData.map((edu, index) => {
            const isExpanded = expandedId === edu.id;

            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => !isExpanded && setHovered(edu.id)}
                onHoverEnd={() => setHovered(null)}
                className="group relative card-glow p-8 md:p-12"
              >
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    /* ---------- EXPANDED DETAIL VIEW ---------- */
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col"
                    >
                      <button
                        onClick={handleBack}
                        className="mb-8 self-start p-3 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-brand-500 transition flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-brand-500"
                      >
                        <ArrowLeft size={18} /> Back
                      </button>

                      <h4 className="text-3xl md:text-5xl font-display font-bold text-[#1d1d1f] dark:text-white mb-6 tracking-tighter">
                        {edu.degree}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 font-medium">
                        {edu.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 border-t border-gray-200 dark:border-white/10">
                        {edu.modules.map((mod, mi) => (
                          <div key={mi} className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                            <p className="text-[10px] font-black uppercase text-brand-500 mb-1">Module {mi + 1}</p>
                            <p className="text-xs font-bold text-[#1d1d1f] dark:text-white leading-tight">{mod}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    /* ---------- DEFAULT TILE VIEW ---------- */
                    <motion.div
                      key="tile"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col lg:flex-row gap-12"
                    >
                      {/* Info Column */}
                      <div className="lg:w-2/3">
                        <div className="flex items-center gap-4 mb-8 flex-wrap">
                          <div className="px-5 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1d1d1f] dark:text-white font-mono text-xs font-bold shadow-sm">
                            {edu.years}
                          </div>
                          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest">
                            <Star size={14} /> Academic Distinction
                          </div>
                        </div>

                        <h4 className="text-3xl md:text-5xl font-display font-bold text-[#1d1d1f] dark:text-white mb-4 tracking-tighter group-hover:text-brand-500 transition-colors">
                          {edu.degree}
                        </h4>

                        <div className="space-y-3 mb-10">
                          <p className="text-xl font-bold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                            <GraduationCap className="text-brand-500" size={24} /> {edu.institution}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400 dark:text-gray-500 font-medium">
                            <span className="flex items-center gap-2"><MapPin size={16} /> {edu.location}</span>
                            <span className="flex items-center gap-2 font-mono text-xs bg-gray-50 dark:bg-white/5 px-3 py-1 rounded-lg border border-gray-100 dark:border-white/10">{edu.subInfo}</span>
                          </div>
                        </div>

                        {/* Modules Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 border-t border-gray-200 dark:border-white/10">
                          {edu.modules.map((mod, mi) => (
                            <div key={mi} className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10 group-hover:border-brand-200 dark:group-hover:border-brand-500/30 transition-all shadow-sm">
                              <p className="text-[10px] font-black uppercase text-brand-500 mb-1">Module {mi + 1}</p>
                              <p className="text-xs font-bold text-[#1d1d1f] dark:text-white leading-tight">{mod}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Column */}
                      <div className="lg:w-1/3 flex flex-col justify-between items-end border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-white/10 pt-8 lg:pt-0 lg:pl-12">
                        <motion.div
                          onClick={() => handleArrowClick(edu.id)}
                          animate={hovered === edu.id ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-accent-violet flex items-center justify-center text-white shadow-glow cursor-pointer transition-colors"
                          title="View details"
                        >
                          <ArrowUpRight size={32} />
                        </motion.div>

                        <div className="text-right w-full mt-8">
                          <p className="text-xs font-mono font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Completion</p>
                          <div className="flex items-center justify-end gap-3">
                            <div className="h-2 flex-1 max-w-[150px] bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-brand-500 to-accent-violet"
                              />
                            </div>
                            <CheckCircle2 size={24} className="text-brand-500" />
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
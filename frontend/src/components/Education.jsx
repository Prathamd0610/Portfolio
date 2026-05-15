import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, MapPin, CheckCircle2, Star, ArrowUpRight, ArrowLeft } from 'lucide-react';
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
    <section className="py-32 bg-white dark:bg-[#0a0a0a] relative overflow-hidden" id="education">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <div className="max-w-2xl">
            <h2 className="text-[#0071e3] font-mono text-sm font-bold tracking-[0.4em] uppercase mb-4">Academic Lineage</h2>
            <h3 className="text-6xl md:text-8xl font-black text-[#1d1d1f] dark:text-white tracking-tighter leading-none mb-8">
              Education<span className="text-[#0071e3]">.</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              A systematic approach to learning, from foundational commerce to advanced 
              computational logic and full-stack engineering.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
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
                className="group relative bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-500"
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
                      {/* Back Arrow Button */}
                      <button
                        onClick={handleBack}
                        className="mb-8 self-start p-3 rounded-full bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-gray-700 hover:border-[#0071e3] transition flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#0071e3]"
                      >
                        <ArrowLeft size={18} /> Back
                      </button>

                      <h4 className="text-3xl md:text-5xl font-black text-[#1d1d1f] dark:text-white mb-6 tracking-tighter">
                        {edu.degree}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 font-medium">
                        {edu.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 border-t border-gray-200 dark:border-gray-700">
                        {edu.modules.map((mod, mi) => (
                          <div key={mi} className="bg-white dark:bg-[#2c2c2e] p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Module {mi + 1}</p>
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
                        <div className="flex items-center gap-4 mb-8">
                          <div className="px-5 py-2 rounded-full bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-gray-700 text-[#1d1d1f] dark:text-white font-mono text-xs font-bold shadow-sm">
                            {edu.years}
                          </div>
                          <div className="flex items-center gap-2 text-[#0071e3] font-bold text-xs uppercase tracking-widest">
                            <Star size={14} /> Academic Distinction
                          </div>
                        </div>

                        <h4 className="text-3xl md:text-5xl font-black text-[#1d1d1f] dark:text-white mb-4 tracking-tighter group-hover:text-[#0071e3] transition-colors">
                          {edu.degree}
                        </h4>

                        <div className="space-y-3 mb-10">
                          <p className="text-xl font-bold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                            <GraduationCap className="text-[#0071e3]" size={24} /> {edu.institution}
                          </p>
                          <div className="flex flex-wrap items-center gap-6 text-gray-400 dark:text-gray-500 font-medium">
                            <span className="flex items-center gap-2"><MapPin size={16} /> {edu.location}</span>
                            <span className="flex items-center gap-2 font-mono text-xs bg-white dark:bg-[#2c2c2e] px-3 py-1 rounded-lg border border-gray-100 dark:border-gray-700">{edu.subInfo}</span>
                          </div>
                        </div>

                        {/* Modules Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 border-t border-gray-200 dark:border-gray-700">
                          {edu.modules.map((mod, mi) => (
                            <div key={mi} className="bg-white dark:bg-[#2c2c2e] p-4 rounded-2xl border border-gray-100 dark:border-gray-700 group-hover:border-blue-50 dark:group-hover:border-blue-900 transition-all shadow-sm">
                              <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Module {mi + 1}</p>
                              <p className="text-xs font-bold text-[#1d1d1f] dark:text-white leading-tight">{mod}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Column */}
                      <div className="lg:w-1/3 flex flex-col justify-between items-end border-l border-gray-200 dark:border-gray-700 lg:pl-12">
                        <motion.div
                          onClick={() => handleArrowClick(edu.id)}
                          animate={hovered === edu.id ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
                          className="w-20 h-20 rounded-full bg-white dark:bg-[#2c2c2e] border border-gray-100 dark:border-gray-700 flex items-center justify-center text-[#1d1d1f] dark:text-white shadow-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          title="View details"
                        >
                          <ArrowUpRight size={32} />
                        </motion.div>

                        <div className="text-right w-full">
                          <p className="text-xs font-mono font-bold text-gray-300 dark:text-gray-600 uppercase tracking-widest mb-2">Completion Status</p>
                          <div className="flex items-center justify-end gap-3">
                            <div className="h-2 flex-1 max-w-[150px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-[#0071e3]"
                              />
                            </div>
                            <CheckCircle2 size={24} className="text-[#0071e3]" />
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
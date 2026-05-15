import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, CheckCircle, Cpu, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { experienceData } from '../data/experienceData';

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleArrowClick = (id) => {
    setExpandedId(id);
    setHovered(null);
  };

  const handleBack = () => {
    setExpandedId(null);
  };

  return (
    <section className="py-32 bg-[#fcfcfd] dark:bg-[#0a0a0a]" id="experience">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-[#0071e3] font-mono text-sm font-bold tracking-[0.4em] uppercase mb-4">Career Path</h2>
          <h3 className="text-6xl md:text-8xl font-black text-[#1d1d1f] dark:text-white tracking-tighter leading-none mb-8">
            Experience<span className="text-[#0071e3]">.</span>
          </h3>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 dark:bg-gray-800 hidden md:block" />

          <div className="space-y-24">
            {experienceData.map((job, index) => {
              const isExpanded = expandedId === job.id;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row gap-12 ${!isLeft ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-[-13px] md:left-1/2 md:ml-[-13px] top-0 w-6 h-6 rounded-full bg-white dark:bg-[#1c1c1e] border-4 border-[#0071e3] z-10 shadow-lg shadow-blue-100 dark:shadow-none" />

                  <div className="md:w-1/2 group">
                    <div className="bg-white dark:bg-[#1c1c1e] p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-100 dark:shadow-none group-hover:border-[#0071e3]/20 dark:group-hover:border-blue-900 transition-all duration-500">
                      <AnimatePresence mode="wait">
                        {isExpanded ? (
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
                              className="mb-8 self-start p-3 rounded-full bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-gray-700 hover:border-[#0071e3] transition flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#0071e3]"
                            >
                              <ArrowLeft size={18} /> Back
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#0071e3]">
                                <Briefcase size={24} />
                              </div>
                              <div>
                                <p className="text-xs font-mono font-bold text-[#0071e3] uppercase tracking-widest">{job.period}</p>
                                <h4 className="text-2xl font-black text-[#1d1d1f] dark:text-white tracking-tight">{job.role}</h4>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-8 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-50 dark:bg-[#2c2c2e] w-fit px-4 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
                              <Cpu size={14} /> {job.company} &bull; {job.type}
                            </div>

                            <div className="space-y-4 mb-10">
                              {job.fullDetails.map((item, i) => (
                                <div key={i} className="flex gap-4 items-start group/item">
                                  <CheckCircle size={18} className="text-[#0071e3] mt-1 shrink-0" />
                                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover/item:text-[#1d1d1f] dark:group-hover/item:text-white transition-colors">{item}</p>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-100 dark:border-gray-700">
                              {job.stack.map((tech) => (
                                <span key={tech} className="text-[10px] font-black uppercase px-3 py-1.5 rounded-lg bg-[#1d1d1f] dark:bg-white dark:text-black text-white tracking-widest">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="tile"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#0071e3]">
                                <Briefcase size={24} />
                              </div>
                              <div>
                                <p className="text-xs font-mono font-bold text-[#0071e3] uppercase tracking-widest">{job.period}</p>
                                <h4 className="text-2xl font-black text-[#1d1d1f] dark:text-white tracking-tight">{job.role}</h4>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-8 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-50 dark:bg-[#2c2c2e] w-fit px-4 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
                              <Cpu size={14} /> {job.company} &bull; {job.type}
                            </div>

                            <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed font-medium">
                              {job.description}
                            </p>

                            <div className="space-y-4 mb-10">
                              {job.achievements.map((item, i) => (
                                <div key={i} className="flex gap-4 items-start group/item">
                                  <CheckCircle size={18} className="text-[#0071e3] mt-1 shrink-0" />
                                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover/item:text-[#1d1d1f] dark:group-hover/item:text-white transition-colors">{item}</p>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-100 dark:border-gray-700">
                              {job.stack.map((tech) => (
                                <span key={tech} className="text-[10px] font-black uppercase px-3 py-1.5 rounded-lg bg-[#1d1d1f] dark:bg-white dark:text-black text-white tracking-widest">
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <motion.div
                              onClick={() => handleArrowClick(job.id)}
                              onMouseEnter={() => setHovered(job.id)}
                              onMouseLeave={() => setHovered(null)}
                              animate={{ rotate: hovered === job.id ? 45 : 0, scale: hovered === job.id ? 1.1 : 1 }}
                              className="mt-6 ml-auto w-14 h-14 rounded-full bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#1d1d1f] dark:text-white shadow-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              title="View full details"
                            >
                              <ArrowUpRight size={24} />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
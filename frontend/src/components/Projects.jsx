import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Zap, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';

const TiltImage = ({ project }) => {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const frame = useRef(0);

  const handleMouseMove = (e) => {
    const el = ref.current;
    const card = cardRef.current;
    if (!el || !card) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };
  const handleMouseLeave = () => {
    cancelAnimationFrame(frame.current);
    if (cardRef.current) cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className="w-full lg:w-3/5 group cursor-pointer relative"
    >
      <div
        ref={cardRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out',
          willChange: 'transform',
        }}
        className="relative aspect-video rounded-5xl overflow-hidden bg-gray-100 dark:bg-[#1a1a24] border border-gray-100 dark:border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-white dark:from-brand-900/30 dark:to-[#13131b] flex items-center justify-center">
          <Layers size={100} strokeWidth={1} className="text-brand-500/20" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        <div className="absolute top-8 left-8 flex gap-3">
          <span className="px-4 py-2 rounded-full glass-panel text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d1d1f] dark:text-white">
            {project.status}
          </span>
          {project.year && (
            <span className="px-4 py-2 rounded-full glass-panel text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400">
              {project.year}
            </span>
          )}
        </div>

        {/* metrics overlay */}
        {project.metrics && (
          <div className="absolute bottom-8 left-8 right-8 flex gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex-1 px-3 py-2.5 rounded-2xl glass-panel text-center">
                <p className="text-sm font-display font-bold text-aurora">{m.value}</p>
                <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute -bottom-6 -right-6 lg:right-12 p-6 glass-panel rounded-4xl flex gap-4">
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-gradient-to-r from-brand-600 to-accent-violet text-white shadow-glow transition-all">
          <ExternalLink size={24} />
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="relative py-32 bg-white dark:bg-[#0b0b10] overflow-hidden" id="projects">
      <div className="aurora-blob w-[460px] h-[460px] top-20 -right-24 bg-accent-cyan/10 dark:bg-accent-cyan/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
          <div>
            <span className="section-label mb-4">// Engineering Output</span>
            <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none mt-3">
              <span className="text-aurora">Projects</span>
              <span className="text-[#1d1d1f] dark:text-white">.</span>
            </h3>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm font-medium md:text-right">
            Selected work spanning full-stack products and enterprise automation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}
            >
              <TiltImage project={project} />
              <div className="w-full lg:w-2/5">
                <span className="section-label mb-4">{project.category}</span>
                <h4 className="text-4xl md:text-5xl font-display font-bold text-[#1d1d1f] dark:text-white mb-6 tracking-tighter mt-3">{project.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10 font-medium">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {project.highlights.map((h, hi) => (
                    <div key={hi} className="flex items-center gap-2 text-sm font-semibold text-[#1d1d1f] dark:text-white">
                      <Zap size={14} className="text-brand-500 shrink-0" /> {h}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-12">
                  {project.tech.map((t, ti) => (
                    <span key={ti} className="text-[10px] font-mono font-bold px-3 py-1.5 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-300 rounded-lg border border-gray-100 dark:border-white/10">
                      {t}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="inline-flex items-center gap-4 text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest text-sm group"
                >
                  Explore Project <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
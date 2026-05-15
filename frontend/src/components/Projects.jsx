import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Zap, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';

const TiltImage = ({ project }) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);
  };
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
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
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out',
        }}
        className="relative aspect-video rounded-[3rem] overflow-hidden bg-gray-100 dark:bg-[#1c1c1e] border border-gray-100 dark:border-gray-800 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-50 dark:from-blue-900/20 dark:to-gray-900 flex items-center justify-center">
          <Layers size={100} strokeWidth={1} className="text-[#0071e3]/20" />
        </div>
        <div className="absolute top-8 left-8 flex gap-3">
          <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] border border-white/50 dark:border-gray-600 text-[#1d1d1f] dark:text-white">
            {project.status}
          </span>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 lg:right-12 p-8 bg-white dark:bg-[#1c1c1e] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 flex gap-4">
        <a href={project.github} className="p-4 rounded-full bg-gray-50 dark:bg-[#2c2c2e] text-gray-400 hover:bg-[#1d1d1f] dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
          <Github size={24} />
        </a>
        <a href={project.link} className="p-4 rounded-full bg-[#0071e3] text-white hover:bg-[#005bb7] shadow-lg shadow-blue-200 dark:shadow-none transition-all">
          <ExternalLink size={24} />
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="py-32 bg-white dark:bg-[#0a0a0a]" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <div>
            <h2 className="text-[#0071e3] font-mono text-sm font-bold tracking-[0.4em] uppercase mb-4">Engineering Output</h2>
            <h3 className="text-6xl md:text-8xl font-black text-[#1d1d1f] dark:text-white tracking-tighter leading-none">
              Projects<span className="text-[#0071e3]">.</span>
            </h3>
          </div>
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
                <span className="text-[#0071e3] font-mono text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                  {project.category}
                </span>
                <h4 className="text-5xl font-black text-[#1d1d1f] dark:text-white mb-8 tracking-tighter">{project.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10 font-medium italic">
                  "{project.description}"
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {project.highlights.map((h, hi) => (
                    <div key={hi} className="flex items-center gap-2 text-sm font-bold text-[#1d1d1f] dark:text-white">
                      <Zap size={14} className="text-[#0071e3]" /> {h}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-12">
                  {project.tech.map((t, ti) => (
                    <span key={ti} className="text-[10px] font-mono font-bold px-3 py-1 bg-gray-100 dark:bg-[#2c2c2e] text-gray-500 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700">
                      {t}
                    </span>
                  ))}
                </div>

                <motion.a 
                  href={project.link}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-[#0071e3] font-black uppercase tracking-widest text-sm group"
                >
                  View Case Study <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
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
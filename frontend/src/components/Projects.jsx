import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, Zap } from 'lucide-react';
import { projectsData } from '../data/projectsData';

const ProjectVisual = ({ project }) => {
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
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
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
      style={{ perspective: '1200px' }}
      className="group"
    >
      <div
        ref={cardRef}
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s ease-out', willChange: 'transform' }}
        className="surface overflow-hidden"
      >
        {/* caption bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-line/10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            {project.status}
          </span>
          {project.year && (
            <span className="font-mono text-[11px] text-ink-faint tabnum">{project.year}</span>
          )}
        </div>

        {/* visual field */}
        <div className="relative aspect-[16/10] bg-paper-sunken/50 overflow-hidden">
          <div className="grain absolute inset-0 opacity-[0.05]" />
          <div className="absolute inset-0 grid place-items-center">
            <Layers size={104} strokeWidth={0.75} className="text-ink/[0.08]" />
          </div>
          <span className="absolute top-5 left-5 font-serif text-6xl text-ink/[0.06] leading-none select-none">
            {project.title.charAt(0)}
          </span>

          {project.metrics && (
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-line/10 bg-paper/70 backdrop-blur-sm px-3 py-2 text-center">
                  <p className="font-serif text-lg text-ink leading-none tabnum">{m.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-28 md:py-36 border-t border-line/10">
      <div className="u-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="index-tag">05</span>
              <span className="w-8 h-px bg-line/20" />
              <span className="eyebrow">Selected Work</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight text-ink">
              Things I've <span className="italic font-normal">shipped.</span>
            </h2>
          </div>
          <p className="text-ink-soft max-w-xs md:text-right leading-relaxed">
            Full-stack products and enterprise automation, end to end.
          </p>
        </motion.div>

        <div className="border-t border-line/10">
          {projectsData.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-14 md:py-20 border-b border-line/10"
            >
              {/* Text column */}
              <div className={`lg:col-span-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-serif text-5xl text-ink/15 leading-none tabnum">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="eyebrow">{project.category}</span>
                </div>

                <h3 className="font-serif text-3xl md:text-5xl tracking-tight text-ink leading-[1.02]">
                  {project.title}
                </h3>

                <p className="mt-5 text-[15px] md:text-base text-ink-soft leading-relaxed max-w-xl">
                  {project.description}
                </p>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-xl">
                  {project.highlights.map((h, hi) => (
                    <div key={hi} className="flex items-center gap-2.5 py-1.5 border-b border-line/10">
                      <Zap size={13} className="text-ink-faint shrink-0" />
                      <span className="text-sm text-ink-soft">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t, ti) => (
                    <span key={ti} className="chip">{t}</span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 mt-8 text-sm font-medium text-ink link-underline"
                >
                  Explore project
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Visual column */}
              <div className={`lg:col-span-6 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <ProjectVisual project={project} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
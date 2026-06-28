import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillsData } from '../data/skillsData';

/* ────────────────────────────────────────────
   Refined Circular Skill Card
   ──────────────────────────────────────────── */
const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-30px' });

  // circle geometry
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (skill.percentage / 100) * circumference;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 24, scale: 0.96 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative flex flex-col items-center p-5 rounded-4xl
                 bg-white/80 dark:bg-white/5
                 border border-gray-100 dark:border-white/10
                 backdrop-blur-xl
                 shadow-sm hover:shadow-glow
                 transition-shadow duration-500"
    >
      {/* circular progress */}
      <div className="relative w-20 h-20 mb-3">
        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90 drop-shadow-sm">
          <circle
            cx="48" cy="48" r={radius}
            fill="none" stroke="currentColor" strokeWidth="5"
            className="text-gray-200 dark:text-white/10"
          />
          <motion.circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: progressOffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.2, delay: index * 0.06 + 0.2, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.4))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-display font-bold text-[#1d1d1f] dark:text-white group-hover:text-brand-500 transition-colors duration-300">
            {skill.percentage}%
          </span>
        </div>
      </div>

      <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 text-center leading-tight group-hover:text-[#1d1d1f] dark:group-hover:text-white transition-colors duration-300">
        {skill.name}
      </p>
    </motion.div>
  );
};

/* ────────────────────────────────────────────
   Skills Section — grouped by category
   ──────────────────────────────────────────── */
const Skills = () => {
  // Preserve first-seen category order
  const categories = [...new Set(skillsData.map((s) => s.category))];

  return (
    <section
      id="skills"
      className="relative py-32 bg-[#fbfbfd] dark:bg-[#0b0b10] overflow-hidden"
    >
      <div className="aurora-blob w-[700px] h-[700px] -top-40 left-1/2 -translate-x-1/2 bg-brand-400/15 dark:bg-brand-600/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">// Technical Arsenal</span>
          <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mt-3">
            <span className="text-aurora">Skills</span>
            <span className="text-[#1d1d1f] dark:text-white">.</span>
          </h3>
          <p className="mt-5 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            A curated, full-spectrum stack — from front-end craft to enterprise automation and AI tooling.
          </p>
        </motion.div>

        {/* gradient definition for progress circles */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* grouped grids */}
        <div className="space-y-14">
          {categories.map((cat, ci) => {
            const items = skillsData.filter((s) => s.category === cat);
            let runningIndex = 0;
            return (
              <div key={cat}>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-6"
                >
                  <h4 className="text-sm font-mono font-bold uppercase tracking-[0.25em] text-[#1d1d1f] dark:text-white">
                    {cat}
                  </h4>
                  <span className="flex-1 h-px bg-gradient-to-r from-brand-500/40 to-transparent" />
                  <span className="text-[10px] font-mono font-bold text-gray-400">{items.length} skills</span>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                  {items.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} index={runningIndex++} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* summary badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 flex justify-center gap-4 flex-wrap"
        >
          <div className="px-10 py-5 rounded-4xl glass-panel text-center">
            <p className="text-3xl font-display font-bold text-aurora">{skillsData.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mt-1">
              Technologies
            </p>
          </div>
          <div className="px-10 py-5 rounded-4xl glass-panel text-center">
            <p className="text-3xl font-display font-bold text-aurora">{categories.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mt-1">
              Domains
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
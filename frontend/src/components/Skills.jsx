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
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative flex flex-col items-center p-6 rounded-[2rem] 
                 bg-white/80 dark:bg-white/5 
                 border border-white/40 dark:border-white/10 
                 backdrop-blur-xl
                 shadow-sm hover:shadow-2xl hover:shadow-blue-100/30 dark:hover:shadow-blue-900/20
                 transition-shadow duration-500"
    >
      {/* subtle shimmer overlay */}
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(0,113,227,0.08), transparent 70%)',
        }}
      />

      {/* circular progress */}
      <div className="relative w-22 h-22 mb-4">
        <svg
          viewBox="0 0 96 96"
          className="w-full h-full -rotate-90 drop-shadow-sm"
        >
          {/* background track */}
          <circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-gray-200 dark:text-gray-800"
          />
          {/* glowing progress arc */}
          <motion.circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              isInView
                ? { strokeDashoffset: progressOffset }
                : { strokeDashoffset: circumference }
            }
            transition={{
              duration: 1.2,
              delay: index * 0.08 + 0.2,
              ease: 'easeOut',
            }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(0,113,227,0.35))' }}
          />
        </svg>

        {/* percentage number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black tracking-tight text-[#1d1d1f] dark:text-white group-hover:text-[#0071e3] transition-colors duration-300">
            {skill.percentage}%
          </span>
        </div>
      </div>

      {/* skill name */}
      <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 text-center leading-tight group-hover:text-[#1d1d1f] dark:group-hover:text-white transition-colors duration-300">
        {skill.name}
      </p>
    </motion.div>
  );
};

/* ────────────────────────────────────────────
   Skills Section
   ──────────────────────────────────────────── */
const Skills = () => {
  return (
    <section
      id="skills"
      className="relative py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden"
    >
      {/* background treatment – very soft radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-50/40 dark:bg-blue-900/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="text-[#0071e3] font-mono text-sm font-bold tracking-[0.4em] uppercase mb-4">
            Technical Arsenal
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1d1d1f] dark:text-white">
            Skills<span className="text-[#0071e3]">.</span>
          </h3>
          <p className="mt-6 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            A curated set of technologies I wield to architect robust,
            scalable solutions.
          </p>
        </motion.div>

        {/* gradient definition for progress circles */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0071e3" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>

        {/* skills grid – refined & spacious */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skillsData.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* summary badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="px-12 py-5 rounded-[2rem] bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg">
            <p className="text-3xl font-black text-[#0071e3] text-center">
              {skillsData.length}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mt-1 text-center">
              Technologies Mastered
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
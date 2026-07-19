import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillsData } from '../data/skillsData';

/* ── A single proficiency bar row ─────────────────────── */
const SkillBar = ({ skill, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="group py-4 border-b border-line/10">
      <div className="flex items-baseline justify-between gap-4 mb-2.5">
        <span className="text-[15px] font-medium text-ink">{skill.name}</span>
        <span className="font-mono text-xs text-ink-soft tabnum">{skill.percentage}%</span>
      </div>
      <div className="relative h-[5px] rounded-full bg-line/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 rounded-full bg-ink transition-colors duration-500 group-hover:bg-accent"
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const categories = [...new Set(skillsData.map((s) => s.category))];

  return (
    <section id="skills" className="relative py-28 md:py-36 border-t border-line/10">
      <div className="u-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Left — header + summary (sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="index-tag">06</span>
                <span className="w-8 h-px bg-line/20" />
                <span className="eyebrow">Skills</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl leading-[1.03] tracking-tight text-ink">
                A full-spectrum <span className="italic font-normal">stack.</span>
              </h2>
              <p className="mt-5 text-ink-soft leading-relaxed">
                From front-end craft to enterprise automation and AI tooling.
              </p>

              <div className="mt-9 flex gap-10">
                <div>
                  <p className="font-serif text-4xl text-ink tabnum">{skillsData.length}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                    Technologies
                  </p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-ink tabnum">{categories.length}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                    Domains
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — grouped proficiency bars */}
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {categories.map((cat) => {
                const items = skillsData.filter((s) => s.category === cat);
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink">
                        {cat}
                      </h3>
                      <span className="flex-1 h-px bg-line/10" />
                      <span className="font-mono text-[11px] text-ink-faint">
                        {String(items.length).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                      {items.map((skill, i) => (
                        <SkillBar key={skill.name} skill={skill} index={i} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
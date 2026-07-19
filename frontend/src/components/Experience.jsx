import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowUpRight, TrendingUp } from 'lucide-react';
import { experienceData } from '../data/experienceData';

const RoleCard = ({ role, index }) => {
  const { current } = role;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10"
    >
      {/* timeline node */}
      <span
        className={`absolute left-[-5px] top-2 grid place-items-center w-2.5 h-2.5 rounded-full ring-4 ring-paper z-10 ${
          current ? 'bg-accent' : 'bg-line/30'
        }`}
      />

      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h4 className="font-serif text-2xl md:text-[28px] tracking-tight text-ink">
          {role.title}
        </h4>
        {role.promotion && (
          <span className="chip !bg-accent/20 !border-accent/30 !text-ink font-medium">
            <TrendingUp size={12} /> Promoted
          </span>
        )}
        {current && (
          <span className="chip">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-70 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
            Current
          </span>
        )}
      </div>

      <p className="font-mono text-xs tracking-[0.14em] uppercase text-ink-faint mb-4">
        {role.period}
      </p>

      <p className="text-[15px] text-ink-soft leading-relaxed mb-5 max-w-2xl">
        {role.description}
      </p>

      <ul className="space-y-2.5 mb-6">
        {role.achievements.map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="mt-2 w-3.5 h-px bg-accent shrink-0" />
            <span className="text-sm text-ink-soft leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {role.stack.map((tech) => (
          <span key={tech} className="chip">{tech}</span>
        ))}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative py-28 md:py-36 border-t border-line/10">
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
            <span className="index-tag">04</span>
            <span className="w-8 h-px bg-line/20" />
            <span className="eyebrow">Experience</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight text-ink">
            Growth <span className="italic font-normal">in motion.</span>
          </h2>
          <p className="mt-5 text-ink-soft text-base md:text-lg leading-relaxed">
            From Associate Software Engineer to Software Engineer — backed by measurable impact.
          </p>
        </motion.div>

        {experienceData.map((company) => (
          <div key={company.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Company panel — sticky on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 lg:sticky lg:top-28 self-start"
            >
              <div className="surface p-7 md:p-9">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl tracking-tight text-ink">
                      {company.company}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-soft">
                      <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {company.location}</span>
                      <span className="inline-flex items-center gap-1.5"><Briefcase size={14} /> {company.type}</span>
                    </div>
                    <p className="mt-1 font-mono text-xs tracking-[0.14em] uppercase text-ink-faint">
                      {company.duration}
                    </p>
                  </div>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${company.company} website`}
                    className="grid place-items-center w-10 h-10 rounded-full border border-line/12 text-ink-soft hover:text-ink hover:border-line/25 transition-colors shrink-0"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <p className="mt-6 text-[15px] text-ink-soft leading-relaxed">
                  {company.summary}
                </p>

                {/* Impact metrics */}
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line/10 pt-7">
                  {company.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-serif text-3xl text-ink tabnum">{m.value}</p>
                      <p className="mt-1 text-[13px] text-ink-soft">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Roles timeline */}
            <div className="lg:col-span-7">
              <div className="relative border-l border-line/12 pl-0 space-y-12 py-2 ml-[5px]">
                {company.roles.map((role, i) => (
                  <RoleCard key={role.title} role={role} index={i} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
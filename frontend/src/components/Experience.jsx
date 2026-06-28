import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  CheckCircle2,
  MapPin,
  Building2,
  TrendingUp,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { experienceData } from '../data/experienceData';

const RoleCard = ({ role, index }) => {
  const current = role.current;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-10 md:pl-14"
    >
      {/* timeline node */}
      <span
        className={`absolute left-0 top-2 grid place-items-center w-8 h-8 rounded-full border-2 z-10 ${
          current
            ? 'bg-brand-500 border-brand-300 text-white shadow-glow'
            : 'bg-white dark:bg-[#1a1a24] border-gray-300 dark:border-white/15 text-brand-500'
        }`}
      >
        {role.promotion ? <TrendingUp size={14} /> : <Briefcase size={14} />}
      </span>

      <div className="card-glow p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h4 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[#1d1d1f] dark:text-white">
            {role.title}
          </h4>
          {role.promotion && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-brand-500 to-accent-violet text-white shadow-glow">
              <Sparkles size={12} /> Promoted
            </span>
          )}
          {current && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Current
            </span>
          )}
        </div>

        <p className="font-mono text-xs font-bold tracking-widest uppercase text-brand-600 dark:text-brand-400 mb-5">
          {role.period}
        </p>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium">
          {role.description}
        </p>

        <div className="space-y-3 mb-7">
          {role.achievements.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <CheckCircle2 size={17} className="text-brand-500 mt-0.5 shrink-0" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{item}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-5 border-t border-gray-100 dark:border-white/10">
          {role.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono font-bold uppercase px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section className="relative py-32 bg-[#fbfbfd] dark:bg-[#0b0b10] overflow-hidden" id="experience">
      <div className="aurora-blob w-[480px] h-[480px] -top-20 -right-20 bg-brand-400/15 dark:bg-brand-600/15" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="section-label mb-4">// Career Path</span>
          <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none mt-3">
            <span className="text-aurora">Experience</span>
            <span className="text-[#1d1d1f] dark:text-white">.</span>
          </h3>
          <p className="mt-5 text-gray-500 dark:text-gray-400 text-lg font-medium max-w-xl">
            Growth in motion — from Associate Software Engineer to Software Engineer,
            backed by measurable impact.
          </p>
        </motion.div>

        {experienceData.map((company) => (
          <div key={company.id} className="mb-12">
            {/* Company header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-glow p-7 md:p-9 mb-10"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-violet grid place-items-center text-white shadow-glow shrink-0">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[#1d1d1f] dark:text-white">
                        {company.company}
                      </h4>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-brand-500 transition-colors"
                        aria-label={`${company.company} website`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {company.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase size={14} /> {company.type}</span>
                      <span className="font-mono text-xs">{company.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                {company.summary}
              </p>

              {/* Impact metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
                {company.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-4 text-center"
                  >
                    <p className="text-2xl font-display font-bold text-aurora">{m.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Promotion ladder */}
            <div className="relative">
              {/* vertical connector line */}
              <span className="absolute left-4 top-3 bottom-3 w-[2px] bg-gradient-to-b from-brand-500 via-accent-violet/50 to-transparent" />
              <div className="space-y-8">
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
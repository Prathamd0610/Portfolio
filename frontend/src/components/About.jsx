import React from 'react';
import { motion } from 'framer-motion';
import { Code2, TestTube2, Sparkles, Cloud, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-scroll';
import { aboutData } from '../data/aboutData';

const iconMap = { Code2, TestTube2, Sparkles, Cloud };

const About = () => {
  return (
    <section className="relative py-32 bg-white dark:bg-[#0b0b10] overflow-hidden" id="about">
      <div className="aurora-blob w-[420px] h-[420px] top-10 -left-24 bg-accent-violet/10 dark:bg-accent-violet/15" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <span className="section-label mb-4">// Who I Am</span>
          <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none mt-3">
            <span className="text-[#1d1d1f] dark:text-white">About</span>
            <span className="text-aurora"> Me.</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio + quick facts */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h4 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-[#1d1d1f] dark:text-white mb-6 text-balance">
              {aboutData.headline}
            </h4>
            {aboutData.bio.map((para, i) => (
              <p key={i} className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-5 font-medium">
                {para}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-4 mt-10">
              {aboutData.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1.5">
                    {fact.label}
                  </p>
                  <p className="text-sm font-bold text-[#1d1d1f] dark:text-white">{fact.value}</p>
                </div>
              ))}
            </div>

            <Link to="contact" smooth offset={-80} className="inline-block mt-10 cursor-pointer">
              <motion.span
                whileHover={{ x: 6 }}
                className="inline-flex items-center gap-3 text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest text-sm"
              >
                Let's build something <ArrowUpRight size={18} />
              </motion.span>
            </Link>
          </motion.div>

          {/* What I do — services */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {aboutData.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Code2;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="card-glow p-6 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-violet grid place-items-center text-white shadow-glow mb-5">
                    <Icon size={22} />
                  </div>
                  <h5 className="text-lg font-display font-bold text-[#1d1d1f] dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
                    {service.title}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 font-medium">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono font-bold uppercase px-2 py-1 rounded-md bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/10 tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

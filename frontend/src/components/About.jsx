import React from 'react';
import { motion } from 'framer-motion';
import { Code2, TestTube2, Sparkles, Cloud, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-scroll';
import { aboutData } from '../data/aboutData';

const iconMap = { Code2, TestTube2, Sparkles, Cloud };

const About = () => {
  return (
    <section id="about" className="relative py-28 md:py-36 border-t border-line/10">
      <div className="u-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="index-tag">02</span>
          <span className="w-8 h-px bg-line/20" />
          <span className="eyebrow">About</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left — statement + bio + facts */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-ink balance"
            >
              {aboutData.headline}
            </motion.h2>

            <div className="mt-8 space-y-5">
              {aboutData.bio.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                  className="text-[15px] md:text-base text-ink-soft leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Quick facts as a definition list */}
            <dl className="mt-10 border-t border-line/10">
              {aboutData.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 py-3.5 border-b border-line/10"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint shrink-0">
                    {fact.label}
                  </dt>
                  <dd className="text-sm font-medium text-ink text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <Link to="contact" smooth offset={-90} className="inline-flex mt-9 cursor-pointer group">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-ink link-underline">
                Let's build something
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>

          {/* Right — services as an editorial index */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-2">What I do</p>
            <div className="border-t border-line/10">
              {aboutData.services.map((service, i) => {
                const Icon = iconMap[service.icon] || Code2;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    className="group relative grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-8 border-b border-line/10 transition-all duration-500 hover:pl-3"
                  >
                    {/* accent rail on hover */}
                    <span className="absolute left-0 top-8 bottom-8 w-[2px] bg-accent scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />

                    <div className="flex flex-col items-center gap-3 pt-1">
                      <span className="index-tag">{String(i + 1).padStart(2, '0')}</span>
                      <span className="grid place-items-center w-10 h-10 rounded-xl border border-line/12 text-ink-soft transition-colors duration-300 group-hover:text-ink group-hover:border-line/25">
                        <Icon size={18} />
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl md:text-[26px] text-ink tracking-tight">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-[15px] text-ink-soft leading-relaxed max-w-lg">
                        {service.desc}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span key={tag} className="chip">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

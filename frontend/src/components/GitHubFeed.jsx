import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';

const GitHubFeed = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/Prathamd0610/repos?sort=pushed&per_page=6')
      .then(res => res.json())
      .then(data => setRepos(data || []))
      .catch(() => {});
  }, []);

  return (
    <section id="github" className="py-32 bg-[#fcfcfd] dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-[#0071e3] font-mono text-sm font-bold tracking-[0.4em] uppercase mb-4">Open Source</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter">GitHub<span className="text-[#0071e3]">.</span></h3>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map(repo => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-[#1c1c1e] border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <Github size={20} className="text-[#0071e3]" />
                <span className="flex items-center gap-1 text-sm text-gray-400">
                  <Star size={14} /> {repo.stargazers_count}
                </span>
              </div>
              <h4 className="text-lg font-bold mb-2 line-clamp-1">{repo.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                {repo.description || 'No description'}
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>{repo.language || 'N/A'}</span>
                <ExternalLink size={14} className="group-hover:text-[#0071e3] transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubFeed;
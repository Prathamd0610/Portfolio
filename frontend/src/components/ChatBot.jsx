import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { educationData } from '../data/educationData';
import { experienceData } from '../data/experienceData';
import { projectsData } from '../data/projectsData';
import { certificationsData } from '../data/certificationsData';
import { skillsData } from '../data/skillsData';
import { contactInfo } from '../data/contactData';

const menuOptions = [
  { label: '📚 Education', action: 'education' },
  { label: '💼 Experience', action: 'experience' },
  { label: '🚀 Projects', action: 'projects' },
  { label: '📜 Certifications', action: 'certifications' },
  { label: '⚡ Skills', action: 'skills' },
  { label: '📧 Contact', action: 'contact' },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hello! 👋 I'm Pratham's virtual assistant. How can I help you today?",
      showMenu: true,
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatEducation = () =>
    educationData
      .map(
        (edu) =>
          `🎓 **${edu.degree}**\n${edu.institution}\n${edu.years} – ${edu.location}\nGrade: ${edu.subInfo}\n\n${edu.description}`
      )
      .join('\n\n');

  const formatExperience = () =>
    experienceData
      .map((company) => {
        const roles = company.roles
          .map(
            (r) =>
              `${r.current ? '🟢' : '•'} **${r.title}** (${r.period})${
                r.promotion ? ' — Promoted 🎉' : ''
              }\n${r.description}`
          )
          .join('\n\n');
        return `🏢 **${company.company}** — ${company.location}\n${company.duration}\n\n${company.summary}\n\n${roles}`;
      })
      .join('\n\n');

  const formatProjects = () =>
    projectsData
      .map(
        (p) =>
          `🚀 **${p.title}** (${p.status})\n${p.category}\n${p.description}\nHighlights: ${p.highlights.join(', ')}\nTech: ${p.tech.join(', ')}\n🔗 ${p.link}`
      )
      .join('\n\n');

  const formatCertifications = () =>
    certificationsData
      .map(
        (c) =>
          `📜 **${c.title}**\nIssuer: ${c.issuer} | Date: ${c.date}\nStatus: ${c.status}\nSkills: ${c.skills.join(', ')}`
      )
      .join('\n\n');

  const formatSkills = () =>
    skillsData
      .sort((a, b) => b.percentage - a.percentage)
      .map((s) => `• ${s.name}: ${s.percentage}%`)
      .join('\n');

  const formatContact = () =>
    `📧 Email: ${contactInfo.email}\n📍 Location: ${contactInfo.location}\n🔗 LinkedIn: ${contactInfo.linkedin}`;

  const handleMenuClick = (action) => {
    let response = '';
    switch (action) {
      case 'education':
        response = `**My Education:**\n\n${formatEducation()}`;
        break;
      case 'experience':
        response = `**Professional Experience:**\n\n${formatExperience()}`;
        break;
      case 'projects':
        response = `**Projects I've Built:**\n\n${formatProjects()}`;
        break;
      case 'certifications':
        response = `**Certifications:**\n\n${formatCertifications()}`;
        break;
      case 'skills':
        response = `**Technical Skills:**\n\n${formatSkills()}`;
        break;
      case 'contact':
        response = `**Get In Touch:**\n\n${formatContact()}`;
        break;
      default:
        response = "I'm not sure how to help with that. Please choose an option from the menu.";
    }
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: menuOptions.find((o) => o.action === action)?.label || action },
      { from: 'bot', text: response, showMenu: true },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
    setInput('');

    // Simple keyword-based fallback (if not using menu)
    const lower = userMsg.toLowerCase();
    let reply = "I'm not sure about that. You can use the menu below to explore my portfolio.";
    if (lower.includes('hi') || lower.includes('hello')) {
      reply = "Hello! 👋 Select an option from the menu below to learn more about me.";
    } else if (lower.includes('skill')) {
      reply = `**Technical Skills:**\n\n${formatSkills()}`;
    } else if (lower.includes('project')) {
      reply = `**Projects:**\n\n${formatProjects()}`;
    } else if (lower.includes('contact') || lower.includes('email')) {
      reply = `**Contact Info:**\n\n${formatContact()}`;
    }
    setMessages((prev) => [...prev, { from: 'bot', text: reply, showMenu: true }]);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        aria-label="Open assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-ink text-paper shadow-lift flex items-center justify-center hover:bg-accent hover:text-accent-ink transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 w-96 max-w-[92vw] bg-paper-raised rounded-3xl shadow-lift border border-line/12 z-50 flex flex-col overflow-hidden"
            style={{ maxHeight: '70vh' }}
          >
            <div className="p-4 border-b border-line/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-70 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
                </span>
                <h4 className="font-serif text-lg text-ink">Assistant</h4>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-ink-faint hover:text-ink transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.from === 'user'
                        ? 'bg-ink text-paper rounded-br-md'
                        : 'bg-paper-sunken text-ink rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                    {msg.showMenu && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {menuOptions.map((opt) => (
                          <button
                            key={opt.action}
                            onClick={() => handleMenuClick(opt.action)}
                            className="px-3 py-1.5 rounded-full bg-paper-raised border border-line/12 text-xs font-medium text-ink-soft hover:text-accent-ink hover:bg-accent hover:border-accent transition-colors"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-line/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything…"
                className="flex-1 px-4 py-2.5 rounded-full bg-paper-sunken/60 border border-line/10 outline-none text-sm text-ink placeholder:text-ink-faint focus:border-accent transition-colors"
              />
              <button
                onClick={handleSend}
                aria-label="Send"
                className="grid place-items-center w-10 h-10 rounded-full bg-ink text-paper hover:bg-accent hover:text-accent-ink transition-colors shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
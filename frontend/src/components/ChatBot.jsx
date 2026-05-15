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
      .map(
        (exp) =>
          `💼 **${exp.role}** @ ${exp.company}\n${exp.period}\n📍 ${exp.location}\n\n${exp.description}\n\nKey Highlights:\n${exp.achievements
            .map((a) => `• ${a}`)
            .join('\n')}`
      )
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
    `📧 Email: ${contactInfo.email}\n📍 Location: ${contactInfo.location}\n🔗 LinkedIn: ${contactInfo.linkedin}\n🐙 GitHub: ${contactInfo.github}`;

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
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#0071e3] text-white shadow-2xl flex items-center justify-center"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-6 w-96 max-w-[90vw] bg-white dark:bg-[#1c1c1e] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col overflow-hidden"
            style={{ maxHeight: '70vh' }}
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <MessageCircle size={16} className="text-[#0071e3]" /> AI Assistant
              </h4>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-red-500 transition">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.from === 'user'
                      ? 'bg-[#0071e3] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}>
                    {msg.text}
                    {msg.showMenu && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {menuOptions.map((opt) => (
                          <button
                            key={opt.action}
                            onClick={() => handleMenuClick(opt.action)}
                            className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-[#0071e3] transition"
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

            <div className="p-3 border-t border-gray-100 dark:border-gray-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border-none outline-none text-sm"
              />
              <button onClick={handleSend} className="p-2 rounded-xl bg-[#0071e3] text-white">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import SystemMonitor from './components/SystemMonitor';
import ShareButton from './components/ShareButton';
import ChatBot from './components/ChatBot';
import { useScrollProgress } from './hooks/useScrollProgress';

const About = React.lazy(() => import('./components/About'));
const Education = React.lazy(() => import('./components/Education'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const Certificates = React.lazy(() => import('./components/Certificates'));
const Skills = React.lazy(() => import('./components/Skills'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

const Loading = () => (
  <div className="flex items-center justify-center py-40">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="w-10 h-10 border-2 border-gray-200 dark:border-white/10 border-t-brand-500 rounded-full"
    />
  </div>
);

export default function App() {
  const scrollScale = useScrollProgress();
  const [sectionKey, setSectionKey] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0b10] text-[#1d1d1f] dark:text-white antialiased">
      <motion.div
        style={{ scaleX: scrollScale }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-600 via-accent-violet to-accent-cyan z-[100] origin-left"
      />
      <CustomCursor />
      <SystemMonitor />
      <ShareButton />
      <ChatBot />

      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          <Hero key="hero" />
        </AnimatePresence>

        <Suspense fallback={<Loading />}>
          <About key="about" />
          <Education key="edu" />
          <Experience key="exp" />
          <Projects key="proj" />
          <Skills key="skills" />
          <Certificates key="certs" />
          <Contact key="contact" />
        </Suspense>
      </main>

      <Footer key="footer" />
    </div>
  );
}
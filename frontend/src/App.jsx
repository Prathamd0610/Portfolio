import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
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
    <div className="flex flex-col items-center gap-4">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
        className="w-6 h-6 rounded-full border-2 border-line/15 border-t-accent"
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-faint">
        Loading
      </span>
    </div>
  </div>
);

export default function App() {
  const scrollScale = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-paper text-ink antialiased selection:bg-accent">
      {/* Fixed film-grain overlay for warm, premium print texture */}
      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[1] opacity-[0.035] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Reading-progress rail */}
      <motion.div
        style={{ scaleX: scrollScale }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[100] origin-left"
      />

      <CustomCursor />
      <SystemMonitor />
      <ShareButton />
      <ChatBot />

      <Navbar />

      <main className="relative z-[2]">
        <Hero />

        <Suspense fallback={<Loading />}>
          <About />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Certificates />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
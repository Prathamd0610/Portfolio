import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SystemMonitor = () => {
  const [expanded, setExpanded] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    setTime(fmt());
    const timer = setInterval(() => setTime(fmt()), 1000 * 15);
    return () => clearInterval(timer);
  }, []);

  // Honest, tasteful facts — no fake telemetry.
  const facts = [
    { label: "Role", value: "Software Engineer" },
    { label: "Company", value: "Accenture" },
    { label: "Focus", value: "MERN · Automation" },
    { label: "Based in", value: "Gurugram, IN" },
  ];

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-6 left-6 z-40 hidden lg:block cursor-grab active:cursor-grabbing"
    >
      <div className="rounded-2xl border border-line/12 bg-paper/85 backdrop-blur-xl shadow-soft p-3.5 min-w-[240px]">
        <button
          className="flex items-center gap-3 w-full select-none"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-70 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
            Available for work
          </span>
          <span className="ml-auto flex items-center gap-2">
            <span className="font-mono text-[11px] text-ink-faint tabnum">{time}</span>
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} className="text-ink-faint">
              <ChevronDown size={13} />
            </motion.span>
          </span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3.5 pt-3.5 border-t border-line/10 space-y-2.5">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                      {f.label}
                    </span>
                    <span className="text-[12px] font-medium text-ink">{f.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SystemMonitor;

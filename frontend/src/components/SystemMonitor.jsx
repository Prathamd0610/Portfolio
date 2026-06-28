import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Database,
  Globe,
  Zap,
  Cpu,
  Clock,
} from "lucide-react";

const SystemMonitor = () => {
  const [expanded, setExpanded] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const metrics = [
    { label: "Uptime", value: "99.99%", icon: <Activity size={12} /> },
    { label: "Security", value: "A+", icon: <ShieldCheck size={12} /> },
    { label: "DB Latency", value: "24ms", icon: <Database size={12} /> },
    { label: "Region", value: "IN-North", icon: <Globe size={12} /> },
    { label: "CPU Load", value: "23%", icon: <Cpu size={12} /> },
  ];

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-6 right-6 z-50 hidden lg:block cursor-grab active:cursor-grabbing"
    >
      <motion.div className="bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-2xl min-w-[260px]">
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="relative w-2.5 h-2.5">
            <span className="absolute w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            <span className="absolute w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1d1d1f] dark:text-white">
            System Operational
          </span>
          <Clock size={12} className="ml-auto text-gray-400" />
          <span className="text-[10px] font-mono text-gray-500">{time}</span>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3"
            >
              {metrics.map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    {m.icon}
                    <span className="text-[9px] font-bold uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-brand-500">
                    {m.value}
                  </span>
                </div>
              ))}
              <div className="bg-black dark:bg-[#2c2c2e] p-2 rounded-lg mt-2">
                <p className="text-[8px] font-mono text-green-400">
                  {">"} STACK_READY: MERN_PROD
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SystemMonitor;

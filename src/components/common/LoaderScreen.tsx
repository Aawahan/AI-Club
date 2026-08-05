import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu } from "lucide-react";

interface LoaderScreenProps {
  onComplete?: () => void;
}

export const LoaderScreen: React.FC<LoaderScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(100, prev + diff);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-black text-white flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle background radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Central AI Logo Animation */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Rotating geometric outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-28 h-28 border border-white/20 rounded-full border-t-white border-r-white/40 border-b-transparent border-l-transparent"
            />
            
            {/* Counter-rotating inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              className="absolute w-20 h-20 border border-white/30 rounded-full border-b-white border-l-white/50 border-t-transparent border-r-transparent"
            />

            {/* Glowing Icon Core */}
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            >
              <Cpu className="w-8 h-8" />
            </motion.div>
          </div>

          {/* Title & Monospace Status */}
          <div className="text-center space-y-2 z-10 px-4">
            <h1 className="text-2xl font-bold tracking-[0.3em] font-mono uppercase text-white">
              SYNAPSE <span className="text-white/40">// GLA UNIV</span>
            </h1>
            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase">
              Initializing Neural Engine...
            </p>
          </div>

          {/* Progress Bar & Numerical Percentage */}
          <div className="w-64 mt-8 space-y-2 z-10">
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 tracking-widest">
              <span>SYSTEM.READY</span>
              <span className="text-white font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useSound } from "../../context/SoundContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "xl",
}) => {
  const { playModalOpen, playClick } = useSound();

  useEffect(() => {
    if (isOpen) {
      playModalOpen();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playClick();
              onClose();
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-0"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className={`relative z-10 w-full ${maxWidthClasses[maxWidth]} my-8 bg-black/90 border border-white/20 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(255,255,255,0.08)] overflow-hidden text-white`}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <h2 className="text-xl font-bold font-mono tracking-wider uppercase text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  {title}
                </h2>
                <button
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {!title && (
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Modal Body */}
            <div className="max-h-[80vh] overflow-y-auto pr-1 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

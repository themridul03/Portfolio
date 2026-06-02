import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import {
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiSparkling2Fill,
} from "react-icons/ri";

const toastConfig = {
  success: {
    icon: RiSparkling2Fill,
    title: "Success",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.35)",
  },
  error: {
    icon: RiErrorWarningFill,
    title: "Error",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
  },
  info: {
    icon: RiInformationFill,
    title: "Info",
    color: "#c19d23",
    bg: "rgba(193,157,35,0.12)",
    border: "rgba(193,157,35,0.35)",
  },
};

const Toast = ({ message, type = "success", onClose }) => {
  const config = toastConfig[type] || toastConfig.success;
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 0.92 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 80, scale: 0.92 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-[99999] w-[calc(100%-32px)] max-w-[420px] overflow-hidden rounded-2xl border backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
        style={{
          background: "rgba(8,11,20,0.88)",
          borderColor: config.border,
        }}
        role="alert"
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(circle at top left, ${config.bg}, transparent 55%)`,
          }}
        />

        <div className="relative flex items-start gap-4 p-5">
          <div
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
            style={{
              color: config.color,
              borderColor: config.border,
              background: config.bg,
              boxShadow: `0 0 24px ${config.bg}`,
            }}
          >
            <Icon size={23} />
          </div>

          <div className="flex-1">
            <p
              className="text-sm font-black uppercase tracking-[3px]"
              style={{ color: config.color }}
            >
              {config.title}
            </p>

            <p className="mt-1 text-[15px] leading-6 text-white/85">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            data-cursor="CLOSE"
            className="cursor-can-hover flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:border-[#c19d23]/50 hover:text-[#c19d23] transition"
            aria-label="Close notification"
          >
            <RiCloseLine size={22} />
          </button>
        </div>

        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 4.5, ease: "linear" }}
          className="relative h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${config.color}, #f7df8a)`,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
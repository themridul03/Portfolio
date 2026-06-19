import { AnimatePresence, motion, useAnimation } from "framer-motion";
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
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotateX: [90, -10, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      transition: { duration: 0.45, ease: "easeOut" },
    });

    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 0.92, rotateY: 20 }}
        animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, x: 80, scale: 0.92 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-[99999] w-[calc(100%-32px)] max-w-[420px] overflow-hidden rounded-2xl border backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
        style={{
          background: "rgba(8,11,20,0.88)",
          borderColor: config.border,
          transformStyle: "preserve-3d",
        }}
        role="alert"
      >
        {/* glow layer */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(circle at top left, ${config.bg}, transparent 55%)`,
          }}
        />

        <div className="relative flex items-start gap-4 p-5">
          {/* ICON with pulse orbit */}
          <motion.div
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
            animate={{
              boxShadow: [
                `0 0 0px ${config.bg}`,
                `0 0 25px ${config.bg}`,
                `0 0 0px ${config.bg}`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              color: config.color,
              borderColor: config.border,
              background: config.bg,
            }}
          >
            <Icon size={23} />
          </motion.div>

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

          {/* 🔥 3D FLIP CLOSE BUTTON */}
          <motion.button
            onClick={onClose}
            data-cursor="CLOSE"
            className="cursor-can-hover flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition"
            aria-label="Close notification"
            whileHover={{
              rotateY: 180,
              scale: 1.08,
              borderColor: "#c19d23",
              color: "#c19d23",
            }}
            whileTap={{ scale: 0.92 }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <RiCloseLine size={22} />
            </motion.div>
          </motion.button>
        </div>

        {/* 🔥 animated progress bar with glow pulse */}
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 4.5, ease: "linear" }}
          className="relative h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${config.color}, #f7df8a)`,
            boxShadow: `0 0 18px ${config.color}`,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
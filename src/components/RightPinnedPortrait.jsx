import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightUpLine, RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { personalInfo } from "../constants";

const RightPinnedPortrait = () => {
  const [activeAvatar, setActiveAvatar] = useState("noir"); // "noir" | "photo" | "3d"
  const [scrolled, setScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const handleAvatarChange = (e) => {
      if (e.detail) {
        setActiveAvatar(e.detail);
      }
    };
    window.addEventListener("avatarChange", handleAvatarChange);
    return () => window.removeEventListener("avatarChange", handleAvatarChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // When scrolled past hero (~220px), switch bottom button from "Scroll" to "Back to Top"
      setScrolled(window.scrollY > 220);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getImageSrc = () => {
    if (activeAvatar === "3d" && personalInfo.photo3d) return personalInfo.photo3d;
    if (activeAvatar === "photo" && personalInfo.photo) return personalInfo.photo;
    return personalInfo.photoNoir || personalInfo.photo;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className="hidden lg:flex fixed top-0 right-0 w-[38%] xl:w-[35%] h-screen z-20 pointer-events-none select-none flex-col justify-between p-8 xl:p-12 overflow-hidden"
      aria-label="Pinned developer portrait and quick actions"
    >
      {/* ── PINNED BACKGROUND PORTRAIT IMAGE ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeAvatar}
            src={getImageSrc()}
            alt={personalInfo.name}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover object-center filter contrast-125 brightness-95"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 15%, black 100%), linear-gradient(to bottom, black 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 15%, black 100%), linear-gradient(to bottom, black 85%, transparent)",
            }}
          />
        </AnimatePresence>

        {/* Soft edge blend overlays */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#000000] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#000000]/60 to-transparent pointer-events-none" />
      </div>

      {/* ── TOP RIGHT: DOWNLOAD CV, CONTACT ME & TIMEZONE (Exact Syntax CV style) ── */}
      <div className="relative z-10 w-full flex items-start justify-between gap-4 pointer-events-auto">
        {/* Left spacer / Timezone */}
        <div className="text-xs font-mono text-neutral-400">
          <span>(UTC+5:30{timeStr && ` • ${timeStr}`})</span>
        </div>

        {/* Action links */}
        <div className="flex flex-col items-end gap-2 text-sm font-sans font-medium text-white">
          <a
            href={personalInfo.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 hover:text-[#00ffae] transition-colors"
          >
            <span>Download CV</span>
            <RiArrowRightUpLine
              size={15}
              className="group-hover:rotate-45 transition-transform duration-200 text-[#00ffae]"
            />
          </a>

          <a
            href="#contact"
            className="hover:text-[#00ffae] transition-colors text-neutral-300 hover:text-white"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* ── BOTTOM RIGHT: SCROLL / BACK TO TOP (Exact Syntax CV toggle) ── */}
      <div className="relative z-10 w-full flex justify-end pointer-events-auto">
        <AnimatePresence mode="wait">
          {!scrolled ? (
            <motion.button
              key="scroll-down"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToAbout}
              className="flex items-center gap-2 text-sm font-sans text-neutral-300 hover:text-[#00ffae] transition-colors group cursor-pointer"
            >
              <span>Scroll</span>
              <RiArrowDownLine
                size={16}
                className="animate-bounce text-[#00ffae]"
              />
            </motion.button>
          ) : (
            <motion.button
              key="back-to-top"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm font-sans font-semibold text-white hover:text-[#00ffae] transition-colors group cursor-pointer"
            >
              <span>Back to Top</span>
              <RiArrowUpLine
                size={16}
                className="group-hover:-translate-y-0.5 transition-transform text-[#00ffae]"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default RightPinnedPortrait;

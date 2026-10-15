import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { RiArrowRightUpLine, RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { personalInfo } from "../constants";

const HeroAndPinnedPortrait = () => {
  const [scrolled, setScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  const { scrollY } = useScroll();

  // Scroll Interpolation:
  // At scroll 0 (Hero): Perfectly centered (x: 0vw, scale: 1)
  // Portrait stays pinned on the right throughout the entire portfolio
  const x = useTransform(scrollY, [0, 450], ["0vw", "28vw"]);
  const scale = useTransform(scrollY, [0, 450], [1, 0.85]);

  // Philosophy Quote Scroll Animation:
  // Starts on the right side under header; as user scrolls, translates left and flies up into oblivion
  const quoteX = useTransform(scrollY, [0, 380], ["0vw", "-35vw"]);
  const quoteY = useTransform(scrollY, [0, 380], ["0px", "-160px"]);
  const quoteOpacity = useTransform(scrollY, [0, 220, 380], [1, 0.4, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
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
    <>
      {/* ── DESKTOP SCROLL-RESPONSIVE PORTRAIT (Center at start -> Slides to right on scroll) ── */}
      <div
        className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <motion.div
          style={{ x, scale }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full max-w-[760px] h-full flex items-center justify-center">
            <img
              src={personalInfo.photoNoir || personalInfo.photo}
              alt={personalInfo.name}
              className="max-h-[640px] xl:max-h-[720px] w-auto object-contain object-bottom filter contrast-125 brightness-95"
              style={{
                maskImage:
                  "radial-gradient(ellipse at 50% 45%, black 45%, rgba(0,0,0,0.6) 65%, transparent 85%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 50% 45%, black 45%, rgba(0,0,0,0.6) 65%, transparent 85%)",
              }}
            />

            {/* Seamless gradient blend to pure black */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#000000]/60 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* ── TOP RIGHT: DOWNLOAD CV, CONTACT ME & TIMEZONE (Pinned to top right, matching Screenshot 1 & 2) ── */}
      <div className="hidden lg:flex fixed top-8 right-8 xl:right-14 z-40 flex-col items-end gap-1.5 pointer-events-auto select-none">
        <div className="flex items-center gap-6 text-sm font-sans font-medium text-white">
          <span className="text-xs font-mono text-neutral-400">
            (UTC+5:30{timeStr && ` • ${timeStr}`})
          </span>

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
        </div>

        <a
          href="#contact"
          className="text-sm font-sans text-neutral-300 hover:text-[#00ffae] transition-colors"
        >
          Contact Me
        </a>
      </div>

      {/* ── DESKTOP SCROLL-ANIMATED PHILOSOPHY QUOTE ── */}
      {/* Starts pinned on the right; on scroll, translates left and flies up into oblivion */}
      <motion.div
        style={{ x: quoteX, y: quoteY, opacity: quoteOpacity }}
        className="hidden lg:block fixed top-[19vh] xl:top-[21vh] right-8 xl:right-14 max-w-[320px] xl:max-w-[380px] pointer-events-none select-none z-30 text-right will-change-transform"
      >
        <p className="text-[11px] xl:text-xs text-neutral-400 font-mono uppercase tracking-[0.14em] leading-[1.85]">
          &ldquo; WHETHER IT&apos;S WRITING CODE OR STRUCTURING A SYSTEM, I AIM FOR CLARITY, CALM AND LONG-TERM IMPACT. I BELIEVE GOOD SYSTEMS ARE BUILT WITH INTENT AND CONSISTENCY &rdquo;
        </p>
      </motion.div>

      {/* ── BOTTOM RIGHT: SCROLL / BACK TO TOP (Matches Screenshot 1 & 2) ── */}
      <div className="hidden lg:flex fixed bottom-8 right-8 xl:right-14 z-40 pointer-events-auto select-none">
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
    </>
  );
};

export default HeroAndPinnedPortrait;

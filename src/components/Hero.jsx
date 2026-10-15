import React from "react";
import { motion } from "framer-motion";
import { RiArrowDownLine } from "react-icons/ri";
import { personalInfo } from "../constants";

const BlurText = ({ text, delay = 0, className = "" }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.45,
            delay: delay + index * 0.02,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const InteractiveLetter = ({ char, delay = 0 }) => {
  if (char === " ") return <span className="inline-block w-3 sm:w-5" />;

  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        color: "#00ffae",
        textShadow: "0 0 24px rgba(0, 255, 174, 0.85), 0 0 8px rgba(0, 255, 174, 0.5)",
      }}
      className="inline-block text-white transition-colors duration-150 cursor-pointer select-none"
    >
      {char}
    </motion.span>
  );
};

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-transparent text-white pt-6 pb-12 flex flex-col justify-between"
    >
      {/* ── TOP HEADER ROW: MRIDUL MISHRA • AVAILABLE FOR WORK (Matches Screenshot 2) ── */}
      <div className="w-full flex items-center justify-between pb-6 mb-6 sm:mb-10 border-b border-white/[0.12]">
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="text-base sm:text-lg font-bold text-white tracking-tight hover:text-[#00ffae] transition font-sans"
          >
            {personalInfo.name}
          </a>
          <span className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00ffae]/10 border border-[#00ffae]/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffae] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffae]"></span>
            </span>
            <span className="text-[#00ffae] text-[11px] sm:text-xs font-mono font-semibold tracking-wide">
              Available for work
            </span>
          </span>
        </div>

        {/* Mobile / Tablet actions (< 1024px) */}
        <div className="flex lg:hidden items-center gap-4 text-xs font-mono text-neutral-300">
          <a
            href={personalInfo.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ffae] transition"
          >
            Download CV
          </a>
          <a href="#contact" className="hover:text-[#00ffae] transition font-semibold text-white">
            Contact
          </a>
        </div>
      </div>

      {/* ── MIDDLE ROW: EXPERIENCE ACCENT ON LEFT + PHILOSOPHY STATEMENT ON RIGHT (Matches Screenshot 2) ── */}
      <div className="w-full flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
        {/* Experience Accent (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col shrink-0"
        >
          <span className="text-[#00ffae] font-bold text-base sm:text-lg font-mono tracking-tight">
            <BlurText text="2023 → 2026" delay={0.1} />
          </span>
          <span className="text-[#00ffae] font-bold text-base sm:text-lg font-mono tracking-tight">
            <BlurText text="2.5+ yrs exp." delay={0.25} />
          </span>
        </motion.div>

        {/* Philosophy Quote (Mobile & Tablet only; Desktop is animated via HeroAndPinnedPortrait) */}
        <div className="lg:hidden max-w-[340px] sm:max-w-[420px] text-left sm:text-right">
          <p className="text-[11px] sm:text-xs text-neutral-400 font-mono uppercase tracking-[0.14em] leading-[1.8]">
            &ldquo; WHETHER IT&apos;S WRITING CODE OR STRUCTURING A SYSTEM, I AIM FOR CLARITY, CALM AND LONG-TERM IMPACT. I BELIEVE GOOD SYSTEMS ARE BUILT WITH INTENT AND CONSISTENCY &rdquo;
          </p>
        </div>
      </div>

      {/* ── MOBILE-ONLY PORTRAIT (< 1024px) ── */}
      <div className="lg:hidden w-full my-6 flex justify-center">
        <div className="relative w-full max-w-sm h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10 bg-[#000000]">
          <img
            src={personalInfo.photoNoir || personalInfo.photo}
            alt={personalInfo.name}
            className="w-full h-full object-cover object-top filter contrast-125"
            style={{
              maskImage:
                "radial-gradient(ellipse at 50% 45%, black 50%, rgba(0,0,0,0.6) 70%, transparent 90%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 45%, black 50%, rgba(0,0,0,0.6) 70%, transparent 90%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── GIANT ARCHITECTURAL NAME WITH LETTER-BY-LETTER HOVER ── */}
      <div className="my-auto py-6 sm:py-10 select-none">
        <h1 className="font-black text-[50px] xs:text-[68px] sm:text-[94px] md:text-[120px] lg:text-[135px] xl:text-[150px] uppercase tracking-[-0.05em] leading-[0.84]">
          <span className="inline-block">
            {"MRIDUL".split("").map((c, i) => (
              <InteractiveLetter key={`m-${i}`} char={c} delay={0.15 + i * 0.03} />
            ))}
          </span>
          <br />
          <span className="inline-block">
            {"MISHRA".split("").map((c, i) => (
              <InteractiveLetter key={`mis-${i}`} char={c} delay={0.3 + i * 0.03} />
            ))}
          </span>
        </h1>
      </div>

      {/* ── BOTTOM ROW: ROLE SUBLINE & SCROLL HINT (Matches Screenshot 2) ── */}
      <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs sm:text-sm text-[#949494] font-mono">
        <div>
          <span>Software Developer, based in India</span>
        </div>

        {/* Mobile scroll hint */}
        <div className="lg:hidden flex items-center gap-1.5 text-xs font-mono text-[#00ffae]">
          <a href="#about" className="flex items-center gap-1">
            <span>Scroll</span>
            <RiArrowDownLine size={14} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  RiDownloadLine,
  RiGithubFill,
  RiGooglePlayFill,
  RiMailFill,
  RiPhoneFill,
  RiRocketFill,
  RiSparkling2Fill,
  RiArrowRightLine,
  RiCheckDoubleFill,
  RiMapPin2Fill,
} from "react-icons/ri";

import useParallax from "../reactbits/hooks/useParallax";
import useMediaQuery from "../utils/useMediaQuery";
import { personalInfo } from "../constants";

const typedItems = [
  "Software Developer",
  "Full-Stack .NET & MERN Engineer",
  "React Native & Mobile Specialist",
  "Cloud & Microservices Architect",
  "AI/ML & Real-Time Systems Builder",
];

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [itemIndex, setItemIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [view3D, setView3D] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const { style: parallaxStyle } = useParallax({
    strength: 0.03,
    maxOffset: 15,
    enabled: !isMobile,
  });

  const timeoutRef = useRef(null);
  const pauseRef = useRef(null);

  useEffect(() => {
    const currentItem = typedItems[itemIndex];

    clearTimeout(timeoutRef.current);
    clearTimeout(pauseRef.current);

    timeoutRef.current = setTimeout(() => {
      if (isTyping) {
        if (charIndex < currentItem.length) {
          setTypedText(currentItem.slice(0, charIndex + 1));
          setCharIndex((v) => v + 1);
        } else {
          pauseRef.current = setTimeout(() => {
            setIsTyping(false);
          }, 1200);
        }
      } else {
        if (charIndex > 0) {
          setTypedText(currentItem.slice(0, charIndex - 1));
          setCharIndex((v) => v - 1);
        } else {
          setIsTyping(true);
          setItemIndex((v) => (v + 1) % typedItems.length);
        }
      }
    }, isTyping ? 70 : 35);

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(pauseRef.current);
    };
  }, [charIndex, itemIndex, isTyping]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen mx-auto overflow-hidden bg-[#f4efe6] pt-32 pb-20 flex flex-col justify-between"
    >
      {/* Framer "Product Designer" Subtle Background Grid & Grain */}
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      
      {/* Ambient Warm Vignette Lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#eadecd]/60 via-[#f4efe6]/0 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-[5%] w-[450px] h-[450px] bg-[#dfd6c6]/50 rounded-full blur-[140px] pointer-events-none" />

      {/* GIANT ARCHITECTURAL TYPOGRAPHY BACKDROP (Product Designer Signature Style) */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-full select-none pointer-events-none text-center overflow-hidden z-0">
        <span className="text-[90px] sm:text-[150px] md:text-[210px] lg:text-[260px] font-black tracking-[-0.05em] leading-none uppercase text-black/[0.038] whitespace-nowrap block">
          DEVELOPER
        </span>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center flex-1">
        
        {/* LEFT: EDITORIAL TYPOGRAPHY & INTRO */}
        <motion.div
          style={parallaxStyle}
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          {/* Framer Status Pill (Dark pill with glowing green live beacon on beige) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0d0f14] text-white text-xs sm:text-sm font-semibold mb-6 shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-white/10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Available for Full-Time Roles &amp; Engineering Projects</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-[#121418] text-[40px] sm:text-[56px] lg:text-[68px] font-black leading-[1.05] tracking-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-[#121418] via-[#78541a] to-[#c19d23] bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h1>

          {/* Typewriter Role Line */}
          <div className="mt-4 min-h-[40px] flex items-center">
            <span className="text-xl sm:text-2xl lg:text-[28px] font-black text-[#854d0e]">
              {typedText}
            </span>
            <span className="text-[#c19d23] text-2xl lg:text-3xl font-bold animate-pulse ml-1">
              |
            </span>
          </div>

          {/* Bio on Beige Canvas */}
          <p className="mt-5 text-[#44403c] text-[16px] sm:text-[18px] max-w-2xl leading-relaxed font-normal">
            Software Developer with <strong className="text-[#121418] font-bold">2.5+ years of enterprise experience</strong> architecting scalable cloud-native web, backend, and mobile applications. Currently engineering solutions with <strong className="text-[#121418]">.NET Core, ASP.NET, MERN, React Native, Azure, and AI/ML</strong> with clean architecture and reliable delivery.
          </p>

          {/* Key Skill Badges (Dark pills floating over beige) */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              "ASP.NET Core",
              "C# Microservices",
              "React Native",
              "Node.js",
              "Azure Cloud",
              "PostgreSQL",
              "Socket.io",
              "Firebase",
            ].map((badge) => (
              <span
                key={badge}
                className="px-3.5 py-1.5 rounded-xl bg-[#0d0f14] text-white/90 text-xs font-semibold shadow-sm border border-white/10 hover:border-[#c19d23]/50 transition"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* High-Contrast Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#karto-spotlight"
              className="px-7 py-4 rounded-2xl bg-[#0d0f14] text-white font-extrabold flex items-center gap-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.22)] hover:bg-[#1a1c24] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/15"
            >
              <RiRocketFill size={18} className="text-[#f59e0b]" />
              <span>Explore Karto (Major)</span>
            </a>

            <a
              href="#projects"
              className="px-7 py-4 rounded-2xl bg-white border border-[#d6cebf] text-[#121418] font-bold flex items-center gap-2 hover:bg-[#eae4d8] hover:border-[#b8ad99] shadow-sm transition-all duration-300"
            >
              <span>View All 10 Projects</span>
              <RiArrowRightLine size={16} />
            </a>

            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-[#f59e0b]/15 border border-[#f59e0b]/50 text-[#854d0e] font-extrabold flex items-center gap-2 hover:bg-[#f59e0b]/25 transition-all duration-300"
            >
              <RiDownloadLine size={17} />
              <span>Resume</span>
            </a>
          </div>

          {/* Social Contact Row */}
          <div className="mt-9 flex flex-wrap items-center gap-3 pt-6 border-t border-[#dfd6c6] w-full">
            <span className="text-[#78716c] text-xs uppercase tracking-[2px] font-bold mr-1">
              Connect:
            </span>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0f14] text-white text-xs font-medium hover:bg-[#1e2129] shadow-sm transition"
            >
              <RiGithubFill size={15} />
              <span>GitHub</span>
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#d6cebf] text-[#121418] text-xs font-semibold hover:bg-[#f2ece1] shadow-sm transition"
            >
              <RiMailFill size={15} className="text-[#c19d23]" />
              <span>{personalInfo.email}</span>
            </a>

            <a
              href={`tel:${personalInfo.phone}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#d6cebf] text-[#121418] text-xs font-semibold hover:bg-[#f2ece1] shadow-sm transition"
            >
              <RiPhoneFill size={15} className="text-[#c19d23]" />
              <span>{personalInfo.phone}</span>
            </a>

            <a
              href={personalInfo.kartoPlayStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-sm transition"
            >
              <RiGooglePlayFill size={15} />
              <span>Play Store</span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT: 3D DEVELOPER CENTERPIECE IN HIGH-CONTRAST DARK PEDESTAL CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          {/* Framer Subtle Shadow Ring */}
          <div className="absolute w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full bg-[#dfd6c6]/80 blur-[80px] pointer-events-none" />

          {/* Central Dark Obsidian 3D Card */}
          <div className="relative z-10 w-[310px] sm:w-[380px] md:w-[420px] rounded-[38px] p-2.5 bg-gradient-to-b from-[#1c1f26] via-[#0d0f14] to-[#050608] shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-black/80">
            <div className="relative rounded-[32px] overflow-hidden bg-[#090a0f] border border-white/10">
              
              {/* Developer Studio Portrait & 3D Avatar */}
              <div className="relative h-[400px] sm:h-[480px] w-full overflow-hidden bg-gradient-to-b from-[#181b22] to-[#07080c]">
                
                {/* Toggle: Real Studio Photo vs 3D Avatar */}
                <div className="absolute top-3.5 right-3.5 z-30 flex items-center p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 shadow-lg">
                  <button
                    onClick={() => setView3D(false)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                      !view3D
                        ? "bg-[#c19d23] text-black shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    📸 Real Photo
                  </button>
                  <button
                    onClick={() => setView3D(true)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                      view3D
                        ? "bg-[#c19d23] text-black shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    🤖 3D Avatar
                  </button>
                </div>

                <img
                  key={view3D ? "3d" : "photo"}
                  src={view3D && personalInfo.photo3d ? personalInfo.photo3d : personalInfo.photo}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/25 to-transparent pointer-events-none" />
                
                {/* Name & Title Bar */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-extrabold text-lg leading-tight">
                        {personalInfo.name}
                      </h3>
                      <p className="text-[#f7df8a] text-xs font-semibold mt-0.5">
                        Software Developer @ Midtown Software
                      </p>
                    </div>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#c19d23]/25 border border-[#c19d23]/60 text-[#f7df8a]">
                      <RiCheckDoubleFill size={16} />
                    </span>
                  </div>
                  <p className="text-white/60 text-[11px] mt-1.5 flex items-center gap-1.5">
                    <RiMapPin2Fill className="text-[#f59e0b]" />
                    Shahjahanpur, Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            {/* Orbiting Badge 1: Karto */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 sm:-left-8 z-20 px-4 py-2.5 rounded-2xl bg-[#0d0f14] border border-[#f59e0b]/60 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.35)] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b]">
                <RiRocketFill size={20} />
              </div>
              <div>
                <p className="text-white font-black text-xs">Karto On-Demand</p>
                <p className="text-emerald-400 text-[11px] font-semibold">● Live on Google Play</p>
              </div>
            </motion.div>

            {/* Orbiting Badge 2: Experience */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-4 sm:-right-8 z-20 px-4 py-2.5 rounded-2xl bg-[#0d0f14] border border-cyan-500/50 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.35)] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <RiSparkling2Fill size={20} />
              </div>
              <div>
                <p className="text-white font-black text-xs">2.5+ Years Experience</p>
                <p className="text-cyan-300 text-[11px] font-semibold">.NET Core • MERN • Azure</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FLOATING DARK STATS BAR (Framer Product Designer signature footer card) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 mt-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="rounded-[30px] border border-white/10 bg-[#0d0f14] p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] text-white"
        >
          <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[32px] sm:text-[40px] font-black text-[#f7df8a]">2.5+</span>
            <span className="text-white/70 text-xs sm:text-sm font-medium">Years Dev Experience</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[32px] sm:text-[40px] font-black text-emerald-400">10+</span>
            <span className="text-white/70 text-xs sm:text-sm font-medium">Enterprise &amp; GitHub Projects</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[32px] sm:text-[40px] font-black text-[#38bdf8]">Karto</span>
            <span className="text-white/70 text-xs sm:text-sm font-medium">Flagship App on Play Store</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[32px] sm:text-[40px] font-black text-purple-400">100%</span>
            <span className="text-white/70 text-xs sm:text-sm font-medium">Production Reliability</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
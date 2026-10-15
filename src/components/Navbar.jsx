import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  RiArrowRightUpLine,
  RiCloseLine,
  RiDownloadLine,
  RiMenu3Line,
} from "react-icons/ri";
import { personalInfo } from "../constants";

const NAV_LINKS = [
  { title: "about", href: "#about", count: "01." },
  { title: "experience", href: "#experience", count: "02." },
  { title: "skills", href: "#skills", count: "03." },
  { title: "karto", href: "#karto-spotlight", count: "04." },
  { title: "projects", href: "#projects", count: "05." },
  { title: "education", href: "#education", count: "06." },
  { title: "languages", href: "#languages", count: "07." },
  { title: "references", href: "#testimonials", count: "08." },
  { title: "awards", href: "#awards", count: "09." },
  { title: "contact", href: "#contact", count: "10." },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
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

  return (
    <>
      {/* FIXED TOP HEADER (Exact Syntax CV style) */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between gap-4">
          {/* Left: Logo Name + Pulsing Green Beacon */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="font-bold text-white text-sm sm:text-base tracking-tight hover:text-[#00ffae] transition-colors select-none font-sans"
            >
              {personalInfo.name}
            </a>

            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00ffae]/10 border border-[#00ffae]/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffae] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffae]"></span>
              </span>
              <span className="text-[#00ffae] text-[11px] sm:text-xs font-mono font-semibold tracking-wide">
                Available for work
              </span>
            </div>
          </div>

          {/* Center (Desktop): Numbered Quick Nav Links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-mono">
            {NAV_LINKS.slice(0, 6).map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-[#949494] hover:text-[#00ffae] transition-colors flex items-baseline gap-1"
              >
                <span className="text-[#00ffae] text-[10px] font-bold">
                  {link.count}
                </span>
                <span className="uppercase tracking-wider">{link.title}</span>
              </a>
            ))}
          </nav>

          {/* Right: Download CV, Timezone, Contact Me & Mobile Hamburger */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-[#949494]">
            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:flex items-center gap-1.5 text-white hover:text-[#00ffae] transition-colors"
            >
              <span>Download CV</span>
              <RiArrowRightUpLine
                size={14}
                className="group-hover:rotate-45 transition-transform duration-200"
              />
            </a>

            <span className="hidden md:inline text-neutral-500">
              (UTC+5:30{timeStr && ` • ${timeStr}`})
            </span>

            <a
              href="#contact"
              className="hidden sm:inline text-white hover:text-[#00ffae] font-semibold transition-colors"
            >
              Contact Me
            </a>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-white hover:border-[#00ffae] hover:text-[#00ffae] transition xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <RiCloseLine size={20} /> : <RiMenu3Line size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE / EXPANDED FULL-SCREEN SLIDEOUT MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl pt-24 px-8 pb-12 flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00ffae]">
                Directory
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-[#00ffae] hover:bg-[#00ffae]/5 transition-all flex items-baseline gap-3"
                  >
                    <span className="text-[#00ffae] font-mono text-sm font-bold">
                      {link.count}
                    </span>
                    <span className="text-white font-bold text-lg uppercase tracking-tight">
                      {link.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#949494]">
              <a
                href={personalInfo.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00ffae] flex items-center gap-1.5"
              >
                <span>Download CV (PDF)</span>
                <RiDownloadLine size={14} className="text-[#00ffae]" />
              </a>

              <p>© 2026 MRIDUL MOHAN MISHRA</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
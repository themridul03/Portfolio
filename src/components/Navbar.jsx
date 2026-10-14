import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  about,
  achievements,
  project,
  portfolio,
  skills,
  testimonials,
  contact,
  logo,
} from "../assets";
import useNavPeek from "../reactbits/hooks/useNavPeek";

const NAV_LINKS = [
  { title: "home", href: "#hero", img: portfolio, count: "01" },
  { title: "about", href: "#about", img: about, count: "02" },
  { title: "karto", href: "#karto-spotlight", img: project, count: "03" },
  { title: "projects", href: "#projects", img: project, count: "04" },
  { title: "experience", href: "#experience", img: achievements, count: "05" },
  { title: "skills", href: "#skills", img: skills, count: "06" },
  { title: "education", href: "#education", img: achievements, count: "07" },
  { title: "contact", href: "#contact", img: contact, count: "08" },
];

const opacity = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35 } },
  closed: { opacity: 0, transition: { duration: 0.35 } },
};

const height = {
  initial: { height: 0 },
  enter: {
    height: "auto",
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    height: 0,
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  },
};

const blur = {
  initial: { filter: "blur(0px)", opacity: 1 },
  open: { filter: "blur(5px)", opacity: 0.35, transition: { duration: 0.3 } },
  closed: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.3 } },
};

const translate = {
  initial: { y: "100%", opacity: 0 },
  enter: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i[0] },
  }),
  exit: (i) => ({
    y: "100%",
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: i[1] },
  }),
};

function getChars(word) {
  return word.split("").map((char, i) => (
    <motion.span
      className="pointer-events-none"
      custom={[i * 0.018, (word.length - i) * 0.008]}
      variants={translate}
      initial="initial"
      animate="enter"
      exit="exit"
      key={char + i}
      style={{ display: "inline-block" }}
    >
      {char}
    </motion.span>
  ));
}

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    activeIndex,
    isHovering,
    preview,
    focusedIndex,
    handleEnter,
    handleLeave,
    handleClick,
  } = useNavPeek(NAV_LINKS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isActive]);

  return (
    <motion.header
      className="z-[999] fixed top-0 left-0 w-full"
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className={`mx-3 sm:mx-8 lg:mx-auto lg:max-w-6xl mt-4 rounded-full border transition-all duration-500 ${
          scrolled || isActive
            ? "border-white/10 bg-[#0d0f14]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            : "border-black/10 bg-[#0d0f14]/90 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.16)]"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <a
            href="#hero"
            data-cursor="HOME"
            className="cursor-can-hover flex items-center gap-3"
            onClick={() => setIsActive(false)}
          >
            {/* <img src={logo} alt="logo" className="h-14 object-contain" /> */}

            <div className="hidden sm:block">
              <p className="text-white font-black leading-4">
                Mridul Mishra
              </p>
              <p className="text-[#c19d23] text-xs tracking-[3px] uppercase">
                Portfolio
              </p>
            </div>
          </a>

          <button
            onClick={() => setIsActive((v) => !v)}
            data-cursor={isActive ? "CLOSE" : "MENU"}
            className="cursor-can-hover group flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-white hover:border-[#c19d23]/60 transition"
          >
            <div className="relative min-w-[58px] text-[15px] font-bold uppercase tracking-[2px]">
              <motion.p
                variants={opacity}
                animate={!isActive ? "open" : "closed"}
                style={{
                  margin: 0,
                  position: !isActive ? "static" : "absolute",
                  left: 0,
                  top: 0,
                }}
              >
                Menu
              </motion.p>

              <motion.p
                variants={opacity}
                animate={isActive ? "open" : "closed"}
                style={{
                  margin: 0,
                  position: isActive ? "static" : "absolute",
                  left: 0,
                  top: 0,
                }}
              >
                Close
              </motion.p>
            </div>

            <div className="relative w-[25px] h-[18px] flex flex-col justify-center items-center">
              <motion.span
                className="absolute left-0 w-full h-[2px] rounded-full bg-[#c19d23] block"
                style={{ top: 0 }}
                animate={
                  isActive
                    ? { rotate: 45, top: "8px" }
                    : { rotate: 0, top: 0 }
                }
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              />

              <motion.span
                className="absolute left-0 w-full h-[2px] rounded-full bg-white block"
                style={{ top: "8px" }}
                animate={
                  isActive
                    ? { opacity: 0, x: 15 }
                    : { opacity: 1, x: 0, top: "8px" }
                }
                transition={{ duration: 0.5 }}
              />

              <motion.span
                className="absolute left-0 w-full h-[2px] rounded-full bg-[#c19d23] block"
                style={{ top: "16px" }}
                animate={
                  isActive
                    ? { rotate: -45, top: "8px" }
                    : { rotate: 0, top: "16px" }
                }
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </button>
        </div>
      </div>

      <motion.div
        variants={height}
        initial="initial"
        animate={isActive ? "enter" : "exit"}
        className="absolute left-0 top-full w-full overflow-hidden"
        style={{ zIndex: 998 }}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="relative mx-3 sm:mx-5 mt-3 rounded-[32px] border border-white/10 bg-[#05070d]/95 backdrop-blur-2xl overflow-hidden min-h-[calc(100vh-110px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#c19d23]/10 rounded-full blur-[140px]" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 min-h-[calc(100vh-110px)] p-6 sm:p-10">
                <div className="flex flex-col justify-center">
                  <div className="mb-8">
                    <p className="text-[#c19d23] text-sm uppercase tracking-[5px] font-bold">
                      Navigation
                    </p>
                    <h2 className="mt-3 text-white text-[42px] sm:text-[60px] font-black leading-none">
                      Explore Portfolio
                    </h2>
                  </div>

                  <div className="flex flex-col gap-2">
                    {NAV_LINKS.map((link, idx) => (
                      <a
                        key={link.title}
                        href={link.href}
                        data-cursor="GO"
                        className="cursor-can-hover group relative rounded-2xl px-3 sm:px-5 py-2 sm:py-3 overflow-hidden"
                        onMouseOver={() => handleEnter(idx)}
                        onMouseLeave={handleLeave}
                        onClick={() => {
                          setIsActive(false);
                          handleClick(idx);
                        }}
                      >
                        <div className="absolute inset-0 bg-[#c19d23]/10 opacity-0 group-hover:opacity-100 transition" />

                        <div className="relative z-10 flex items-center gap-4">
                          <span
                            className={`text-sm font-black tracking-[3px] ${
                              focusedIndex === idx && isHovering
                                ? "text-[#c19d23]"
                                : "text-white/30"
                            }`}
                          >
                            {link.count}
                          </span>

                          <motion.p
                            variants={blur}
                            animate={
                              isHovering && focusedIndex !== idx
                                ? "open"
                                : "closed"
                            }
                            className="m-0 text-[38px] sm:text-[58px] md:text-[72px] font-black uppercase leading-none"
                            style={{
                              color:
                                focusedIndex === idx && isHovering
                                  ? "#f7df8a"
                                  : "#ffffff",
                              textShadow:
                                focusedIndex === idx && isHovering
                                  ? "0 0 25px rgba(193,157,35,0.35)"
                                  : "none",
                            }}
                          >
                            {getChars(link.title.toUpperCase())}
                          </motion.p>
                        </div>

                        <motion.div
                          className="absolute left-5 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-[#c19d23] to-[#f7df8a]"
                          initial={{ width: 0, opacity: 0 }}
                          animate={
                            focusedIndex === idx && isHovering
                              ? { width: "75%", opacity: 1 }
                              : { width: 0, opacity: 0 }
                          }
                          transition={{
                            duration: 0.35,
                            ease: [0.76, 0, 0.24, 1],
                          }}
                        />
                      </a>
                    ))}
                  </div>
                </div>

                <motion.div
                  variants={opacity}
                  initial="initial"
                  animate="open"
                  exit="closed"
                  className="hidden lg:flex flex-col justify-center"
                >
                  <div className="relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
                    <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-br from-[#c19d23]/30 to-cyan-500/10 blur-xl opacity-70" />

                    <div className="relative overflow-hidden rounded-[26px] border border-white/10">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={preview || NAV_LINKS[activeIndex].img}
                          src={preview || NAV_LINKS[activeIndex].img}
                          alt={
                            NAV_LINKS[focusedIndex]?.title ||
                            NAV_LINKS[activeIndex].title
                          }
                          initial={{ opacity: 0, scale: 1.08, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.96, y: -20 }}
                          transition={{ duration: 0.45 }}
                          className="w-full h-[330px] object-cover"
                        />
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="text-[#c19d23] text-xs font-bold tracking-[4px] uppercase">
                          Current Section
                        </p>

                        <h3 className="mt-2 text-white text-[34px] font-black uppercase">
                          {NAV_LINKS[focusedIndex]?.title ||
                            NAV_LINKS[activeIndex].title}
                        </h3>
                      </div>
                    </div>

                    <div className="relative mt-5 grid grid-cols-3 gap-3">
                      {["Modern", "Fast", "Premium"].map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-black/25 p-4 text-center"
                        >
                          <p className="text-white font-black">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
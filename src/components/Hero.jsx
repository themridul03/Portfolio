import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import useParallax from "../reactbits/hooks/useParallax";
import { styles } from "../styles";
import useMediaQuery from "../utils/useMediaQuery";

const typedItems = [
  "Full Stack Developer",
  "Product Builder",
  "AI Automation Developer",
  "Problem Solver",
];

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [itemIndex, setItemIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const { style: parallaxStyle } = useParallax({
    strength: 0.03,
    maxOffset: 15,
    enabled: !isMobile,
  });

  useEffect(() => {
    const currentItem = typedItems[itemIndex];

    const timer = setInterval(() => {
      if (isTyping && charIndex < currentItem.length) {
        setTypedText(currentItem.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isTyping && charIndex === currentItem.length) {
        setTimeout(() => setIsTyping(false), 900);
      } else if (!isTyping && charIndex > 0) {
        setTypedText(currentItem.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setIsTyping(true);
        setItemIndex((prev) => (prev + 1) % typedItems.length);
      }
    }, isTyping ? 80 : 38);

    return () => clearInterval(timer);
  }, [charIndex, itemIndex, isTyping]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen mx-auto overflow-hidden bg-[#05070d]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(193,157,35,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_25%),linear-gradient(180deg,#05070d_0%,#080b14_55%,#05070d_100%)]" />

      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:58px_58px]" />

      <div className="absolute right-[-120px] top-[12%] hidden md:flex w-[560px] h-[560px] items-center justify-center z-[2]">
        <motion.div
          className="absolute w-[78%] h-[78%] rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute w-[58%] h-[58%] rounded-full border border-[#c19d23]/30 border-dashed"
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute w-[38%] h-[38%] rounded-full border border-white/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            y: [0, -18, 0],
          }}
          transition={{
            rotateX: { duration: 7, repeat: Infinity, ease: "linear" },
            rotateY: { duration: 9, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative w-[130px] h-[130px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[
            ["translateZ(65px)", "</>"],
            ["rotateY(90deg) translateZ(65px)", "{ }"],
            ["rotateY(180deg) translateZ(65px)", "01"],
            ["rotateY(-90deg) translateZ(65px)", "API"],
            ["rotateX(90deg) translateZ(65px)", "UI"],
            ["rotateX(-90deg) translateZ(65px)", "DEV"],
          ].map(([transform, text]) => (
            <div
              key={text}
              className="absolute inset-0 rounded-[30px] border border-[#c19d23]/45 bg-[#080b14]/75 backdrop-blur-xl flex items-center justify-center text-[#f7df8a] text-[20px] font-black tracking-widest shadow-[0_0_40px_rgba(193,157,35,0.18)]"
              style={{ transform }}
            >
              {text}
            </div>
          ))}
        </motion.div>

        {[
          "const idea = build();",
          "await createImpact();",
          "git push future",
          "return success;",
        ].map((code, i) => (
          <motion.div
            key={code}
            className="absolute px-4 py-2 rounded-xl border border-white/10 bg-white/[0.035] backdrop-blur-xl text-white/45 text-xs font-mono"
            style={{
              top: i === 0 ? "14%" : i === 1 ? "28%" : i === 2 ? "70%" : "82%",
              left: i % 2 === 0 ? "4%" : "58%",
            }}
            animate={{
              y: [0, i % 2 === 0 ? -14 : 14, 0],
              opacity: [0.35, 0.75, 0.35],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {code}
          </motion.div>
        ))}

        <div className="absolute inset-0 rounded-full bg-[#c19d23]/10 blur-[110px]" />
      </div>

      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0 rgba(193,157,35,0)",
                "0 0 35px rgba(193,157,35,0.8)",
                "0 0 0 rgba(193,157,35,0)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-5 h-5 rounded-full bg-[#c19d23]"
          />

          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#c19d23] via-[#f7df8a]/50 to-transparent" />
        </div>

        <motion.div
          style={parallaxStyle}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-sm font-semibold mb-5"
          >
            Building products that feel fast, clean and meaningful
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className={`${styles.heroHeadText} text-white`}
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-[#c19d23] via-[#f7df8a] to-white bg-clip-text text-transparent">
              Mridul Mishra
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className={`${styles.heroSubText} mt-2 text-white-100`}
          >
            I'm{" "}
            <span
              className="typed relative inline-block font-black"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(193,157,35,0.45), rgba(193,157,35,0.45))",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 8px",
                backgroundPosition: "0 100%",
                color: "#f7df8a",
              }}
            >
              {typedText}
            </span>
            <span className="typed-cursor text-[#c19d23] animate-pulse">
              |
            </span>

            <br />

            <motion.b
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="inline-block mt-3 max-w-3xl text-secondary leading-8"
            >
              I design, develop and ship complete digital products — from
              frontend experiences to backend systems, automation workflows and
              scalable product architecture.
            </motion.b>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              data-cursor="VIEW"
              className="cursor-can-hover px-7 py-4 rounded-2xl bg-gradient-to-r from-[#c19d23] via-[#d6b642] to-[#c19d23] text-white font-bold shadow-[0_18px_45px_rgba(193,157,35,0.2)]"
            >
              View Projects
            </a>

            <a
              href="#contact"
              data-cursor="CONTACT"
              className="cursor-can-hover px-7 py-4 rounded-2xl border border-white/10 bg-white/[0.04] text-white font-bold hover:border-[#c19d23]/60 hover:text-[#f7df8a] transition"
            >
              Let's Connect
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20">
        <a href="#about" data-cursor="SCROLL" className="cursor-can-hover">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-[38px] h-[68px] rounded-3xl border-2 border-[#c19d23]/70 flex justify-center items-start p-2 bg-white/[0.03] backdrop-blur-md shadow-[0_0_25px_rgba(193,157,35,0.25)]"
          >
            <motion.div
              animate={{
                y: [0, 26, 0],
                opacity: [1, 0.35, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="w-3 h-3 rounded-full bg-[#c19d23] mb-1"
            />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
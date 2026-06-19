import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import {
  RiExternalLinkLine,
  RiMedalFill,
  RiSparkling2Fill,
} from "react-icons/ri";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { achievements } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

/* =========================
   SINGLE CARD (APPLE STYLE)
========================= */
const AchievementCard = ({ Achievement, index, scrollYProgress }) => {
  // Apple-like focus animation
  const opacity = useTransform(
    scrollYProgress,
    [index * 0.2, index * 0.2 + 0.15],
    [0.2, 1]
  );

  const scale = useTransform(
    scrollYProgress,
    [index * 0.2, index * 0.2 + 0.15],
    [0.92, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [index * 0.2, index * 0.2 + 0.15],
    [60, 0]
  );

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(8, 11, 20, 0.92)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        backdropFilter: "blur(18px)",
        transform: "none",
        boxShadow: "none", // ❌ removed heavy shadow
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(193,157,35,0.6)",
      }}
      date={Achievement.date}
      dateClassName="text-[#c19d23] font-semibold"
      iconStyle={{
        background: `linear-gradient(135deg, ${Achievement.iconBg}, #080b14)`,
        border: "1px solid rgba(255,255,255,0.12)",
      }}
      icon={
        <motion.div
          className="flex justify-center items-center w-full h-full"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <img
            src={Achievement.icon}
            alt={Achievement.company_name || Achievement.title}
            className="w-[70%] h-[70%] object-contain rounded-full"
          />
        </motion.div>
      }
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="relative overflow-hidden will-change-transform"
      >
        {/* glow only (light) */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#c19d23]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-[13px] font-semibold mb-4">
            <RiMedalFill />
            Achievement
          </div>

          <h3 className="text-white text-[24px] sm:text-[28px] font-black leading-tight">
            {Array.isArray(Achievement.title)
              ? Achievement.title.map((t, i) => (
                  <span
                    key={i}
                    className="block bg-gradient-to-r from-white via-[#f7df8a] to-[#c19d23] bg-clip-text text-transparent"
                  >
                    {t}
                  </span>
                ))
              : Achievement.title}
          </h3>

          {Achievement.company_name && (
            <p className="mt-2 text-secondary text-[15px] font-medium">
              {Achievement.company_name}
            </p>
          )}

          <div className="mt-5 h-[2px] w-20 bg-gradient-to-r from-[#c19d23] to-cyan-400" />

          <ul className="mt-6 space-y-4">
            {Achievement.points.map((point, pointIndex) => (
              <motion.li
                key={pointIndex}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: pointIndex * 0.1,
                }}
                viewport={{ once: true }}
                className="relative pl-7 text-white/80 text-[14px]"
              >
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-[#c19d23]" />
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </VerticalTimelineElement>
  );
};

/* =========================
   MAIN SECTION (APPLE SCROLL CONTROL)
========================= */
const Achievement = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative">
      {/* HEADER */}
      <motion.div variants={textVariant()} className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-sm font-semibold mb-4">
          <RiSparkling2Fill />
          Career Highlights
        </div>

        <p className={`${styles.sectionSubText} text-center`}>
          What I have achieved so far
        </p>

        <h2 className={`${styles.sectionHeadText} text-center`}>
          Achievements.
        </h2>
      </motion.div>

      {/* TIMELINE */}
      <div className="relative mt-20">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-[#c19d23]/30 hidden md:block" />

        <VerticalTimeline lineColor="rgba(193,157,35,0.25)">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              Achievement={achievement}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </VerticalTimeline>
      </div>

      <span id="skills" />
    </div>
  );
};

export default SectionWrapper(Achievement, "achievements");
import { motion } from "framer-motion";
import React from "react";
import { RiExternalLinkLine, RiMedalFill, RiSparkling2Fill } from "react-icons/ri";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { achievements } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const AchievementCard = ({ Achievement, index }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(8, 11, 20, 0.92)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "24px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        backdropFilter: "blur(18px)",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(193,157,35,0.75)",
      }}
      date={Achievement.date}
      dateClassName="text-[#c19d23] font-semibold"
      iconStyle={{
        background: `linear-gradient(135deg, ${Achievement.iconBg}, #080b14)`,
        boxShadow: "0 0 28px rgba(193,157,35,0.35)",
        border: "2px solid rgba(255,255,255,0.18)",
      }}
      icon={
        <motion.div
          className="flex justify-center items-center w-full h-full"
          animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.06, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
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
        variants={fadeIn("up", "spring", index * 0.15, 0.75)}
        className="relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#c19d23]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-[13px] font-semibold mb-4">
            <RiMedalFill />
            Achievement Milestone
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
                key={`Achievement-point-${pointIndex}`}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  delay: pointIndex * 0.12,
                }}
                viewport={{ once: true }}
                className="relative pl-7 text-white/85 text-[14px] sm:text-[15px] leading-7 tracking-wide"
              >
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-[#c19d23] shadow-[0_0_14px_rgba(193,157,35,0.9)]" />
                {point}

                {Achievement.credential && Achievement.credential[pointIndex] && (
                  <div className="mt-3">
                    <a
                      href={Achievement.credential[pointIndex]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c19d23]/10 border border-[#c19d23]/30 text-[#f7df8a] text-[13px] font-semibold hover:bg-[#c19d23]/20 hover:border-[#c19d23]/70 transition-all duration-300"
                    >
                      View Credential
                      <RiExternalLinkLine />
                    </a>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </VerticalTimelineElement>
  );
};

const Achievement = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="relative text-center">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-sm font-semibold mb-4">
          <RiSparkling2Fill />
          Career Highlights
        </div>

        <p className={`${styles.sectionSubText} text-center`}>
          What I have achieved so far
        </p>

        <h2 className={`${styles.sectionHeadText} text-center`}>
          Achievements.
        </h2>

        <p className="mt-4 text-secondary text-[16px] max-w-2xl mx-auto leading-7">
          A timeline of certifications, milestones, learning progress and
          professional achievements that reflect my growth as a developer.
        </p>
      </motion.div>

      <div className="relative mt-20">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#c19d23]/40 to-transparent hidden md:block" />

        <VerticalTimeline lineColor="rgba(193,157,35,0.35)">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={`Achievement-${index}`}
              Achievement={achievement}
              index={index}
            />
          ))}
        </VerticalTimeline>
      </div>

      <span id="skills"></span>
    </>
  );
};

export default SectionWrapper(Achievement, "achievements");
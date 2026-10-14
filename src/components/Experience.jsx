import React from "react";
import { motion } from "framer-motion";
import {
  RiBriefcase4Fill,
  RiBuilding4Fill,
  RiCalendarLine,
  RiMapPin2Line,
  RiSparkling2Fill,
  RiCheckDoubleFill,
} from "react-icons/ri";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { experiences } from "../constants";

const ExperienceCard = ({ exp, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="group relative rounded-[28px] p-[1px] bg-gradient-to-br from-[#c19d23]/40 via-white/10 to-cyan-500/20 mb-8 last:mb-0"
  >
    <div className="absolute inset-0 rounded-[28px] bg-[#c19d23]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

    <div className="relative rounded-[28px] bg-[#0d0f14] backdrop-blur-2xl p-6 sm:p-9 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#c19d23]/15 border border-[#c19d23]/40 flex items-center justify-center text-[#f7df8a] shrink-0 group-hover:rotate-6 transition-transform">
            <RiBuilding4Fill size={26} />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-white text-xl sm:text-2xl font-black">
                {exp.title}
              </h3>
              {exp.badge && (
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                  {exp.badge}
                </span>
              )}
            </div>

            <p className="text-[#f7df8a] text-sm sm:text-base font-bold mt-1">
              {exp.company_name}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-1 text-xs sm:text-sm text-secondary">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-medium">
            <RiCalendarLine className="text-[#c19d23]" />
            {exp.date}
          </span>
          <span className="inline-flex items-center gap-1.5 mt-1 text-white/50 text-xs">
            <RiMapPin2Line />
            {exp.location}
          </span>
        </div>
      </div>

      {/* Bullet Points */}
      <ul className="mt-6 space-y-3.5">
        {exp.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-white/80 leading-relaxed">
            <span className="mt-1 text-[#c19d23] shrink-0">
              <RiCheckDoubleFill size={16} />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Tech Tags */}
      {exp.tech && (
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 text-xs font-medium hover:border-[#c19d23]/50 transition"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const Experience = () => {
  return (
    <div id="experience" className="relative pt-6">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#b45309] text-xs sm:text-sm font-bold tracking-wide uppercase mb-4">
          <RiBriefcase4Fill className="text-[#f59e0b]" />
          Career Progression
        </div>

        <h2 className={styles.sectionHeadText}>
          Work Experience.
        </h2>

        <p className="mt-4 text-[#78716c] text-[16px] sm:text-[18px] leading-relaxed">
          2.5+ years of software development experience contributing across cloud-native architectures, enterprise SaaS pipelines, and full-stack solutions.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.company_name} exp={exp} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");

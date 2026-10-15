import React from "react";
import { motion } from "framer-motion";
import { experiences } from "../constants";
import SyntaxCVSectionLayout from "./SyntaxCVSectionLayout";

const Experience = () => {
  return (
    <SyntaxCVSectionLayout id="experience" number="02." title="experience">
      <div className="space-y-12 sm:space-y-16">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company_name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="group relative pb-10 sm:pb-14 border-b border-white/[0.08] last:border-b-0 last:pb-0"
          >
            {/* Top Subline: Company + Location + Date (Syntax CV jjajws style) */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-mono text-[#949494]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-medium">{exp.company_name}</span>
                <span>•</span>
                <span>{exp.location}</span>
                {exp.badge && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00ffae]/10 text-[#00ffae] border border-[#00ffae]/30 text-xs font-mono">
                      {exp.badge}
                    </span>
                  </>
                )}
              </div>
              <span className="text-white/80 font-mono text-xs sm:text-sm">
                {exp.date}
              </span>
            </div>

            {/* Role Title (Syntax CV cn196r style) */}
            <h3 className="text-2xl sm:text-[30px] md:text-[32px] font-bold text-white mt-2 group-hover:text-[#00ffae] transition-colors duration-300 tracking-tight">
              {exp.title}
            </h3>

            {/* Responsibilities & Impact Points (Syntax CV 12zfn9k style) */}
            <ul className="mt-4 space-y-3">
              {exp.points.map((pt, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3.5 text-base sm:text-lg text-[#d4d4d4] leading-relaxed"
                >
                  <span className="text-[#00ffae] mt-1.5 text-xs font-bold shrink-0">
                    —
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Tech Badges in Syntax CV pill style */}
            {exp.tech && (
              <div className="mt-5 flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md border border-white/[0.12] border-b-2 border-b-white/[0.2] bg-white/[0.02] text-xs font-mono text-[#949494] hover:text-[#00ffae] hover:border-[#00ffae] transition-colors duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SyntaxCVSectionLayout>
  );
};

export default Experience;

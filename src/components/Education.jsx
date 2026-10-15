import React from "react";
import { motion } from "framer-motion";
import { education } from "../constants";
import SyntaxCVSectionLayout from "./SyntaxCVSectionLayout";

const Education = () => {
  return (
    <SyntaxCVSectionLayout id="education" number="06." title="education">
      <div className="space-y-12 sm:space-y-16">
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="pb-10 sm:pb-12 border-b border-white/[0.08] last:border-b-0 last:pb-0 group"
          >
            {/* Top Subline: Institution • Location • Period (Syntax CV jjajws style) */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-mono text-[#949494]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-medium">{edu.institution}</span>
                <span>•</span>
                <span>{edu.location}</span>
                {edu.grade && (
                  <>
                    <span>•</span>
                    <span className="text-[#00ffae]">{edu.grade}</span>
                  </>
                )}
              </div>
              <span className="text-white/80 font-mono text-xs sm:text-sm">
                {edu.period}
              </span>
            </div>

            {/* Degree Title (Syntax CV cn196r style) */}
            <h3 className="text-2xl sm:text-[28px] font-bold text-white mt-2 group-hover:text-[#00ffae] transition-colors duration-300">
              {edu.degree}
            </h3>

            {/* Description matching Syntax CV */}
            <p className="mt-3 text-base text-[#d4d4d4] leading-relaxed max-w-3xl">
              Completed comprehensive coursework in software engineering, distributed database management systems, object-oriented design, algorithms, and cloud application architectures.
            </p>

            {/* Coursework highlights */}
            {edu.highlights && (
              <div className="mt-4 flex flex-wrap gap-2">
                {edu.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md border border-white/[0.12] border-b-2 border-b-white/[0.2] bg-white/[0.02] text-xs font-mono text-[#949494] hover:text-[#00ffae] hover:border-[#00ffae] transition-colors duration-200"
                  >
                    {h}
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

export default Education;

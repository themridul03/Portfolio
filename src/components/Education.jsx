import React from "react";
import { motion } from "framer-motion";
import {
  RiGraduationCapFill,
  RiAwardFill,
  RiExternalLinkLine,
  RiCheckFill,
  RiMapPin2Line,
} from "react-icons/ri";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { education, achievements } from "../constants";

const Education = () => {
  return (
    <div id="education" className="relative pt-6">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-xs sm:text-sm font-semibold mb-4">
          <RiGraduationCapFill />
          Academic &amp; Professional Qualifications
        </div>

        <h2 className={styles.sectionHeadText}>
          Education &amp; Credentials.
        </h2>

        <p className="mt-4 text-secondary text-[16px] sm:text-[18px] leading-relaxed">
          Formal academic foundation in computer applications paired with industry-standard professional certifications.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT: EDUCATION CARDS */}
        <div>
          <h3 className="text-white text-xl font-black mb-6 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#c19d23]/20 flex items-center justify-center text-[#f7df8a]">
              <RiGraduationCapFill size={18} />
            </span>
            Academic Degrees
          </h3>

          <div className="space-y-5">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#080b14]/90 backdrop-blur-xl p-6 hover:border-[#c19d23]/40 transition-all duration-300"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="text-white font-black text-lg">{edu.degree}</h4>
                    <p className="text-[#f7df8a] text-sm font-bold mt-0.5">{edu.institution}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold">
                    {edu.grade}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-secondary text-xs mt-2">
                  <RiMapPin2Line />
                  <span>{edu.location}</span>
                  <span>•</span>
                  <span>{edu.period}</span>
                </div>

                {edu.highlights && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                    {edu.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] text-white/75"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: CERTIFICATIONS */}
        <div>
          <h3 className="text-white text-xl font-black mb-6 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <RiAwardFill size={18} />
            </span>
            Industry Certifications
          </h3>

          <div className="space-y-5">
            {achievements.map((ach, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#080b14]/90 backdrop-blur-xl p-6 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0">
                      <img
                        src={ach.icon}
                        alt={ach.company_name}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-base">
                        {Array.isArray(ach.title) ? ach.title.join(", ") : ach.title}
                      </h4>
                      <p className="text-cyan-400 text-xs font-semibold mt-0.5">
                        {ach.company_name} • {ach.date}
                      </p>
                    </div>
                  </div>

                  {ach.credential && ach.credential[0] && (
                    <a
                      href={ach.credential[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/60 text-white/70 hover:text-white flex items-center justify-center shrink-0 transition"
                      title="Verify Credential"
                    >
                      <RiExternalLinkLine size={15} />
                    </a>
                  )}
                </div>

                <ul className="mt-4 space-y-1.5">
                  {ach.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                      <RiCheckFill className="text-emerald-400 shrink-0" size={14} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Education, "education");

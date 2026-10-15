import React from "react";
import { motion } from "framer-motion";
import { RiArrowRightUpLine, RiCheckLine } from "react-icons/ri";
import { achievements } from "../constants";
import SyntaxCVSectionLayout from "./SyntaxCVSectionLayout";

const Achievement = () => {
  return (
    <SyntaxCVSectionLayout
      id="awards"
      number="09."
      title="awards & credentials"
    >
      <div className="space-y-4">
        {achievements.map((ach, idx) => {
          const credLink = ach.credential && ach.credential[0];
          const titleText = Array.isArray(ach.title)
            ? ach.title.join(", ")
            : ach.title;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-xl border border-white/[0.12] border-b-2 border-b-white/[0.2] bg-white/[0.02] hover:border-[#00ffae] hover:border-b-[#00ffae] transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-white/[0.04] border border-white/10 p-2 flex items-center justify-center shrink-0">
                    <img
                      src={ach.icon}
                      alt={ach.company_name}
                      className="w-full h-full object-contain filter brightness-95"
                    />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#00ffae] transition-colors">
                      {titleText}
                    </h4>
                    <p className="text-sm font-mono text-[#949494] mt-0.5">
                      {ach.company_name} • {ach.date}
                    </p>

                    {/* Bullet Highlights */}
                    {ach.points && (
                      <ul className="mt-3 space-y-1.5">
                        {ach.points.map((pt, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs font-mono text-[#d4d4d4]"
                          >
                            <RiCheckLine className="text-[#00ffae] shrink-0" size={14} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Verified Credential Badge (Keeps user on the page) */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ffae]/10 border border-[#00ffae]/30 text-xs font-mono text-[#00ffae] font-semibold self-start sm:self-auto shrink-0 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ffae]" />
                  <span>Credential Verified</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SyntaxCVSectionLayout>
  );
};

export default Achievement;
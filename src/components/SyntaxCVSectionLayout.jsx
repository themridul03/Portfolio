import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable Syntax CV Section Layout
 * Exact replica of https://syntaxcv.framer.website/ section architecture:
 * - Top hairline divider (border-t border-white/[0.12])
 * - 2-column internal split:
 *    - Left: Sticky section number & title with staggered character blur-fade-up
 *    - Right: Section content stream
 */
export const SyntaxCVSectionLayout = ({
  id,
  number,
  title,
  children,
  className = "",
}) => {
  const letters = title.split("");

  return (
    <section
      id={id}
      className={`w-full pt-10 pb-16 sm:pb-24 border-t border-white/[0.12] ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] xl:grid-cols-[180px_1fr] gap-6 xl:gap-10 items-start">
        {/* Left Column: Sticky Section Header */}
        <div className="md:sticky md:top-8 self-start z-10">
          <h2 className="text-2xl sm:text-3xl xl:text-[34px] font-bold text-white uppercase tracking-tight flex items-baseline gap-2.5 select-none font-sans">
            <span className="text-[#00ffae] font-mono text-xl sm:text-2xl xl:text-[28px] font-bold">
              {number}
            </span>
            <span className="inline-block">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(10px)", y: 12 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.02,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>

        {/* Right Column: Section Content */}
        <div className="w-full min-w-0">{children}</div>
      </div>
    </section>
  );
};

export default SyntaxCVSectionLayout;

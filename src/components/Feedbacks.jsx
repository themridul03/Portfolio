import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "../constants";
import SyntaxCVSectionLayout from "./SyntaxCVSectionLayout";

const Feedbacks = () => {
  return (
    <SyntaxCVSectionLayout id="testimonials" number="08." title="references">
      <div className="space-y-12 sm:space-y-16">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="pb-10 sm:pb-12 border-b border-white/[0.08] last:border-b-0 last:pb-0 group"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Grayscale Author Photo matching Syntax CV Cyrgq style */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Author Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00ffae] transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs sm:text-sm font-mono text-[#00ffae] mt-0.5 uppercase tracking-wider">
                  {item.designation}
                </p>

                {/* Testimonial Quote (Large, Expressive Typography) */}
                <p className="mt-4 text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed font-light">
                  &ldquo;{item.testimonial}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SyntaxCVSectionLayout>
  );
};

export default Feedbacks;
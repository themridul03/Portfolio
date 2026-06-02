import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiDoubleQuotesL,
  RiSparkling2Fill,
  RiStarFill,
} from "react-icons/ri";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.75)}
    whileHover={{
      y: -12,
      scale: 1.025,
      transition: { duration: 0.3 },
    }}
    className="group relative xs:w-[340px] w-full overflow-hidden rounded-[28px] p-[1px] bg-gradient-to-br from-[#c19d23] via-white/10 to-cyan-500/30"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[#c19d23]/20 blur-2xl" />

    <div className="relative min-h-[360px] rounded-[28px] bg-[#080b14]/95 backdrop-blur-xl border border-white/10 p-7 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-2xl bg-[#c19d23]/10 border border-[#c19d23]/30 flex items-center justify-center text-[#c19d23]">
            <RiDoubleQuotesL size={30} />
          </div>

          <div className="flex items-center gap-1 text-[#c19d23]">
            {[...Array(5)].map((_, i) => (
              <RiStarFill key={i} size={15} />
            ))}
          </div>
        </div>

        <p className="mt-8 text-white/85 tracking-wide text-[16px] leading-8">
          {testimonial}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center gap-4">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-bold text-[17px]">
            <span className="text-[#c19d23]">@</span> {name}
          </p>

          <p className="mt-1 text-secondary text-[13px] leading-5">
            {designation} of {company}
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#c19d23]/40 blur-md group-hover:blur-lg transition" />
          <img
            src={image}
            alt={`feedback_by-${name}`}
            className="relative w-13 h-13 rounded-full object-cover border-2 border-[#c19d23]/60"
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const activeTestimonial = testimonials[active];

  return (
    <div className="relative mt-12 overflow-hidden rounded-[32px] bg-[#05070d] border border-white/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#c19d23]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px]" />

      <div className={`relative bg-[#080b14]/80 rounded-[32px] ${styles.padding} min-h-[360px]`}>
        <motion.div variants={textVariant()}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-sm font-semibold mb-5">
            <RiSparkling2Fill />
            Real feedback
          </div>

          <p className={`text-[#c19d23] ${styles.sectionSubText}`}>
            What others say
          </p>

          <h2 className={styles.sectionHeadText}>Testimonials.</h2>

          <p className="mt-4 text-secondary text-[16px] max-w-2xl leading-7">
            Words from people I have worked with, collaborated with, and built
            meaningful products for.
          </p>
        </motion.div>

        {activeTestimonial && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="hidden lg:block absolute right-10 bottom-10 max-w-[430px] rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7"
          >
            <RiDoubleQuotesL className="text-[#c19d23] text-[42px]" />

            <p className="mt-4 text-white/85 text-[16px] leading-8">
              {activeTestimonial.testimonial}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <img
                src={activeTestimonial.image}
                alt={activeTestimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#c19d23]/60"
              />

              <div>
                <p className="text-white font-bold">
                  {activeTestimonial.name}
                </p>
                <p className="text-secondary text-xs mt-1">
                  {activeTestimonial.designation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className={`relative -mt-16 pb-16 ${styles.paddingX}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === index
                    ? "w-10 bg-[#c19d23]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="hidden sm:flex gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 text-white hover:border-[#c19d23]/60 hover:text-[#c19d23] transition flex items-center justify-center"
            >
              <RiArrowLeftSLine size={24} />
            </button>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 text-white hover:border-[#c19d23]/60 hover:text-[#c19d23] transition flex items-center justify-center"
            >
              <RiArrowRightSLine size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-7">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              onMouseEnter={() => setActive(index)}
              className="cursor-can-hover"
              data-cursor="READ"
            >
              <FeedbackCard index={index} {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
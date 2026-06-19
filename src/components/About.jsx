import { motion } from "framer-motion";
import React from "react";
import { RiBriefcase4Fill, RiSparkling2Fill } from "react-icons/ri";
import { Tilt } from "react-tilt";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import useMagnetic from "../reactbits/hooks/useMagnetic";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Enterprise Features" },
  { value: "20+", label: "Projects" },
  { value: "AI", label: "Automation Focus" },
];

/* ===================== SERVICE CARD ===================== */
const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[255px] w-full">
    <motion.div
      variants={fadeIn("up", "spring", index * 0.18, 0.75)}
      className="group relative w-full rounded-[24px] p-[1px] bg-gradient-to-br from-[#c19d23] via-[#2dd4bf] to-[#111522]"
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{
        rotateY: 12,
        rotateX: -10,
        scale: 1.03,
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#c19d23]/30 via-cyan-500/20 to-indigo-500/20 blur-xl" />

      <div className="relative bg-[#080b14]/95 backdrop-blur-xl rounded-[24px] py-8 px-7 min-h-[270px] flex flex-col justify-between border border-white/10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:rotate-y-180 transition">
          <img src={icon} alt={title} className="w-10 h-10 object-contain" />
        </div>

        <div>
          <h3 className="text-white text-[21px] font-bold">
            {title}
          </h3>

          <div className="mt-4 h-[2px] w-12 bg-gradient-to-r from-[#c19d23] to-cyan-400 group-hover:w-24 transition-all duration-300" />
        </div>

        <p className="text-secondary text-[14px] leading-6">
          Building clean, scalable and production-ready digital experiences.
        </p>
      </div>
    </motion.div>
  </Tilt>
);

/* ===================== ABOUT ===================== */
const About = () => {
  const { ref: resumeButtonRef, style: magneticStyle } = useMagnetic({
    radius: 100,
    strength: 0.3,
  });

  return (
    <>
      {/* HEADER */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* 🔥 3D SECTION WRAPPER */}
      <motion.section
        className="mt-6 perspective-[1400px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-8 items-stretch"
          initial={{ rotateX: 10, scale: 0.98 }}
          whileInView={{ rotateX: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >

          {/* LEFT PANEL */}
          <motion.div
            variants={fadeIn("right", "spring", 0.1, 1)}
            whileHover={{
              rotateY: -6,
              rotateX: 4,
              scale: 1.01,
            }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#080b14]/80 backdrop-blur-xl p-7 sm:p-9 shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#c19d23]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-sm font-semibold mb-6">
                <RiSparkling2Fill />
                Full Stack Developer & AI Automation Explorer
              </div>

              <p className="text-secondary text-[17px] leading-[31px]">
                I’m <span className="text-white font-semibold">Mridul Mishra</span>,
                building scalable digital systems and AI automation workflows.
              </p>

              {/* SKILLS */}
              <div className="mt-8 flex flex-wrap gap-3">
                {["React", "Node.js", "Python", "AI Automation"].map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      rotateX: 15,
                      scale: 1.08,
                    }}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* BUTTON */}
              <motion.button
                ref={resumeButtonRef}
                style={magneticStyle}
                whileHover={{
                  rotateX: 10,
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.96 }}
                className="mt-10 px-7 py-4 text-white rounded-xl bg-gradient-to-r from-[#c19d23] via-[#d6b642] to-[#c19d23]"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1JXxclNaQDOGD9BauEy1jS9XDYk5QsaMa/view?usp=sharing",
                    "_blank"
                  )
                }
              >
                <span className="flex gap-2 items-center">
                  <RiBriefcase4Fill />
                  Download Resume
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT STATS */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={fadeIn("left", "spring", 0.2, 1)}
          >
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{
                  rotateY: 18,
                  rotateX: -10,
                  scale: 1.06,
                }}
                transition={{ type: "spring", stiffness: 120 }}
                className="rounded-[24px] border border-white/10 bg-[#080b14]/80 backdrop-blur-xl p-6 shadow-xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <h3 className="text-[34px] font-black text-white">
                  {item.value}
                </h3>
                <p className="text-secondary text-[14px]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* SERVICES */}
      <div className="mt-14 flex flex-wrap gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
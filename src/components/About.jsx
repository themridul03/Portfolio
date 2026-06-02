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

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[255px] w-full">
    <motion.div
      variants={fadeIn("up", "spring", index * 0.18, 0.75)}
      className="group relative w-full rounded-[24px] p-[1px] overflow-hidden bg-gradient-to-br from-[#c19d23] via-[#2dd4bf] to-[#111522]"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#c19d23]/30 via-cyan-500/20 to-indigo-500/20 blur-xl" />

      <div className="relative bg-[#080b14]/95 backdrop-blur-xl rounded-[24px] py-8 px-7 min-h-[270px] flex flex-col justify-between border border-white/10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition duration-300">
          <img src={icon} alt={title} className="w-10 h-10 object-contain" />
        </div>

        <div>
          <h3 className="text-white text-[21px] font-bold leading-tight">
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

const About = () => {
  const { ref: resumeButtonRef, style: magneticStyle } = useMagnetic({
    radius: 100,
    strength: 0.3,
  });

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-8 items-stretch">
        <motion.div
          variants={fadeIn("right", "spring", 0.1, 1)}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#080b14]/80 backdrop-blur-xl p-7 sm:p-9 shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#c19d23]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-sm font-semibold mb-6">
              <RiSparkling2Fill />
              Full Stack Developer & AI Automation Explorer
            </div>

            <p className="text-secondary text-[17px] leading-[31px] max-w-4xl">
              I’m{" "}
              <span className="text-white font-semibold">Mridul Mishra</span>,
              a Full Stack Developer focused on building scalable,
              high-performance and user-centric digital products. I work across
              modern web applications, mobile apps, backend systems, enterprise
              platforms and AI-powered automation workflows.
              <br />
              <br />
              My focus is simple: create clean architecture, smooth user
              experiences and practical software solutions that solve real
              business problems. I’m currently expanding deeper into AI, machine
              learning and intelligent agents to build future-ready products.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["React", "React Native", "Node.js", "ASP.NET", "SQL Server", "PostgreSQL", "Python", "AI Automation"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:border-[#c19d23]/60 hover:text-[#c19d23] transition"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            <button
              ref={resumeButtonRef}
              style={magneticStyle}
              className="mt-10 group relative overflow-hidden px-7 py-4 text-white rounded-xl bg-gradient-to-r from-[#c19d23] via-[#d6b642] to-[#c19d23] shadow-lg shadow-[#c19d23]/20 focus:outline-none"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1JXxclNaQDOGD9BauEy1jS9XDYk5QsaMa/view?usp=sharing",
                  "_blank"
                )
              }
            >
              <span className="relative z-10 font-semibold flex gap-2 items-center">
                <RiBriefcase4Fill />
                Download Resume
              </span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "spring", 0.2, 1)}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((item, index) => (
            <div
              key={item.label}
              className="rounded-[24px] border border-white/10 bg-[#080b14]/80 backdrop-blur-xl p-6 flex flex-col justify-center shadow-xl hover:border-[#c19d23]/50 transition"
            >
              <h3 className="text-[34px] font-black text-white">
                {item.value}
              </h3>
              <p className="mt-2 text-secondary text-[14px] leading-5">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-14 flex flex-wrap gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
import { motion } from "framer-motion";
import React from "react";
import {
  RiBriefcase4Fill,
  RiSparkling2Fill,
  RiCheckDoubleFill,
  RiDownloadLine,
  RiCodeSSlashLine,
  RiServerLine,
  RiSmartphoneLine,
  RiDatabase2Line,
} from "react-icons/ri";
import { Tilt } from "react-tilt";
import { services, personalInfo } from "../constants";
import { SectionWrapper } from "../hoc";
import useMagnetic from "../reactbits/hooks/useMagnetic";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const stats = [
  { value: "2.5+", label: "Years Experience", sub: "Enterprise & Full-Stack" },
  { value: "10+", label: "Shipped Projects", sub: "Web, Mobile, SaaS" },
  { value: "4", label: "Core Stacks", sub: ".NET, MERN, Native, Azure" },
  { value: "100%", label: "Reliability", sub: "Clean Architecture" },
];

/* ===================== SERVICE CARD ===================== */
const ServiceCard = ({ index, title, subtitle, description, icon }) => (
  <Tilt className="xs:w-[260px] w-full flex-1">
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.75)}
      className="group relative w-full rounded-[26px] p-[1px] bg-gradient-to-br from-[#c19d23]/40 via-white/10 to-cyan-500/30 h-full"
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{
        rotateY: 10,
        rotateX: -8,
        scale: 1.02,
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#c19d23]/20 via-cyan-500/10 to-indigo-500/10 blur-xl" />

      <div className="relative bg-[#0d0f14] backdrop-blur-xl rounded-[26px] py-7 px-6 min-h-[300px] flex flex-col justify-between border border-white/10 h-full shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div>
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition duration-300">
            <img src={icon} alt={title} className="w-8 h-8 object-contain" />
          </div>

          <h3 className="text-white text-[20px] font-black mt-5 leading-tight">
            {title}
          </h3>

          <p className="text-[#f7df8a] text-xs font-semibold mt-1">
            {subtitle}
          </p>

          <div className="mt-3.5 h-[2px] w-12 bg-gradient-to-r from-[#c19d23] to-cyan-400 group-hover:w-20 transition-all duration-300" />
        </div>

        <p className="text-secondary text-[13px] leading-relaxed mt-4">
          {description}
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
        <p className={styles.sectionSubText}>About Me</p>
        <h2 className={styles.sectionHeadText}>Overview &amp; Engineering Philosophy.</h2>
      </motion.div>

      {/* 3D SECTION WRAPPER */}
      <motion.section
        className="mt-6 perspective-[1400px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-stretch"
          initial={{ rotateX: 8, scale: 0.98 }}
          whileInView={{ rotateX: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* LEFT PANEL */}
          <motion.div
            variants={fadeIn("right", "spring", 0.1, 1)}
            whileHover={{
              rotateY: -4,
              rotateX: 3,
              scale: 1.01,
            }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0f14] backdrop-blur-xl p-7 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#c19d23]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#fbbf24] text-xs sm:text-sm font-bold tracking-wide uppercase mb-6">
                <RiSparkling2Fill className="text-[#f59e0b]" />
                Software Developer • Enterprise &amp; Full-Stack
              </div>

              <p className="text-secondary text-[16px] sm:text-[17px] leading-[30px]">
                I’m <span className="text-white font-black">{personalInfo.name}</span>, a software engineer with over 2.5 years of industry experience architecting scalable enterprise, web, backend, and mobile applications. Currently engineering cloud-native microservices with <span className="text-white font-semibold">ASP.NET Core, Azure, and SQL Server</span> at <span className="text-[#f7df8a] font-semibold">Midtown Software</span>.
              </p>

              <p className="mt-4 text-secondary text-[15px] leading-[28px]">
                I engineered <span className="text-white font-bold">Karto</span>, a full-scale hyperlocal on-demand delivery platform supporting customer, vendor, rider, and admin flows, published and verified on Google Play. My approach combines robust software engineering practices, low-latency APIs, and clean design.
              </p>

              {/* CORE SKILL PILLS */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {[
                  "ASP.NET Core & .NET",
                  "C# Microservices",
                  "React & Next.js",
                  "React Native Mobile",
                  "PostgreSQL & Prisma",
                  "SQL Server & EF Core",
                  "Socket.io WebSockets",
                  "Azure Cloud & Docker",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/85 text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.button
                  ref={resumeButtonRef}
                  style={magneticStyle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3.5 text-black font-extrabold rounded-xl bg-gradient-to-r from-[#c19d23] via-[#d6b642] to-[#c19d23] shadow-[0_10px_35px_rgba(193,157,35,0.3)] flex items-center gap-2"
                  onClick={() => window.open(personalInfo.resumeLink, "_blank")}
                >
                  <RiDownloadLine size={18} />
                  <span>Download Resume (PDF)</span>
                </motion.button>

                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-bold hover:bg-white/10 transition"
                >
                  Contact Mridul
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT STATS CARDS */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={fadeIn("left", "spring", 0.2, 1)}
          >
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{
                  rotateY: 12,
                  rotateX: -8,
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 120 }}
                className="rounded-[24px] border border-white/10 bg-[#0d0f14] backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div>
                  <h3 className="text-[32px] sm:text-[38px] font-black bg-gradient-to-r from-[#f7df8a] to-[#c19d23] bg-clip-text text-transparent">
                    {item.value}
                  </h3>
                  <p className="text-white text-sm sm:text-base font-bold mt-1">
                    {item.label}
                  </p>
                </div>
                <p className="text-secondary text-xs mt-3 pt-3 border-t border-white/10">
                  {item.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* SERVICES */}
      <div className="mt-14 flex flex-wrap gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
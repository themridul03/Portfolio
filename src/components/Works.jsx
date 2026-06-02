import { motion } from "framer-motion";
import React, { useState } from "react";
import { Tilt } from "react-tilt";

import { github } from "../assets";
import { projects, words } from "../constants";
import { SectionWrapper } from "../hoc";
import useCardIntent from "../reactbits/hooks/useCardIntent";
import useParallax from "../reactbits/hooks/useParallax";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import useMediaQuery from "../utils/useMediaQuery";
import ProjectModal from "./ProjectModal";

const ProjectCard = ({ index, name, image, source_code_link, onOpenModal }) => {
  const { hoverDepth, previewReady, handlers } = useCardIntent({
    id: `project-${index}`,
    hoverDelay: 180,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { style: parallaxStyle } = useParallax({ enabled: !isMobile });

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.18, 0.75)}
      className="w-full lg:w-[calc(50%-20px)]"
    >
      <Tilt
        options={{
          max: 12,
          scale: 1,
          speed: 450,
          glare: true,
          "max-glare": 0.18,
        }}
      >
        <motion.div
          {...handlers}
          animate={{
            y: previewReady ? -8 - hoverDepth * 6 : 0,
            scale: 1 + hoverDepth * 0.01,
          }}
          transition={{
            duration: 0.28,
            type: "spring",
            stiffness: 230,
            damping: 24,
          }}
          className="cursor-can-hover relative h-[340px] rounded-[28px] overflow-hidden cursor-pointer group bg-[#080b14] border border-white/[0.08] hover:border-[#c19d23]/60 transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_60px_rgba(193,157,35,0.16)]"
          data-cursor="VIEW"
          onClick={() => onOpenModal(previewReady)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#c19d23]/20 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-700 z-10" />

          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c19d23] to-transparent opacity-60 z-20" />

          <div className="absolute top-5 left-5 z-30">
            <div className="w-12 h-12 rounded-2xl bg-black/35 backdrop-blur-xl border border-white/15 flex items-center justify-center group-hover:border-[#c19d23]/70 group-hover:bg-[#c19d23]/10 transition">
              <span className="text-white font-black text-sm tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="absolute top-5 right-5 z-30">
            <motion.button
              whileHover={{ scale: 1.12, rotate: 8 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 22 }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className="cursor-can-hover w-12 h-12 rounded-2xl bg-black/35 backdrop-blur-xl border border-white/15 hover:border-[#c19d23]/70 hover:bg-[#c19d23]/10 flex items-center justify-center transition"
              data-cursor="CODE"
              aria-label="View source code"
            >
              <img
                src={github}
                alt="github"
                className="w-5 h-5 opacity-80 group-hover:opacity-100 transition"
              />
            </motion.button>
          </div>

          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.08]"
              style={{
                filter: "brightness(0.78) saturate(1.15) contrast(1.08)",
                ...parallaxStyle,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/35 to-transparent" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition duration-700" />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-30 p-6">
            <motion.div className="mb-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c19d23]/15 border border-[#c19d23]/30 text-[#f7df8a] text-xs font-bold tracking-wider">
                Explore Project
                <span className="w-1.5 h-1.5 rounded-full bg-[#c19d23] animate-pulse" />
              </span>
            </motion.div>

            <h3 className="text-white font-black text-[24px] leading-tight tracking-tight group-hover:text-[#f7df8a] transition line-clamp-2">
              {name}
            </h3>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-[2px] w-0 group-hover:w-20 bg-gradient-to-r from-[#c19d23] to-[#f7df8a] rounded-full transition-all duration-700" />
              <p className="text-secondary text-sm opacity-0 group-hover:opacity-100 transition duration-700">
                Click to view details
              </p>
            </div>
          </div>

          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#c19d23]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(-1);
  const [modalPreviewReady, setModalPreviewReady] = useState(false);

  const handleOpenModal = (project, previewReady = false) => {
    const index = projects.findIndex((p) => p.name === project.name);
    setCurrentProjectIndex(index);
    setSelectedProject(project);
    setModalPreviewReady(previewReady);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentProjectIndex(-1);
      setModalPreviewReady(false);
    }, 300);
  };

  const handleNavigateProject = (newIndex) => {
    if (newIndex >= 0 && newIndex < projects.length) {
      setCurrentProjectIndex(newIndex);
      setSelectedProject(projects[newIndex]);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#c19d23]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-20 right-0 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[120px]" />

        <motion.div variants={textVariant()} className="relative z-10">
          <p className={`${styles.sectionSubText} text-[#c19d23]`}>
            My work
          </p>
          <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
        </motion.div>

        <div className="relative z-10 mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="hero-text">
            <motion.span
              variants={fadeIn("", "", 0.1, 1)}
              className="text-secondary text-[26px] sm:text-[32px] max-w-4xl leading-[44px] sm:leading-[54px]"
            >
              <h1>
                Shaping
                <span className="slide pl-3">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center text-3xl md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="md:p-2 p-1 rounded-full bg-[#c19d23]"
                        />
                        <span
                          className="font-extrabold text-white"
                          style={{
                            fontFamily: word.font,
                            textShadow:
                              "0 0 8px rgba(193,157,35,.65), 0 0 12px rgba(255,255,255,.35)",
                          }}
                        >
                          {word.text}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>
                into{" "}
                <span className="text-[#f7df8a] font-black">
                  Real Products
                </span>{" "}
                that Deliver Results
              </h1>
            </motion.span>
          </div>

          <motion.div
            variants={fadeIn("left", "spring", 0.2, 0.8)}
            className="grid grid-cols-3 gap-3 max-w-md"
          >
            {[
              ["03+", "Major Builds"],
              ["20+", "Features"],
              ["AI", "Automation"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="cursor-can-hover rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4"
                data-cursor="INFO"
              >
                <h3 className="text-white text-[24px] font-black">
                  {value}
                </h3>
                <p className="text-secondary text-xs mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          variants={fadeIn("", "", 0.25, 1)}
          className="relative z-10 mt-8 text-secondary text-[16px] max-w-3xl leading-8"
        >
          These projects represent my experience in full-stack development,
          enterprise platforms, mobile applications, real-time systems and
          AI-powered automation workflows.
        </motion.p>

        <div className="relative z-10 mt-16 flex flex-wrap gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              {...project}
              onOpenModal={(previewReady) =>
                handleOpenModal(project, previewReady)
              }
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projects={projects}
        currentIndex={currentProjectIndex}
        onNavigate={handleNavigateProject}
        previewReady={modalPreviewReady}
      />
    </>
  );
};

export default SectionWrapper(Works, "projects");
import { motion } from "framer-motion";
import React, { useState, useMemo } from "react";
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

/* =========================
   OPTIMIZED CARD (NO LOGIC CHANGE)
========================= */
const ProjectCard = ({ index, name, image, source_code_link, onOpenModal }) => {
  const { hoverDepth, previewReady, handlers } = useCardIntent({
    id: `project-${index}`,
    hoverDelay: 160, // ⚡ slightly faster response
  });

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { style: parallaxStyle } = useParallax({ enabled: !isMobile });

  /* ⚡ memoized animation values (performance boost) */
  const motionState = useMemo(
    () => ({
      y: previewReady ? -10 - hoverDepth * 5 : 0,
      scale: 1 + hoverDepth * 0.008,
    }),
    [previewReady, hoverDepth]
  );

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.14, 0.7)} // smoother stagger
      className="w-full lg:w-[calc(50%-20px)]"
    >
      <Tilt
        options={{
          max: 10,
          scale: 1,
          speed: 500,
          glare: true,
          "max-glare": 0.12, // reduced glare for Apple feel
        }}
      >
        <motion.div
          {...handlers}
          animate={motionState}
          transition={{
            duration: 0.22,
            type: "spring",
            stiffness: 240,
            damping: 22,
          }}
          className="cursor-can-hover relative h-[340px] rounded-[30px] overflow-hidden cursor-pointer group bg-[#080b14] border border-white/[0.06] hover:border-[#c19d23]/40 transition-all duration-500
          shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_80px_rgba(193,157,35,0.10)]"
          data-cursor="VIEW"
          onClick={() => onOpenModal(previewReady)}
        >
          {/* soft premium glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c19d23]/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-700 z-10" />

          {/* thin highlight line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c19d23] to-transparent opacity-40 z-20" />

          {/* index badge */}
          <div className="absolute top-5 left-5 z-30">
            <div className="w-11 h-11 rounded-2xl bg-black/25 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:border-[#c19d23]/50 transition">
              <span className="text-white font-bold text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* github button (optimized animation) */}
          <div className="absolute top-5 right-5 z-30">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className="cursor-can-hover w-11 h-11 rounded-2xl bg-black/25 backdrop-blur-xl border border-white/10 hover:border-[#c19d23]/50 flex items-center justify-center transition"
              data-cursor="CODE"
            >
              <img src={github} alt="github" className="w-5 h-5 opacity-80" />
            </motion.button>
          </div>

          {/* IMAGE */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700"
              style={{
                filter: "brightness(0.82) saturate(1.1) contrast(1.05)",
                ...parallaxStyle,
              }}
            />

            {/* softer overlays (Apple style) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/30 to-transparent" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-700" />
          </div>

          {/* BOTTOM TEXT */}
          <div className="absolute inset-x-0 bottom-0 z-30 p-6">
            <motion.div className="mb-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c19d23]/10 border border-[#c19d23]/20 text-[#f7df8a] text-xs font-semibold tracking-wide">
                Explore Project
                <span className="w-1.5 h-1.5 rounded-full bg-[#c19d23] animate-pulse" />
              </span>
            </motion.div>

            <h3 className="text-white font-black text-[23px] leading-tight group-hover:text-[#f7df8a] transition">
              {name}
            </h3>

            <div className="mt-3 flex items-center gap-3">
              <div className="h-[2px] w-0 group-hover:w-16 bg-gradient-to-r from-[#c19d23] to-[#f7df8a] transition-all duration-700 rounded-full" />
              <p className="text-secondary text-sm opacity-0 group-hover:opacity-100 transition">
                Click to view details
              </p>
            </div>
          </div>

          {/* softer glow */}
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#c19d23]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

/* =========================
   WORKS (UNCHANGED LOGIC)
========================= */
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
        {/* softer background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-[#c19d23]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-0 w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[110px]" />

        <motion.div variants={textVariant()} className="relative z-10">
          <p className={`${styles.sectionSubText} text-[#c19d23]`}>My work</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.25, 1)}
          className="relative z-10 mt-8 text-secondary text-[16px] max-w-3xl leading-8"
        >
          These projects represent full-stack, enterprise and AI systems.
        </motion.p>

        <div className="relative z-10 mt-14 flex flex-wrap gap-10">
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
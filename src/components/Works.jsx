import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo } from "react";
import { Tilt } from "react-tilt";
import {
  RiExternalLinkLine,
  RiGithubFill,
  RiGooglePlayFill,
  RiStarFill,
  RiFilter3Line,
  RiRocketFill,
  RiSparkling2Fill,
} from "react-icons/ri";

import { github } from "../assets";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import useCardIntent from "../reactbits/hooks/useCardIntent";
import useParallax from "../reactbits/hooks/useParallax";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import useMediaQuery from "../utils/useMediaQuery";
import ProjectModal from "./ProjectModal";

const CATEGORIES = [
  { id: "all", label: "All Projects", count: projects.length },
  {
    id: "major",
    label: "Major & Flagship",
    count: projects.filter((p) => p.isMajor || p.category === "major").length,
  },
  {
    id: "enterprise",
    label: "Enterprise & .NET",
    count: projects.filter((p) => p.category === "enterprise").length,
  },
  {
    id: "ai",
    label: "AI & Healthcare",
    count: projects.filter((p) => p.category === "ai" || p.category === "healthcare").length,
  },
  {
    id: "web",
    label: "Web & Real-Time",
    count: projects.filter((p) => p.category === "web" || p.category === "fullstack").length,
  },
];

/* =========================
   PROJECT CARD
========================= */
const ProjectCard = ({
  project,
  index,
  onOpenModal,
}) => {
  const {
    name,
    image,
    source_code_link,
    live_demo_link,
    play_store_link,
    tags,
    tagline,
    subCategory,
    isMajor,
    metrics,
  } = project;

  const { hoverDepth, previewReady, handlers } = useCardIntent({
    id: `project-${index}`,
    hoverDelay: 140,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { style: parallaxStyle } = useParallax({ enabled: !isMobile });

  const motionState = useMemo(
    () => ({
      y: previewReady ? -8 - hoverDepth * 4 : 0,
      scale: 1 + hoverDepth * 0.007,
    }),
    [previewReady, hoverDepth]
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full md:w-[calc(50%-16px)] xl:w-[calc(50%-20px)]"
    >
      <Tilt
        options={{
          max: 8,
          scale: 1,
          speed: 400,
          glare: true,
          "max-glare": 0.1,
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
          className={`cursor-can-hover relative h-[420px] rounded-[30px] overflow-hidden cursor-pointer group bg-[#080b14] border transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.35)] ${
            isMajor
              ? "border-[#f59e0b]/50 shadow-[0_15px_60px_rgba(245,158,11,0.15)]"
              : "border-white/[0.08] hover:border-[#c19d23]/50"
          }`}
          data-cursor="VIEW"
          onClick={() => onOpenModal(previewReady)}
        >
          {/* Ambient Glow */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 z-10 ${
              isMajor
                ? "bg-gradient-to-br from-[#f59e0b]/15 via-transparent to-cyan-500/10"
                : "bg-gradient-to-br from-[#c19d23]/10 via-transparent to-cyan-500/10"
            }`}
          />

          {/* Top highlight bar */}
          <div
            className={`absolute top-0 left-0 right-0 h-[2px] z-20 ${
              isMajor
                ? "bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent opacity-80"
                : "bg-gradient-to-r from-transparent via-[#c19d23] to-transparent opacity-40"
            }`}
          />

          {/* Top Row: Index Badge & Major Tag */}
          <div className="absolute top-5 left-5 z-30 flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/15 flex items-center justify-center group-hover:border-[#c19d23]/70 transition">
              <span className="text-white font-black text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {isMajor && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/60 text-[#fbbf24] text-[11px] font-extrabold uppercase tracking-wide backdrop-blur-md">
                <RiStarFill size={12} />
                Major Project
              </span>
            )}
          </div>

          {/* Top Right Quick Actions */}
          <div className="absolute top-5 right-5 z-30 flex items-center gap-2">
            {play_store_link && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(play_store_link, "_blank");
                }}
                className="w-10 h-10 rounded-2xl bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 flex items-center justify-center transition"
                title="Google Play Store"
              >
                <RiGooglePlayFill size={17} />
              </motion.button>
            )}

            {live_demo_link && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(live_demo_link, "_blank");
                }}
                className="w-10 h-10 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/15 hover:border-[#c19d23]/70 text-[#f7df8a] flex items-center justify-center transition"
                title="Live Website"
              >
                <RiExternalLinkLine size={16} />
              </motion.button>
            )}

            {source_code_link && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(source_code_link, "_blank");
                }}
                className="w-10 h-10 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/15 hover:border-[#c19d23]/70 flex items-center justify-center transition"
                title="GitHub Source"
              >
                <img src={github} alt="github" className="w-5 h-5 opacity-80" />
              </motion.button>
            )}
          </div>

          {/* PROJECT PREVIEW IMAGE */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
              style={{
                filter: "brightness(0.78) saturate(1.1) contrast(1.05)",
                ...parallaxStyle,
              }}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/60 to-black/25" />
          </div>

          {/* BOTTOM TEXT & DETAILS */}
          <div className="absolute inset-x-0 bottom-0 z-30 p-6 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-secondary text-xs uppercase tracking-[2px] font-bold">
                {subCategory || "Full-Stack Project"}
              </span>
            </div>

            <h3 className="text-white font-black text-[22px] sm:text-[24px] leading-tight group-hover:text-[#f7df8a] transition">
              {name}
            </h3>

            <p className="mt-2 text-white/70 text-[13px] line-clamp-2 leading-relaxed">
              {tagline || project.description}
            </p>

            {/* Tags preview */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {tags?.slice(0, 4).map((tag) => (
                <span
                  key={tag.name}
                  className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-white/80 text-[11px] font-medium"
                >
                  #{tag.name}
                </span>
              ))}
              {tags?.length > 4 && (
                <span className="px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-white/50 text-[11px]">
                  +{tags.length - 4} more
                </span>
              )}
            </div>

            {/* Click explore hint */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[#f7df8a] text-xs font-bold inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>View Full Case Study &amp; Features</span>
                <span>→</span>
              </span>
              {metrics?.views && (
                <span className="text-white/40 text-[11px] font-mono">
                  {metrics.views} views
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

/* =========================
   WORKS SECTION
========================= */
const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(-1);
  const [modalPreviewReady, setModalPreviewReady] = useState(false);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects;
    if (selectedCategory === "major") {
      return projects.filter((p) => p.isMajor || p.category === "major");
    }
    if (selectedCategory === "enterprise") {
      return projects.filter((p) => p.category === "enterprise");
    }
    if (selectedCategory === "ai") {
      return projects.filter((p) => p.category === "ai" || p.category === "healthcare");
    }
    if (selectedCategory === "web") {
      return projects.filter((p) => p.category === "web" || p.category === "fullstack");
    }
    return projects;
  }, [selectedCategory]);

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
      <div id="projects" className="relative overflow-hidden pt-8">
        {/* Glow circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[580px] h-[580px] bg-[#c19d23]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Header */}
        <motion.div variants={textVariant()} className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c19d23] text-xs sm:text-sm font-semibold mb-4">
            <RiSparkling2Fill />
            Production &amp; GitHub Portfolio
          </div>

          <h2 className={styles.sectionHeadText}>
            Featured Projects.
          </h2>

          <p className="mt-4 text-secondary text-[16px] sm:text-[18px] leading-relaxed">
            A comprehensive showcase of all enterprise platforms, mobile applications, and open-source GitHub repositories engineered by Mridul Mohan Mishra.
          </p>
        </motion.div>

        {/* CATEGORY FILTER TABS */}
        <div className="relative z-10 mt-10 flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#c19d23] text-black shadow-[0_0_25px_rgba(193,157,35,0.35)] scale-105"
                    : "bg-white/[0.04] text-white/70 border border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isSelected ? "bg-black/25 text-black" : "bg-white/10 text-white/70"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* PROJECTS GRID */}
        <motion.div
          layout
          className="relative z-10 mt-12 flex flex-wrap gap-8 justify-center"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                onOpenModal={(previewReady) =>
                  handleOpenModal(project, previewReady)
                }
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* FULL PROJECT DETAIL MODAL */}
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
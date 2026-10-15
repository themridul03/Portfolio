import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo } from "react";
import {
  RiArrowRightUpLine,
  RiGithubFill,
  RiGooglePlayFill,
  RiArrowRightLine,
} from "react-icons/ri";

import { projects } from "../constants";
import ProjectModal from "./ProjectModal";
import SyntaxCVSectionLayout from "./SyntaxCVSectionLayout";

const CATEGORIES = [
  { id: "all", label: "All Projects", count: projects.length },
  {
    id: "major",
    label: "Flagship & Core",
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

const LuxuryFlipImage = ({ project, onOpenModal }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-36 sm:h-40 w-full mb-3.5 cursor-pointer select-none group"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* ── FRONT FACE (Luxury Visual Presentation) ── */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border border-white/15 group-hover:border-[#00ffae]/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 bg-[#090909]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Main Visual */}
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-110 brightness-95"
            loading="lazy"
          />

          {/* Luxury Sheen & Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 pointer-events-none">
            <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[9px] font-mono text-neutral-300 border border-white/15 uppercase tracking-wider">
              {project.subCategory || project.category || "Full-Stack"}
            </span>

            {project.isMajor && (
              <span className="px-2 py-0.5 rounded-full bg-[#00ffae] text-black text-[9px] font-mono font-bold shadow-[0_0_12px_rgba(0,255,174,0.6)] uppercase tracking-wider">
                ✦ Flagship
              </span>
            )}
          </div>

          {/* Bottom Flip Indicator */}
          <div className="absolute bottom-2 inset-x-2.5 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono text-[#00ffae] border border-[#00ffae]/30">
              <span className="text-[10px]">↻</span>
              <span>Flip Blueprint</span>
            </span>

            {project.metrics?.stars && (
              <span className="text-[9px] font-mono text-neutral-400 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded">
                ★ {project.metrics.stars}
              </span>
            )}
          </div>
        </div>

        {/* ── BACK FACE (Luxury Obsidian Architecture & Blueprint Deck) ── */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl p-3 sm:p-3.5 flex flex-col justify-between border border-[#00ffae]/50 shadow-[0_0_30px_rgba(0,255,174,0.15)] text-left"
          style={{
            backgroundColor: "#0a0a0a",
            backgroundImage: "radial-gradient(rgba(0, 255, 174, 0.12) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#00ffae] flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffae] animate-pulse" />
              Technical Blueprint
            </span>
            <span className="text-[9px] font-mono text-neutral-400">
              {project.metrics?.users || "Verified"}
            </span>
          </div>

          {/* Core Feature Bullet */}
          <div className="my-auto py-0.5">
            <p className="text-[11px] text-neutral-200 line-clamp-2 leading-snug font-sans">
              {project.features?.[0] || project.tagline || project.description}
            </p>

            {/* Core Stack Pills */}
            <div className="mt-1.5 flex flex-wrap gap-1">
              {project.tags?.slice(0, 3).map((t) => (
                <span
                  key={t.name}
                  className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[9px] font-mono text-[#00ffae]"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Flip CTA */}
          <div className="pt-1.5 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(project);
              }}
              className="text-[10px] font-mono text-[#00ffae] hover:underline font-bold flex items-center gap-1"
            >
              <span>Full Case Study</span>
              <RiArrowRightUpLine size={12} />
            </button>

            <span className="text-[9px] font-mono text-neutral-500">
              ↺ Flip
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(-1);
  const [modalPreviewReady, setModalPreviewReady] = useState(false);

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

  const handleOpenModal = (project) => {
    const index = projects.findIndex((p) => p.name === project.name);
    setCurrentProjectIndex(index);
    setSelectedProject(project);
    setModalPreviewReady(true);
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
      <SyntaxCVSectionLayout
        id="projects"
        number="05."
        title="featured projects"
      >
        <div className="space-y-8">
          {/* Category Tabs in Syntax CV style */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#00ffae] text-black font-bold shadow-[0_0_15px_rgba(0,255,174,0.3)]"
                      : "border border-white/10 text-[#949494] hover:text-white hover:border-white/30 bg-white/[0.02]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected
                        ? "bg-black/20 text-black font-bold"
                        : "bg-white/10 text-neutral-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Project List / Grid with 3D Luxury Flip Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  className="group rounded-2xl border border-white/[0.12] border-b-2 border-b-white/[0.2] bg-white/[0.02] hover:border-[#00ffae] hover:border-b-[#00ffae] p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.4)]"
                >
                  <div>
                    {/* 3D LUXURY FLIP IMAGE CARD */}
                    <LuxuryFlipImage
                      project={project}
                      onOpenModal={handleOpenModal}
                    />

                    {/* Metadata Subline */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#949494]">
                      <span>{project.subCategory || project.category || "Full-Stack"}</span>
                      {project.metrics?.stars ? (
                        <span>★ {project.metrics.stars} stars</span>
                      ) : null}
                    </div>

                    {/* Project Title */}
                    <h4
                      onClick={() => handleOpenModal(project)}
                      className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-[#00ffae] transition-colors cursor-pointer"
                    >
                      {project.name}
                    </h4>

                    {/* Description */}
                    <p className="mt-1.5 text-xs text-[#949494] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    {project.tags && (
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.name}
                            className="px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] text-[10px] font-mono text-neutral-400"
                          >
                            #{tag.name}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] font-mono text-neutral-500 self-center">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Links with Rotating 45deg Arrow */}
                  <div className="mt-3.5 pt-2.5 border-t border-white/[0.08] flex items-center justify-between">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#00ffae] hover:underline"
                    >
                      <span>Case Details</span>
                      <RiArrowRightLine size={12} />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.play_store_link && (
                        <a
                          href={project.play_store_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn text-[#949494] hover:text-[#00ffae] transition flex items-center gap-1 text-xs font-mono"
                          title="Google Play"
                        >
                          <RiGooglePlayFill size={15} />
                          <RiArrowRightUpLine
                            size={12}
                            className="group-hover/btn:rotate-45 transition-transform duration-200"
                          />
                        </a>
                      )}

                      {project.source_code_link && (
                        <a
                          href={project.source_code_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn text-[#949494] hover:text-[#00ffae] transition flex items-center gap-1 text-xs font-mono"
                          title="Source Code"
                        >
                          <RiGithubFill size={15} />
                          <RiArrowRightUpLine
                            size={12}
                            className="group-hover/btn:rotate-45 transition-transform duration-200"
                          />
                        </a>
                      )}

                      {project.live_demo_link && (
                        <a
                          href={project.live_demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn text-white hover:text-[#00ffae] transition flex items-center gap-1 text-xs font-mono font-bold"
                          title="Live Application"
                        >
                          <span>Live</span>
                          <RiArrowRightUpLine
                            size={13}
                            className="group-hover/btn:rotate-45 transition-transform duration-200"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </SyntaxCVSectionLayout>

      {/* Deep Inspection Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        onNavigate={handleNavigateProject}
        currentIndex={currentProjectIndex}
        totalProjects={projects.length}
        ready={modalPreviewReady}
      />
    </>
  );
};

export default Works;
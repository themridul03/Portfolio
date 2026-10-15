import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS, SKILL_CATEGORIES } from "../constants/skills";
import SyntaxCVSectionLayout from "./SyntaxCVSectionLayout";

const CATEGORIES = [
  { id: "all", label: "All Skills" },
  { id: "backend", label: "Backend & .NET" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "mobile", label: "Mobile" },
  { id: "database", label: "Databases & ORM" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "automation", label: "AI & Automation" },
  { id: "tools", label: "Tools" },
];

const TICKER_ITEMS = [
  "ASP.NET CORE",
  "C#",
  "MICROSERVICES",
  "REACT.JS",
  "TYPESCRIPT",
  "AZURE CLOUD",
  "DOCKER",
  "SQL SERVER",
  "POSTGRESQL",
  "REDIS CACHING",
  "FASTAPI",
  "PYTHON",
  "REST APIS",
  "REACT NATIVE",
  "ENTITY FRAMEWORK",
  "TAILWIND CSS",
  "DISTRIBUTED SYSTEMS",
];

const InfiniteTicker = () => {
  return (
    <div className="relative w-full overflow-hidden py-3 border-y border-white/[0.08] bg-white/[0.01] select-none my-2">
      <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 34,
        }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <div key={`ticker-${i}`} className="flex items-center gap-8">
            <span className="font-mono text-sm sm:text-base md:text-lg font-bold tracking-widest text-neutral-200 hover:text-[#00ffae] transition-colors cursor-default">
              {item}
            </span>
            <span className="text-[#00ffae] text-sm">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const SkillKeyboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Map category to skill for quick lookup
  const skillCategoryMap = useMemo(() => {
    const map = {};
    Object.entries(SKILL_CATEGORIES).forEach(([catKey, catVal]) => {
      catVal.skills.forEach((skillKey) => {
        map[skillKey] = catVal.title;
      });
    });
    return map;
  }, []);

  // Filter skills based on Category Tab and Search Query
  const displayedSkills = useMemo(() => {
    let list = Object.values(SKILLS);

    if (activeTab !== "all") {
      const cat = SKILL_CATEGORIES[activeTab];
      if (cat) {
        const keySet = new Set(cat.skills);
        list = list.filter((s) => keySet.has(s.name));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          (s.label && s.label.toLowerCase().includes(q)) ||
          (s.name && s.name.toLowerCase().includes(q)) ||
          (s.shortDescription && s.shortDescription.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeTab, searchQuery]);

  const activeDisplaySkill = hoveredSkill || selectedSkill;

  return (
    <SyntaxCVSectionLayout id="skills" number="03." title="skills">
      <div className="space-y-6">
        {/* ── KINETIC RUNNING MARQUEE TICKER ── */}
        <InfiniteTicker />

        {/* ── SEARCH & CATEGORY FILTER TABS (TEXT-FIRST, ZERO ICONS) ── */}
        <div className="space-y-3 pt-1">
          {/* Minimal Quick Search Input */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00ffae] font-mono text-sm pointer-events-none select-none">
              &gt;
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g. C#, ASP.NET, React, Azure, Docker, SQL Server)..."
              className="w-full bg-[#111111] border border-white/[0.12] rounded-xl pl-8 pr-10 py-2.5 text-xs sm:text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#00ffae] focus:ring-1 focus:ring-[#00ffae] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-mono"
                aria-label="Clear filter"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs with Animated Indicator (Pure text, no icons) */}
          <div className="flex flex-wrap gap-2 pt-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              const count =
                cat.id === "all"
                  ? Object.keys(SKILLS).length
                  : SKILL_CATEGORIES[cat.id]?.skills.length || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative px-4 py-2 sm:px-4.5 sm:py-2 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 select-none font-semibold ${
                    isActive
                      ? "bg-[#00ffae] text-black font-bold shadow-[0_0_15px_rgba(0,255,174,0.3)]"
                      : "border border-white/10 text-[#949494] hover:text-white hover:border-white/30 bg-white/[0.02]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] sm:text-xs ${
                      isActive
                        ? "bg-black/20 text-black font-bold"
                        : "bg-white/10 text-neutral-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── SKILLS PILLS GRID (LARGE TACTILE TYPOGRAPHY WITH HOVER TOOLTIP & SPRING ANIMATIONS) ── */}
        <motion.div layout className="flex flex-wrap gap-3 sm:gap-3.5 relative">
          <AnimatePresence>
            {displayedSkills.map((skill, index) => {
              const isHovered = hoveredSkill?.name === skill.name;
              const isSelected = selectedSkill?.name === skill.name;
              const catName = skillCategoryMap[skill.name] || "Software Engineering";

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.22,
                    delay: Math.min(index * 0.015, 0.2),
                  }}
                  className="relative"
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <motion.button
                    whileHover={{ y: -3, scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSkill(isSelected ? null : skill)}
                    className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border font-mono text-sm sm:text-base font-semibold transition-all duration-200 select-none flex items-center gap-2.5 ${
                      isHovered || isSelected
                        ? "border-[#00ffae] border-b-2 border-b-[#00ffae] text-[#00ffae] bg-[#00ffae]/10 shadow-[0_0_22px_rgba(0,255,174,0.35)] scale-[1.02]"
                        : "border-white/[0.14] border-b-2 border-b-white/[0.24] text-neutral-200 bg-white/[0.02] hover:border-[#00ffae] hover:border-b-[#00ffae] hover:text-[#00ffae]"
                    }`}
                  >
                    {isHovered && (
                      <span className="w-2 h-2 rounded-full bg-[#00ffae] animate-pulse" />
                    )}
                    <span>{skill.label || skill.name}</span>
                  </motion.button>

                  {/* Individual On-Hover Floating Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: -4, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.16 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-60 sm:w-64 p-3 rounded-xl bg-[#0c0c0c] border border-[#00ffae]/50 shadow-[0_12px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl pointer-events-none z-40 text-left"
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                          <span className="font-bold text-xs font-mono text-white">
                            {skill.label || skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#00ffae] uppercase tracking-wider bg-[#00ffae]/10 px-1.5 py-0.5 rounded">
                            {catName}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                          {skill.shortDescription ||
                            "Core production competence applied in scalable enterprise architectures and high-throughput systems."}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {displayedSkills.length === 0 && (
            <div className="w-full py-8 text-center text-xs font-mono text-neutral-500">
              No skills found matching &ldquo;{searchQuery}&rdquo;. Try another filter.
            </div>
          )}
        </motion.div>

        {/* ── PERSISTENT SYNTAX CV LIVE ARCHITECTURE INSPECTOR (HUD) ── */}
        <div className="mt-6 p-4 sm:p-5 rounded-xl border border-white/[0.12] border-b-2 border-b-[#00ffae]/50 bg-[#0d0d0d] shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3 text-xs font-mono text-[#949494]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ffae] animate-pulse" />
              <span className="uppercase tracking-widest text-[#00ffae] font-bold">
                Architecture Inspector
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">
              {activeDisplaySkill ? "STATUS: ACTIVE" : "STATUS: HOVER SKILL TO INSPECT"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {activeDisplaySkill ? (
              <motion.div
                key={activeDisplaySkill.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-white">
                      {activeDisplaySkill.label || activeDisplaySkill.name}
                    </h4>
                    <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#00ffae]/15 text-[#00ffae] border border-[#00ffae]/30 uppercase font-bold">
                      {skillCategoryMap[activeDisplaySkill.name] || "Production Core"}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      Enterprise Production Tier
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#e5e5e5] mt-2 max-w-3xl leading-relaxed font-sans">
                    {activeDisplaySkill.shortDescription ||
                      "Production competence deployed in live systems, high-throughput backend services, and interactive UIs."}
                  </p>
                </div>

                {selectedSkill && (
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-xs font-mono text-[#949494] hover:text-[#00ffae] transition self-start sm:self-center shrink-0 border border-white/10 px-2.5 py-1 rounded"
                  >
                    Clear Pin
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="idle-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-neutral-400 py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#00ffae]">&gt;</span>
                  <span>Hover over any skill above to inspect production role & architecture.</span>
                </div>
                <span className="text-[11px] text-neutral-500">
                  60+ Core Technologies • Enterprise &amp; Cloud Native
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SyntaxCVSectionLayout>
  );
};

export default SkillKeyboard;
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { SKILLS, SKILL_CATEGORIES } from "../constants/skills";

const SkillKeyboard = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const categorySkills = useMemo(() => {
    return SKILL_CATEGORIES[activeCategory].skills
      .map((key) => SKILLS[key])
      .filter(Boolean);
  }, [activeCategory]);

  const [activeSkill, setActiveSkill] = useState(categorySkills[0]);

  const changeCategory = (key) => {
    setActiveCategory(key);

    const firstSkill = SKILL_CATEGORIES[key].skills
      .map((skillKey) => SKILLS[skillKey])
      .filter(Boolean)[0];

    setActiveSkill(firstSkill);
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full overflow-hidden px-4 py-20"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#c19d23]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-purple-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 text-center mb-12">
        <p className="text-[#c19d23] uppercase tracking-[5px] text-sm font-bold">
          Technologies I Work With
        </p>

        <h2 className="mt-4 text-white font-black text-[42px] sm:text-[58px] lg:text-[72px]">
          Skills Keyboard
        </h2>

        <p className="mt-4 text-secondary max-w-3xl mx-auto leading-7">
          Select a category and explore my skills through an interactive
          portfolio-style keyboard.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-[32px] border border-white/10 bg-[#080b14]/90 backdrop-blur-xl p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
        >
          <h3 className="text-white text-2xl font-black mb-2">
            Skill Categories
          </h3>

          <p className="text-secondary text-sm leading-6 mb-6">
            Click any category to change the keyboard.
          </p>

          <div className="flex flex-col gap-3">
            {Object.entries(SKILL_CATEGORIES).map(([key, category]) => {
              const Icon = category.icon;
              const isActive = activeCategory === key;

              return (
                <button
                  key={key}
                  onClick={() => changeCategory(key)}
                  data-cursor="OPEN"
                  className={`cursor-can-hover group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#c19d23]/80 bg-[#c19d23]/15 shadow-[0_0_35px_rgba(193,157,35,0.18)]"
                      : "border-white/10 bg-white/[0.035] hover:border-[#c19d23]/50 hover:bg-[#c19d23]/10"
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition ${
                        isActive
                          ? "border-[#c19d23]/70 bg-[#c19d23]/20 text-[#f7df8a]"
                          : "border-white/10 bg-black/25 text-white"
                      }`}
                    >
                      <Icon size={23} />
                    </div>

                    <div>
                      <p className="text-white font-black">{category.title}</p>
                      <p className="text-secondary text-xs mt-1">
                        {category.skills.length} Skills
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 35, rotateX: 12 }}
          animate={{ opacity: 1, x: 0, rotateX: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative rounded-[36px] border border-white/10 bg-[#080b14]/90 backdrop-blur-xl p-5 sm:p-8 shadow-[0_35px_100px_rgba(0,0,0,0.45)]"
        >
          <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-[#c19d23]/10 via-transparent to-cyan-500/10 pointer-events-none" />

          <div className="relative z-10 mb-8 rounded-[28px] border border-white/10 bg-black/30 p-6 flex flex-col sm:flex-row items-center gap-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center border shadow-[0_0_35px_rgba(193,157,35,0.25)]"
              style={{
                borderColor: activeSkill?.color || "#c19d23",
                background: `${activeSkill?.color || "#c19d23"}18`,
              }}
            >
              <img
                src={activeSkill?.icon}
                alt={activeSkill?.label}
                className="w-11 h-11 object-contain"
              />
            </div>

            <div className="text-center sm:text-left">
              <p className="text-[#c19d23] text-xs font-bold tracking-[3px] uppercase">
                {SKILL_CATEGORIES[activeCategory].title}
              </p>

              <h3 className="text-white text-[28px] font-black">
                {activeSkill?.label}
              </h3>

              <p className="mt-2 text-secondary max-w-3xl leading-7">
                {activeSkill?.shortDescription}
              </p>
            </div>
          </div>

          <div className="relative z-10 rounded-[30px] border border-white/10 bg-black/35 p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-white font-black text-xl">
                  {SKILL_CATEGORIES[activeCategory].title} Keyboard
                </p>
                <p className="text-secondary text-sm mt-1">
                  Hover or click any key
                </p>
              </div>

              <div className="hidden sm:block px-4 py-2 rounded-full border border-[#c19d23]/30 bg-[#c19d23]/10 text-[#f7df8a] text-xs font-bold">
                {categorySkills.length} KEYS
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {categorySkills.map((skill, index) => (
                <motion.button
                  key={skill.name}
                  initial={{ opacity: 0, y: 25, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.035,
                    duration: 0.45,
                    type: "spring",
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.08,
                    rotateX: 10,
                  }}
                  whileTap={{ scale: 0.92 }}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onClick={() => setActiveSkill(skill)}
                  data-cursor="SKILL"
                  className="cursor-can-hover group relative min-h-[112px] rounded-2xl border border-white/10 bg-[#101522] p-3 flex flex-col items-center justify-center gap-3 overflow-hidden transition-all duration-300 hover:border-[#c19d23]/70 hover:shadow-[0_18px_45px_rgba(193,157,35,0.2)]"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                    style={{
                      background: `radial-gradient(circle at top, ${skill.color}33, transparent 68%)`,
                    }}
                  />

                  <div
                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 bg-white/[0.04] group-hover:scale-110 transition duration-300"
                    style={{
                      boxShadow: `0 0 25px ${skill.color}35`,
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.label}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  <span className="relative text-white text-[11px] sm:text-[13px] font-bold leading-tight text-center">
                    {skill.label}
                  </span>

                  <span className="absolute top-2 right-2 text-[10px] text-white/25 font-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <span id="projects"></span>
    </section>
  );
};

export default SkillKeyboard;
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { personalInfo } from "../constants";

const ScrollResponsivePortrait = () => {
  const [activeAvatar, setActiveAvatar] = useState("noir"); // "noir" | "photo" | "3d"

  useEffect(() => {
    const handleAvatarChange = (e) => {
      if (e.detail) {
        setActiveAvatar(e.detail);
      }
    };
    window.addEventListener("avatarChange", handleAvatarChange);
    return () => window.removeEventListener("avatarChange", handleAvatarChange);
  }, []);

  const getImageSrc = () => {
    if (activeAvatar === "3d" && personalInfo.photo3d) return personalInfo.photo3d;
    if (activeAvatar === "photo" && personalInfo.photo) return personalInfo.photo;
    return personalInfo.photoNoir || personalInfo.photo;
  };

  const { scrollY } = useScroll();

  // Scroll animations:
  // In Hero (0 -> 400px): Centered in hero section
  // Scrolling into About/Experience (400 -> 900px): Slides to the right (x: 0 -> 24vw), scales from 1 -> 0.78
  // Deep scroll past awards to contact (3500 -> 4200px): Fades out smoothly
  const x = useTransform(scrollY, [0, 500, 1000], ["0vw", "16vw", "24vw"]);
  const y = useTransform(scrollY, [0, 500], ["0vh", "3vh"]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.78]);
  const opacity = useTransform(
    scrollY,
    [0, 300, 3200, 4000],
    [1, 0.55, 0.55, 0]
  );

  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x,
          y,
          scale,
          opacity,
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="relative w-full max-w-[820px] h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeAvatar}
              src={getImageSrc()}
              alt={personalInfo.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="max-h-[680px] w-auto object-contain object-bottom filter contrast-125"
              style={{
                maskImage:
                  "radial-gradient(ellipse at 50% 48%, black 45%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 50% 48%, black 45%, transparent 80%)",
              }}
            />
          </AnimatePresence>

          {/* Seamless gradient fade at bottom to pure black canvas */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollResponsivePortrait;

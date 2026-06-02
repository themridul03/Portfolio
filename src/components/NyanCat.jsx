import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useState } from "react";

const COLORS = [
  "#ff004c",
  "#ff7a00",
  "#ffe600",
  "#00e676",
  "#00b0ff",
  "#7c4dff",
];

const getRandomHeight = () => `${15 + Math.random() * 70}vh`;

const getRandomSize = () => {
  const sizes = ["h-24", "h-32", "h-40", "h-48"];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const NyanCat = () => {
  const [cats, setCats] = useState([]);
  const [combo, setCombo] = useState(0);

  const spawnCat = () => {
    const newCat = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
      size: getRandomSize(),
    };

    setCats((prev) => [...prev, newCat]);
    setCombo((prev) => prev + 1);
  };

  const clearCats = () => {
    setCats([]);
    setCombo(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!window.__easterEggUnlocked) return;

      if (e.key.toLowerCase() === "m") {
        spawnCat();
      }

      if (e.key === "Escape") {
        clearCats();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-[99999] pointer-events-none">
      <AnimatePresence>
        {combo > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl border border-[#c19d23]/40 bg-black/50 backdrop-blur-xl text-white font-black shadow-[0_0_35px_rgba(193,157,35,0.25)]"
          >
            🌈 Nyan Mode x{combo}
            <span className="ml-3 text-[#c19d23] text-xs">
              Press ESC to clear
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 opacity-30">
        {cats.map((cat) => (
          <RainbowTrail key={`trail-${cat.id}`} />
        ))}
      </div>

      <AnimatePresence>
        {cats.map((cat) => (
          <AnimatedCat
            key={cat.id}
            id={cat.id}
            size={cat.size}
            onCompleted={() => {
              setCats((prev) => prev.filter((item) => item.id !== cat.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const RainbowTrail = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.6, 0] }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2.5 }}
    className="absolute left-0 top-0 w-full h-full"
  >
    {[...Array(12)].map((_, index) => (
      <motion.div
        key={index}
        initial={{ x: "-20vw", y: getRandomHeight() }}
        animate={{ x: "120vw" }}
        transition={{
          duration: 5 + Math.random() * 2,
          ease: "linear",
          delay: index * 0.08,
        }}
        className="absolute h-1 rounded-full"
        style={{
          width: "22vw",
          background: COLORS[index % COLORS.length],
          boxShadow: `0 0 18px ${COLORS[index % COLORS.length]}`,
        }}
      />
    ))}
  </motion.div>
);

const AnimatedCat = ({ id, size, onCompleted }) => {
  const randY = getRandomHeight();
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: "120vw",
      y: randY,
      rotate: [0, 8, -8, 0],
      transition: {
        x: { duration: 5.5, ease: "linear" },
        y: { duration: 5.5, ease: "linear" },
        rotate: {
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    });
  }, [controls, randY]);

  return (
    <motion.div
      key={id}
      initial={{ x: "-25vw", y: randY, scale: 0.85 }}
      animate={controls}
      exit={{ opacity: 0, scale: 0.5 }}
      onAnimationComplete={onCompleted}
      className="fixed left-0 top-0"
    >
      <motion.img
        src="/assets/nyan-cat.gif"
        className={`${size} w-auto drop-shadow-[0_0_25px_rgba(193,157,35,0.8)]`}
        alt="Nyan Cat"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default NyanCat;
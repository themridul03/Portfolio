import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { opacity, slideUp } from "./anim";
import { usePreloader } from "./index";
import styles from "./style.module.css";

export default function Loader() {
  const { loadingPercent, bypassLoading } = usePreloader();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const frameRef = useRef(null);

  // ✅ optimized resize (no state spam)
  useEffect(() => {
    const updateSize = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        setDimension({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const closeLoader = () => {
    bypassLoading();

    setTimeout(() => {
      document.querySelector("#hero")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 180);
  };

  // ✅ single effect only (no duplicate listeners)
  useEffect(() => {
    const timer = setTimeout(closeLoader, 3800);

    const handleKey = () => closeLoader();

    window.addEventListener("keydown", handleKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const progress = Math.min(100, Math.max(0, loadingPercent || 0));

  const path =
    dimension.width > 0
      ? `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
          dimension.width / 2
        } ${dimension.height} 0 ${dimension.height} L0 0`
      : "";

  const curve = {
    initial: {
      d: path,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: path,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
      onClick={closeLoader}
    >
      {dimension.width > 0 && (
        <>
          <div className={styles.noise} />
          <div className={styles.gridFloor} />
          <div className={styles.goldGlow} />
          <div className={styles.blueGlow} />

          <motion.div
            variants={opacity}
            initial="initial"
            animate="enter"
            className={styles.loaderContent}
          >
            {/* ⚡ lighter animation (same look, less GPU load) */}
            <div className={styles.stage}>
              <motion.div
                className={styles.platform}
                animate={{ rotateZ: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className={styles.platformTwo}
                animate={{ rotateZ: -360 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className={styles.object3d}
                animate={{
                  rotateY: 360,
                  y: [0, -10, 0],
                }}
                transition={{
                  rotateY: { duration: 7, repeat: Infinity, ease: "linear" },
                  y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </div>

            {/* progress */}
            <div className={styles.statusBox}>
              <div className={styles.statusTop}>
                <span>Preparing Interface</span>
                <span>{progress.toFixed(0)}%</span>
              </div>

              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </div>

            <motion.div
              className={styles.microText}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              click anywhere to enter
            </motion.div>
          </motion.div>

          <svg className={styles.curveSvg}>
            {path && <motion.path variants={curve} fill="#05070d" />}
          </svg>
        </>
      )}
    </motion.div>
  );
}
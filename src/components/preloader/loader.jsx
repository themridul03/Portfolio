import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { opacity, slideUp } from "./anim";
import { usePreloader } from "./index";
import styles from "./style.module.css";

export default function Loader() {
  const { loadingPercent, bypassLoading } = usePreloader();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const closeLoader = () => {
    bypassLoading();
    setTimeout(() => {
      document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  useEffect(() => {
    const timer = setTimeout(closeLoader, 4200);
    const handleKeyDown = () => closeLoader();

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const progress = Math.min(100, Math.max(0, loadingPercent || 0));

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  } L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
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
            <div className={styles.stage}>
              <motion.div
                className={styles.platform}
                animate={{
                  rotateX: [68, 68],
                  rotateZ: [0, 360],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className={styles.platformTwo}
                animate={{
                  rotateX: [68, 68],
                  rotateZ: [360, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className={styles.object3d}
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                  y: [0, -18, 0],
                }}
                transition={{
                  rotateX: { duration: 6, repeat: Infinity, ease: "linear" },
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                  y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <span className={styles.faceA} />
                <span className={styles.faceB} />
                <span className={styles.faceC} />
                <span className={styles.faceD} />
              </motion.div>

              <motion.div
                className={styles.lightBeam}
                animate={{
                  opacity: [0.25, 0.8, 0.25],
                  scaleY: [0.85, 1.15, 0.85],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className={styles.scan}
                animate={{
                  y: [-130, 130, -130],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className={styles.statusBox}>
              <div className={styles.statusTop}>
                <span>Preparing Interface</span>
                <span>{progress.toFixed(0)}%</span>
              </div>

              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </div>

            <motion.div
              className={styles.microText}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              click anywhere to enter
            </motion.div>
          </motion.div>

          <svg className={styles.curveSvg}>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="#05070d"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
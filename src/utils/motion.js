export const textVariant = (delay = 0) => {
  return {
    hidden: {
      y: -28,
      opacity: 0,
      filter: "blur(6px)",
    },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 18,
        duration: 0.75,
        delay,
      },
    },
  };
};

export const fadeIn = (direction = "", type = "spring", delay = 0, duration = 0.65) => {
  return {
    hidden: {
      x: direction === "left" ? 55 : direction === "right" ? -55 : 0,
      y: direction === "up" ? 55 : direction === "down" ? -55 : 0,
      opacity: 0,
      filter: "blur(5px)",
      scale: 0.98,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type,
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

export const slideIn = (direction = "", type = "spring", delay = 0, duration = 0.65) => {
  return {
    hidden: {
      x: direction === "left" ? "-45%" : direction === "right" ? "45%" : 0,
      y: direction === "up" ? "35%" : direction === "down" ? "-35%" : 0,
      opacity: 0,
      filter: "blur(8px)",
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type,
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};
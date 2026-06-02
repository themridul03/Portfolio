/**
 * Premium device-aware motion variant generators
 * Fast, smooth, reduced-motion safe, and portfolio-ready.
 */

const getReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

const premiumEase = [0.22, 1, 0.36, 1];
const smoothEase = [0.16, 1, 0.3, 1];

export const createFadeIn = (
  direction = "",
  type = "spring",
  delay = 0,
  duration = 0.55,
  isMobile = false
) => {
  if (getReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.25 } },
    };
  }

  const distance = isMobile ? 20 : 46;

  return {
    hidden: {
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      opacity: 0,
      scale: 0.985,
      filter: isMobile ? "blur(0px)" : "blur(6px)",
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type,
        delay,
        duration: isMobile ? duration * 0.78 : duration,
        ease: premiumEase,
        stiffness: type === "spring" ? 120 : undefined,
        damping: type === "spring" ? 18 : undefined,
      },
    },
  };
};

export const createCardHover = (isMobile = false, depth = 1) => {
  if (getReducedMotion() || isMobile) {
    return {
      rest: { y: 0, scale: 1, rotateX: 0, rotateY: 0 },
      hover: { y: 0, scale: 1, rotateX: 0, rotateY: 0 },
    };
  }

  return {
    rest: {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 24,
      },
    },
    hover: {
      y: -7 * depth,
      scale: 1 + 0.012 * depth,
      rotateX: 2 * depth,
      rotateY: -2 * depth,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 22,
      },
    },
  };
};

export const createButtonPress = (isMobile = false) => {
  if (getReducedMotion()) {
    return {
      rest: { scale: 1 },
      hover: { scale: 1 },
      tap: { scale: 1 },
    };
  }

  return {
    rest: {
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 22,
      },
    },
    hover: {
      scale: isMobile ? 1 : 1.04,
      y: isMobile ? 0 : -2,
      transition: {
        type: "spring",
        stiffness: 330,
        damping: 20,
      },
    },
    tap: {
      scale: 0.96,
      y: 1,
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 18,
      },
    },
  };
};

export const createMagneticEffect = (
  offset = { x: 0, y: 0 },
  pressDepth = 0
) => {
  if (getReducedMotion()) {
    return {
      x: 0,
      y: 0,
      scale: 1,
    };
  }

  return {
    x: offset.x,
    y: offset.y,
    scale: 1 - pressDepth * 0.055,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 20,
      mass: 0.45,
    },
  };
};

export const createStaggerContainer = (
  staggerChildren = 0.075,
  delayChildren = 0,
  isMobile = false
) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isMobile ? staggerChildren * 0.65 : staggerChildren,
        delayChildren: isMobile ? delayChildren * 0.65 : delayChildren,
      },
    },
  };
};

export const createSlideIn = (
  direction = "left",
  type = "spring",
  delay = 0,
  duration = 0.6,
  isMobile = false
) => {
  if (getReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.25 } },
    };
  }

  const distance = isMobile ? "42%" : "65%";

  return {
    hidden: {
      x: direction === "left" ? `-${distance}` : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? `-${distance}` : 0,
      opacity: 0,
      filter: isMobile ? "blur(0px)" : "blur(8px)",
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type,
        delay,
        duration: isMobile ? duration * 0.78 : duration,
        ease: smoothEase,
        stiffness: type === "spring" ? 120 : undefined,
        damping: type === "spring" ? 20 : undefined,
      },
    },
  };
};

export const createTextVariant = (delay = 0, isMobile = false) => {
  if (getReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.25 } },
    };
  }

  return {
    hidden: {
      y: isMobile ? -16 : -26,
      opacity: 0,
      filter: isMobile ? "blur(0px)" : "blur(5px)",
    },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        duration: isMobile ? 0.55 : 0.7,
        delay,
        stiffness: 130,
        damping: 18,
      },
    },
  };
};

export const createScaleReveal = (
  delay = 0,
  duration = 0.55,
  isMobile = false
) => {
  if (getReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.25 } },
    };
  }

  return {
    hidden: {
      opacity: 0,
      scale: isMobile ? 0.96 : 0.92,
      filter: isMobile ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: isMobile ? duration * 0.75 : duration,
        ease: premiumEase,
      },
    },
  };
};

export const create3DReveal = (
  delay = 0,
  duration = 0.7,
  isMobile = false
) => {
  if (getReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.25 } },
    };
  }

  return {
    hidden: {
      opacity: 0,
      y: isMobile ? 24 : 40,
      rotateX: isMobile ? 0 : 12,
      scale: 0.96,
      transformPerspective: 900,
      filter: isMobile ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: isMobile ? duration * 0.75 : duration,
        ease: smoothEase,
      },
    },
  };
};

export const createFloating = (distance = 12, duration = 3) => {
  if (getReducedMotion()) {
    return {};
  }

  return {
    y: [0, -distance, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
};

export const createPulseGlow = (color = "rgba(193,157,35,0.35)") => {
  if (getReducedMotion()) {
    return {};
  }

  return {
    boxShadow: [
      `0 0 0px ${color}`,
      `0 0 35px ${color}`,
      `0 0 0px ${color}`,
    ],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
};
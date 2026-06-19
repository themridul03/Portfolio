import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import usePreloaderBypass from "../../reactbits/hooks/usePreloaderBypass";
import Loader from "./loader";

const PreloaderContext = createContext(null);

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};

const LOADING_TIME = 2.2;

function Preloader({ children, disabled = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);

  const tweenRef = useRef(null);
  const valueRef = useRef({ value: 0 });

  // 🚀 smoother update throttle (avoid React spam)
  const lastUpdate = useRef(0);

  const updatePercent = (val) => {
    const now = performance.now();

    // throttle React updates (~12fps instead of 60fps)
    if (now - lastUpdate.current > 80 || val >= 100) {
      setLoadingPercent(val);
      lastUpdate.current = now;
    }
  };

  const bypassLoading = () => {
    tweenRef.current?.kill();

    setLoadingPercent(100);

    // instant close (no animation delay)
    setIsLoading(false);
  };

  usePreloaderBypass({
    onBypass: bypassLoading,
    keys: ["any"],
    clickEnabled: false,
    touchEnabled: false,
    disabled: disabled || !isLoading,
  });

  useEffect(() => {
    if (disabled) {
      setIsLoading(false);
      return;
    }

    tweenRef.current = gsap.to(valueRef.current, {
      value: 100,
      duration: LOADING_TIME,
      ease: "power2.out",
      onUpdate: () => {
        updatePercent(valueRef.current.value);
      },
      onComplete: () => {
        setLoadingPercent(100);

        // small delay feels more natural (premium UX)
        setTimeout(() => setIsLoading(false), 150);
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [disabled]);

  return (
    <PreloaderContext.Provider
      value={{
        isLoading,
        bypassLoading,
        loadingPercent,
      }}
    >
      {/* only render loader when needed */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader progress={loadingPercent} />}
      </AnimatePresence>

      {children}
    </PreloaderContext.Provider>
  );
}

export default Preloader;
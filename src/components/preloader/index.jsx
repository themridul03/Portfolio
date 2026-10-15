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

function Preloader({ children }) {
  return (
    <PreloaderContext.Provider
      value={{
        isLoading: false,
        bypassLoading: () => {},
        loadingPercent: 100,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export default Preloader;
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Preloader from "./components/preloader";

import ReactBitsAudioProvider from "./reactbits/context/ReactBitsAudioProvider";
import ReactBitsCursorProvider from "./reactbits/context/ReactBitsCursorProvider";

// Lazy Loaded Components
const About = lazy(() => import("./components/About"));
const KartoSpotlight = lazy(() => import("./components/KartoSpotlight"));
const Works = lazy(() => import("./components/Works"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Achievement = lazy(() => import("./components/Achievement"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));
const SkillKeyboard = lazy(() => import("./components/SkillKeyboard"));
const EasterEggs = lazy(() => import("./components/EasterEggs"));
const ElasticCursor = lazy(() => import("./components/ElasticCursor"));

const StarsCanvas = lazy(() =>
  import("./components/canvas").then((module) => ({
    default: module.StarsCanvas,
  }))
);

const App = () => {
  const [showStars, setShowStars] = useState(false);

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 768;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStars(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactBitsCursorProvider>
      <ReactBitsAudioProvider>
        <Preloader>
          <BrowserRouter>
            <div
              className="relative z-0 min-h-screen text-[#121418]"
              style={{ backgroundColor: "#f4efe6" }}
            >
              <Suspense fallback={null}>
                {isDesktop && <ElasticCursor />}
                <EasterEggs />
              </Suspense>

              <div>
                <Navbar />
                <Hero />
              </div>

              <Suspense fallback={null}>
                <About />
                <KartoSpotlight />
                <Works />
                <Experience />
                <SkillKeyboard />
                <Education />
                <Feedbacks />

                {showStars && <StarsCanvas />}

                <div className="relative z-0">
                  <Contact />
                </div>
              </Suspense>
            </div>
          </BrowserRouter>
        </Preloader>
      </ReactBitsAudioProvider>
    </ReactBitsCursorProvider>
  );
};

export default App;
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import Hero from "./components/Hero";
import HeroAndPinnedPortrait from "./components/HeroAndPinnedPortrait";

import ReactBitsAudioProvider from "./reactbits/context/ReactBitsAudioProvider";
import ReactBitsCursorProvider from "./reactbits/context/ReactBitsCursorProvider";

// Lazy Loaded Components
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const SkillKeyboard = lazy(() => import("./components/SkillKeyboard"));
const KartoSpotlight = lazy(() => import("./components/KartoSpotlight"));
const Works = lazy(() => import("./components/Works"));
const Education = lazy(() => import("./components/Education"));
const Languages = lazy(() => import("./components/Languages"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Achievement = lazy(() => import("./components/Achievement"));
const Contact = lazy(() => import("./components/Contact"));

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
        <BrowserRouter>
          <div
            className="relative z-0 min-h-screen text-white bg-[#000000] selection:bg-[#00ffae] selection:text-black"
            style={{ backgroundColor: "#000000" }}
          >
            {/* Desktop Scroll-Driven Portrait (Centered in Hero -> Slides to Right on Scroll) */}
            <HeroAndPinnedPortrait />

            <Suspense fallback={null}>
              {isDesktop && <ElasticCursor />}
              <EasterEggs />
            </Suspense>

            {/* Master Left Scrolling Column (Matches Image 1 & Image 2 from Syntax CV) */}
            <main className="w-full lg:w-[62%] xl:w-[65%] min-h-screen px-6 sm:px-10 lg:pl-16 lg:pr-10 pt-4 pb-16 relative z-10">
              <Hero />

              <Suspense fallback={null}>
                {/* 01. About */}
                <About />

                {/* 02. Experience */}
                <Experience />

                {/* 03. Skills (with typing filter & on-hover tooltips + Live HUD) */}
                <SkillKeyboard />

                {/* 04. Flagship Project: Karto */}
                <KartoSpotlight />

                {/* 05. Featured Projects */}
                <Works />

                {/* 06. Education */}
                <Education />

                {/* 07. Languages & Tools (Includes German) */}
                <Languages />

                {/* 08. References */}
                <Feedbacks />

                {/* 09. Awards & Credentials */}
                <Achievement />

                {/* Starfield Ambient Background */}
                {showStars && <StarsCanvas />}

                {/* 10. Contact + Thanks Section */}
                <div className="relative z-0">
                  <Contact />
                </div>
              </Suspense>
            </main>
          </div>
        </BrowserRouter>
      </ReactBitsAudioProvider>
    </ReactBitsCursorProvider>
  );
};

export default App;
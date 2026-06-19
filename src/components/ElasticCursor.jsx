import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useCursorState } from "../reactbits/context/ReactBitsCursorProvider";
import { useMouse } from "../utils/useMouse";

const CURSOR_SIZE = 28;
const OUTER_SIZE = 55;

function ElasticCursor() {
  const isMobile =
    window.matchMedia && window.matchMedia("(max-width: 768px)").matches;

  const { x, y } = useMouse();
  const { setTargetBounds } = useCursorState();

  const innerRef = useRef(null);
  const outerRef = useRef(null);

  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  const set = useRef({});

  useLayoutEffect(() => {
    if (!innerRef.current || !outerRef.current) return;

    set.current.innerX = gsap.quickSetter(innerRef.current, "x", "px");
    set.current.innerY = gsap.quickSetter(innerRef.current, "y", "px");

    set.current.outerX = gsap.quickSetter(outerRef.current, "x", "px");
    set.current.outerY = gsap.quickSetter(outerRef.current, "y", "px");
    set.current.outerScale = gsap.quickSetter(outerRef.current, "scale");
  }, []);

  const animate = () => {
    // inertia system (smooth lag)
    pos.current.x += (x - pos.current.x) * 0.18;
    pos.current.y += (y - pos.current.y) * 0.18;

    vel.current.x = x - pos.current.x;
    vel.current.y = y - pos.current.y;

    const speed = Math.min(
      Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2),
      150
    );

    const stretch = 1 + speed / 250;

    // inner cursor (fast)
    set.current.innerX(pos.current.x);
    set.current.innerY(pos.current.y);

    // outer cursor (smooth + stretch)
    set.current.outerX(pos.current.x);
    set.current.outerY(pos.current.y);
    set.current.outerScale(stretch);

    raf.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isMobile) return;

    raf.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf.current);
  }, [isMobile]);

  // MAGNETIC HOVER EFFECT (premium feel)
  useEffect(() => {
    if (isMobile) return;

    const handleHover = (e) => {
      const el = e.target;

      if (el?.closest?.(".cursor-can-hover")) {
        const rect = el.getBoundingClientRect();

        gsap.to(outerRef.current, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          scale: 1.6,
          duration: 0.4,
          ease: "power3.out",
        });

        setTargetBounds(rect);
      } else {
        gsap.to(outerRef.current, {
          scale: 1,
          duration: 0.4,
        });
      }
    };

    window.addEventListener("mousemove", handleHover, { passive: true });

    return () => window.removeEventListener("mousemove", handleHover);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* OUTER GLOW LAYER */}
      <div
        ref={outerRef}
        className="fixed left-0 top-0 pointer-events-none z-[999] rounded-full"
        style={{
          width: OUTER_SIZE,
          height: OUTER_SIZE,
          background:
            "radial-gradient(circle, rgba(193,157,35,0.25), transparent 70%)",
          mixBlendMode: "screen",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* INNER CORE CURSOR */}
      <div
        ref={innerRef}
        className="fixed left-0 top-0 pointer-events-none z-[1000] rounded-full"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          background: "#c19d23",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 20px rgba(193,157,35,0.6)",
        }}
      />
    </>
  );
}

export default ElasticCursor;
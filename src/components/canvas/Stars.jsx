import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();

  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(600), { radius: 1.5 })
  );

  // 🔥 pause when tab is hidden (BIG FPS WIN)
  const isVisible = useRef(true);

  useEffect(() => {
    const handleVisibility = () => {
      isVisible.current = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || !isVisible.current) return;

    // same motion, but guarded
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#c19d23"
          size={0.0028}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]} // 🔥 prevents GPU overload on high-end screens
        frameloop="demand" // 🔥 renders only when needed internally
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
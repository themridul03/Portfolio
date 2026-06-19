import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  const ref = useRef();
  const glowRef = useRef();

  const isVisible = useRef(true);

  useEffect(() => {
    const handle = () => {
      isVisible.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || !isVisible.current) return;

    // 🌍 main rotation (smooth cinematic speed)
    ref.current.rotation.y += delta * 0.12;

    // 🌌 subtle breathing glow rotation
    if (glowRef.current) {
      glowRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      {/* 🌍 Earth Core */}
      <primitive
        ref={ref}
        object={earth.scene}
        scale={2.5}
        position={[0, 0, 0]}
      />

      {/* 🌌 Atmospheric Glow Layer (cheap fake shader effect) */}
      <mesh ref={glowRef} scale={2.65}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#4aa3ff"
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* 🌙 Soft outer rim light sphere */}
      <mesh scale={2.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* 💡 Cinematic lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 3, 5]}
          intensity={1.2}
        />
        <directionalLight
          position={[-5, -2, -5]}
          intensity={0.4}
          color="#4aa3ff"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4} // slow cinematic rotation
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
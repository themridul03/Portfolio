import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  const value = progress.toFixed(0);

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 96,
          height: 96,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "conic-gradient(#c19d23 " +
            progress * 3.6 +
            "deg, rgba(255,255,255,0.08) 0deg)",
          boxShadow: "0 0 35px rgba(193,157,35,0.35)",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "rgba(8,11,20,0.92)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            style={{
              color: "#f7df8a",
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            {value}%
          </span>
        </div>
      </div>

      <p
        style={{
          marginTop: 22,
          color: "#fff",
          fontSize: 15,
          fontWeight: 900,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        Loading 3D Scene
      </p>

      <p
        style={{
          marginTop: 8,
          color: "rgba(255,255,255,0.55)",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        Preparing premium experience...
      </p>
    </Html>
  );
};

export default CanvasLoader;
"use client";

interface DesertDividerProps {
  flip?: boolean;
}

export default function DesertDivider({ flip = false }: DesertDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden select-none pointer-events-none ${flip ? "rotate-180" : ""}`}
      style={{ height: "120px" }}
      aria-hidden="true"
    >
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #F7F1E8 0%, #EDD9B8 40%, #D4935C 70%, #C1652F 100%)",
        }}
      />

      {/* Dune silhouettes — back layer */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,80 C120,40 240,90 360,70 C480,50 600,85 720,65 C840,45 960,80 1080,60 C1200,40 1320,75 1440,55 L1440,120 L0,120 Z"
          fill="#8B4A2B"
          opacity="0.35"
        />
      </svg>

      {/* Dune silhouettes — front layer */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,95 C80,75 200,100 320,85 C440,70 560,98 680,82 C800,66 920,95 1040,78 C1160,61 1300,90 1440,75 L1440,120 L0,120 Z"
          fill="#C1652F"
          opacity="0.55"
        />
      </svg>

      {/* Foreground dune */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,108 C100,95 220,112 340,100 C460,88 580,110 700,98 C820,86 940,108 1060,96 C1180,84 1300,106 1440,94 L1440,120 L0,120 Z"
          fill="#2B2521"
          opacity="0.12"
        />
      </svg>

      {/* Sun / golden accent */}
      <div
        className="absolute"
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #F5C842 0%, #B8934A 60%, transparent 100%)",
          top: "18px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.7,
          boxShadow: "0 0 30px 10px rgba(184,147,74,0.25)",
        }}
      />

      {/* Gold horizon line */}
      <div
        className="absolute w-full"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, #B8934A 30%, #F5C842 50%, #B8934A 70%, transparent 100%)",
          top: "30px",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

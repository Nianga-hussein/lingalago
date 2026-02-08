"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Character3DBody from "./Character3DBody";

export default function LearnCharacterBanner({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-100">
      {/* 3D Character */}
      <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: 90, height: 90 }}>
        <Canvas
          camera={{ position: [0, 0.2, 3], fov: 35 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 4]} intensity={1} />
          <directionalLight position={[-2, 3, -2]} intensity={0.3} />
          <Suspense fallback={null}>
            <Character3DBody character="child" mood="encourage" />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* Speech bubble */}
      <div className="character-bubble-left relative bg-white px-4 py-3 rounded-2xl border-2 border-gray-200 shadow-sm">
        <p className="text-sm font-semibold text-foreground">
          {streak > 0
            ? `Kokoba! Tu as une serie de ${streak} jours !`
            : "Mbote! Pret a apprendre le Lingala aujourd'hui ?"
          }
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Character3DBody from "./Character3DBody";

type CharacterType = "man" | "woman" | "child";
type CharacterMood = "happy" | "encourage" | "celebrate" | "thinking";

const ENCOURAGEMENTS = [
  "Ozali kosala malamu!",
  "Kokoba!",
  "Ezali pasi te!",
  "Makasi!",
  "Bravo, koba boye!",
  "Ozali mayele!",
  "Ndenge wana!",
];

const CORRECT_MESSAGES = [
  "Malamu mingi!",
  "Kitoko!",
  "Esengo!",
  "Likambo te!",
  "Ozali champion!",
];

const WRONG_MESSAGES = [
  "Meka lisusu!",
  "Ezali pasi te, koba!",
  "Tobongisa yango!",
  "Likambo te, tokoba!",
];

function getRandomMessage(mood: CharacterMood): string {
  if (mood === "celebrate") {
    return CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
  }
  if (mood === "thinking") {
    return WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
  }
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}

// ============================================
// 3D Scene wrapping the character body
// ============================================

function CharacterScene({
  character,
  mood,
}: {
  character: CharacterType;
  mood: CharacterMood;
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1} castShadow />
      <directionalLight position={[-2, 3, -2]} intensity={0.3} />
      <pointLight position={[0, 2, 3]} intensity={0.4} color="#ffe4c4" />

      <Suspense fallback={null}>
        <Character3DBody character={character} mood={mood} />
      </Suspense>

      {/* Ground shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#000" transparent opacity={0.08} />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        target={[0, 0, 0]}
      />
    </>
  );
}

// ============================================
// Main Component
// ============================================

interface AnimatedCharacterProps {
  mood?: CharacterMood;
  message?: string;
  showMessage?: boolean;
  size?: "sm" | "md" | "lg";
  position?: "left" | "right" | "center";
  character?: CharacterType;
  animate?: boolean;
  className?: string;
}

export default function AnimatedCharacter({
  mood = "happy",
  message,
  showMessage = true,
  size = "md",
  position = "left",
  character,
  className = "",
}: AnimatedCharacterProps) {
  const [charType] = useState<CharacterType>(
    () => character || (["man", "woman", "child"][Math.floor(Math.random() * 3)] as CharacterType)
  );
  const [displayMessage, setDisplayMessage] = useState<string>("");

  useEffect(() => {
    setDisplayMessage(message || getRandomMessage(mood));
  }, [mood, message]);

  const canvasSize = size === "sm" ? 100 : size === "md" ? 150 : 200;

  const positionClasses = {
    left: "flex-row",
    right: "flex-row-reverse",
    center: "flex-col items-center",
  };

  return (
    <div className={`flex items-end gap-3 ${positionClasses[position]} ${className}`}>
      {/* 3D Canvas */}
      <div
        className="flex-shrink-0 rounded-xl overflow-hidden"
        style={{ width: canvasSize, height: canvasSize }}
      >
        <Canvas
          camera={{ position: [0, 0.2, 3], fov: 35 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <CharacterScene character={charType} mood={mood} />
        </Canvas>
      </div>

      {/* Speech Bubble */}
      {showMessage && displayMessage && (
        <div
          className={`relative max-w-[220px] px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl shadow-sm ${
            position === "left"
              ? "character-bubble-left"
              : position === "right"
                ? "character-bubble-right"
                : ""
          }`}
        >
          <p className="text-sm font-semibold text-foreground leading-snug">
            {displayMessage}
          </p>
        </div>
      )}
    </div>
  );
}

// Helper for lesson page
export function getCharacterForLesson(lessonIndex: number): CharacterType {
  const chars: CharacterType[] = ["man", "woman", "child"];
  return chars[lessonIndex % 3];
}

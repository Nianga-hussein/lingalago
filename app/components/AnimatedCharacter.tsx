"use client";

import { useState, useEffect } from "react";

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
// SVG Articulated Character with CSS Animations
// ============================================

// Skin tones for characters
const SKIN_TONES: Record<CharacterType, string> = {
  man: "#8D5524",
  woman: "#A0522D",
  child: "#C68642",
};

const CLOTHING_COLORS: Record<CharacterType, { primary: string; secondary: string }> = {
  man: { primary: "#58CC02", secondary: "#46A302" },
  woman: { primary: "#FF6B6B", secondary: "#EE5A24" },
  child: { primary: "#1CB0F6", secondary: "#0984C4" },
};

// Character SVG with articulated body parts
function CharacterSVG({
  character,
  mood,
  size,
}: {
  character: CharacterType;
  mood: CharacterMood;
  size: number;
}) {
  const skin = SKIN_TONES[character];
  const clothes = CLOTHING_COLORS[character];
  const isChild = character === "child";
  const isWoman = character === "woman";

  // Animation class names based on mood
  const leftArmClass =
    mood === "celebrate"
      ? "anim-arm-celebrate-left"
      : mood === "encourage"
        ? "anim-arm-wave"
        : mood === "thinking"
          ? "anim-arm-chin"
          : "anim-arm-idle";

  const rightArmClass =
    mood === "celebrate"
      ? "anim-arm-celebrate-right"
      : mood === "encourage"
        ? "anim-arm-idle-right"
        : mood === "thinking"
          ? "anim-arm-idle-right"
          : "anim-arm-happy-right";

  const headClass =
    mood === "thinking"
      ? "anim-head-tilt"
      : mood === "celebrate"
        ? "anim-head-nod"
        : mood === "happy"
          ? "anim-head-nod-slow"
          : "";

  const bodyClass =
    mood === "celebrate" ? "anim-body-jump" : "";

  const eyeClass =
    mood === "happy" || mood === "celebrate" ? "anim-eyes-happy" : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* ---- BODY GROUP (can jump) ---- */}
      <g className={bodyClass}>
        {/* Shadow on ground */}
        <ellipse cx="100" cy="252" rx="35" ry="6" fill="#00000015" className="anim-shadow" />

        {/* ---- LEGS ---- */}
        <g>
          {/* Left leg */}
          <rect x="76" y="185" width="18" height={isChild ? "40" : "50"} rx="9" fill={skin} className="anim-leg-left" />
          {/* Right leg */}
          <rect x="106" y="185" width="18" height={isChild ? "40" : "50"} rx="9" fill={skin} className="anim-leg-right" />
          {/* Shoes */}
          <ellipse cx="85" cy={isChild ? "228" : "238"} rx="14" ry="8" fill="#3d3d3d" />
          <ellipse cx="115" cy={isChild ? "228" : "238"} rx="14" ry="8" fill="#3d3d3d" />
        </g>

        {/* ---- TORSO ---- */}
        <g>
          {/* Body/Shirt */}
          <rect x="68" y="120" width="64" height={isChild ? "68" : "70"} rx="16" fill={clothes.primary} />
          {/* Shirt collar / neckline */}
          <path d="M88 120 L100 130 L112 120" stroke={clothes.secondary} strokeWidth="3" fill="none" />
          {/* Belt / waist detail */}
          {!isChild && (
            <rect x="68" y="170" width="64" height="6" rx="3" fill={clothes.secondary} />
          )}
          {/* Woman dress extension */}
          {isWoman && (
            <path d="M68 175 L58 210 L142 210 L132 175 Z" fill={clothes.primary} rx="4" opacity="0.9" />
          )}
        </g>

        {/* ---- LEFT ARM (waving / celebrating / thinking) ---- */}
        <g className={leftArmClass} style={{ transformOrigin: "80px 128px" }}>
          {/* Upper arm */}
          <rect x="50" y="122" width="22" height={isChild ? "35" : "40"} rx="11" fill={skin} />
          {/* Forearm */}
          <g style={{ transformOrigin: "61px 158px" }} className={mood === "encourage" ? "anim-forearm-wave" : ""}>
            <rect x="48" y="155" width="18" height={isChild ? "28" : "32"} rx="9" fill={skin} />
            {/* Hand */}
            <circle cx="57" cy={isChild ? "185" : "190"} r="10" fill={skin} />
            {/* Fingers (only on wave/celebrate) */}
            {(mood === "encourage" || mood === "celebrate") && (
              <g className="anim-fingers">
                <rect x="49" y={isChild ? "176" : "181"} width="4" height="10" rx="2" fill={skin} transform="rotate(-10 51 181)" />
                <rect x="55" y={isChild ? "174" : "179"} width="4" height="11" rx="2" fill={skin} />
                <rect x="61" y={isChild ? "176" : "181"} width="4" height="10" rx="2" fill={skin} transform="rotate(10 63 181)" />
              </g>
            )}
          </g>
        </g>

        {/* ---- RIGHT ARM ---- */}
        <g className={rightArmClass} style={{ transformOrigin: "120px 128px" }}>
          {/* Upper arm */}
          <rect x="128" y="122" width="22" height={isChild ? "35" : "40"} rx="11" fill={skin} />
          {/* Forearm */}
          <rect x="132" y="155" width="18" height={isChild ? "28" : "32"} rx="9" fill={skin} />
          {/* Hand */}
          <circle cx="141" cy={isChild ? "185" : "190"} r="10" fill={skin} />
        </g>

        {/* ---- HEAD ---- */}
        <g className={headClass} style={{ transformOrigin: "100px 90px" }}>
          {/* Neck */}
          <rect x="90" y="108" width="20" height="18" rx="8" fill={skin} />
          {/* Head shape */}
          <ellipse cx="100" cy="76" rx={isChild ? "34" : "36"} ry={isChild ? "36" : "38"} fill={skin} />

          {/* Hair */}
          {isWoman ? (
            <g>
              {/* Long hair */}
              <ellipse cx="100" cy="58" rx="38" ry="28" fill="#1a1a2e" />
              <rect x="62" y="56" width="12" height="50" rx="6" fill="#1a1a2e" />
              <rect x="126" y="56" width="12" height="50" rx="6" fill="#1a1a2e" />
              {/* Headwrap */}
              <path d="M64 54 Q100 30 136 54" stroke={clothes.secondary} strokeWidth="8" fill="none" strokeLinecap="round" />
              <circle cx="100" cy="40" r="6" fill={clothes.secondary} />
            </g>
          ) : isChild ? (
            <g>
              {/* Short curly hair */}
              <ellipse cx="100" cy="52" rx="32" ry="22" fill="#1a1a2e" />
              <circle cx="76" cy="58" r="8" fill="#1a1a2e" />
              <circle cx="124" cy="58" r="8" fill="#1a1a2e" />
            </g>
          ) : (
            <g>
              {/* Short hair / flat top */}
              <ellipse cx="100" cy="50" rx="36" ry="20" fill="#1a1a2e" />
              <rect x="66" y="48" width="68" height="12" rx="4" fill="#1a1a2e" />
            </g>
          )}

          {/* Eyes */}
          <g className={eyeClass}>
            {mood === "happy" || mood === "celebrate" ? (
              <>
                {/* Happy squint eyes */}
                <path d="M82 76 Q86 72 90 76" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M110 76 Q114 72 118 76" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Open eyes */}
                <ellipse cx="86" cy="76" rx="6" ry="7" fill="white" />
                <ellipse cx="114" cy="76" rx="6" ry="7" fill="white" />
                <circle cx={mood === "thinking" ? "84" : "87"} cy="77" r="3.5" fill="#1a1a2e" className="anim-pupil" />
                <circle cx={mood === "thinking" ? "112" : "115"} cy="77" r="3.5" fill="#1a1a2e" className="anim-pupil" />
                {/* Eye shine */}
                <circle cx="88" cy="74" r="1.5" fill="white" />
                <circle cx="116" cy="74" r="1.5" fill="white" />
              </>
            )}
          </g>

          {/* Eyebrows */}
          {mood === "thinking" ? (
            <>
              <line x1="78" y1="64" x2="92" y2="66" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="108" y1="66" x2="122" y2="64" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : mood === "celebrate" ? (
            <>
              <line x1="78" y1="66" x2="92" y2="62" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="108" y1="62" x2="122" y2="66" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1="78" y1="65" x2="92" y2="64" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="108" y1="64" x2="122" y2="65" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="86" rx="3" ry="4" fill={skin} stroke="#00000020" strokeWidth="1" />

          {/* Mouth */}
          {mood === "celebrate" ? (
            <g>
              {/* Big open smile */}
              <path d="M86 96 Q100 112 114 96" fill="#c0392b" />
              <path d="M90 96 Q100 100 110 96" fill="white" />
            </g>
          ) : mood === "happy" ? (
            <path d="M88 96 Q100 108 112 96" stroke="#c0392b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ) : mood === "thinking" ? (
            <g>
              {/* Small "o" mouth */}
              <ellipse cx="100" cy="98" rx="5" ry="6" fill="#c0392b" />
            </g>
          ) : (
            <path d="M88 96 Q100 106 112 96" stroke="#c0392b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* Blush cheeks for happy/celebrate */}
          {(mood === "happy" || mood === "celebrate") && (
            <>
              <ellipse cx="74" cy="88" rx="8" ry="5" fill="#FF6B6B30" />
              <ellipse cx="126" cy="88" rx="8" ry="5" fill="#FF6B6B30" />
            </>
          )}

          {/* Thinking hand on chin */}
          {mood === "thinking" && (
            <circle cx="88" cy="100" r="8" fill={skin} className="anim-think-hand" />
          )}
        </g>
      </g>
    </svg>
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
  const [charType] = useState<CharacterType>(() => character || (["man", "woman", "child"][Math.floor(Math.random() * 3)] as CharacterType));
  const [displayMessage, setDisplayMessage] = useState<string>("");

  useEffect(() => {
    setDisplayMessage(message || getRandomMessage(mood));
  }, [mood, message]);

  const svgSize = size === "sm" ? 80 : size === "md" ? 120 : 160;

  const positionClasses = {
    left: "flex-row",
    right: "flex-row-reverse",
    center: "flex-col items-center",
  };

  return (
    <div className={`flex items-end gap-3 ${positionClasses[position]} ${className}`}>
      {/* SVG Character */}
      <div className="flex-shrink-0 relative" style={{ width: svgSize, height: svgSize }}>
        <CharacterSVG character={charType} mood={mood} size={svgSize} />
      </div>

      {/* Speech Bubble */}
      {showMessage && displayMessage && (
        <div
          className={`relative max-w-[220px] px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl shadow-sm ${
            position === "left" ? "character-bubble-left" : position === "right" ? "character-bubble-right" : ""
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

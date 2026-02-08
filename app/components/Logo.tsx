"use client";

import { useEffect, useState } from "react";

type LogoMood = "happy" | "celebrate" | "encourage" | "thinking" | "loading" | "idle";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animate?: boolean;
  mood?: LogoMood;
  className?: string;
}

const sizeMap = {
  xs: 28,
  sm: 40,
  md: 56,
  lg: 80,
  xl: 140,
};

export default function Logo({
  size = "md",
  showText = false,
  animate = true,
  mood = "happy",
  className = "",
}: LogoProps) {
  const dim = sizeMap[size];
  const [blink, setBlink] = useState(false);

  // Blink interval varies by mood
  useEffect(() => {
    if (!animate) return;
    const blinkSpeed = mood === "loading" ? 1800 : mood === "thinking" ? 5000 : 3500;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, blinkSpeed);
    return () => clearInterval(interval);
  }, [animate, mood]);

  // --- Expression config per mood ---
  const moodConfig = getMoodConfig(mood, blink);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} suppressHydrationWarning>
      <div
        className={`relative ${animate && moodConfig.containerClass ? moodConfig.containerClass : ""}`}
        style={{
          width: dim,
          height: dim,
          perspective: "400px",
        }}
        suppressHydrationWarning
      >
        {/* 3D Shadow */}
        {animate && (
          <div
            className={`absolute bottom-[-8%] left-[15%] w-[70%] h-[18%] rounded-[50%] bg-black/10 blur-sm ${moodConfig.shadowClass || ""}`}
          />
        )}

        {/* Main SVG Mascot */}
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full overflow-visible ${animate && moodConfig.bodyClass ? moodConfig.bodyClass : ""}`}
          style={{ transformStyle: "preserve-3d" } as React.CSSProperties}
        >
          {/* === BODY === */}
          <g className={animate && moodConfig.torsoClass ? moodConfig.torsoClass : undefined} style={{ transformOrigin: "100px 140px" } as React.CSSProperties}>
            <ellipse cx="100" cy="115" rx="62" ry="70" fill="#58CC02" />
            <ellipse cx="85" cy="100" rx="35" ry="45" fill="#6EE018" opacity="0.5" />
            <ellipse cx="100" cy="155" rx="50" ry="25" fill="#46A302" opacity="0.4" />

            {/* Belly */}
            <ellipse cx="100" cy="130" rx="38" ry="40" fill="#E8F5E0" />
            <ellipse cx="95" cy="125" rx="25" ry="28" fill="#F0FAE8" opacity="0.6" />
          </g>

          {/* === LEFT WING === */}
          <g
            className={animate && moodConfig.leftWingClass ? moodConfig.leftWingClass : undefined}
            style={{ transformOrigin: "55px 120px" } as React.CSSProperties}
          >
            <path
              d="M38 100 C25 85 20 110 30 135 C35 145 50 145 55 130 Z"
              fill="#1CB0F6"
            />
            <path
              d="M40 105 C32 95 28 112 35 130 C38 137 48 138 50 128 Z"
              fill="#47C1F8"
              opacity="0.6"
            />
            {/* Feather tips for gesture detail */}
            {(mood === "encourage" || mood === "celebrate") && animate && (
              <g className="owl-finger-wiggle" style={{ transformOrigin: "30px 135px" } as React.CSSProperties}>
                <ellipse cx="25" cy="140" rx="5" ry="3" fill="#1CB0F6" />
                <ellipse cx="32" cy="143" rx="5" ry="3" fill="#1CB0F6" />
                <ellipse cx="39" cy="140" rx="5" ry="3" fill="#1CB0F6" />
              </g>
            )}
          </g>

          {/* === RIGHT WING === */}
          <g
            className={animate && moodConfig.rightWingClass ? moodConfig.rightWingClass : undefined}
            style={{ transformOrigin: "145px 120px" } as React.CSSProperties}
          >
            <path
              d="M162 100 C175 85 180 110 170 135 C165 145 150 145 145 130 Z"
              fill="#1CB0F6"
            />
            <path
              d="M160 105 C168 95 172 112 165 130 C162 137 152 138 150 128 Z"
              fill="#47C1F8"
              opacity="0.6"
            />
            {mood === "celebrate" && animate && (
              <g className="owl-finger-wiggle" style={{ transformOrigin: "170px 135px" } as React.CSSProperties}>
                <ellipse cx="165" cy="140" rx="5" ry="3" fill="#1CB0F6" />
                <ellipse cx="172" cy="143" rx="5" ry="3" fill="#1CB0F6" />
                <ellipse cx="179" cy="140" rx="5" ry="3" fill="#1CB0F6" />
              </g>
            )}
          </g>

          {/* === HEAD === */}
          <g
            className={animate && moodConfig.headClass ? moodConfig.headClass : undefined}
            style={{ transformOrigin: "100px 65px" } as React.CSSProperties}
          >
            <circle cx="100" cy="65" r="45" fill="#58CC02" />
            <circle cx="88" cy="52" r="25" fill="#6EE018" opacity="0.5" />
            <ellipse cx="90" cy="35" rx="15" ry="8" fill="white" opacity="0.25" />

            {/* Left Eye */}
            <ellipse cx="82" cy="60" rx="14" ry="15" fill="white" />
            <g className={animate && moodConfig.pupilClass ? moodConfig.pupilClass : undefined} style={{ transformOrigin: "85px 61px" } as React.CSSProperties}>
              {moodConfig.eyeShape === "squint" ? (
                /* Squint eyes for thinking */
                <path d="M78 61 Q85 55 92 61" stroke="#2D2D2D" strokeWidth="3" fill="none" strokeLinecap="round" />
              ) : moodConfig.eyeShape === "wide" ? (
                /* Wide eyes for celebrate */
                <>
                  <circle cx="85" cy="61" r={blink ? 1 : 10} fill="#2D2D2D" />
                  {!blink && <circle cx="88" cy="57" r="3.5" fill="white" />}
                  {!blink && <circle cx="83" cy="64" r="1.5" fill="white" />}
                </>
              ) : (
                /* Normal eyes */
                <>
                  <circle cx="85" cy="61" r={blink ? 1 : 8} fill="#2D2D2D">
                    {animate && (
                      <animate
                        attributeName="cx"
                        values="85;87;85;83;85"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                  {!blink && <circle cx="88" cy="57" r="3" fill="white" />}
                </>
              )}
            </g>

            {/* Right Eye */}
            <ellipse cx="118" cy="60" rx="14" ry="15" fill="white" />
            <g className={animate && moodConfig.pupilClass ? moodConfig.pupilClass : undefined} style={{ transformOrigin: "121px 61px" } as React.CSSProperties}>
              {moodConfig.eyeShape === "squint" ? (
                <path d="M114 61 Q121 55 128 61" stroke="#2D2D2D" strokeWidth="3" fill="none" strokeLinecap="round" />
              ) : moodConfig.eyeShape === "wide" ? (
                <>
                  <circle cx="121" cy="61" r={blink ? 1 : 10} fill="#2D2D2D" />
                  {!blink && <circle cx="124" cy="57" r="3.5" fill="white" />}
                  {!blink && <circle cx="119" cy="64" r="1.5" fill="white" />}
                </>
              ) : (
                <>
                  <circle cx="121" cy="61" r={blink ? 1 : 8} fill="#2D2D2D">
                    {animate && (
                      <animate
                        attributeName="cx"
                        values="121;123;121;119;121"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                  {!blink && <circle cx="124" cy="57" r="3" fill="white" />}
                </>
              )}
            </g>

            {/* Beak / Mouth */}
            {moodConfig.mouthType === "open" ? (
              /* Open beak for celebrate */
              <>
                <path d="M92 78 L100 87 L108 78 Z" fill="#FFC800" />
                <path d="M94 87 L100 96 L106 87 Z" fill="#E6A800" />
                <ellipse cx="100" cy="90" rx="5" ry="3" fill="#CC7700" />
              </>
            ) : moodConfig.mouthType === "small" ? (
              /* Small "o" for thinking */
              <>
                <path d="M92 78 L100 90 L108 78 Z" fill="#FFC800" />
                <path d="M95 78 L100 84 L105 78 Z" fill="#FFD633" />
                <ellipse cx="100" cy="92" rx="3" ry="2.5" fill="#E6A800" stroke="#CC7700" strokeWidth="1" />
              </>
            ) : (
              /* Normal beak */
              <>
                <path d="M92 78 L100 92 L108 78 Z" fill="#FFC800" />
                <path d="M95 78 L100 86 L105 78 Z" fill="#FFD633" />
                <path d="M96 82 L100 90 L104 82" stroke="#E6A800" strokeWidth="1.5" fill="none" />
              </>
            )}

            {/* Cheek blush - stronger when happy/celebrate */}
            <circle cx="68" cy="72" r="8" fill="#FF9EAA" opacity={moodConfig.blushOpacity} />
            <circle cx="132" cy="72" r="8" fill="#FF9EAA" opacity={moodConfig.blushOpacity} />

            {/* Thinking hand (wing tip near chin) */}
            {mood === "thinking" && animate && (
              <g className="owl-think-hand" style={{ transformOrigin: "75px 92px" } as React.CSSProperties}>
                <ellipse cx="75" cy="92" rx="8" ry="6" fill="#1CB0F6" />
                <ellipse cx="70" cy="95" rx="3" ry="2" fill="#47C1F8" />
              </g>
            )}
          </g>

          {/* === FEATHERS/CREST === */}
          <g style={{ transformOrigin: "100px 22px" } as React.CSSProperties}>
            <path
              d="M100 22 C95 5 88 12 92 22"
              fill="#46A302"
              className={animate && moodConfig.featherClass ? moodConfig.featherClass : undefined}
              style={{ transformOrigin: "96px 22px" } as React.CSSProperties}
            />
            <path
              d="M105 22 C112 8 118 15 112 24"
              fill="#58CC02"
              className={animate && moodConfig.feather2Class ? moodConfig.feather2Class : undefined}
              style={{ transformOrigin: "108px 24px" } as React.CSSProperties}
            />
          </g>

          {/* === FEET === */}
          <g className={animate && moodConfig.feetClass ? moodConfig.feetClass : undefined} style={{ transformOrigin: "100px 182px" } as React.CSSProperties}>
            <ellipse cx="82" cy="182" rx="12" ry="6" fill="#FFC800" />
            <ellipse cx="118" cy="182" rx="12" ry="6" fill="#FFC800" />
            <circle cx="73" cy="184" r="3" fill="#FFD633" />
            <circle cx="82" cy="186" r="3" fill="#FFD633" />
            <circle cx="91" cy="184" r="3" fill="#FFD633" />
            <circle cx="109" cy="184" r="3" fill="#FFD633" />
            <circle cx="118" cy="186" r="3" fill="#FFD633" />
            <circle cx="127" cy="184" r="3" fill="#FFD633" />
          </g>
        </svg>
      </div>

      {showText && (
        <span
          className={`font-bold tracking-wide text-[#58CC02] ${
            size === "xl"
              ? "text-3xl md:text-4xl"
              : size === "lg"
              ? "text-2xl md:text-3xl"
              : size === "md"
              ? "text-xl md:text-2xl"
              : size === "sm"
              ? "text-lg"
              : "text-base"
          }`}
        >
          LingalaGo
        </span>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Per-mood configuration for each body part animation class
   and expression variant (eyes, mouth, blush)
   --------------------------------------------------------- */
function getMoodConfig(mood: LogoMood, _blink: boolean) {
  switch (mood) {
    case "celebrate":
      return {
        containerClass: "owl-body-jump",
        shadowClass: "owl-shadow-jump",
        bodyClass: "",
        torsoClass: "",
        leftWingClass: "owl-wing-celebrate-left",
        rightWingClass: "owl-wing-celebrate-right",
        headClass: "owl-head-nod",
        pupilClass: "",
        featherClass: "owl-feather-bounce",
        feather2Class: "owl-feather-bounce-2",
        feetClass: "owl-feet-tap",
        eyeShape: "wide" as const,
        mouthType: "open" as const,
        blushOpacity: 0.55,
      };
    case "encourage":
      return {
        containerClass: "logo-float",
        shadowClass: "logo-shadow",
        bodyClass: "",
        torsoClass: "",
        leftWingClass: "owl-wing-wave",
        rightWingClass: "owl-wing-idle-right",
        headClass: "owl-head-nod-slow",
        pupilClass: "owl-pupil-look",
        featherClass: "owl-feather-bounce",
        feather2Class: "owl-feather-bounce-2",
        feetClass: "",
        eyeShape: "normal" as const,
        mouthType: "normal" as const,
        blushOpacity: 0.4,
      };
    case "thinking":
      return {
        containerClass: "",
        shadowClass: "logo-shadow",
        bodyClass: "",
        torsoClass: "",
        leftWingClass: "owl-wing-chin",
        rightWingClass: "owl-wing-idle-right",
        headClass: "owl-head-tilt",
        pupilClass: "owl-pupil-look-up",
        featherClass: "owl-feather-bounce",
        feather2Class: "owl-feather-bounce-2",
        feetClass: "",
        eyeShape: "squint" as const,
        mouthType: "small" as const,
        blushOpacity: 0.2,
      };
    case "loading":
      return {
        containerClass: "logo-float",
        shadowClass: "logo-shadow",
        bodyClass: "owl-body-breathe",
        torsoClass: "",
        leftWingClass: "owl-wing-idle-left",
        rightWingClass: "owl-wing-idle-right",
        headClass: "",
        pupilClass: "owl-pupil-look",
        featherClass: "owl-feather-bounce",
        feather2Class: "owl-feather-bounce-2",
        feetClass: "",
        eyeShape: "normal" as const,
        mouthType: "normal" as const,
        blushOpacity: 0.3,
      };
    case "idle":
      return {
        containerClass: "",
        shadowClass: "",
        bodyClass: "",
        torsoClass: "",
        leftWingClass: "",
        rightWingClass: "",
        headClass: "",
        pupilClass: "",
        featherClass: "",
        feather2Class: "",
        feetClass: "",
        eyeShape: "normal" as const,
        mouthType: "normal" as const,
        blushOpacity: 0.35,
      };
    case "happy":
    default:
      return {
        containerClass: "logo-float",
        shadowClass: "logo-shadow",
        bodyClass: "logo-wobble",
        torsoClass: "",
        leftWingClass: "owl-wing-flap-left",
        rightWingClass: "owl-wing-flap-right",
        headClass: "owl-head-nod-slow",
        pupilClass: "owl-pupil-look",
        featherClass: "owl-feather-bounce",
        feather2Class: "owl-feather-bounce-2",
        feetClass: "",
        eyeShape: "normal" as const,
        mouthType: "normal" as const,
        blushOpacity: 0.35,
      };
  }
}

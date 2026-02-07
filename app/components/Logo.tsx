"use client";

import { useEffect, useState } from "react";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animate?: boolean;
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
  className = "",
}: LogoProps) {
  const dim = sizeMap[size];
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3500);
    return () => clearInterval(interval);
  }, [animate]);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`relative ${animate ? "logo-float" : ""}`}
        style={{
          width: dim,
          height: dim,
          perspective: "400px",
        }}
      >
        {/* 3D Shadow */}
        {animate && (
          <div
            className="absolute bottom-[-8%] left-[15%] w-[70%] h-[18%] rounded-[50%] bg-black/10 blur-sm logo-shadow"
          />
        )}

        {/* Main SVG Mascot */}
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full ${animate ? "logo-wobble" : ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Body - main green shape */}
          <ellipse cx="100" cy="115" rx="62" ry="70" fill="#58CC02" />
          {/* Body highlight for 3D */}
          <ellipse cx="85" cy="100" rx="35" ry="45" fill="#6EE018" opacity="0.5" />
          {/* Body shadow bottom */}
          <ellipse cx="100" cy="155" rx="50" ry="25" fill="#46A302" opacity="0.4" />

          {/* Belly */}
          <ellipse cx="100" cy="130" rx="38" ry="40" fill="#E8F5E0" />
          <ellipse cx="95" cy="125" rx="25" ry="28" fill="#F0FAE8" opacity="0.6" />

          {/* Head */}
          <circle cx="100" cy="65" r="45" fill="#58CC02" />
          {/* Head 3D highlight */}
          <circle cx="88" cy="52" r="25" fill="#6EE018" opacity="0.5" />
          {/* Head top shine */}
          <ellipse cx="90" cy="35" rx="15" ry="8" fill="white" opacity="0.25" />

          {/* Left Eye White */}
          <ellipse cx="82" cy="60" rx="14" ry="15" fill="white" />
          {/* Left Eye Pupil */}
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
          {/* Left Eye Shine */}
          {!blink && <circle cx="88" cy="57" r="3" fill="white" />}

          {/* Right Eye White */}
          <ellipse cx="118" cy="60" rx="14" ry="15" fill="white" />
          {/* Right Eye Pupil */}
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
          {/* Right Eye Shine */}
          {!blink && <circle cx="124" cy="57" r="3" fill="white" />}

          {/* Beak */}
          <path
            d="M92 78 L100 92 L108 78 Z"
            fill="#FFC800"
          />
          <path
            d="M95 78 L100 86 L105 78 Z"
            fill="#FFD633"
          />
          {/* Beak bottom (mouth) */}
          <path
            d="M96 82 L100 90 L104 82"
            stroke="#E6A800"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Left Wing */}
          <g className={animate ? "logo-wing-left" : ""}>
            <path
              d="M38 100 C25 85 20 110 30 135 C35 145 50 145 55 130 Z"
              fill="#1CB0F6"
            />
            <path
              d="M40 105 C32 95 28 112 35 130 C38 137 48 138 50 128 Z"
              fill="#47C1F8"
              opacity="0.6"
            />
          </g>

          {/* Right Wing */}
          <g className={animate ? "logo-wing-right" : ""}>
            <path
              d="M162 100 C175 85 180 110 170 135 C165 145 150 145 145 130 Z"
              fill="#1CB0F6"
            />
            <path
              d="M160 105 C168 95 172 112 165 130 C162 137 152 138 150 128 Z"
              fill="#47C1F8"
              opacity="0.6"
            />
          </g>

          {/* Feet */}
          <ellipse cx="82" cy="182" rx="12" ry="6" fill="#FFC800" />
          <ellipse cx="118" cy="182" rx="12" ry="6" fill="#FFC800" />
          {/* Toes */}
          <circle cx="73" cy="184" r="3" fill="#FFD633" />
          <circle cx="82" cy="186" r="3" fill="#FFD633" />
          <circle cx="91" cy="184" r="3" fill="#FFD633" />
          <circle cx="109" cy="184" r="3" fill="#FFD633" />
          <circle cx="118" cy="186" r="3" fill="#FFD633" />
          <circle cx="127" cy="184" r="3" fill="#FFD633" />

          {/* Cheek blush */}
          <circle cx="68" cy="72" r="8" fill="#FF9EAA" opacity="0.35" />
          <circle cx="132" cy="72" r="8" fill="#FF9EAA" opacity="0.35" />

          {/* Head feather/crest */}
          <path
            d="M100 22 C95 5 88 12 92 22"
            fill="#46A302"
            className={animate ? "logo-feather" : ""}
          />
          <path
            d="M105 22 C112 8 118 15 112 24"
            fill="#58CC02"
            className={animate ? "logo-feather-2" : ""}
          />
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
          lingalago
        </span>
      )}
    </div>
  );
}

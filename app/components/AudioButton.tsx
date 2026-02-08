"use client";

import { Volume2 } from "lucide-react";
import { useTTS } from "@/app/hooks/useTTS";

interface AudioButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "ghost" | "inline";
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export default function AudioButton({
  text,
  size = "md",
  variant = "primary",
  className = "",
  showLabel = false,
  label,
}: AudioButtonProps) {
  const { speak, isSpeaking } = useTTS({ rate: 0.8 });

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          speak(text);
        }}
        className={`inline-flex items-center gap-1.5 text-brand-blue hover:text-blue-600 transition-colors ${className}`}
        aria-label={`Ecouter: ${text}`}
      >
        <Volume2
          className={`${iconSizes[size]} ${isSpeaking ? "animate-pulse" : ""}`}
        />
        {showLabel && (
          <span className="text-sm font-medium">{label || text}</span>
        )}
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          speak(text);
        }}
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-brand-blue hover:bg-blue-50 transition-all ${isSpeaking ? "animate-pulse bg-blue-50" : ""} ${className}`}
        aria-label={`Ecouter: ${text}`}
      >
        <Volume2 className={iconSizes[size]} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      className={`${sizeClasses[size]} bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-[0_4px_0_#1185b8] active:shadow-none active:translate-y-[4px] transition-all ${isSpeaking ? "animate-pulse" : ""} ${className}`}
      aria-label={`Ecouter: ${text}`}
    >
      <Volume2 className={iconSizes[size]} />
    </button>
  );
}

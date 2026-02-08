"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type CharacterType = "man" | "woman" | "child";
type CharacterMood = "happy" | "encourage" | "celebrate" | "thinking";

const CHARACTER_IMAGES: Record<string, string> = {
  "man-happy": "/assets/characters/man-happy.jpg",
  "man-encourage": "/assets/characters/man-encourage.jpg",
  "woman-happy": "/assets/characters/woman-happy.jpg",
  "woman-celebrate": "/assets/characters/woman-celebrate.jpg",
  "child-happy": "/assets/characters/child-happy.jpg",
  "child-thinking": "/assets/characters/child-thinking.jpg",
};

const ENCOURAGEMENTS = [
  "Ozali kosala malamu! (Tu fais bien !)",
  "Kokoba! (Continue !)",
  "Ezali pasi te! (C'est pas difficile !)",
  "Makasi! (Fort !)",
  "Bravo, koba boye! (Bravo, continue comme ca !)",
  "Ozali mayele! (Tu es intelligent(e) !)",
  "Eloko moko te ekoki opekisa yo! (Rien ne peut t'arreter !)",
  "Ndenge wana! (Comme ca !)",
];

const CORRECT_MESSAGES = [
  "Malamu mingi! (Tres bien !)",
  "Kitoko! (Beau !)",
  "Esengo! (Joie !)",
  "Likambo te! (Pas de probleme !)",
  "Ozali champion!",
];

const WRONG_MESSAGES = [
  "Meka lisusu! (Essaie encore !)",
  "Ezali pasi te, koba! (C'est pas dur, continue !)",
  "Tobongisa yango! (On va corriger ca !)",
  "Likambo te, tokoba! (Pas grave, on continue !)",
];

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

function getCharacterForContext(
  mood: CharacterMood,
  preferredCharacter?: CharacterType
): { type: CharacterType; moodKey: string } {
  const type = preferredCharacter || (["man", "woman", "child"][Math.floor(Math.random() * 3)] as CharacterType);

  // Map mood to available image keys
  const moodMap: Record<CharacterType, Record<CharacterMood, string>> = {
    man: {
      happy: "man-happy",
      encourage: "man-encourage",
      celebrate: "man-happy",
      thinking: "man-encourage",
    },
    woman: {
      happy: "woman-happy",
      encourage: "woman-happy",
      celebrate: "woman-celebrate",
      thinking: "woman-happy",
    },
    child: {
      happy: "child-happy",
      encourage: "child-happy",
      celebrate: "child-happy",
      thinking: "child-thinking",
    },
  };

  return { type, moodKey: moodMap[type][mood] };
}

function getRandomMessage(mood: CharacterMood): string {
  if (mood === "celebrate") {
    return CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
  }
  if (mood === "thinking") {
    return WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
  }
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}

export default function AnimatedCharacter({
  mood = "happy",
  message,
  showMessage = true,
  size = "md",
  position = "left",
  character,
  animate = true,
  className = "",
}: AnimatedCharacterProps) {
  const [charData, setCharData] = useState<{ type: CharacterType; moodKey: string } | null>(null);
  const [displayMessage, setDisplayMessage] = useState<string>("");

  useEffect(() => {
    const data = getCharacterForContext(mood, character);
    setCharData(data);
    setDisplayMessage(message || getRandomMessage(mood));
  }, [mood, character, message]);

  if (!charData) return null;

  const imageSrc = CHARACTER_IMAGES[charData.moodKey];

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const positionClasses = {
    left: "flex-row",
    right: "flex-row-reverse",
    center: "flex-col items-center",
  };

  const animationClass = animate
    ? mood === "celebrate"
      ? "character-bounce"
      : mood === "thinking"
        ? "character-wobble"
        : "character-float"
    : "";

  return (
    <div
      className={`flex items-end gap-3 ${positionClasses[position]} ${className}`}
    >
      {/* Character Image */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0 ${animationClass}`}>
        <Image
          src={imageSrc}
          alt={`Personnage ${charData.type}`}
          fill
          className="object-contain rounded-full"
          sizes="(max-width: 128px) 100vw, 128px"
        />
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

// Stateless helper to pick a character for a lesson index
export function getCharacterForLesson(lessonIndex: number): CharacterType {
  const chars: CharacterType[] = ["man", "woman", "child"];
  return chars[lessonIndex % 3];
}

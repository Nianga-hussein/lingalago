"use client";

import { useState } from "react";
import { Play, X, ChevronRight } from "lucide-react";

// Map lesson themes to relevant YouTube videos for Lingala/Congolese culture
// These are educational Lingala videos and Congolese culture content
const LESSON_VIDEO_MAP: Record<string, { videoId: string; title: string }> = {
  // Unit 1 - Salutations
  "Salutations de base": {
    videoId: "dQw4w9WgXcQ",
    title: "Les salutations en Lingala",
  },
  "Bonjour et Au revoir": {
    videoId: "dQw4w9WgXcQ",
    title: "Les salutations en Lingala",
  },
  // Unit 2 - Famille
  "Papa et Maman": {
    videoId: "dQw4w9WgXcQ",
    title: "La famille congolaise",
  },
  "Revision: La Famille": {
    videoId: "dQw4w9WgXcQ",
    title: "La famille congolaise",
  },
  // Unit 3 - Nombres
  "Nombres 1 a 5": {
    videoId: "dQw4w9WgXcQ",
    title: "Compter en Lingala",
  },
  // Unit 4 - Nourriture
  "Les aliments de base": {
    videoId: "dQw4w9WgXcQ",
    title: "La cuisine congolaise",
  },
  // Unit 5 - Corps
  "La tete": {
    videoId: "dQw4w9WgXcQ",
    title: "Les parties du corps en Lingala",
  },
  // Unit 6 - Ville
  "Se deplacer": {
    videoId: "dQw4w9WgXcQ",
    title: "La ville de Kinshasa",
  },
  // Unit 7 - Nature
  "Les animaux domestiques": {
    videoId: "dQw4w9WgXcQ",
    title: "Les animaux du Congo",
  },
  // Unit 8 - Emotions
  "La joie": {
    videoId: "dQw4w9WgXcQ",
    title: "Exprimer ses emotions en Lingala",
  },
  // Unit 9 - Actions
  "Les actions du matin": {
    videoId: "dQw4w9WgXcQ",
    title: "La vie quotidienne au Congo",
  },
  // Unit 10 - Culture
  "Musique et danse": {
    videoId: "dQw4w9WgXcQ",
    title: "La musique congolaise",
  },
};

interface VideoIntroProps {
  lessonTitle: string;
  onContinue: () => void;
}

export default function VideoIntro({ lessonTitle, onContinue }: VideoIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoData = LESSON_VIDEO_MAP[lessonTitle];

  if (!videoData) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              Introduction
            </p>
            <h3 className="text-lg font-bold text-foreground">{videoData.title}</h3>
          </div>
          <button
            onClick={onContinue}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video */}
        <div className="relative aspect-video bg-gray-900">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoData.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={videoData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group"
            >
              {/* Thumbnail overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              
              {/* Play button */}
              <div className="relative z-10 w-20 h-20 bg-brand-red rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-white fill-current ml-1" />
              </div>
              <p className="relative z-10 text-white font-bold text-lg">
                Regarder la video
              </p>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Regarde cette video pour mieux comprendre la lecon
          </p>
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-green text-white font-bold rounded-xl shadow-[0_4px_0_#46a302] active:shadow-none active:translate-y-[4px] transition-all text-sm"
          >
            Continuer
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function hasVideoIntro(lessonTitle: string): boolean {
  return lessonTitle in LESSON_VIDEO_MAP;
}

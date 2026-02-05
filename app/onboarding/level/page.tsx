"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Signal, SignalHigh, SignalMedium, SignalLow } from "lucide-react";
import { OnboardingHeader } from "@/app/components/OnboardingHeader";

const levels = [
  { id: "new", name: "Je débute en Lingala", icon: SignalLow },
  { id: "basic", name: "Je connais quelques mots de base", icon: SignalMedium },
  { id: "intermediate", name: "Je peux avoir une conversation simple", icon: SignalHigh },
  { id: "advanced", name: "Je peux parler de sujets variés", icon: Signal },
];

export default function LevelPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col pb-8">
      <OnboardingHeader progress={60} />
      
      <div className="flex items-center gap-4 mb-6 mt-2">
        <div className="w-16 h-16 flex-shrink-0">
          <Globe className="w-full h-full text-brand-green" />
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-lg shadow-sm relative">
          Tu parles déjà un peu Lingala ?
          <div className="absolute top-1/2 left-[-8px] transform -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-gray-200 rotate-45"></div>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pb-4 custom-scrollbar">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setSelected(level.id)}
            className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all ${
              selected === level.id
                ? "border-brand-green bg-green-50 text-brand-green"
                : "border-gray-200 hover:bg-gray-50 text-gray-700"
            }`}
          >
            <level.icon className={`w-6 h-6 ${selected === level.id ? "text-brand-green" : "text-brand-blue"}`} />
            <span className="font-bold">{level.name}</span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 mt-auto">
        <Link 
          href="/onboarding/plan" 
          className={`w-full font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[4px] text-center block ${
            selected 
              ? "bg-brand-green hover:bg-brand-green-dark text-white shadow-[0_4px_0_rgb(70,163,2)]" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          }`}
          style={{ pointerEvents: selected ? 'auto' : 'none' }}
        >
          CONTINUER
        </Link>
      </div>
    </div>
  );
}

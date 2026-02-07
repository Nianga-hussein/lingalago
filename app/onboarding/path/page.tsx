"use client";

import Link from "next/link";
import { Book, Compass } from "lucide-react";
import { OnboardingHeader } from "@/app/components/OnboardingHeader";
import Logo from "@/app/components/Logo";

export default function PathPage() {
  return (
    <div className="flex-1 flex flex-col pb-8">
      <OnboardingHeader progress={75} />
      
      <div className="flex items-center gap-4 mb-6 mt-2">
        <Logo size="md" animate />
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-lg shadow-sm relative">
          Par où veux-tu commencer ?
          <div className="absolute top-1/2 left-[-8px] transform -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-gray-200 rotate-45"></div>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <Link 
          href="/onboarding/plan"
          className="block w-full p-4 rounded-2xl border-2 border-gray-200 hover:bg-gray-50 hover:border-brand-green transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-16 bg-brand-yellow rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm relative overflow-hidden">
               <div className="absolute top-2 left-2 w-2 h-8 bg-black/10 rounded-full transform -rotate-45"></div>
               <Book className="text-white w-8 h-8 relative z-10" />
               <span className="absolute bottom-1 right-2 text-white font-bold text-xs opacity-80">1</span>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800 text-lg group-hover:text-brand-green">Commencer par les bases</h3>
              <p className="text-gray-500 text-sm">Fais la leçon la plus facile du cours de lingala</p>
            </div>
          </div>
        </Link>

        <Link 
          href="/onboarding/level"
          className="block w-full p-4 rounded-2xl border-2 border-gray-200 hover:bg-gray-50 hover:border-brand-blue transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-brand-blue flex items-center justify-center flex-shrink-0">
               <Compass className="text-brand-blue w-6 h-6 fill-current" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800 text-lg group-hover:text-brand-blue">Déterminer mon niveau</h3>
              <p className="text-gray-500 text-sm">Laisse Duo trouver le meilleur point de départ pour toi</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="pt-4 border-t border-gray-100 mt-auto">
        <div className="text-center text-gray-400 font-bold text-sm uppercase tracking-widest">
          CHOISIS UNE OPTION
        </div>
      </div>
    </div>
  );
}

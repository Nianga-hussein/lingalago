"use client";

import Link from "next/link";
import { Zap, Target, Clock, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SummaryContent() {
  const searchParams = useSearchParams();
  const xp = searchParams.get("xp") || "10";
  const score = searchParams.get("score") || "100";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      
      <div className="mb-8 relative w-48 h-48">
         {/* Success Mascot Animation Placeholder */}
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-brand-green rounded-full animate-bounce flex items-center justify-center">
               <span className="text-6xl">🎉</span>
            </div>
         </div>
      </div>

      <h1 className="text-3xl font-bold text-brand-yellow mb-8">
        Entraînement terminé !
      </h1>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-12">
        <div className="bg-brand-yellow rounded-2xl p-4 border-b-4 border-[#cc9f00]">
          <p className="text-white font-bold text-xs uppercase mb-1">XP Gagnés</p>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-white fill-current" />
            <span className="text-white font-bold text-2xl">{xp}</span>
          </div>
        </div>

        <div className="bg-brand-green rounded-2xl p-4 border-b-4 border-[#46a302]">
          <p className="text-white font-bold text-xs uppercase mb-1">Précision</p>
          <div className="flex items-center justify-center gap-2">
            <Target className="w-6 h-6 text-white" />
            <span className="text-white font-bold text-2xl">{score}%</span>
          </div>
        </div>

        <div className="bg-brand-blue rounded-2xl p-4 border-b-4 border-[#1185b8]">
          <p className="text-white font-bold text-xs uppercase mb-1">Fusée</p>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-6 h-6 text-white" />
            <span className="text-white font-bold text-2xl">1:08</span>
          </div>
        </div>
      </div>

      <Link 
        href="/lesson/streak" 
        className="w-full max-w-md bg-brand-blue hover:bg-blue-500 text-white font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_#1185b8] active:shadow-none active:translate-y-[4px]"
      >
        RÉCUPÉRER MES XP
      </Link>
    </div>
  );
}

export default function LessonSummaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SummaryContent />
    </Suspense>
  );
}

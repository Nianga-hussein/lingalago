"use client";

import Link from "next/link";
import { Zap, Target, Clock } from "lucide-react";
import Logo from "@/app/components/Logo";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SummaryContent() {
  const searchParams = useSearchParams();
  const xp = searchParams.get("xp") || "10";
  const score = searchParams.get("score") || "100";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:p-6 text-center">
      
      <div className="mb-8">
         <Logo size="xl" animate />
      </div>

      <h1 className="text-3xl font-bold text-brand-yellow mb-8">
        Entraînement terminé !
      </h1>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-md mb-12">
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

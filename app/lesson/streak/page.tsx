"use client";

import Link from "next/link";
import { Flame, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function StreakContent() {
  // Ideally fetch real streak here or pass via params
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-lg shadow-sm relative mb-8 max-w-xs mx-auto">
        Une série est née ! Entraîne-toi chaque jour pour te créer une habitude.
        <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-gray-200 rotate-45"></div>
      </div>

      <div className="mb-4 relative">
         <div className="text-brand-orange animate-pulse">
            <Flame className="w-48 h-48 fill-current" />
         </div>
      </div>

      <div className="text-brand-orange font-bold text-8xl mb-2">1</div>
      <h2 className="text-brand-orange font-bold text-2xl mb-12">jour !</h2>

      <div className="flex justify-between w-full max-w-xs mb-12 px-4">
        {['M', 'J', 'V', 'S', 'D', 'L', 'M'].map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-gray-400">{day}</span>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 0 ? 'bg-brand-orange text-white' : 'bg-gray-200'}`}>
              {i === 0 && <Check className="w-6 h-6" />}
            </div>
          </div>
        ))}
      </div>

      <Link 
        href="/learn" 
        className="w-full max-w-md bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] active:shadow-none active:translate-y-[4px]"
      >
        CONTINUER
      </Link>
    </div>
  );
}

export default function StreakPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StreakContent />
    </Suspense>
  );
}

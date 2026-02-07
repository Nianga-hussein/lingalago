"use client";

import Link from "next/link";
import { OnboardingHeader } from "@/app/components/OnboardingHeader";
import Logo from "@/app/components/Logo";

export default function PlanPage() {
  return (
    <div className="flex-1 flex flex-col pb-8">
      <OnboardingHeader progress={90} />
      
      <div className="flex items-center gap-4 mb-6 mt-2">
        <Logo size="md" animate />
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-lg shadow-sm relative">
          Ça marche ! Tu peux changer d'offre à tout moment.
          <div className="absolute top-1/2 left-[-8px] transform -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-gray-200 rotate-45"></div>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {/* Super Plan */}
        <div className="w-full p-0 rounded-2xl border-2 border-gray-200 overflow-hidden group hover:border-brand-blue transition-all cursor-pointer">
           <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-1">
              <div className="flex justify-end px-2">
                <span className="bg-white text-brand-blue text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Recommandé</span>
              </div>
           </div>
           <div className="p-4">
             <h3 className="font-bold text-gray-800 text-lg">Apprendre avec Super LingalaGo</h3>
             <p className="text-gray-500 text-sm">Progression plus rapide, zéro pubs</p>
           </div>
        </div>

        {/* Free Plan */}
        <div className="w-full p-4 rounded-2xl border-2 border-brand-blue bg-blue-50 cursor-pointer relative">
           <div className="absolute inset-0 border-2 border-brand-blue rounded-2xl pointer-events-none"></div>
           <h3 className="font-bold text-brand-blue text-lg">Apprendre gratuitement</h3>
           <p className="text-brand-blue/70 text-sm font-medium">Les fonctionnalités essentielles, avec des pubs</p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 mt-auto">
        <Link 
          href="/onboarding/start" 
          className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] text-center block"
        >
          CONTINUER
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Globe, Zap } from "lucide-react";
import { OnboardingHeader } from "@/app/components/OnboardingHeader";

export default function StartPage() {
  return (
    <div className="flex-1 flex flex-col pb-8">
      <OnboardingHeader progress={100} />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-8 relative w-48 h-48 animate-bounce-slow">
           <Globe className="w-full h-full text-brand-green" />
           <div className="absolute -top-4 -right-4 bg-brand-yellow text-white p-3 rounded-full shadow-lg animate-pulse">
             <Zap className="w-8 h-8 fill-current" />
           </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          C'est parti !
        </h1>
        
        <p className="text-xl text-gray-500 font-medium max-w-xs">
          Tu vas apprendre tes premiers mots en Lingala.
        </p>
      </div>

      <div className="pt-4">
        <Link 
          href="/admin/lessons/1/preview" 
          className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] text-center block"
        >
          COMMENCER LA LEÇON
        </Link>
      </div>
    </div>
  );
}

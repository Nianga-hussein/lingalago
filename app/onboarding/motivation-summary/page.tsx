"use client";

import Link from "next/link";
import { MessageCircle, BookOpen, Clock } from "lucide-react";
import { OnboardingHeader } from "@/app/components/OnboardingHeader";
import Logo from "@/app/components/Logo";

export default function MotivationSummaryPage() {
  return (
    <div className="flex-1 flex flex-col pb-8">
      <OnboardingHeader progress={60} />
      
      <div className="flex items-center gap-4 mb-6 mt-2">
        <Logo size="md" animate />
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-lg shadow-sm relative">
          Regarde tout ce que tu peux accomplir en 3 mois !
          <div className="absolute top-1/2 left-[-8px] transform -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-gray-200 rotate-45"></div>
        </div>
      </div>

      <div className="space-y-6 flex-1 px-2">
        <div className="flex items-start gap-4">
          <MessageCircle className="w-8 h-8 text-purple-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Parle avec assurance</h3>
            <p className="text-gray-500">Des exercices sans stress pour parler et écouter la langue</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <BookOpen className="w-8 h-8 text-brand-blue mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Enrichis ton vocabulaire</h3>
            <p className="text-gray-500">Des mots courants et des expressions utiles</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="w-8 h-8 text-brand-yellow mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Prends de bonnes habitudes</h3>
            <p className="text-gray-500">Des rappels intelligents, des défis amusants et bien plus</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 mt-auto">
        <Link 
          href="/onboarding/path" 
          className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] text-center block"
        >
          CONTINUER
        </Link>
      </div>
    </div>
  );
}

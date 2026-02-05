"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function OnboardingHeader({ progress }: { progress: number }) {
  const router = useRouter();

  return (
    <header className="px-6 py-6 flex items-center gap-4">
      <button 
        onClick={() => router.back()} 
        className="text-gray-300 hover:text-gray-400 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      
      <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-brand-green h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-2 w-full bg-white/20 rounded-full mt-0.5 ml-1"></div>
        </div>
      </div>
    </header>
  );
}

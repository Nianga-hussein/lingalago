"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { OnboardingHeader } from "@/app/components/OnboardingHeader";
import Logo from "@/app/components/Logo";

export default function StartPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      router.push("/learn");
    } catch (error) {
      console.error("Failed to finish onboarding", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-8">
      <OnboardingHeader progress={100} />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-8 relative">
           <Logo size="xl" animate />
           <div className="absolute -top-2 -right-2 bg-[#FFC800] text-background p-2.5 rounded-full shadow-lg animate-pulse">
             <Zap className="w-6 h-6 fill-current" />
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
        <button 
          onClick={handleStart}
          disabled={loading}
          className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] text-center block"
        >
          {loading ? "CHARGEMENT..." : "COMMENCER LA LEÇON"}
        </button>
      </div>
    </div>
  );
}

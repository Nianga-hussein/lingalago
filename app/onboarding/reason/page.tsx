"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, Smile, Briefcase, BookOpen, Users, Clock, MoreHorizontal } from "lucide-react";
import { OnboardingHeader } from "@/app/components/OnboardingHeader";
import Logo from "@/app/components/Logo";

const reasons = [
  { id: "travel", name: "Préparer un voyage", icon: Plane },
  { id: "fun", name: "Me divertir", icon: Smile },
  { id: "career", name: "Booster ma carrière", icon: Briefcase },
  { id: "school", name: "M'aider dans mes études", icon: BookOpen },
  { id: "family", name: "Tisser des liens", icon: Users },
  { id: "brain", name: "Bien utiliser mon temps", icon: Clock },
  { id: "other", name: "Autre", icon: MoreHorizontal },
];

export default function ReasonPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: selected }),
      });
      router.push("/onboarding/daily-goal");
    } catch (error) {
      console.error("Failed to save reason", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-8">
      <OnboardingHeader progress={40} />
      
      <div className="flex items-center gap-4 mb-6 mt-2">
        <Logo size="md" animate />
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-lg shadow-sm relative">
          Pourquoi veux-tu apprendre le Lingala ?
          <div className="absolute top-1/2 left-[-8px] transform -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-gray-200 rotate-45"></div>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pb-4 custom-scrollbar">
        {reasons.map((reason) => (
          <button
            key={reason.id}
            onClick={() => setSelected(reason.id)}
            className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all ${
              selected === reason.id
                ? "border-brand-green bg-green-50 text-brand-green"
                : "border-gray-200 hover:bg-gray-50 text-gray-700"
            }`}
          >
            <reason.icon className={`w-8 h-8 ${selected === reason.id ? "text-brand-green" : "text-gray-500"}`} />
            <span className="font-bold">{reason.name}</span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 mt-auto">
        <button 
          onClick={handleContinue}
          disabled={!selected || loading}
          className={`w-full font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[4px] text-center block ${
            selected && !loading
              ? "bg-brand-green hover:bg-brand-green-dark text-white shadow-[0_4px_0_rgb(70,163,2)]" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          }`}
        >
          {loading ? "CHARGEMENT..." : "CONTINUER"}
        </button>
      </div>
    </div>
  );
}

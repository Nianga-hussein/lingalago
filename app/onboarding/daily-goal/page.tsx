"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { OnboardingHeader } from "@/app/components/OnboardingHeader";

const goals = [
  { id: "casual", name: "Tranquille", time: "5 min/jour" },
  { id: "normal", name: "Normal", time: "10 min/jour" },
  { id: "serious", name: "Intensif", time: "15 min/jour" },
  { id: "intense", name: "Extrême", time: "20 min/jour" },
];

export default function DailyGoalPage() {
  const [selected, setSelected] = useState<string>("normal");

  return (
    <div className="flex-1 flex flex-col pb-8">
      <OnboardingHeader progress={50} />
      
      <div className="flex items-center gap-4 mb-6 mt-2">
        <div className="w-16 h-16 flex-shrink-0">
          <Globe className="w-full h-full text-brand-green" />
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-lg shadow-sm relative">
          Quel est ton objectif quotidien ?
          <div className="absolute top-1/2 left-[-8px] transform -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-gray-200 rotate-45"></div>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pb-4 custom-scrollbar">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setSelected(goal.id)}
            className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
              selected === goal.id
                ? "border-brand-green bg-green-50 text-brand-green"
                : "border-gray-200 hover:bg-gray-50 text-gray-700"
            }`}
          >
            <span className="font-bold text-lg">{goal.time}</span>
            <span className="text-sm font-medium text-gray-500">{goal.name}</span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 mt-auto">
        <Link 
          href="/onboarding/motivation-summary" 
          className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] text-center block"
        >
          C'EST PARTI
        </Link>
      </div>
    </div>
  );
}

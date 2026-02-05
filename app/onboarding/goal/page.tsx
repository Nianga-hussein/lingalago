"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Check } from "lucide-react";

const courses = [
  { id: "lingala", name: "Lingala", flag: "🇨🇩" },
  // { id: "swahili", name: "Swahili", flag: "🇹🇿" }, // Future
];

export default function GoalPage() {
  const [selected, setSelected] = useState("lingala");

  return (
    <div className="flex-1 flex flex-col pb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16">
          <Globe className="w-full h-full text-brand-green" />
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-lg shadow-sm relative">
          Que veux-tu apprendre ?
          <div className="absolute top-1/2 left-[-8px] transform -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-gray-200 rotate-45"></div>
        </div>
      </div>

      <h2 className="text-sm font-bold text-gray-400 uppercase mb-4">Pour les personnes parlant français</h2>

      <div className="space-y-4">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => setSelected(course.id)}
            className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
              selected === course.id
                ? "border-brand-green bg-green-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl shadow-sm rounded-lg overflow-hidden block w-10 h-8 bg-gray-100 flex items-center justify-center">
                {course.flag}
              </span>
              <span className="font-bold text-gray-700">{course.name}</span>
            </div>
            {selected === course.id && (
              <Check className="w-6 h-6 text-brand-green" />
            )}
          </button>
        ))}
        
        {/* Placeholder for other options to match screenshot style */}
        <div className="w-full p-4 rounded-2xl border-2 border-gray-100 flex items-center gap-4 opacity-50 cursor-not-allowed">
           <span className="text-2xl shadow-sm rounded-lg overflow-hidden block w-10 h-8 bg-gray-100 flex items-center justify-center">
             🇰🇪
           </span>
           <span className="font-bold text-gray-400">Swahili (Bientôt)</span>
        </div>
      </div>

      <div className="flex-1"></div>

      <Link href="/onboarding/source" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] text-center block">
        CONTINUER
      </Link>
    </div>
  );
}

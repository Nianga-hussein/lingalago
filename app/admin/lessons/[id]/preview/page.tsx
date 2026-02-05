"use client";

import { useState } from "react";
import { X, Check, Volume2, Mic, Coffee, Sandwich, IceCream, CupSoda } from "lucide-react";
import Link from "next/link";

// Mock data based on screenshots
const lessonData = {
  title: "Les bases",
  exercises: [
    {
      type: "image_selection",
      question: "Choisis la bonne image",
      word: "café",
      audio: "cafe.mp3",
      options: [
        { id: "tea", label: "thé", icon: CupSoda },
        { id: "sandwich", label: "sandwich", icon: Sandwich },
        { id: "coffee", label: "café", icon: Coffee },
        { id: "icecream", label: "glace", icon: IceCream },
      ],
      answer: "coffee"
    },
    {
      type: "translation",
      question: "Comment dit-on « café » ?",
      options: ["por favor", "un", "café"],
      answer: "café"
    },
    {
      type: "listening",
      question: "Écris ce que tu entends",
      audio: "mbote.mp3",
      options: ["Mbote", "Mboté", "Mbo te", "Mbot"], // Fallback for now
      answer: "Mbote"
    }
  ]
};

export default function LessonPreviewPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const progress = ((currentStep) / lessonData.exercises.length) * 100;
  const currentExercise = lessonData.exercises[currentStep];

  const handleCheck = () => {
    if (!selectedOption) return;
    
    // Logic for image selection (checking ID) vs text selection (checking Value)
    const isCorrect = 
      currentExercise.type === "image_selection" 
        ? selectedOption === currentExercise.answer
        : selectedOption === currentExercise.answer;

    if (isCorrect) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  const handleNext = () => {
    if (currentStep < lessonData.exercises.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setStatus("idle");
    } else {
      window.location.href = "/lesson/summary";
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-2xl mx-auto">
      {/* Header */}
      <header className="p-6 flex items-center gap-4">
        <Link href="/admin/lessons" className="text-gray-300 hover:text-gray-400">
          <X className="w-6 h-6" />
        </Link>
        <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-brand-green h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="h-2 w-full bg-white/20 rounded-full mt-0.5 ml-1"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 flex flex-col justify-center pb-40">
        
        {/* Exercise Header */}
        <div className="mb-8">
          {currentExercise.type === "image_selection" && (
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {currentExercise.question}
            </h2>
          )}
          
          {currentExercise.type === "translation" && (
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {currentExercise.question}
            </h2>
          )}

          {/* Audio Word Display */}
          {(currentExercise.type === "image_selection" && currentExercise.word) && (
            <div className="flex items-center gap-4 mb-8">
              <button className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-[0_4px_0_#1185b8] active:shadow-none active:translate-y-[4px] transition-all">
                <Volume2 className="w-6 h-6" />
              </button>
              <span className="text-xl font-bold text-gray-700 underline decoration-dashed decoration-gray-300 underline-offset-4">
                {currentExercise.word}
              </span>
            </div>
          )}
        </div>

        {/* Image Selection Grid */}
        {currentExercise.type === "image_selection" && (
          <div className="grid grid-cols-2 gap-4">
            {currentExercise.options?.map((option: any) => (
              <button
                key={option.id}
                onClick={() => status === "idle" && setSelectedOption(option.id)}
                className={`p-4 rounded-2xl border-2 border-b-4 flex flex-col items-center gap-4 transition-all ${
                  selectedOption === option.id
                    ? "border-brand-blue bg-blue-50 text-brand-blue"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                } ${
                  status === "wrong" && selectedOption === option.id
                    ? "border-brand-red bg-red-50 text-brand-red"
                    : ""
                } ${
                  status === "correct" && selectedOption === option.id
                    ? "border-brand-green bg-green-50 text-brand-green"
                    : ""
                }`}
              >
                {option.icon && <option.icon className="w-16 h-16 stroke-1" />}
                <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Text Selection List */}
        {currentExercise.type === "translation" && (
          <div className="space-y-4">
            {currentExercise.options?.map((option: any) => (
              <button
                key={option}
                onClick={() => status === "idle" && setSelectedOption(option)}
                className={`w-full p-4 rounded-xl border-2 border-b-4 text-lg font-medium transition-all text-left ${
                  selectedOption === option
                    ? "border-brand-green bg-green-50 text-brand-green"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Footer Feedback */}
      <footer className={`fixed bottom-0 left-0 right-0 p-6 border-t-2 z-50 transition-colors duration-300 ${
        status === "correct" ? "bg-green-100 border-green-200" : 
        status === "wrong" ? "bg-red-100 border-red-200" : "bg-white border-gray-200"
      }`}>
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          
          {/* Feedback Content */}
          <div className="flex items-start gap-4">
            {status === "correct" && (
              <>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-green-500 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-green-700 font-bold text-xl mb-1">Super !</h3>
                </div>
              </>
            )}
            
            {status === "wrong" && (
              <>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <X className="w-6 h-6 text-red-500 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-red-700 font-bold text-xl mb-1">Incorrect</h3>
                  <p className="text-red-700 font-bold text-sm">Bonne réponse :</p>
                  <p className="text-red-600 font-normal">
                    {currentExercise.type === "image_selection" 
                      ? currentExercise.options?.find((o: any) => o.id === currentExercise.answer)?.label
                      : currentExercise.answer}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            {status === "idle" ? (
              <button 
                onClick={handleCheck}
                disabled={!selectedOption}
                className={`w-full md:w-auto px-10 py-3 rounded-xl font-bold text-white uppercase tracking-wider transition-all border-b-4 ${
                  selectedOption 
                    ? "bg-brand-green border-brand-green-dark hover:bg-opacity-90 active:border-b-0 active:translate-y-[4px]" 
                    : "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                VALIDER
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className={`w-full md:w-auto px-10 py-3 rounded-xl font-bold text-white uppercase tracking-wider transition-all border-b-4 active:border-b-0 active:translate-y-[4px] ${
                  status === "correct" 
                    ? "bg-brand-green border-brand-green-dark hover:bg-opacity-90" 
                    : "bg-brand-red border-[#d32f2f] hover:bg-opacity-90"
                }`}
              >
                {status === "wrong" ? "D'ACCORD" : "CONTINUER"}
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

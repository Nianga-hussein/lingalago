"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Heart } from "lucide-react";
import Link from "next/link";
import VoiceRecorder from "@/app/components/VoiceRecorder";
import Countdown from "@/app/components/Countdown";
import HeartsModal from "@/app/components/HeartsModal";

type Option = {
  id: string;
  label?: string;
  icon?: string;
  left?: string;
  right?: string;
};

type Exercise = {
  id: string;
  type: string;
  question: string;
  correctAnswer: string | null;
  options: any; // Using any for flexibility with JSON
};

type Lesson = {
  id: string;
  title: string;
  exercises: Exercise[];
};

export default function LessonClient({ 
  initialLesson, 
  initialHearts,
  userId,
  initialIndex = 0,
  initialFailedIds = []
}: { 
  initialLesson: Lesson, 
  initialHearts: number,
  userId: string,
  initialIndex?: number,
  initialFailedIds?: string[]
}) {
  const router = useRouter();
  
  // Initialize state based on saved progress
  const [failedExerciseIds, setFailedExerciseIds] = useState<Set<string>>(new Set(initialFailedIds));
  
  // Reconstruct retry exercises if we have failed IDs
  // This is a simplified reconstruction: we just append them again.
  // Ideally, we should know if they were already retried, but for now we assume pending retries.
  // A better way would be to store the full queue in DB, but that's complex.
  // If initialIndex > initialLesson.exercises.length, we know we are deep in retries.
  // For MVP: We will just rely on index. If index points to a retry that doesn't exist in base exercises,
  // we need to generate it on the fly or just reset if invalid.
  
  // Better approach:
  // If we have failedIds, let's append them as retries immediately to 'exercises' 
  // so the index has something to point to if it's out of bounds of original length.
  const retryExercises = initialLesson.exercises
      .filter(ex => initialFailedIds.includes(ex.id))
      .map(ex => ({ ...ex, isRetry: true }));
      
  const [exercises, setExercises] = useState<Exercise[]>([...initialLesson.exercises, ...retryExercises]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(initialIndex);
  
  const [hearts, setHearts] = useState(initialHearts);
  const [nextRefill, setNextRefill] = useState<Date | null>(null);
  const [showHeartsModal, setShowHeartsModal] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Selection States
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedPairs, setSelectedPairs] = useState<{[key: string]: string}>({});
  const [translationWords, setTranslationWords] = useState<string[]>([]);
  
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentExercise = exercises[currentExerciseIndex];

  // Parse options if they are strings (JSON)
  let parsedOptions: any = currentExercise.options;
  if (typeof parsedOptions === 'string') {
      try {
          parsedOptions = JSON.parse(parsedOptions);
      } catch (e) {
          // Fallback if it's just a comma separated string? 
          // For now assume valid JSON from admin
      }
  }

  // --- RETRY HINT LOGIC ---
  // If this is a retry, we simplify the options to make it easier
  if ((currentExercise as any).isRetry) {
      if (currentExercise.type === "multiple_choice" || currentExercise.type === "image_selection") {
          // Filter to keep correct answer + 1 wrong answer (if possible)
          if (Array.isArray(parsedOptions)) {
             const correctOpt = parsedOptions.find((o: any) => o.isCorrect || o.id === currentExercise.correctAnswer || o.label === currentExercise.correctAnswer);
             if (correctOpt) {
                 const otherOpts = parsedOptions.filter((o: any) => o !== correctOpt);
                 // Take just one wrong option if available
                 const wrongOpt = otherOpts.length > 0 ? otherOpts[0] : null;
                 parsedOptions = wrongOpt ? [correctOpt, wrongOpt].sort(() => Math.random() - 0.5) : [correctOpt];
             }
          }
      }
      // For translation, we could pre-fill words, but that complicates state (translationWords).
      // Instead, we might just leave it as is or handle it in useEffect.
  }

  useEffect(() => {
    setProgress(((currentExerciseIndex) / initialLesson.exercises.length) * 100);

    // Pre-fill translation if retry
    if ((currentExercise as any).isRetry && currentExercise.type === "translation" && !isChecked) {
        const answerWords = currentExercise.correctAnswer?.split(" ") || [];
        if (answerWords.length > 0) {
            setTranslationWords(answerWords.slice(0, Math.ceil(answerWords.length / 2))); // Pre-fill 50%
        }
    }
  }, [currentExerciseIndex, initialLesson.exercises.length, currentExercise, isChecked]);

  // Check hearts on mount and polling
  useEffect(() => {
    if (hearts === 0) {
        setShowHeartsModal(true);
        const checkRefill = async () => {
             const res = await fetch("/api/user/hearts");
             const data = await res.json();
             if (data.nextRefill) setNextRefill(new Date(data.nextRefill));
             
             // Auto-resume if hearts refilled
             if (data.hearts > 0) {
                 setHearts(data.hearts);
                 setShowHeartsModal(false);
             }
        };
        
        checkRefill();
        const interval = setInterval(checkRefill, 10000); // Check every 10s
        return () => clearInterval(interval);
    }
  }, [hearts]);

  // Tracking failed exercises to calculate score accurately
  // const [failedExerciseIds, setFailedExerciseIds] = useState<Set<string>>(new Set()); -> Removed redundant declaration

  const loseHeart = () => {
    setHearts((prev) => {
      const newHearts = Math.max(0, prev - 1);
      if (newHearts === 0) {
        setShowHeartsModal(true);
        fetch("/api/user/hearts")
            .then(res => res.json())
            .then(data => {
                if (data.nextRefill) setNextRefill(new Date(data.nextRefill));
            });
      }
      return newHearts;
    });

    fetch("/api/user/hearts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heartsLost: 1 }),
    }).catch((error) => console.error("Failed to decrement hearts:", error));
  };

  const handleCheck = async () => {
    let correct = false;

    if (currentExercise.type === "image_selection" || currentExercise.type === "multiple_choice") {
        // ... (existing logic) ...
        if (Array.isArray(parsedOptions) && typeof parsedOptions[0] === 'object') {
             const selectedOpt = parsedOptions.find((o: any) => o.id === selectedOption);
             // If options have isCorrect field
             if (selectedOpt?.isCorrect) correct = true;
             // Fallback: check against correctAnswer field
             else if (currentExercise.correctAnswer && (selectedOpt?.label === currentExercise.correctAnswer || selectedOpt?.id === currentExercise.correctAnswer)) correct = true;
        } else {
             // Simple string matching
             correct = selectedOption === currentExercise.correctAnswer;
        }
    } else if (currentExercise.type === "matching") {
        // Matching logic is handled instantly on click, so handleCheck is just for the final "Continue"
        if (Object.keys(selectedPairs).length === parsedOptions.length) {
            correct = true;
        }
    } else if (currentExercise.type === "translation") {
        const sentence = translationWords.join(" ");
        correct = sentence.trim() === currentExercise.correctAnswer?.trim();
    } else if (currentExercise.type === "fill_blank") {
        correct = selectedOption === currentExercise.correctAnswer;
        if (!correct && Array.isArray(parsedOptions)) {
             const selectedOpt = parsedOptions.find((o: any) => o.id === selectedOption);
             if (selectedOpt?.isCorrect) correct = true;
        }
    } else if (currentExercise.type === "speech") {
        correct = isCorrect === true; 
    }

    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
       // Good job
    } else {
       loseHeart();
       setFailedExerciseIds(prev => new Set(prev).add(initialLesson.exercises.find(e => e.question === currentExercise.question)?.id || currentExercise.id));
       
       // Queue retry at the end
       const retryExercise = { ...currentExercise, isRetry: true };
       setExercises(prev => [...prev, retryExercise]);
    }
  };

  // Save progress without completing
  const saveProgress = async (index: number, failedIds: Set<string>) => {
      try {
          await fetch("/api/user/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  lessonId: initialLesson.id,
                  completed: false,
                  activeExerciseIndex: index,
                  activeFailedIds: Array.from(failedIds)
              })
          });
      } catch (error) {
          console.error("Failed to save progress", error);
      }
  };

  const handleNext = async () => {
    if (currentExerciseIndex < exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      saveProgress(nextIndex, failedExerciseIds);
      
      // Reset states
      setSelectedOption(null);
      setTranslationWords([]);
      setSelectedPairs({});
      setIsChecked(false);
      setIsCorrect(null);
    } else {
      // Lesson Complete!
      await finishLesson();
    }
  };

  // Helper for Matching Exercise
  const handleMatchClick = (item: { id: string, value: string, side: 'left' | 'right' }) => {
      if (isChecked) return; // Disable interaction if already checked/completed

      // If nothing selected, select it
      if (!selectedOption) {
          setSelectedOption(JSON.stringify(item)); // Store complex selection as string
          return;
      }

      // If clicking the same item, deselect
      const prev = JSON.parse(selectedOption);
      if (prev.id === item.id && prev.side === item.side) {
          setSelectedOption(null);
          return;
      }

      // If clicking same side (e.g. left then left), switch selection
      if (prev.side === item.side) {
          setSelectedOption(JSON.stringify(item));
          return;
      }

      // If clicking opposite side, check match
      const leftItem = prev.side === 'left' ? prev : item;
      const rightItem = prev.side === 'right' ? prev : item;

      // In our seed, options are like { id: "1", left: "Mbote", right: "Bonjour" }
      // So if leftItem.id === rightItem.id, it's a match!
      if (leftItem.id === rightItem.id) {
          // Correct Match!
          const newPairs = { ...selectedPairs, [leftItem.id]: "matched" };
          setSelectedPairs(newPairs);
          setSelectedOption(null);

          // Check if all matched
          if (Object.keys(newPairs).length === parsedOptions.length) {
              setIsCorrect(true);
              setIsChecked(true);
              // Play sound?
          }
      } else {
          // Incorrect Match
          loseHeart();
          // Visual feedback (shake) could be added here
          setSelectedOption(null); // Reset selection
      }
  };

  // Prepare shuffled lists for matching
  // Note: We should memoize this to prevent reshuffling on every render, 
  // but for now simplistic approach inside render or useEffect
  // Actually, we need state for shuffled items to keep them consistent
  const [shuffledLeft, setShuffledLeft] = useState<any[]>([]);
  const [shuffledRight, setShuffledRight] = useState<any[]>([]);

  useEffect(() => {
      if (currentExercise.type === "matching" && Array.isArray(parsedOptions)) {
          setShuffledLeft([...parsedOptions].sort(() => Math.random() - 0.5));
          setShuffledRight([...parsedOptions].sort(() => Math.random() - 0.5));
      }
  }, [currentExerciseIndex, currentExercise.type]);

  const finishLesson = async () => {
      const totalUnique = initialLesson.exercises.length;
      const failedCount = failedExerciseIds.size;
      const correctFirstTry = Math.max(0, totalUnique - failedCount);
      const scorePercentage = Math.round((correctFirstTry / totalUnique) * 100);

      try {
          await fetch("/api/user/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  lessonId: initialLesson.id,
                  completed: true,
                  xp: 10,
                  score: scorePercentage
              })
          });
          // Redirect to Summary page
          router.push(`/lesson/summary?xp=10&score=${scorePercentage}`); 
      } catch (error) {
          console.error("Failed to save progress", error);
      }
  };

  const handleSpeechComplete = (score: number) => {
    const passed = score >= 70; // Mock threshold
    setIsCorrect(passed);
    setIsChecked(true);
    if (!passed) loseHeart();
  };

  // Helper for Translation Exercise
  const toggleTranslationWord = (word: string) => {
      if (isChecked) return;
      if (translationWords.includes(word)) {
          setTranslationWords(translationWords.filter(w => w !== word));
      } else {
          setTranslationWords([...translationWords, word]);
      }
  };

  if (!currentExercise) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto px-3 sm:px-4 py-4">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <Link href="/learn" className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </Link>
        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-green transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-1 text-brand-red font-bold">
          <Heart className="w-6 h-6 fill-current" />
          <span>{hearts}</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          {currentExercise.question}
        </h1>

        {/* --- IMAGE SELECTION --- */}
        {currentExercise.type === "image_selection" && (
          <div className="grid grid-cols-2 gap-4">
            {parsedOptions?.map((option: any) => (
              <button
                key={option.id}
                onClick={() => !isChecked && setSelectedOption(option.id)}
                className={`p-6 rounded-2xl border-2 border-b-4 transition-all ${
                  selectedOption === option.id
                    ? "border-brand-blue bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {/* Fallback icon if not present */}
                <div className="text-4xl mb-2">{option.icon || "🖼️"}</div> 
                <div className="font-bold text-gray-700">{option.label}</div>
              </button>
            ))}
          </div>
        )}

        {/* --- MULTIPLE CHOICE --- */}
        {currentExercise.type === "multiple_choice" && (
           <div className="space-y-4">
              {parsedOptions?.map((option: any) => (
                 <button
                    key={option.id}
                    onClick={() => !isChecked && setSelectedOption(option.id)}
                    className={`w-full p-4 rounded-xl border-2 border-b-4 text-left font-bold transition-all ${
                       selectedOption === option.id
                       ? "border-brand-blue bg-blue-50 text-brand-blue"
                       : "border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                 >
                    {option.label}
                 </button>
              ))}
           </div>
        )}

        {/* --- FILL BLANK --- */}
        {currentExercise.type === "fill_blank" && (
           <div className="space-y-8">
              <div className="text-xl font-medium text-gray-700 p-6 border-2 border-gray-200 rounded-2xl bg-gray-50 text-center">
                 {/* Replace underscore with selected option or blank line */}
                 {currentExercise.question.split("___").map((part, i, arr) => (
                    <span key={i}>
                       {part}
                       {i < arr.length - 1 && (
                          <span className={`inline-block border-b-2 border-gray-400 min-w-[60px] mx-1 font-bold text-brand-blue ${selectedOption ? "px-2" : ""}`}>
                             {parsedOptions.find((o: any) => o.id === selectedOption)?.label || "_"}
                          </span>
                       )}
                    </span>
                 ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {parsedOptions?.map((option: any) => (
                    <button
                       key={option.id}
                       onClick={() => !isChecked && setSelectedOption(option.id)}
                       className={`p-4 rounded-xl border-2 border-b-4 font-bold ${
                          selectedOption === option.id 
                          ? "border-brand-blue bg-blue-50 text-brand-blue"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                       }`}
                    >
                       {option.label}
                    </button>
                 ))}
              </div>
           </div>
        )}

        {/* --- MATCHING --- */}
        {currentExercise.type === "matching" && (
           <div className="grid grid-cols-2 gap-8 w-full max-w-md mx-auto">
              <div className="flex flex-col gap-4">
                 {shuffledLeft.map((opt: any) => {
                    const isMatched = selectedPairs[opt.id] === "matched";
                    const isSelected = selectedOption && JSON.parse(selectedOption).id === opt.id && JSON.parse(selectedOption).side === 'left';
                    
                    return (
                        <button
                           key={`left-${opt.id}`}
                           onClick={() => !isMatched && handleMatchClick({ id: opt.id, value: opt.left, side: 'left' })}
                           disabled={isMatched}
                           className={`p-4 rounded-xl border-2 border-b-4 font-bold transition-all ${
                              isMatched 
                              ? "opacity-0 cursor-default" // Hide if matched
                              : isSelected
                                ? "border-brand-blue bg-blue-50 text-brand-blue"
                                : "border-gray-200 hover:bg-gray-50 text-gray-700"
                           }`}
                        >
                           {opt.left}
                        </button>
                    );
                 })}
              </div>
              <div className="flex flex-col gap-4">
                 {shuffledRight.map((opt: any) => {
                    const isMatched = selectedPairs[opt.id] === "matched";
                    const isSelected = selectedOption && JSON.parse(selectedOption).id === opt.id && JSON.parse(selectedOption).side === 'right';

                    return (
                        <button
                           key={`right-${opt.id}`}
                           onClick={() => !isMatched && handleMatchClick({ id: opt.id, value: opt.right, side: 'right' })}
                           disabled={isMatched}
                           className={`p-4 rounded-xl border-2 border-b-4 font-bold transition-all ${
                              isMatched 
                              ? "opacity-0 cursor-default"
                              : isSelected
                                ? "border-brand-blue bg-blue-50 text-brand-blue"
                                : "border-gray-200 hover:bg-gray-50 text-gray-700"
                           }`}
                        >
                           {opt.right}
                        </button>
                    );
                 })}
              </div>
           </div>
        )}

        {/* --- SPEECH --- */}
        {currentExercise.type === "speech" && (
          <VoiceRecorder 
            expectedText={currentExercise.correctAnswer || ""} 
            onComplete={handleSpeechComplete}
          />
        )}

        {/* --- TRANSLATION --- */}
        {currentExercise.type === "translation" && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-4xl">🦉</span>
              </div>
              <div className="p-4 border-2 border-gray-200 rounded-2xl relative bubble-left">
                {/* The question usually contains the prompt text in the seed */}
                <p className="font-medium text-gray-700">{currentExercise.question.replace("Traduire :", "").replace("**", "").replace("**", "")}</p>
              </div>
            </div>

            <div className="min-h-[60px] border-b-2 border-gray-200 flex flex-wrap gap-2 p-2">
               {translationWords.map((word, i) => (
                  <button key={i} onClick={() => toggleTranslationWord(word)} className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 shadow-sm">
                     {word}
                  </button>
               ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {parsedOptions?.map((word: string, i: number) => (
                !translationWords.includes(word) && (
                    <button 
                        key={i} 
                        onClick={() => toggleTranslationWord(word)} 
                        className="px-4 py-2 bg-white border-2 border-b-4 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 active:border-b-2 active:translate-y-[2px]"
                    >
                    {word}
                    </button>
                )
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 p-8 border-t-2 z-50 ${
        isChecked 
          ? isCorrect 
            ? "bg-green-100 border-green-200" 
            : "bg-red-100 border-red-200"
          : "bg-white border-gray-200"
      }`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {isChecked ? (
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isCorrect ? "bg-white text-green-500" : "bg-white text-red-500"
              }`}>
                {isCorrect ? <div className="text-2xl">✓</div> : <div className="text-2xl">✗</div>}
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}>
                  {isCorrect ? "Excellent !" : "La bonne réponse :"}
                </h3>
                {!isCorrect && (
                  <p className="text-red-500 font-medium">
                    {currentExercise.correctAnswer}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <button
            onClick={isChecked ? handleNext : handleCheck}
            // Disable logic simplified for now
            className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px] ${
              isChecked 
                ? isCorrect 
                  ? "bg-green-500 hover:bg-green-600 shadow-green-700" 
                  : "bg-red-500 hover:bg-red-600 shadow-red-700"
                : "bg-brand-green hover:bg-brand-green-dark shadow-green-700"
            }`}
          >
            {isChecked ? "CONTINUER" : "VÉRIFIER"}
          </button>
        </div>
      </footer>
      
      <HeartsModal 
        isOpen={showHeartsModal} 
        onClose={() => router.push("/learn")} 
        nextRefill={nextRefill} 
      />
    </div>
  );
}

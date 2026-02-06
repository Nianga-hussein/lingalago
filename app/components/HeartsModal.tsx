"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { X, Heart, Clock } from "lucide-react";
import Countdown from "@/app/components/Countdown";

type HeartsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nextRefill: Date | null;
};

export default function HeartsModal({ isOpen, onClose, nextRefill }: HeartsModalProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-50 to-transparent -z-10"></div>

        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
           <Heart className="w-12 h-12 text-red-500 fill-current" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">Plus de vies !</h2>
          <p className="text-gray-500 text-lg">
            Vous avez utilisé toutes vos vies. Attendez qu'elles se rechargent pour continuer.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100 flex flex-col items-center gap-2">
           <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-wide text-sm">
             <Clock className="w-4 h-4" />
             Prochaine vie dans
           </div>
           {nextRefill ? (
               <Countdown targetDate={nextRefill} />
           ) : (
               <div className="text-2xl font-bold text-gray-400">--:--</div>
           )}
           <p className="text-xs text-gray-400 font-medium">1 vie = 2 minutes</p>
        </div>

        <div className="space-y-3 pt-4">
          <button
            onClick={() => router.push("/learn")}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all uppercase tracking-wide"
          >
            Quitter la leçon
          </button>
        </div>

      </div>
    </div>
  );
}

import Link from "next/link";
import { Star, Book, Heart, Zap, Flame, Crown } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="py-6 px-4">
      {/* Top Bar */}
      <header className="flex items-center justify-between gap-4 mb-8 bg-white/90 backdrop-blur-sm sticky top-0 py-2 z-40">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇺🇸</span> 
        </div>
        
        <div className="flex items-center gap-1 text-brand-orange font-bold">
          <Flame className="w-5 h-5 fill-current" />
          <span>1</span>
        </div>

        <div className="flex items-center gap-1 text-brand-blue font-bold">
          <div className="w-5 h-5 bg-brand-blue rounded-sm rotate-45"></div>
          <span>462</span>
        </div>

        <div className="flex items-center gap-1 text-brand-red font-bold">
          <Heart className="w-5 h-5 fill-current" />
          <span>25</span>
        </div>
      </header>

      {/* Unit Header */}
      <div className="bg-brand-green rounded-2xl p-4 mb-8 text-white flex justify-between items-center shadow-[0_4px_0_#46a302]">
        <div>
          <h2 className="font-bold text-sm opacity-80 uppercase tracking-widest mb-1">Chapitre 1, Unité 1</h2>
          <p className="font-bold text-lg">Commande au café</p>
        </div>
        <Book className="w-8 h-8" />
      </div>

      {/* Path */}
      <div className="flex flex-col items-center gap-8 pb-20">
        
        {/* Node 1 - Active */}
        <Link href="/lesson/summary" className="relative group">
          <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center shadow-[0_6px_0_#46a302] group-active:shadow-none group-active:translate-y-[6px] transition-all relative z-10">
            <Star className="w-10 h-10 text-white fill-current" />
          </div>
          {/* Crown Float */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-xl border-2 border-gray-200 font-bold text-brand-green text-sm shadow-sm animate-bounce">
            COMMENCER
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-gray-200 rotate-45"></div>
          </div>
        </Link>

        {/* Node 2 - Locked */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center shadow-[0_6px_0_#e5e5e5] ml-16">
          <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center opacity-50">
             <Star className="w-8 h-8 text-white fill-current" />
          </div>
        </div>

        {/* Node 3 - Locked */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center shadow-[0_6px_0_#e5e5e5] mr-16">
          <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center opacity-50">
             <div className="w-8 h-6 border-2 border-white rounded-md"></div>
          </div>
        </div>

        {/* Chest */}
        <div className="w-20 h-20 flex items-center justify-center">
           <div className="w-16 h-14 bg-[#b57d2a] rounded-xl border-b-4 border-[#8d6120] flex items-center justify-center relative">
              <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-600"></div>
           </div>
        </div>

        {/* Node 4 - Locked */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center shadow-[0_6px_0_#e5e5e5] ml-16">
          <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center opacity-50">
             <div className="w-8 h-8 border-2 border-white rounded-full"></div>
          </div>
        </div>

        {/* Floating Mascot */}
        <div className="fixed bottom-24 right-4 animate-bounce-slow hidden md:block">
           <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-4xl">🦉</span>
           </div>
        </div>

      </div>
    </div>
  );
}

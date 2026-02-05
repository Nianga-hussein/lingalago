import Link from "next/link";
import { Globe } from "lucide-react";

export default function IntroPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pb-12">
      {/* Speech Bubble */}
      <div className="relative mb-6">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-lg shadow-sm">
          Salut, moi c'est Lingo !
        </div>
        {/* Triangle for speech bubble */}
        <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-gray-200 rotate-45"></div>
      </div>

      {/* Mascot */}
      <div className="w-40 h-40 animate-bounce-slow mb-12">
        <Globe className="w-full h-full text-brand-green" />
      </div>

      <div className="flex-1"></div>

      <Link href="/onboarding/goal" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] text-center block">
        CONTINUER
      </Link>
    </div>
  );
}

import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function IntroPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pb-12 px-4">
      {/* Speech Bubble */}
      <div className="relative mb-6">
        <div className="bg-background border-2 border-gray-200 rounded-2xl p-4 text-gray-700 font-bold text-base sm:text-lg shadow-sm">
          {"Salut, moi c'est Lingo !"}
        </div>
        {/* Triangle for speech bubble */}
        <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-background border-b-2 border-r-2 border-gray-200 rotate-45"></div>
      </div>

      {/* Animated Mascot */}
      <div className="mb-10 sm:mb-12">
        <Logo size="xl" animate mood="encourage" />
      </div>

      <div className="flex-1"></div>

      <Link
        href="/onboarding/goal"
        className="w-full max-w-sm bg-[#58CC02] hover:bg-[#46a302] text-background font-bold py-4 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] text-center block mx-auto"
      >
        CONTINUER
      </Link>
    </div>
  );
}

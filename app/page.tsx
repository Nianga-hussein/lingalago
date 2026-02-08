import Link from "next/link";
import { Mic, Smartphone, BookOpen, LucideIcon } from "lucide-react";
import Logo from "@/app/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex border-b border-gray-200 py-3 px-4 sm:px-6 md:px-12 items-center justify-between sticky top-0 bg-background/90 backdrop-blur-sm z-50">
        <Logo size="sm" showText animate={false} />
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/admin"
            className="text-gray-400 hover:text-gray-600 font-bold uppercase text-xs sm:text-sm tracking-wide hidden sm:block"
          >
            Espace Admin
          </Link>
          <Link
            href="/login"
            className="text-[#58CC02] font-bold py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wide hover:bg-green-50 transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="bg-[#58CC02] hover:bg-[#46a302] text-background font-bold py-2.5 px-4 sm:px-6 rounded-xl transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] text-xs sm:text-sm"
          >
            {"C'est parti !"}
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 md:py-0 max-w-lg mx-auto w-full">
        <div className="mb-6">
          <Logo size="xl" animate />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#58CC02] mb-3 tracking-wide text-balance">
          LingalaGo
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 font-medium mb-10 sm:mb-12 text-pretty">
          Apprends gratuitement. Pour toujours.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Link
            href="/signup"
            className="w-full bg-[#58CC02] hover:bg-[#46a302] text-background font-bold py-3.5 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] flex items-center justify-center"
          >
            {"C'EST PARTI !"}
          </Link>
          <Link
            href="/login"
            className="w-full bg-background border-2 border-gray-200 hover:bg-gray-50 text-[#58CC02] font-bold py-3.5 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(229,229,229)] hover:shadow-[0_2px_0_rgb(229,229,229)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px]"
          >
            {"J'AI DEJA UN COMPTE"}
          </Link>
        </div>
      </main>

      {/* Features Grid */}
      <section className="bg-gray-50 py-16 sm:py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          <FeatureCard
            icon={Smartphone}
            title="Gamification"
            description="Apprends en t'amusant avec des points, des niveaux et des classements."
            color="text-[#FFC800]"
          />
          <FeatureCard
            icon={Mic}
            title="Audio Natif"
            description="Ecoute des locuteurs natifs pour perfectionner ton accent congolais."
            color="text-[#1CB0F6]"
          />
          <FeatureCard
            icon={BookOpen}
            title="Culture Riche"
            description="Decouvre les proverbes, le slang et la culture de la RDC et du Congo-Brazzaville."
            color="text-[#FF4B4B]"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#58CC02] py-8 sm:py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Logo size="xs" animate={false} />
          <span className="font-bold text-background text-lg tracking-wide">LingalaGo</span>
        </div>
        <p className="text-background/80 font-bold text-sm">
          {"2026 LingalaGo. Fait avec amour pour l'Afrique."}
        </p>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className={`w-12 h-12 sm:w-16 sm:h-16 ${color} mb-4 sm:mb-6`} />
      <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2 sm:mb-3">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed text-sm sm:text-base">{description}</p>
    </div>
  );
}

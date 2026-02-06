import Link from "next/link";
import { Globe, Mic, Smartphone, BookOpen, LucideIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Hidden for mobile app feel on hero */}
      <header className="hidden md:flex border-b border-gray-200 py-4 px-6 md:px-12 items-center justify-between sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="text-2xl font-bold text-brand-green tracking-wide">LingalaGo</div>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin" 
            className="text-gray-400 hover:text-gray-600 font-bold uppercase text-sm tracking-wide hidden md:block"
          >
            Espace Admin
          </Link>
          <Link href="/signup" className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px]">
            C&apos;est parti !
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto w-full">
        <div className="mb-8 relative w-48 h-48 animate-bounce-slow">
           <Globe className="w-full h-full text-brand-green" />
        </div>
        
        <h1 className="text-4xl font-bold text-brand-green mb-3 tracking-wide">
          lingalago
        </h1>
        
        <p className="text-xl text-gray-400 font-medium mb-12">
          Apprends gratuitement. Pour toujours.
        </p>
        
        <div className="flex flex-col gap-3 w-full">
          <Link href="/signup" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3.5 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] flex items-center justify-center">
            C&apos;EST PARTI !
          </Link>
          <Link href="/login" className="w-full bg-white border-2 border-gray-200 hover:bg-gray-50 text-brand-green font-bold py-3.5 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-[0_4px_0_rgb(229,229,229)] hover:shadow-[0_2px_0_rgb(229,229,229)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px]">
            J&apos;AI DÉJÀ UN COMPTE
          </Link>
        </div>
      </main>

      {/* Hidden Footer for mobile feel */}
      <div className="hidden">
      {/* Features Grid */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={Smartphone} 
            title="Gamification" 
            description="Apprends en t&apos;amusant avec des points, des niveaux et des classements." 
            color="text-brand-yellow"
          />
          <FeatureCard 
            icon={Mic} 
            title="Audio Natif" 
            description="Écoute des locuteurs natifs pour perfectionner ton accent congolais." 
            color="text-brand-blue"
          />
          <FeatureCard 
            icon={BookOpen} 
            title="Culture Riche" 
            description="Découvre les proverbes, le slang et la culture de la RDC et du Congo-Brazzaville." 
            color="text-brand-red"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-green py-12 text-center text-white/80 font-bold">
        <p>© 2026 LingalaGo. Fait avec ❤️ pour l&apos;Afrique.</p>
      </footer>
      </div>
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
      <Icon className={`w-16 h-16 ${color} mb-6`} />
      <h3 className="text-xl font-bold text-gray-700 mb-3">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed">{description}</p>
    </div>
  );
}

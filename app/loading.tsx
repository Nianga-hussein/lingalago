import { Globe, BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <div className="relative mb-8 w-40 h-40 animate-bounce-slow">
        {/* Mascot reading book representation */}
        <div className="absolute inset-0 flex items-center justify-center text-brand-green">
           <Globe className="w-full h-full" />
        </div>
        <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg">
           <BookOpen className="w-8 h-8 text-brand-blue" />
        </div>
      </div>

      <h2 className="text-gray-400 font-bold tracking-widest uppercase mb-4 text-sm animate-pulse">
        Chargement en cours...
      </h2>

      <p className="text-gray-700 font-medium text-lg max-w-xs leading-relaxed">
        LingalaGo est la plus grande école de langues au monde en nombre d'étudiants !
      </p>
    </div>
  );
}

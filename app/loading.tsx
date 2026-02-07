import Logo from "@/app/components/Logo";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <div className="relative mb-8">
        <Logo size="xl" animate />
      </div>

      <h2 className="text-gray-400 font-bold tracking-widest uppercase mb-4 text-sm animate-pulse">
        Chargement en cours...
      </h2>

      <p className="text-gray-700 font-medium text-base sm:text-lg max-w-xs leading-relaxed text-pretty">
        {"LingalaGo est la plus grande ecole de langues au monde en nombre d'etudiants !"}
      </p>
    </div>
  );
}

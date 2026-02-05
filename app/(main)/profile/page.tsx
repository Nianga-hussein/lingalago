import { Settings, Flag, UserPlus, Zap } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-400">NIANGA Claude Hussein</h1>
        <button>
          <Settings className="w-6 h-6 text-brand-blue" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="flex flex-col items-center mb-8 border-b-2 border-gray-100 pb-8">
        <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 border-4 border-white shadow-lg">
          N
        </div>
        <h2 className="text-2xl font-bold text-gray-800">NIANGA Claude Hussein</h2>
        <p className="text-gray-400 font-bold text-sm mb-4">@TRAKONI • MEMBRE DEPUIS 2022</p>
        
        <div className="flex gap-4 mb-6">
          <span className="text-2xl">🇺🇸</span>
          <span className="text-2xl">🇮🇹</span>
        </div>

        <div className="grid grid-cols-2 gap-12 w-full max-w-xs text-center">
          <div>
            <p className="font-bold text-xl text-gray-800">1</p>
            <p className="text-gray-400 text-xs font-bold uppercase">Abonnements</p>
          </div>
          <div>
            <p className="font-bold text-xl text-gray-800">22</p>
            <p className="text-gray-400 text-xs font-bold uppercase">Abonnés</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6 w-full">
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 py-3 rounded-xl font-bold text-brand-blue uppercase text-sm tracking-wide hover:bg-gray-50">
            <UserPlus className="w-5 h-5" />
            Ajouter des amis
          </button>
          <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50">
            <Zap className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Récap</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-gray-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-brand-orange">
               <Flame className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-gray-800">1 jour</p>
              <p className="text-xs text-gray-400 font-bold uppercase">Série</p>
            </div>
          </div>
          <div className="border-2 border-gray-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-brand-yellow">
               <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-gray-800">5698 XP</p>
              <p className="text-xs text-gray-400 font-bold uppercase">Total XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Flame({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.7 1.2 1.9 2.3 2.9 2.8z"></path>
    </svg>
  );
}

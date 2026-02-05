import { Shield, ArrowUp, ArrowDown } from "lucide-react";

export default function LeaderboardPage() {
  const users = [
    { rank: 11, name: "Emilie M", xp: 25, avatar: "E", color: "bg-red-500", country: "🇪🇸" },
    { rank: 12, name: "Léa Flon", xp: 20, avatar: "L", color: "bg-purple-500", country: "🇪🇸" },
    { rank: 13, name: "Hanna", xp: 18, avatar: "H", color: "bg-red-500", country: "🇪🇸" },
    { rank: 14, name: "NIANGA Claude Hussein", xp: 10, avatar: "N", color: "bg-blue-600", country: "🇺🇸", isMe: true },
    { rank: 15, name: "urijah", xp: 10, avatar: "u", color: "bg-orange-900", country: "🇧🇷" },
    { rank: 16, name: "Madelyn Badenhorst", xp: 10, avatar: "M", color: "bg-pink-300", country: "🇩🇪" },
  ];

  return (
    <div className="py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Division Argent</h1>
        <p className="text-gray-400 font-bold text-xs uppercase flex items-center gap-1">
          <Shield className="w-3 h-3" /> 3 Jours restants
        </p>
      </div>

      {/* Trophies Header */}
      <div className="flex justify-center gap-8 mb-8 opacity-50 grayscale">
        <div className="w-16 h-20 bg-amber-600/20 rounded-lg"></div>
        <div className="w-20 h-24 bg-gray-300 rounded-lg"></div>
        <div className="w-16 h-20 bg-yellow-600/20 rounded-lg"></div>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.rank}>
            {user.rank === 13 && (
              <div className="flex items-center justify-center gap-2 text-green-500 font-bold text-xs uppercase py-4">
                <ArrowUp className="w-4 h-4" /> Zone de promotion
              </div>
            )}
            
            {user.rank === 16 && (
              <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-xs uppercase py-4">
                <ArrowDown className="w-4 h-4" /> Zone de relégation
              </div>
            )}

            <div className={`flex items-center p-4 rounded-2xl ${user.isMe ? 'bg-gray-100 border-2 border-gray-200' : 'hover:bg-gray-50'}`}>
              <span className={`font-bold w-8 text-center ${user.rank <= 3 ? 'text-brand-yellow' : 'text-gray-400'}`}>
                {user.rank}
              </span>
              
              <div className={`w-10 h-10 rounded-full ${user.color} text-white flex items-center justify-center font-bold text-sm mx-4 relative`}>
                {user.avatar}
                <span className="absolute bottom-0 right-0 text-[10px]">{user.country}</span>
              </div>
              
              <div className="flex-1">
                <h3 className={`font-bold ${user.isMe ? 'text-brand-blue' : 'text-gray-700'}`}>
                  {user.name}
                </h3>
                <p className="text-xs text-gray-400 font-bold">{user.xp} XP</p>
              </div>

              <span className="font-bold text-gray-500 text-sm">{user.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

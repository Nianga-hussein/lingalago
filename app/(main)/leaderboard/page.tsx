import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth";
import { Shield, ArrowUp, Crown, Medal, Trophy } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";

async function getLeaderboardData() {
  const session = await getSession();
  if (!session) return null;

  // Fetch top 50 users by XP (Evolutive List)
  const topUsers = await prisma.user.findMany({
    orderBy: { xp: "desc" },
    take: 50,
    select: {
      id: true,
      name: true,
      image: true,
      xp: true,
    },
  });

  return { users: topUsers, currentUserId: session.userId };
}

export default async function LeaderboardPage() {
  const data = await getLeaderboardData();

  if (!data) {
    redirect("/login");
  }

  const { users, currentUserId } = data;

  // Separate top 3 for podium
  const topThree = users.slice(0, 3);
  const restUsers = users.slice(3);

  // Check if current user is in the list
  const currentUserRank = users.findIndex(u => u.id === currentUserId) + 1;
  const isUserInList = currentUserRank > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* Header Banner */}
      <div className="bg-[#1CB0F6] pt-6 sm:pt-8 pb-14 sm:pb-16 px-4 sm:px-6 rounded-b-[30px] sm:rounded-b-[40px] shadow-lg relative overflow-hidden">
         {/* Decorative Circles */}
         <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
         <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl"></div>

         <div className="relative z-10 flex flex-col items-center text-white">
            <h1 className="text-2xl font-bold tracking-wide mb-1">Classement</h1>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
                <Shield className="w-4 h-4 text-brand-yellow fill-current" />
                <span className="text-xs font-bold uppercase tracking-wider">Division Argent</span>
            </div>
            <p className="mt-2 text-blue-100 text-sm font-medium">Se termine dans 3 jours</p>
         </div>
      </div>

      <div className="px-3 sm:px-4 -mt-10 max-w-xl mx-auto">
        {/* PODIUM SECTION */}
        <div className="flex justify-center items-end gap-2 mb-8 h-48">
            {/* 2nd Place */}
            {topThree[1] && (
                <div className="flex flex-col items-center w-1/3 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                    <div className="relative mb-2">
                        <div className="w-16 h-16 rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden shadow-lg">
                            {topThree[1].image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={topThree[1].image} alt={topThree[1].name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-gray-400">{topThree[1].name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="absolute -bottom-2 -right-1 bg-gray-300 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                            2
                        </div>
                    </div>
                    <div className="w-full bg-gradient-to-b from-gray-300 to-gray-400 h-24 rounded-t-2xl shadow-lg flex flex-col items-center justify-start pt-2">
                        <span className="font-bold text-white text-sm truncate w-full text-center px-1">{topThree[1].name}</span>
                        <span className="text-gray-100 text-xs font-medium">{topThree[1].xp} XP</span>
                    </div>
                </div>
            )}

            {/* 1st Place */}
            {topThree[0] && (
                <div className="flex flex-col items-center w-1/3 z-10 animate-in slide-in-from-bottom-8 duration-700">
                    <Crown className="w-8 h-8 text-brand-yellow fill-current mb-1 animate-bounce-slow" />
                    <div className="relative mb-2">
                         <div className="w-20 h-20 rounded-full border-4 border-brand-yellow bg-yellow-50 flex items-center justify-center overflow-hidden shadow-xl ring-4 ring-yellow-400/30">
                            {topThree[0].image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={topThree[0].image} alt={topThree[0].name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-yellow-600">{topThree[0].name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="absolute -bottom-3 -right-1 bg-brand-yellow text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            1
                        </div>
                    </div>
                    <div className="w-full bg-gradient-to-b from-yellow-400 to-yellow-600 h-32 rounded-t-2xl shadow-xl flex flex-col items-center justify-start pt-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 pattern-dots opacity-30"></div>
                        <span className="font-bold text-white text-base truncate w-full text-center px-1 relative z-10">{topThree[0].name}</span>
                        <span className="text-yellow-100 text-sm font-bold relative z-10">{topThree[0].xp} XP</span>
                    </div>
                </div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
                <div className="flex flex-col items-center w-1/3 animate-in slide-in-from-bottom-4 duration-700 delay-200">
                    <div className="relative mb-2">
                        <div className="w-16 h-16 rounded-full border-4 border-orange-300 bg-orange-50 flex items-center justify-center overflow-hidden shadow-lg">
                            {topThree[2].image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={topThree[2].image} alt={topThree[2].name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-orange-400">{topThree[2].name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="absolute -bottom-2 -right-1 bg-orange-400 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                            3
                        </div>
                    </div>
                    <div className="w-full bg-gradient-to-b from-orange-400 to-orange-600 h-20 rounded-t-2xl shadow-lg flex flex-col items-center justify-start pt-2">
                        <span className="font-bold text-white text-sm truncate w-full text-center px-1">{topThree[2].name}</span>
                        <span className="text-orange-100 text-xs font-medium">{topThree[2].xp} XP</span>
                    </div>
                </div>
            )}
        </div>

        {/* LIST SECTION */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             {restUsers.map((user, index) => {
                const rank = index + 4;
                const isMe = user.id === currentUserId;
                
                return (
                    <div key={user.id} className={`flex items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${isMe ? 'bg-blue-50/50' : ''}`}>
                         <div className="w-8 text-center font-bold text-gray-400 text-sm mr-2">{rank}</div>
                         
                         <div className="relative mr-4">
                             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold overflow-hidden border border-gray-200">
                                {user.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                             </div>
                         </div>
                         
                         <div className="flex-1 min-w-0">
                             <div className="flex items-center gap-2">
                                 <span className={`font-bold truncate ${isMe ? 'text-brand-blue' : 'text-gray-700'}`}>
                                     {user.name}
                                 </span>
                                 {isMe && <span className="text-[10px] bg-brand-blue text-white px-1.5 py-0.5 rounded font-bold uppercase">Moi</span>}
                             </div>
                         </div>
                         
                         <div className="text-right">
                             <span className="font-bold text-gray-700">{user.xp}</span>
                             <span className="text-xs text-gray-400 ml-1">XP</span>
                         </div>
                    </div>
                );
             })}
             
             {/* Divider if more users exist */}
             {restUsers.length > 0 && (
                 <div className="p-4 text-center text-xs text-gray-400 font-bold uppercase tracking-widest border-t border-gray-100 bg-gray-50">
                    ...
                 </div>
             )}

             {/* Sticky User Row (if not in top 50) - Mock for now as we don't fetch extra */}
             {!isUserInList && (
                <div className="flex items-center p-4 bg-blue-50/80 border-t-2 border-brand-blue/20">
                     <div className="w-8 text-center font-bold text-brand-blue text-sm mr-2">99+</div>
                     <div className="flex-1 font-bold text-brand-blue">Vous</div>
                     <div className="text-right font-bold text-brand-blue">-- XP</div>
                </div>
             )}
             
             {restUsers.length === 0 && topThree.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                    <Trophy className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>Le classement est vide pour le moment.</p>
                </div>
             )}
        </div>
      </div>
    </div>
  );
}

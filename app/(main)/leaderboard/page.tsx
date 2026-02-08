import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth";
import { Shield, Flame, Zap } from "lucide-react";
import { redirect } from "next/navigation";

// --- SVG Trophy Components ---
function TrophyGold({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Cup body */}
      <path d="M20 10 H60 V12 C60 38 52 52 40 58 C28 52 20 38 20 12 V10Z" fill="url(#goldGrad)" stroke="#B8860B" strokeWidth="1.5"/>
      {/* Handles */}
      <path d="M20 18 C10 18 6 28 12 36 C16 40 20 36 20 32" stroke="#DAA520" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M60 18 C70 18 74 28 68 36 C64 40 60 36 60 32" stroke="#DAA520" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Star */}
      <path d="M40 24 L43 32 L51 33 L45 38 L47 46 L40 42 L33 46 L35 38 L29 33 L37 32Z" fill="#FFF8DC" stroke="#B8860B" strokeWidth="0.5"/>
      {/* Stem */}
      <rect x="35" y="58" width="10" height="12" rx="2" fill="#DAA520" stroke="#B8860B" strokeWidth="1"/>
      {/* Base */}
      <rect x="24" y="70" width="32" height="8" rx="4" fill="url(#goldGrad)" stroke="#B8860B" strokeWidth="1"/>
      <rect x="28" y="78" width="24" height="6" rx="3" fill="#DAA520" stroke="#B8860B" strokeWidth="0.8"/>
      {/* Number 1 */}
      <text x="40" y="88" textAnchor="middle" fontSize="7" fontWeight="900" fill="#8B6914">1</text>
      {/* Shine */}
      <ellipse cx="32" cy="22" rx="4" ry="6" fill="white" opacity="0.3" transform="rotate(-15 32 22)"/>
      <defs>
        <linearGradient id="goldGrad" x1="20" y1="10" x2="60" y2="78">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="50%" stopColor="#FFC200"/>
          <stop offset="100%" stopColor="#DAA520"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function TrophySilver({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M18 10 H52 V12 C52 34 46 46 35 52 C24 46 18 34 18 12 V10Z" fill="url(#silverGrad)" stroke="#808080" strokeWidth="1.5"/>
      <path d="M18 16 C10 16 7 24 12 30 C15 34 18 30 18 28" stroke="#A8A8A8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M52 16 C60 16 63 24 58 30 C55 34 52 30 52 28" stroke="#A8A8A8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M35 22 L37.5 28 L44 29 L39 33 L40.5 40 L35 36.5 L29.5 40 L31 33 L26 29 L32.5 28Z" fill="#F0F0F0" stroke="#808080" strokeWidth="0.5"/>
      <rect x="30" y="52" width="10" height="10" rx="2" fill="#A8A8A8" stroke="#808080" strokeWidth="1"/>
      <rect x="22" y="62" width="26" height="7" rx="3.5" fill="url(#silverGrad)" stroke="#808080" strokeWidth="1"/>
      <rect x="25" y="69" width="20" height="5" rx="2.5" fill="#A8A8A8" stroke="#808080" strokeWidth="0.8"/>
      <text x="35" y="78" textAnchor="middle" fontSize="6" fontWeight="900" fill="#606060">2</text>
      <ellipse cx="28" cy="20" rx="3.5" ry="5" fill="white" opacity="0.35" transform="rotate(-15 28 20)"/>
      <defs>
        <linearGradient id="silverGrad" x1="18" y1="10" x2="52" y2="69">
          <stop offset="0%" stopColor="#E8E8E8"/>
          <stop offset="50%" stopColor="#C0C0C0"/>
          <stop offset="100%" stopColor="#A8A8A8"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function TrophyBronze({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M18 10 H52 V12 C52 34 46 46 35 52 C24 46 18 34 18 12 V10Z" fill="url(#bronzeGrad)" stroke="#8B5E3C" strokeWidth="1.5"/>
      <path d="M18 16 C10 16 7 24 12 30 C15 34 18 30 18 28" stroke="#CD7F32" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M52 16 C60 16 63 24 58 30 C55 34 52 30 52 28" stroke="#CD7F32" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M35 22 L37.5 28 L44 29 L39 33 L40.5 40 L35 36.5 L29.5 40 L31 33 L26 29 L32.5 28Z" fill="#FAEBD7" stroke="#8B5E3C" strokeWidth="0.5"/>
      <rect x="30" y="52" width="10" height="10" rx="2" fill="#CD7F32" stroke="#8B5E3C" strokeWidth="1"/>
      <rect x="22" y="62" width="26" height="7" rx="3.5" fill="url(#bronzeGrad)" stroke="#8B5E3C" strokeWidth="1"/>
      <rect x="25" y="69" width="20" height="5" rx="2.5" fill="#CD7F32" stroke="#8B5E3C" strokeWidth="0.8"/>
      <text x="35" y="78" textAnchor="middle" fontSize="6" fontWeight="900" fill="#6B3A1F">3</text>
      <ellipse cx="28" cy="20" rx="3.5" ry="5" fill="white" opacity="0.25" transform="rotate(-15 28 20)"/>
      <defs>
        <linearGradient id="bronzeGrad" x1="18" y1="10" x2="52" y2="69">
          <stop offset="0%" stopColor="#E8A86D"/>
          <stop offset="50%" stopColor="#CD7F32"/>
          <stop offset="100%" stopColor="#B87333"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// --- Small medal for ranks 4-10 ---
function MedalBadge({ rank }: { rank: number }) {
  const colors: Record<number, { bg: string; text: string; border: string }> = {
    4:  { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
    5:  { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
    6:  { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-200" },
    7:  { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-200" },
    8:  { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200" },
    9:  { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200" },
    10: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  };
  const c = colors[rank] || { bg: "bg-gray-100", text: "text-gray-500", border: "border-gray-200" };
  return (
    <div className={`w-8 h-8 rounded-full ${c.bg} ${c.text} ${c.border} border-2 flex items-center justify-center font-black text-xs`}>
      {rank}
    </div>
  );
}

// --- Avatar with initials fallback ---
function UserAvatar({ name, image, size = "md" }: { name: string; image: string | null; size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "w-20 h-20 text-2xl" : size === "md" ? "w-14 h-14 text-lg" : "w-10 h-10 text-sm";
  const initials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Deterministic color from name
  const hues = [210, 160, 340, 30, 270, 140, 0, 50, 190, 290];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const hue = hues[Math.abs(hash) % hues.length];

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={image} alt={name} className={`${dims} rounded-full object-cover`} />
    );
  }

  return (
    <div
      className={`${dims} rounded-full flex items-center justify-center font-black text-white`}
      style={{ backgroundColor: `hsl(${hue}, 55%, 50%)` }}
    >
      {initials}
    </div>
  );
}

// --- Data fetching ---
async function getLeaderboardData() {
  const session = await getSession();
  if (!session) return null;

  const topUsers = await prisma.user.findMany({
    orderBy: { xp: "desc" },
    take: 50,
    select: {
      id: true,
      name: true,
      image: true,
      xp: true,
      streak: true,
    },
  });

  return { users: topUsers, currentUserId: session.userId };
}

export default async function LeaderboardPage() {
  const data = await getLeaderboardData();
  if (!data) redirect("/login");

  const { users, currentUserId } = data;
  const topThree = users.slice(0, 3);
  const restUsers = users.slice(3);
  const currentUserRank = users.findIndex((u) => u.id === currentUserId) + 1;
  const isUserInList = currentUserRank > 0;
  const maxXP = topThree[0]?.xp || 1;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* ===== Header Banner ===== */}
      <div className="bg-gradient-to-br from-[#1CB0F6] to-[#0F8FD6] pt-6 sm:pt-8 pb-20 sm:pb-24 px-4 sm:px-6 rounded-b-[32px] shadow-lg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-10 right-10 w-24 h-24 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 flex flex-col items-center text-white">
          {/* Animated trophy icon */}
          <div className="w-14 h-14 mb-3 animate-bounce-slow">
            <svg viewBox="0 0 56 56" fill="none" className="w-full h-full drop-shadow-lg">
              <path d="M14 8H42V10C42 28 36 36 28 40C20 36 14 28 14 10V8Z" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"/>
              <path d="M14 14C8 14 5 20 9 26C12 28 14 26 14 24" stroke="#FFC200" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M42 14C48 14 51 20 47 26C44 28 42 26 42 24" stroke="#FFC200" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M28 18L30 23L35 23.5L31 27L32.5 32L28 29.5L23.5 32L25 27L21 23.5L26 23Z" fill="white" opacity="0.8"/>
              <rect x="24" y="40" width="8" height="6" rx="1.5" fill="#DAA520"/>
              <rect x="18" y="46" width="20" height="4" rx="2" fill="#FFD700"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-wide mb-2">Classement</h1>
          <div className="flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
            <Shield className="w-4 h-4 text-brand-yellow fill-current" />
            <span className="text-xs font-black uppercase tracking-wider">Division Argent</span>
          </div>
          <p className="mt-2 text-blue-100 text-xs font-bold">Se termine dans 3 jours</p>
        </div>
      </div>

      <div className="px-3 sm:px-4 -mt-14 max-w-xl mx-auto">
        {/* ===== PODIUM SECTION ===== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4">
          <div className="flex justify-center items-end gap-2 sm:gap-4 h-[260px]">
            {/* --- 2nd Place --- */}
            {topThree[1] && (
              <div className="flex flex-col items-center w-[30%] max-w-[120px]">
                <TrophySilver className="w-12 h-14 mb-2 drop-shadow-md" />
                <div className="relative mb-2">
                  <div className="ring-4 ring-gray-200 rounded-full shadow-md">
                    <UserAvatar name={topThree[1].name} image={topThree[1].image} size="md" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-400 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                    2
                  </div>
                </div>
                <div className="w-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-2xl pt-3 pb-4 flex flex-col items-center h-24 border border-gray-200/50">
                  <span className="font-black text-gray-700 text-xs truncate w-full text-center px-1">{topThree[1].name.split(" ")[0]}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="w-3 h-3 text-gray-500 fill-current" />
                    <span className="text-gray-500 text-[10px] font-black">{topThree[1].xp.toLocaleString()} XP</span>
                  </div>
                  {topThree[1].streak > 0 && (
                    <div className="flex items-center gap-0.5 mt-1">
                      <Flame className="w-3 h-3 text-orange-400 fill-current" />
                      <span className="text-orange-400 text-[10px] font-bold">{topThree[1].streak}j</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- 1st Place --- */}
            {topThree[0] && (
              <div className="flex flex-col items-center w-[34%] max-w-[140px] z-10">
                <TrophyGold className="w-16 h-20 mb-1 drop-shadow-lg" />
                <div className="relative mb-2">
                  <div className="ring-4 ring-yellow-300 rounded-full shadow-xl">
                    <UserAvatar name={topThree[0].name} image={topThree[0].image} size="lg" />
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-brand-yellow text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    1
                  </div>
                </div>
                <div className="w-full bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-t-2xl pt-3 pb-4 flex flex-col items-center h-28 border border-yellow-200/50 relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" />
                  <span className="font-black text-gray-800 text-sm truncate w-full text-center px-1 relative z-10">{topThree[0].name.split(" ")[0]}</span>
                  <div className="flex items-center gap-1 mt-1 relative z-10">
                    <Zap className="w-3.5 h-3.5 text-yellow-600 fill-current" />
                    <span className="text-yellow-700 text-xs font-black">{topThree[0].xp.toLocaleString()} XP</span>
                  </div>
                  {topThree[0].streak > 0 && (
                    <div className="flex items-center gap-0.5 mt-1 relative z-10">
                      <Flame className="w-3 h-3 text-orange-500 fill-current" />
                      <span className="text-orange-500 text-[10px] font-bold">{topThree[0].streak}j</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- 3rd Place --- */}
            {topThree[2] && (
              <div className="flex flex-col items-center w-[30%] max-w-[120px]">
                <TrophyBronze className="w-12 h-14 mb-2 drop-shadow-md" />
                <div className="relative mb-2">
                  <div className="ring-4 ring-orange-200 rounded-full shadow-md">
                    <UserAvatar name={topThree[2].name} image={topThree[2].image} size="md" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                    3
                  </div>
                </div>
                <div className="w-full bg-gradient-to-b from-orange-50 to-orange-100 rounded-t-2xl pt-3 pb-4 flex flex-col items-center h-20 border border-orange-200/50">
                  <span className="font-black text-gray-700 text-xs truncate w-full text-center px-1">{topThree[2].name.split(" ")[0]}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="w-3 h-3 text-orange-600 fill-current" />
                    <span className="text-orange-600 text-[10px] font-black">{topThree[2].xp.toLocaleString()} XP</span>
                  </div>
                  {topThree[2].streak > 0 && (
                    <div className="flex items-center gap-0.5 mt-1">
                      <Flame className="w-3 h-3 text-orange-400 fill-current" />
                      <span className="text-orange-400 text-[10px] font-bold">{topThree[2].streak}j</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== LIST SECTION ===== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Section header */}
          <div className="px-5 pt-4 pb-2 border-b border-gray-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Classement complet</span>
          </div>

          {restUsers.map((user, index) => {
            const rank = index + 4;
            const isMe = user.id === currentUserId;
            const xpPercent = Math.round((user.xp / maxXP) * 100);

            return (
              <div
                key={user.id}
                className={`flex items-center px-4 py-3.5 border-b border-gray-50 last:border-0 transition-colors ${
                  isMe ? "bg-blue-50/60 border-l-4 border-l-brand-blue" : "hover:bg-gray-50/50"
                }`}
              >
                {/* Rank */}
                <div className="mr-3 flex-shrink-0">
                  {rank <= 10 ? (
                    <MedalBadge rank={rank} />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <span className="font-black text-gray-400 text-sm">{rank}</span>
                    </div>
                  )}
                </div>

                {/* Avatar */}
                <div className="mr-3 flex-shrink-0">
                  <UserAvatar name={user.name} image={user.image} size="sm" />
                </div>

                {/* Name + XP bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm truncate ${isMe ? "text-brand-blue" : "text-gray-700"}`}>
                      {user.name}
                    </span>
                    {isMe && (
                      <span className="text-[9px] bg-brand-blue text-white px-1.5 py-0.5 rounded-md font-black uppercase flex-shrink-0">
                        Moi
                      </span>
                    )}
                    {user.streak > 0 && (
                      <span className="flex items-center gap-0.5 flex-shrink-0">
                        <Flame className="w-3 h-3 text-orange-400 fill-current" />
                        <span className="text-orange-400 text-[10px] font-bold">{user.streak}</span>
                      </span>
                    )}
                  </div>
                  {/* XP progress bar */}
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isMe ? "bg-brand-blue" : "bg-brand-green/60"
                      }`}
                      style={{ width: `${Math.max(xpPercent, 3)}%` }}
                    />
                  </div>
                </div>

                {/* XP */}
                <div className="text-right ml-3 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <Zap className={`w-3.5 h-3.5 fill-current ${isMe ? "text-brand-blue" : "text-brand-yellow"}`} />
                    <span className={`font-black text-sm ${isMe ? "text-brand-blue" : "text-gray-700"}`}>
                      {user.xp.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">XP</span>
                </div>
              </div>
            );
          })}

          {/* Current user if not in top 50 */}
          {!isUserInList && (
            <>
              <div className="py-2 text-center border-t border-gray-100">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                </div>
              </div>
              <div className="flex items-center px-4 py-3.5 bg-blue-50/60 border-t-2 border-brand-blue/20 border-l-4 border-l-brand-blue">
                <div className="mr-3 w-8 h-8 flex items-center justify-center">
                  <span className="font-black text-brand-blue text-xs">99+</span>
                </div>
                <div className="mr-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-sm">
                    ?
                  </div>
                </div>
                <div className="flex-1 font-bold text-brand-blue text-sm">Vous</div>
                <div className="text-right flex-shrink-0">
                  <span className="font-black text-brand-blue text-sm">-- XP</span>
                </div>
              </div>
            </>
          )}

          {/* Empty state */}
          {restUsers.length === 0 && topThree.length === 0 && (
            <div className="p-10 text-center">
              <div className="w-20 h-20 mx-auto mb-3 opacity-20">
                <TrophyGold className="w-full h-full" />
              </div>
              <p className="text-gray-400 font-bold text-sm">Le classement est vide pour le moment.</p>
              <p className="text-gray-300 text-xs mt-1">Commence une lecon pour apparaitre ici !</p>
            </div>
          )}
        </div>

        {/* Your position card (if in list) */}
        {isUserInList && currentUserRank > 3 && (
          <div className="mt-4 bg-white rounded-2xl shadow-sm border border-brand-blue/20 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
              <span className="font-black text-brand-blue text-sm">#{currentUserRank}</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-700 text-sm">Ta position actuelle</p>
              <p className="text-gray-400 text-xs">
                {currentUserRank <= 10
                  ? "Excellent ! Tu es dans le top 10 !"
                  : currentUserRank <= 20
                  ? "Continue comme ca, tu progresses !"
                  : "Chaque lecon te rapproche du sommet !"
                }
              </p>
            </div>
            <Zap className="w-5 h-5 text-brand-yellow fill-current" />
          </div>
        )}
      </div>
    </div>
  );
}

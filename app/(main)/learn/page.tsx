import Link from "next/link";
import { Star, Book, Zap, Flame, Crown, Video, Headphones, Gift, NotebookText, Volume2 } from "lucide-react";
import { prisma } from "@/app/lib/prisma";
import HeartsModal from "@/app/components/HeartsModal";

// Helper to get lesson icon based on type
const LessonIcon = ({ type, isCompleted, isLocked }: { type: string, isCompleted: boolean, isLocked: boolean }) => {
  const opacity = isLocked ? "opacity-40" : "opacity-100";
  const iconClass = `w-8 h-8 text-white fill-current ${opacity}`;
  
  if (isCompleted) {
    return <CheckIcon className="w-10 h-10 text-white" />;
  }

  switch (type) {
    case 'VIDEO':
      return <Video className={iconClass} />;
    case 'AUDIO':
      return <Headphones className={iconClass} />;
    case 'CHEST':
      return <Gift className={iconClass} />;
    case 'STORY':
      return <Book className={iconClass} />;
    case 'STAR':
    default:
      return <Star className={iconClass} />;
  }
};

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
  </svg>
);

import { getSession } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

async function getLearningData() {
  const session = await getSession();
  if (!session) return null;
  const userId = session.userId;

  const course = await prisma.course.findFirst({
    where: { title: "Lingala" }, // Filter by specific course title to ensure we get the seeded one
    include: {
      units: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            include: {
              userProgress: {
                where: { userId }
              }
            }
          }
        }
      }
    }
  });

  if (!course) {
    // Fallback: Get ALL units if no course is found (temporary fix)
    const allUnits = await prisma.unit.findMany({
      orderBy: { order: "asc" },
      include: {
        lessons: {
          orderBy: { order: "asc" },
          include: {
            userProgress: {
              where: { userId }
            }
          }
        }
      }
    });

    // Fetch User Stats
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        xp: true,
        streak: true,
        hearts: true,
        gems: true,
      }
    });

    const userStats = user || { xp: 0, streak: 0, hearts: 5, gems: 0 };

    if (allUnits.length > 0) {
       return { 
         units: allUnits.map(unit => ({
          ...unit,
          lessons: unit.lessons.map((lesson, index) => {
            // Check if previous lesson is completed
            const isFirst = index === 0;
            const previousLesson = isFirst ? null : unit.lessons[index - 1];
            const isPreviousCompleted = previousLesson ? (previousLesson.userProgress.length > 0 && previousLesson.userProgress[0].completed) : true;
            
            const isCompleted = lesson.userProgress.length > 0 && lesson.userProgress[0].completed;
            const isLocked = !isFirst && !isPreviousCompleted && !isCompleted;

            return {
              ...lesson,
              isCompleted,
              isLocked // Add locked state
            };
          })
        })),
        userStats
      };
    }

    return null;
  }

  // Fetch User Stats
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      xp: true,
      streak: true,
      hearts: true,
      gems: true,
      hasCompletedOnboarding: true,
    }
  });

  if (user && !user.hasCompletedOnboarding) {
      return { redirectOnboarding: true };
  }

  const userStats = user || { xp: 0, streak: 0, hearts: 5, gems: 0, hasCompletedOnboarding: false };

  return {
    units: course.units.map(unit => ({
      ...unit,
      lessons: unit.lessons.map((lesson, index) => {
        // Check if previous lesson is completed
        const isFirst = index === 0;
        const previousLesson = isFirst ? null : unit.lessons[index - 1];
        const isPreviousCompleted = previousLesson ? (previousLesson.userProgress.length > 0 && previousLesson.userProgress[0].completed) : true;
        
        const isCompleted = lesson.userProgress.length > 0 && lesson.userProgress[0].completed;
        const isLocked = !isFirst && !isPreviousCompleted && !isCompleted;

        return {
          ...lesson,
          isCompleted,
          isLocked // Add locked state
        };
      })
    })),
    userStats
  };
}

export default async function LearnPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await getLearningData();
  
  if (data?.redirectOnboarding) {
      redirect("/onboarding/intro");
  }

  const units = data?.units;
  const userStats = data?.userStats;

  if (!units) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cours non trouvé. Avez-vous lancé le script de seed ? (npx prisma db seed)</p>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* Top Bar */}
      <header className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-background border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center gap-3 hover:bg-gray-100 p-1 rounded-xl cursor-pointer transition-colors">
          <span className="text-2xl">🇨🇩</span> 
          <span className="font-bold text-gray-400 text-sm">8</span>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1.5 px-2">
             <Flame className="w-5 h-5 text-brand-orange fill-current" />
             <span className="font-bold text-brand-orange">{userStats?.streak || 0}</span>
           </div>

           <div className="flex items-center gap-1.5 px-2">
             <div className="w-5 h-5 bg-brand-blue rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-white/40 rounded-full"></div>
             </div>
             <span className="font-bold text-brand-blue">{userStats?.gems || 0}</span>
           </div>

           <div className="flex items-center gap-1.5 px-2">
             <Zap className="w-5 h-5 text-pink-500 fill-current" />
             <span className="font-bold text-pink-500">{userStats?.hearts || 5}</span>
           </div>
        </div>
      </header>

      {/* Character Welcome Banner */}
      <div className="px-3 sm:px-4 pt-4">
        <div className="max-w-[600px] mx-auto">
          <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-100">
            {/* Inline SVG character with gesture animations */}
            <div className="flex-shrink-0 character-float" style={{ width: 70, height: 70 }}>
              <svg width="70" height="70" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                <g>
                  <ellipse cx="100" cy="252" rx="35" ry="6" fill="#00000015" className="anim-shadow" />
                  <rect x="76" y="185" width="18" height="40" rx="9" fill="#C68642" />
                  <rect x="106" y="185" width="18" height="40" rx="9" fill="#C68642" />
                  <ellipse cx="85" cy="228" rx="14" ry="8" fill="#3d3d3d" />
                  <ellipse cx="115" cy="228" rx="14" ry="8" fill="#3d3d3d" />
                  <rect x="68" y="120" width="64" height="68" rx="16" fill="#1CB0F6" />
                  <path d="M88 120 L100 130 L112 120" stroke="#0984C4" strokeWidth="3" fill="none" />
                  <g className="anim-arm-wave" style={{ transformOrigin: "80px 128px" }}>
                    <rect x="50" y="122" width="22" height="35" rx="11" fill="#C68642" />
                    <g className="anim-forearm-wave" style={{ transformOrigin: "61px 158px" }}>
                      <rect x="48" y="155" width="18" height="28" rx="9" fill="#C68642" />
                      <circle cx="57" cy="185" r="10" fill="#C68642" />
                      <g className="anim-fingers">
                        <rect x="49" y="176" width="4" height="10" rx="2" fill="#C68642" transform="rotate(-10 51 181)" />
                        <rect x="55" y="174" width="4" height="11" rx="2" fill="#C68642" />
                        <rect x="61" y="176" width="4" height="10" rx="2" fill="#C68642" transform="rotate(10 63 181)" />
                      </g>
                    </g>
                  </g>
                  <g className="anim-arm-idle-right" style={{ transformOrigin: "120px 128px" }}>
                    <rect x="128" y="122" width="22" height="35" rx="11" fill="#C68642" />
                    <rect x="132" y="155" width="18" height="28" rx="9" fill="#C68642" />
                    <circle cx="141" cy="185" r="10" fill="#C68642" />
                  </g>
                  <g className="anim-head-nod-slow" style={{ transformOrigin: "100px 90px" }}>
                    <rect x="90" y="108" width="20" height="18" rx="8" fill="#C68642" />
                    <ellipse cx="100" cy="76" rx="34" ry="36" fill="#C68642" />
                    <ellipse cx="100" cy="52" rx="32" ry="22" fill="#1a1a2e" />
                    <circle cx="76" cy="58" r="8" fill="#1a1a2e" />
                    <circle cx="124" cy="58" r="8" fill="#1a1a2e" />
                    <path d="M82 76 Q86 72 90 76" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M110 76 Q114 72 118 76" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <ellipse cx="100" cy="86" rx="3" ry="4" fill="#C68642" stroke="#00000020" strokeWidth="1" />
                    <path d="M88 96 Q100 108 112 96" stroke="#c0392b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <ellipse cx="74" cy="88" rx="8" ry="5" fill="#FF6B6B30" />
                    <ellipse cx="126" cy="88" rx="8" ry="5" fill="#FF6B6B30" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="character-bubble-left relative bg-white px-4 py-3 rounded-2xl border-2 border-gray-200 shadow-sm">
              <p className="text-sm font-semibold text-foreground">
                {userStats?.streak && userStats.streak > 0
                  ? `Kokoba! Tu as une serie de ${userStats.streak} jours !`
                  : "Mbote! Pret a apprendre le Lingala aujourd'hui ?"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Render Units */}
      <div className="px-3 sm:px-4 py-6 max-w-[600px] mx-auto">
        {units.map((unit) => (
          <div key={unit.id} className="mb-12">
            {/* Unit Header */}
            <div className={`bg-brand-green rounded-xl p-4 mb-10 text-white flex justify-between items-center shadow-sm`}>
              <div>
                <h2 className="font-bold text-xs uppercase tracking-widest mb-1 text-green-100">
                  Unit {unit.order}
                </h2>
                <p className="font-bold text-xl">{unit.title}</p>
                <p className="text-sm text-green-100 mt-1 font-medium">{unit.description}</p>
              </div>
              <NotebookText className="w-8 h-8 opacity-90" />
            </div>

            {/* Path */}
            <div className="flex flex-col items-center gap-6 relative">
              {unit.lessons.map((lesson, index) => {
                // Use server-calculated props directly
                const isLocked = lesson.isLocked;
                const isCurrent = !isLocked && !lesson.isCompleted;
                
                // Calculate horizontal offset for snake path
                // Using a sine wave for the winding path
                const offset = Math.sin(index * 0.8) * 70; 

                // Determine Node Color
                let nodeColor = "bg-brand-green"; // Default
                let shadowColor = "shadow-[0_6px_0_#46a302]"; // Default shadow
                
                if (lesson.type === 'CHEST') {
                   nodeColor = "bg-brand-yellow"; // Chest is usually gold
                   shadowColor = "shadow-[0_6px_0_#cc9f00]";
                }

                if (isLocked) {
                   nodeColor = "bg-[#e5e5e5]";
                   shadowColor = "shadow-[0_6px_0_#cecece]";
                }

                return (
                  <div key={lesson.id} className="relative" style={{ marginLeft: `${offset}px` }}>
                     {isCurrent && (
                        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2.5 rounded-xl border-2 border-gray-200 font-bold text-brand-green text-sm shadow-sm animate-bounce whitespace-nowrap z-20">
                          COMMENCER
                          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-gray-200 rotate-45"></div>
                        </div>
                     )}

                     {isCurrent || !isLocked ? (
                       <Link href={`/lesson/${lesson.id}`} className="relative group block">
                          {/* Outer ring for current lesson */}
                          {isCurrent && (
                             <div className="absolute inset-0 -m-1.5 border-[6px] border-black/5 rounded-full z-0"></div>
                          )}
                          
                          <div className={`w-[70px] h-[70px] ${nodeColor} rounded-full flex items-center justify-center ${shadowColor} group-active:shadow-none group-active:translate-y-[6px] transition-all relative z-10`}>
                            {/* Inner highlight for 3D effect */}
                            <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-white opacity-20 rounded-full"></div>
                            
                            {lesson.isCompleted ? (
                               <CheckIcon className="w-8 h-8 text-white stroke-[4]" />
                            ) : (
                               <LessonIcon type={lesson.type} isCompleted={false} isLocked={false} />
                            )}

                            {/* Stars for completion (if any logic for stars existed) */}
                            {lesson.isCompleted && (
                               <div className="absolute -bottom-2 -right-1 flex">
                                  <div className="w-4 h-4 bg-brand-yellow rounded-full border-2 border-white flex items-center justify-center">
                                     <Star className="w-2 h-2 text-white fill-current" />
                                  </div>
                               </div>
                            )}
                            {/* Audio indicator on all lessons */}
                            {!lesson.isCompleted && !isLocked && (
                               <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-brand-blue rounded-full border-2 border-white flex items-center justify-center">
                                  <Volume2 className="w-2.5 h-2.5 text-white" />
                               </div>
                            )}
                          </div>
                       </Link>
                     ) : (
                        <div className={`w-[70px] h-[70px] ${nodeColor} rounded-full flex items-center justify-center ${shadowColor} relative z-10`}>
                          <LessonIcon type={lesson.type} isCompleted={false} isLocked={true} />
                        </div>
                     )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

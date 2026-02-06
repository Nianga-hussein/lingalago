import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lessonId, completed, xp, activeExerciseIndex, activeFailedIds } = await request.json();

    if (!lessonId) {
      return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 });
    }

    // 1. Create or Update UserProgress
    const updateData: any = {
        completed: completed
    };
    if (activeExerciseIndex !== undefined) updateData.activeExerciseIndex = activeExerciseIndex;
    if (activeFailedIds !== undefined) updateData.activeFailedIds = activeFailedIds;

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.userId,
          lessonId: lessonId
        }
      },
      update: updateData,
      create: {
        userId: session.userId,
        lessonId: lessonId,
        completed: completed || false,
        activeExerciseIndex: activeExerciseIndex || 0,
        activeFailedIds: activeFailedIds || []
      }
    });

    // 2. Update User Stats (XP, Streak, Hearts) ONLY if completed
    if (completed) {
        // Fetch current user data for streak calculation
        const currentUser = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { streak: true, lastActiveDate: true }
        });

        let newStreak = currentUser?.streak || 0;
        const now = new Date();
        const lastActive = currentUser?.lastActiveDate ? new Date(currentUser.lastActiveDate) : null;

        // Check streak logic
        if (lastActive) {
            const today = new Date(now);
            today.setHours(0, 0, 0, 0);
            
            const last = new Date(lastActive);
            last.setHours(0, 0, 0, 0);
            
            const diffTime = Math.abs(today.getTime() - last.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            if (diffDays === 0) {
                // Already played today, do nothing to streak
            } else if (diffDays === 1) {
                // Played yesterday, increment
                newStreak += 1;
            } else {
                // Missed a day (or more), reset to 1
                newStreak = 1;
            }
        } else {
            // First time playing
            newStreak = 1;
        }

        const user = await prisma.user.update({
            where: { id: session.userId },
            data: {
                xp: { increment: xp || 10 },
                streak: newStreak,
                lastActiveDate: now,
                hearts: 5, // Reset hearts on completion if you want, or handle logic
            }
        });
        
        // Reset progress on the specific lesson entry too? 
        // If we want them to be able to replay from start next time.
        // Actually, let's keep it as completed. Replay logic might be handled by frontend resetting index if completed.
        await prisma.userProgress.update({
             where: { id: progress.id },
             data: { activeExerciseIndex: 0, activeFailedIds: [] }
        });
        
        return NextResponse.json({ success: true, progress, userXP: user.xp });
    }

    return NextResponse.json({ success: true, progress });

  } catch (error) {
    console.error("Progress save error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

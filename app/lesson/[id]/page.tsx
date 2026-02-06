import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import LessonClient from "../LessonClient";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  // 1. Fetch Lesson with Exercises
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      exercises: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!lesson) {
    redirect("/learn");
  }

  // 2. Fetch User Stats (hearts) and Progress for this lesson
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { hearts: true }
  });

  const progress = await prisma.userProgress.findUnique({
    where: {
      userId_lessonId: {
        userId: session.userId,
        lessonId: id
      }
    }
  });

  // If lesson is completed, we might want to restart (index 0) unless we explicitly want to resume a review.
  // For now, if index > 0, we resume.
  const initialIndex = progress?.activeExerciseIndex || 0;
  // Parse failed IDs if stored as JSON array
  let initialFailedIds: string[] = [];
  if (progress?.activeFailedIds && Array.isArray(progress.activeFailedIds)) {
      initialFailedIds = progress.activeFailedIds as string[];
  }

  return (
    <LessonClient 
      initialLesson={lesson} 
      initialHearts={user?.hearts || 5} 
      userId={session.userId}
      initialIndex={initialIndex}
      initialFailedIds={initialFailedIds}
    />
  );
}

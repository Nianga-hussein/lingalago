import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const [userCount, unitCount, lessonCount, progressCount] = await Promise.all([
      prisma.user.count(),
      prisma.unit.count(),
      prisma.lesson.count(),
      prisma.userProgress.count({ where: { completed: true } })
    ]);

    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    return NextResponse.json({
      userCount,
      unitCount,
      lessonCount,
      progressCount,
      recentUsers
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

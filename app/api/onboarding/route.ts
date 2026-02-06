import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { reason, level, dailyGoal, source, completed } = body;

    // Build update object dynamically based on provided fields
    const updateData: any = {};
    if (reason) updateData.onboardingReason = reason;
    if (level) updateData.onboardingLevel = level;
    if (dailyGoal) updateData.dailyGoal = parseInt(dailyGoal);
    if (source) updateData.source = source;
    if (completed === true) updateData.hasCompletedOnboarding = true;

    const user = await prisma.user.update({
      where: { id: session.userId },
      data: updateData,
    });

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error("Onboarding update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

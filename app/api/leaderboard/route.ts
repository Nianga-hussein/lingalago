import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { xp: "desc" },
      take: 20,
      select: {
        id: true,
        name: true,
        image: true,
        xp: true,
        streak: true,
        // In a real app, you might want to fetch their country/course info too
      }
    });
    
    // Add rank
    const leaderboard = users.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    return NextResponse.json(leaderboard);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching leaderboard" }, { status: 500 });
  }
}

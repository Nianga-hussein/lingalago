import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { heartsLost } = await request.json(); // e.g., 1

    if (!heartsLost || heartsLost < 0) {
         return NextResponse.json({ error: "Invalid heart count" }, { status: 400 });
    }

    // Fetch current user state
    const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { hearts: true, lastHeartRefill: true }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newHearts = Math.max(0, user.hearts - heartsLost);
    
    // If we are losing hearts and we were previously full, set the refill timer
    let updateData: any = {
        hearts: newHearts
    };

    // If we drop below 5, start the timer if not already running
    if (newHearts < 5 && user.hearts === 5) {
        updateData.lastHeartRefill = new Date();
    }
    // If we drop to 0, ensure we have a timer (should be covered above, but safe check)
    if (newHearts < 5 && !user.lastHeartRefill) {
        updateData.lastHeartRefill = new Date();
    }

    const updatedUser = await prisma.user.update({
        where: { id: session.userId },
        data: updateData
    });

    return NextResponse.json({ success: true, hearts: updatedUser.hearts });

  } catch (error) {
    console.error("Heart update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
    // Check for refills
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { hearts: true, lastHeartRefill: true }
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        if (user.hearts >= 5) {
             return NextResponse.json({ hearts: 5, nextRefill: null });
        }

        if (!user.lastHeartRefill) {
             // Should not happen if hearts < 5, but fix it
             await prisma.user.update({
                 where: { id: session.userId },
                 data: { lastHeartRefill: new Date() }
             });
             return NextResponse.json({ hearts: user.hearts, nextRefill: new Date(Date.now() + 2 * 60 * 1000) });
        }

        // Calculate refill
        const now = new Date();
        const diffMs = now.getTime() - new Date(user.lastHeartRefill).getTime();
        const REFILL_TIME_MS = 2 * 60 * 1000; // 2 minutes

        const heartsToRefill = Math.floor(diffMs / REFILL_TIME_MS);

        if (heartsToRefill > 0) {
            const newHearts = Math.min(5, user.hearts + heartsToRefill);
            const remainingMs = diffMs % REFILL_TIME_MS;
            
            // New "last refill" time is roughly now minus remainder, 
            // OR simply: if fully full, null. If partially full, set to most recent interval.
            // Accurate way: lastHeartRefill + (heartsToRefill * REFILL_TIME_MS)
            
            let newLastRefill = new Date(new Date(user.lastHeartRefill).getTime() + (heartsToRefill * REFILL_TIME_MS));
            
            if (newHearts >= 5) {
                newLastRefill = null as any;
            }

            await prisma.user.update({
                where: { id: session.userId },
                data: {
                    hearts: newHearts,
                    lastHeartRefill: newLastRefill
                }
            });

            return NextResponse.json({ 
                hearts: newHearts, 
                nextRefill: newHearts < 5 ? new Date(Date.now() + REFILL_TIME_MS - remainingMs) : null 
            });
        }

        // No refill yet
        const remainingTime = REFILL_TIME_MS - diffMs;
        return NextResponse.json({ 
            hearts: user.hearts, 
            nextRefill: new Date(Date.now() + remainingTime)
        });

    } catch (error) {
        console.error("Refill check error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

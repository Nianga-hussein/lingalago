import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// Mock User ID for now (in a real app, use session)
const MOCK_USER_ID = "user-123"; 

export async function GET() {
  try {
    // 1. Get the main course (Lingala)
    const course = await prisma.course.findFirst({
      where: { title: "Lingala" },
      include: {
        units: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              include: {
                userProgress: {
                  where: { userId: MOCK_USER_ID }
                }
              }
            }
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // 2. Transform data for the frontend
    const units = course.units.map(unit => ({
      ...unit,
      lessons: unit.lessons.map(lesson => {
        const isCompleted = lesson.userProgress.length > 0 && lesson.userProgress[0].completed;
        return {
          id: lesson.id,
          title: lesson.title,
          order: lesson.order,
          isCompleted,
          isLocked: false, // Logic to lock future lessons can be added here
        };
      })
    }));

    return NextResponse.json({ units });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching learning path" }, { status: 500 });
  }
}

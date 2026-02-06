import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { order: "asc" },
      include: {
        unit: true,
        exercises: true
      }
    });
    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Check if unitId is provided, otherwise find the first unit or fail
    let unitId = data.unitId;
    if (!unitId) {
      const unit = await prisma.unit.findFirst();
      if (!unit) {
        return NextResponse.json({ error: "No units found. Please create a unit first." }, { status: 400 });
      }
      unitId = unit.id;
    }

    const lesson = await prisma.lesson.create({
      data: {
        title: data.title,
        order: data.order,
        type: data.type || "STAR",
        unitId: unitId
      }
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create lesson" }, { status: 500 });
  }
}

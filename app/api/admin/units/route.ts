import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const units = await prisma.unit.findMany({
      orderBy: { order: "asc" },
      include: {
        lessons: true
      }
    });
    return NextResponse.json(units);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch units" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Check if a course exists, if not create one default
    let course = await prisma.course.findFirst();
    if (!course) {
      course = await prisma.course.create({
        data: {
          title: "Lingala Débutant",
          imageSrc: "/flags/cd.svg"
        }
      });
    }

    const unit = await prisma.unit.create({
      data: {
        ...data,
        courseId: course.id
      }
    });

    return NextResponse.json(unit);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create unit" }, { status: 500 });
  }
}

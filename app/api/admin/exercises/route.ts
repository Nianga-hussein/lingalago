import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.lessonId) {
      return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 });
    }

    const exercise = await prisma.exercise.create({
      data: {
        lessonId: data.lessonId,
        type: data.type,
        question: data.question,
        correctAnswer: data.correctAnswer,
        options: data.options, // Ensure JSON is handled correctly
        order: data.order,
        audioSrc: data.audioSrc
      }
    });

    return NextResponse.json(exercise);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create exercise" }, { status: 500 });
  }
}

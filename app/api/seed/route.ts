import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UNITS, type LessonSeed, type VocabItem } from "./data";

const prisma = new PrismaClient();

function buildExercises(lesson: LessonSeed, vocab: VocabItem[]) {
  const exercises: {
    type: string;
    question: string;
    options: unknown;
    correctAnswer: string | null;
    order: number;
  }[] = [];

  let order = 1;

  // --- Exercise 1: multiple_choice (vocab word -> french meaning) ---
  const mcWord = vocab[0];
  const mcDistractors = vocab
    .slice(1)
    .map((v) => v.french)
    .slice(0, 3);
  while (mcDistractors.length < 3) mcDistractors.push("Inconnu");
  const mcOptions = [
    { id: "1", label: mcWord.french, isCorrect: true },
    ...mcDistractors.map((d, i) => ({
      id: String(i + 2),
      label: d,
      isCorrect: false,
    })),
  ].sort(() => Math.random() - 0.5);
  exercises.push({
    type: "multiple_choice",
    question: `Que signifie "${mcWord.lingala}" ?`,
    options: JSON.stringify(mcOptions),
    correctAnswer: null,
    order: order++,
  });

  // --- Exercise 2: multiple_choice (french -> lingala) ---
  const mc2Word = vocab[1] || vocab[0];
  const mc2Distractors = vocab
    .filter((v) => v.lingala !== mc2Word.lingala)
    .map((v) => v.lingala)
    .slice(0, 3);
  while (mc2Distractors.length < 3) mc2Distractors.push("???");
  const mc2Options = [
    { id: "1", label: mc2Word.lingala, isCorrect: true },
    ...mc2Distractors.map((d, i) => ({
      id: String(i + 2),
      label: d,
      isCorrect: false,
    })),
  ].sort(() => Math.random() - 0.5);
  exercises.push({
    type: "multiple_choice",
    question: `Comment dit-on "${mc2Word.french}" en lingala ?`,
    options: JSON.stringify(mc2Options),
    correctAnswer: null,
    order: order++,
  });

  // --- Exercise 3: translation (arrange words) ---
  const sent = lesson.sentences[0];
  if (sent) {
    exercises.push({
      type: "translation",
      question: `Traduis : "${sent.lingala}"`,
      options: JSON.stringify(sent.words),
      correctAnswer: sent.french,
      order: order++,
    });
  }

  // --- Exercise 4: fill_blank ---
  const fb = lesson.fillBlanks[0];
  if (fb) {
    const fbOptions = [
      { id: "1", label: fb.answer, isCorrect: true },
      ...fb.distractors.map((d, i) => ({
        id: String(i + 2),
        label: d,
        isCorrect: false,
      })),
    ].sort(() => Math.random() - 0.5);
    exercises.push({
      type: "fill_blank",
      question: `Complete la phrase : "${fb.sentence}"`,
      options: JSON.stringify(fbOptions),
      correctAnswer: fb.answer,
      order: order++,
    });
  }

  // --- Exercise 5: matching (link lingala <-> french) ---
  const matchPairs = vocab.slice(0, 4).map((v, i) => ({
    id: String(i + 1),
    left: v.lingala,
    right: v.french,
  }));
  exercises.push({
    type: "matching",
    question: "Relie chaque mot en lingala a sa traduction",
    options: JSON.stringify(matchPairs),
    correctAnswer: null,
    order: order++,
  });

  // --- Exercise 6: speech (say a word) ---
  const speechWord = vocab[2] || vocab[0];
  exercises.push({
    type: "speech",
    question: `Prononce ce mot en lingala : "${speechWord.french}"`,
    options: null,
    correctAnswer: speechWord.lingala,
    order: order++,
  });

  // --- Exercise 7: translation (second sentence) ---
  const sent2 = lesson.sentences[1] || lesson.sentences[0];
  if (sent2) {
    exercises.push({
      type: "translation",
      question: `Traduis : "${sent2.lingala}"`,
      options: JSON.stringify(sent2.words),
      correctAnswer: sent2.french,
      order: order++,
    });
  }

  return exercises;
}

export async function POST() {
  try {
    // Clean existing data
    await prisma.exercise.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.unit.deleteMany();
    await prisma.course.deleteMany();

    // Create the course
    const course = await prisma.course.create({
      data: {
        title: "Lingala",
        imageSrc: "/flags/cd.svg",
      },
    });

    let totalLessons = 0;
    let totalExercises = 0;

    for (let ui = 0; ui < UNITS.length; ui++) {
      const unitData = UNITS[ui];

      const unit = await prisma.unit.create({
        data: {
          title: unitData.title,
          description: unitData.description,
          order: ui + 1,
          color: unitData.color,
          courseId: course.id,
        },
      });

      for (let li = 0; li < unitData.lessons.length; li++) {
        const lessonData = unitData.lessons[li];

        const lessonTypes: Array<"STAR" | "CHEST" | "VIDEO" | "AUDIO"> = [
          "STAR",
          "STAR",
          "STAR",
          "STAR",
          "STAR",
          "STAR",
          "STAR",
          "CHEST",
          "STAR",
          "STAR",
        ];

        const lesson = await prisma.lesson.create({
          data: {
            title: lessonData.title,
            order: li + 1,
            type: lessonTypes[li % lessonTypes.length],
            unitId: unit.id,
          },
        });

        const exercises = buildExercises(lessonData, lessonData.vocab);

        for (const ex of exercises) {
          await prisma.exercise.create({
            data: {
              type: ex.type,
              question: ex.question,
              options: ex.options ? ex.options : undefined,
              correctAnswer: ex.correctAnswer,
              order: ex.order,
              lessonId: lesson.id,
            },
          });
          totalExercises++;
        }

        totalLessons++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seed complete! Created ${UNITS.length} units, ${totalLessons} lessons, ${totalExercises} exercises.`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  return NextResponse.json({
    message:
      "Send a POST request to this endpoint to seed the database with 10 units, 100 lessons, and 700 exercises.",
  });
}

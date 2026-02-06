import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Clean up existing data (Optional: Remove if you want to keep existing data)
  // await prisma.userProgress.deleteMany();
  // await prisma.exercise.deleteMany();
  // await prisma.lesson.deleteMany();
  // await prisma.unit.deleteMany();
  // await prisma.course.deleteMany();

  // 2. Find or Create Course
  let lingalaCourse = await prisma.course.findFirst({
    where: { title: "Lingala" },
  });

  if (!lingalaCourse) {
    lingalaCourse = await prisma.course.create({
      data: {
        title: "Lingala",
        imageSrc: "/flags/cd.svg",
      },
    });
  }

  // 3. Create Unit 1: Introduction au Lingala
  // Check if unit exists to avoid duplicates if running seed multiple times
  let unit1 = await prisma.unit.findFirst({
    where: { 
      courseId: lingalaCourse.id,
      title: "Introduction au Lingala"
    }
  });

  if (unit1) {
    // Clean up existing lessons for this unit to re-seed them fresh
    await prisma.lesson.deleteMany({
      where: { unitId: unit1.id }
    });
    console.log("Deleted existing lessons for unit:", unit1.id);
  } else {
    unit1 = await prisma.unit.create({
      data: {
        courseId: lingalaCourse.id,
        title: "Introduction au Lingala",
        description: "Les bases : salutations, se présenter, politesse",
        order: 1,
        color: "bg-brand-green",
      },
    });
  }

  // --- LESSON 1: Salutations ---
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit1.id,
      title: "Salutations",
      order: 1,
      type: "STAR",
    },
  });

  // Ex 1: Choix multiple (Mbote)
  await prisma.exercise.create({
    data: {
      lessonId: lesson1.id,
      type: "multiple_choice",
      question: "Que signifie **Mbote** ?",
      order: 1,
      options: [
        { id: "a", label: "Merci", isCorrect: false },
        { id: "b", label: "Bonjour", isCorrect: true },
        { id: "c", label: "Pardon", isCorrect: false },
        { id: "d", label: "Au revoir", isCorrect: false },
      ],
    },
  });

  // Ex 2: Associer (Matching)
  await prisma.exercise.create({
    data: {
      lessonId: lesson1.id,
      type: "matching",
      question: "Associe les mots correspondants",
      order: 2,
      options: [
        { id: "1", left: "Mbote", right: "Bonjour" },
        { id: "2", left: "Malamu", right: "Bien" },
        { id: "3", left: "Sango nini ?", right: "Quoi de neuf ?" },
      ],
    },
  });

  // Ex 3: Prononciation (Mbote)
  await prisma.exercise.create({
    data: {
      lessonId: lesson1.id,
      type: "speech",
      question: "Dis à voix haute : **Mbote**",
      correctAnswer: "mbote", // Normalized answer for comparison
      order: 3,
    },
  });


  // --- LESSON 2: Comment ça va ? ---
  const lesson2 = await prisma.lesson.create({
    data: {
      unitId: unit1.id,
      title: "Comment ça va ?",
      order: 2,
      type: "STAR",
    },
  });

  // Ex 1: Traduction (Ozali malamu ?)
  await prisma.exercise.create({
    data: {
      lessonId: lesson2.id,
      type: "translation",
      question: "Traduire : **Ozali malamu ?**",
      correctAnswer: "Ça va ?",
      order: 1,
      options: ["Ça", "va", "?", "Bien", "Bonjour", "Tu"], // Distractor words included
    },
  });

  // Ex 2: Compléter (Nazali ___)
  await prisma.exercise.create({
    data: {
      lessonId: lesson2.id,
      type: "fill_blank",
      question: "Complète la phrase : Nazali ___",
      order: 2,
      options: [
        { id: "a", label: "malamu", isCorrect: true },
        { id: "b", label: "mbote", isCorrect: false },
        { id: "c", label: "sango", isCorrect: false },
      ],
    },
  });

  // Ex 3: Voix (Nazali malamu)
  await prisma.exercise.create({
    data: {
      lessonId: lesson2.id,
      type: "speech",
      question: "Dis : **Nazali malamu**",
      correctAnswer: "nazali malamu",
      order: 3,
    },
  });


  // --- LESSON 3: Se présenter ---
  const lesson3 = await prisma.lesson.create({
    data: {
      unitId: unit1.id,
      title: "Se présenter",
      order: 3,
      type: "STAR",
    },
  });

  // Ex 1: Traduction (Nazo benga Alex)
  await prisma.exercise.create({
    data: {
      lessonId: lesson3.id,
      type: "translation",
      question: "Traduire : **Nazo benga Alex**",
      correctAnswer: "Je m'appelle Alex",
      order: 1,
      options: ["Je", "m'appelle", "Alex", "Tu", "t'appelles", "Il"],
    },
  });

  // Ex 2: Compléter (Nazo ___ Maria)
  await prisma.exercise.create({
    data: {
      lessonId: lesson3.id,
      type: "fill_blank",
      question: "Nazo ___ Maria",
      order: 2,
      options: [
        { id: "a", label: "benga", isCorrect: true },
        { id: "b", label: "zali", isCorrect: false },
        { id: "c", label: "malamu", isCorrect: false },
      ],
    },
  });

  // Ex 3: Voix (Nazo benga John)
  await prisma.exercise.create({
    data: {
      lessonId: lesson3.id,
      type: "speech",
      question: "Dis : **Nazo benga John**",
      correctAnswer: "nazo benga john",
      order: 3,
    },
  });

  console.log("Seed completed successfully! Unit 1 'Introduction au Lingala' created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

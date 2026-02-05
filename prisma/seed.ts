import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Clean up existing data
  await prisma.userProgress.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Course
  const lingalaCourse = await prisma.course.create({
    data: {
      title: "Lingala",
      imageSrc: "/flags/cd.svg",
    },
  });

  // 3. Create Unit 1
  const unit1 = await prisma.unit.create({
    data: {
      courseId: lingalaCourse.id,
      title: "Commande au café",
      description: "Apprends à commander à boire et à manger",
      order: 1,
      color: "bg-brand-green",
    },
  });

  // 4. Create Lesson 1
  const lesson1 = await prisma.lesson.create({
    data: {
      unitId: unit1.id,
      title: "Les bases",
      order: 1,
    },
  });

  // 5. Create Exercises for Lesson 1
  
  // Exercise 1: Image Selection (Café)
  await prisma.exercise.create({
    data: {
      lessonId: lesson1.id,
      type: "image_selection",
      question: "Choisis la bonne image",
      correctAnswer: "coffee",
      order: 1,
      options: [
        { id: "tea", label: "thé", icon: "CupSoda" },
        { id: "sandwich", label: "sandwich", icon: "Sandwich" },
        { id: "coffee", label: "café", icon: "Coffee" },
        { id: "icecream", label: "glace", icon: "IceCream" },
      ],
    },
  });

  // Exercise 2: Translation
  await prisma.exercise.create({
    data: {
      lessonId: lesson1.id,
      type: "translation",
      question: "Comment dit-on « café » ?",
      correctAnswer: "café",
      order: 2,
      options: ["por favor", "un", "café"], // Simple array for text options
    },
  });

  // 6. Create Admin User
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@lingalago.com",
      role: "ADMIN",
      image: "A",
    },
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

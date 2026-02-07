import { prisma } from "@/app/lib/prisma";
import LessonsClient from "./LessonsClient";

async function getData() {
  try {
    const [lessons, units] = await Promise.all([
      prisma.lesson.findMany({
        orderBy: { order: "asc" },
        include: {
          unit: true,
          exercises: true
        }
      }),
      prisma.unit.findMany({
        orderBy: { order: "asc" }
      })
    ]);
    
    return { lessons, units };
  } catch (error) {
    console.error("Database connection error:", error);
    // Return empty arrays to prevent crash
    return { lessons: [], units: [] };
  }
}

export default async function LessonsPage() {
  const { lessons, units } = await getData();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Leçons</h1>
          <p className="text-gray-500 mt-2 text-lg">Créez et organisez le contenu pédagogique interactif.</p>
        </div>
      </div>

      <LessonsClient initialLessons={lessons} units={units} />
    </div>
  );
}

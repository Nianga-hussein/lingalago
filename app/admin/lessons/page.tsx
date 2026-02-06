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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Leçons</h1>
          <p className="text-gray-500 mt-2 font-medium">Créez et organisez le contenu pédagogique.</p>
        </div>
      </div>

      <LessonsClient initialLessons={lessons} units={units} />
    </div>
  );
}

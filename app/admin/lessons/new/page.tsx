import { prisma } from "@/app/lib/prisma";
import LessonForm from "./LessonForm";

async function getUnits() {
  const units = await prisma.unit.findMany({
    orderBy: { order: "asc" },
  });
  return units;
}

export default async function NewLessonPage() {
  const units = await getUnits();

  return <LessonForm units={units} />;
}

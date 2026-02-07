import { prisma } from "@/app/lib/prisma";
import UnitsClient from "./UnitsClient";

async function getUnits() {
  const units = await prisma.unit.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: true
    }
  });
  return units;
}

export default async function UnitsPage() {
  const units = await getUnits();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Unités</h1>
          <p className="text-gray-500 mt-2 text-lg">Organisez le parcours d&apos;apprentissage et structurez les chapitres.</p>
        </div>
      </div>

      <UnitsClient initialUnits={units} />
    </div>
  );
}

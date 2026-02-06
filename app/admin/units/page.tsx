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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Unités</h1>
          <p className="text-gray-500 mt-2 font-medium">Organisez le parcours d'apprentissage.</p>
        </div>
      </div>

      <UnitsClient initialUnits={units} />
    </div>
  );
}

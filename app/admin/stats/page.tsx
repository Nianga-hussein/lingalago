import { prisma } from "@/app/lib/prisma";
import { Users, Layers, BookOpen, CheckCircle, TrendingUp } from "lucide-react";

async function getStats() {
  const [userCount, unitCount, lessonCount, progressCount] = await Promise.all([
    prisma.user.count(),
    prisma.unit.count(),
    prisma.lesson.count(),
    prisma.userProgress.count({ where: { completed: true } })
  ]);

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, createdAt: true, image: true }
  });

  return { userCount, unitCount, lessonCount, progressCount, recentUsers };
}

export default async function StatsPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Statistiques</h1>
          <p className="text-gray-500 mt-2 font-medium">Aperçu de la croissance de la plateforme.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-brand-blue">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Utilisateurs</p>
            <p className="text-3xl font-bold text-gray-800">{stats.userCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-brand-green">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Unités</p>
            <p className="text-3xl font-bold text-gray-800">{stats.unitCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Leçons</p>
            <p className="text-3xl font-bold text-gray-800">{stats.lessonCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Leçons Complétées</p>
            <p className="text-3xl font-bold text-gray-800">{stats.progressCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            Nouveaux Inscrits
          </h2>
          <div className="space-y-4">
            {stats.recentUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold uppercase">
                    {user.image || user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
            {stats.recentUsers.length === 0 && (
              <p className="text-gray-400 text-center py-4">Aucun utilisateur récent.</p>
            )}
          </div>
        </div>

        {/* Placeholder for Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-full h-48 bg-gray-50 rounded-xl mb-4 flex items-end justify-center gap-2 p-4">
             {/* Mock Chart Bars */}
             <div className="w-8 bg-blue-200 h-1/3 rounded-t-md"></div>
             <div className="w-8 bg-blue-300 h-1/2 rounded-t-md"></div>
             <div className="w-8 bg-brand-blue h-3/4 rounded-t-md"></div>
             <div className="w-8 bg-blue-300 h-2/3 rounded-t-md"></div>
             <div className="w-8 bg-blue-200 h-1/2 rounded-t-md"></div>
          </div>
          <h3 className="font-bold text-gray-800">Activité Hebdomadaire</h3>
          <p className="text-sm text-gray-400 mt-1">Nombre de leçons terminées par jour.</p>
        </div>
      </div>
    </div>
  );
}

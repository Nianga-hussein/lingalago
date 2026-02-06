import { Users, BookOpen, CheckCircle, TrendingUp, LucideIcon } from "lucide-react";
import { prisma } from "@/app/lib/prisma";

async function getDashboardStats() {
  try {
    const [userCount, lessonCount, completedLessons, recentUsers] = await Promise.all([
      prisma.user.count(),
      prisma.lesson.count(),
      prisma.userProgress.count({ where: { completed: true } }),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ]);

    return {
      userCount,
      lessonCount,
      completedLessons,
      recentUsers
    };
  } catch (error) {
    console.error("Database connection error:", error);
    // Return default values in case of error
    return {
      userCount: 0,
      lessonCount: 0,
      completedLessons: 0,
      recentUsers: []
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-500 mt-2">Bienvenue dans l&apos;interface d&apos;administration de LingalaGo.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Utilisateurs" 
          value={stats.userCount.toString()} 
          change="+12%" 
          icon={Users} 
          color="bg-brand-blue" 
        />
        <StatCard 
          title="Leçons Créées" 
          value={stats.lessonCount.toString()} 
          change="+24%" 
          icon={BookOpen} 
          color="bg-brand-green" 
        />
        <StatCard 
          title="Leçons Complétées" 
          value={stats.completedLessons.toString()} 
          change="+8%" 
          icon={CheckCircle} 
          color="bg-brand-yellow" 
        />
        <StatCard 
          title="Revenus (Est.)" 
          value="$0" 
          change="+0%" 
          icon={TrendingUp} 
          color="bg-brand-red" 
        />
      </div>

      {/* Recent Activity or Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Dernières Inscriptions</h2>
          <div className="space-y-4">
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 uppercase">
                    {user.image || user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl border-2 border-gray-200 hover:border-brand-green hover:bg-green-50 transition-all text-left group">
              <span className="block font-bold text-gray-700 group-hover:text-brand-green">Ajouter une leçon</span>
              <span className="text-sm text-gray-400">Créer un nouveau contenu</span>
            </button>
            <button className="p-4 rounded-xl border-2 border-gray-200 hover:border-brand-blue hover:bg-blue-50 transition-all text-left group">
              <span className="block font-bold text-gray-700 group-hover:text-brand-blue">Valider Audios</span>
              <span className="text-sm text-gray-400">12 en attente</span>
            </button>
            <button className="p-4 rounded-xl border-2 border-gray-200 hover:border-brand-yellow hover:bg-yellow-50 transition-all text-left group">
              <span className="block font-bold text-gray-700 group-hover:text-brand-yellow">Gérer Utilisateurs</span>
              <span className="text-sm text-gray-400">Voir la liste</span>
            </button>
            <button className="p-4 rounded-xl border-2 border-gray-200 hover:border-brand-red hover:bg-red-50 transition-all text-left group">
              <span className="block font-bold text-gray-700 group-hover:text-brand-red">Signalements</span>
              <span className="text-sm text-gray-400">Aucun signalement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${color} text-white`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center text-sm">
        <span className="text-green-500 font-bold mr-2">{change}</span>
        <span className="text-gray-400">vs le mois dernier</span>
      </div>
    </div>
  );
}

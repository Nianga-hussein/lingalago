import { Users, BookOpen, CheckCircle, TrendingUp, LucideIcon, Plus, ShieldCheck, MessageSquare, Headphones } from "lucide-react";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

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
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Tableau de bord</h1>
          <p className="text-gray-500 mt-2 text-lg">Bienvenue dans l&apos;interface d&apos;administration de LingalaGo.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">Système opérationnel</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard 
          title="Utilisateurs" 
          value={stats.userCount.toLocaleString()} 
          change="+12%" 
          icon={Users} 
          color="bg-blue-500" 
          lightColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard 
          title="Leçons Créées" 
          value={stats.lessonCount.toString()} 
          change="+24%" 
          icon={BookOpen} 
          color="bg-emerald-500" 
          lightColor="bg-emerald-50"
          textColor="text-emerald-600"
        />
        <StatCard 
          title="Leçons Complétées" 
          value={stats.completedLessons.toLocaleString()} 
          change="+8%" 
          icon={CheckCircle} 
          color="bg-amber-500" 
          lightColor="bg-amber-50"
          textColor="text-amber-600"
        />
        <StatCard 
          title="Revenus (Est.)" 
          value="$0" 
          change="+0%" 
          icon={TrendingUp} 
          color="bg-rose-500" 
          lightColor="bg-rose-50"
          textColor="text-rose-600"
        />
      </div>

      {/* Recent Activity or Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div className="border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Dernières Inscriptions</h2>
          <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">Dernières Inscriptions</h2>
            <Link href="/admin/users" className="text-brand-blue font-bold text-sm hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-lg shadow-inner overflow-hidden">
                    {user.image ? (
                      <span className="text-gray-600">{user.image}</span>
                    ) : (
                      <span className="text-gray-400">{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                    user.role === 'ADMIN' 
                      ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                    {user.role}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    Inscrit le {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-brand-green" />
              Actions Rapides
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <QuickAction 
                title="Nouvelle Leçon" 
                desc="Ajouter du contenu" 
                href="/admin/lessons/new" 
                icon={Plus} 
                color="text-emerald-600" 
                bg="bg-emerald-50"
                hoverBg="hover:border-emerald-200 hover:bg-emerald-100/50"
              />
              <QuickAction 
                title="Gérer les Audios" 
                desc="12 en attente" 
                href="/admin/audios" 
                icon={Headphones} 
                color="text-blue-600" 
                bg="bg-blue-50"
                hoverBg="hover:border-blue-200 hover:bg-blue-100/50"
              />
              <QuickAction 
                title="Utilisateurs" 
                desc="Gérer les comptes" 
                href="/admin/users" 
                icon={Users} 
                color="text-amber-600" 
                bg="bg-amber-50"
                hoverBg="hover:border-amber-200 hover:bg-amber-100/50"
              />
              <QuickAction 
                title="Signalements" 
                desc="Voir les retours" 
                href="/admin/reports" 
                icon={MessageSquare} 
                color="text-rose-600" 
                bg="bg-rose-50"
                hoverBg="hover:border-rose-200 hover:bg-rose-100/50"
              />
            </div>
          </div>

          {/* System Info Card */}
          <div className="bg-brand-green/10 border border-brand-green/20 rounded-3xl p-6 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-brand-green" />
                <span className="font-bold text-brand-green">Statut Sécurisé</span>
              </div>
              <p className="text-sm text-green-700/80 leading-relaxed">
                Toutes les actions sont tracées. Le système de sauvegarde est actif.
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-green/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuickActionProps {
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  hoverBg: string;
}

function QuickAction({ title, desc, href, icon: Icon, color, bg, hoverBg }: QuickActionProps) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white transition-all group ${hoverBg}`}
    >
      <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="font-bold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </Link>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  lightColor: string;
  textColor: string;
}

function StatCard({ title, value, change, icon: Icon, color, lightColor, textColor }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</p>
          <h3 className="text-3xl font-black text-gray-900 mt-2">{value}</h3>
        </div>
        <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-${color.split('-')[1]}-200 transition-transform group-hover:scale-110 duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-6 flex items-center text-sm relative z-10">
        <div className={`flex items-center font-bold ${textColor} ${lightColor} px-2 py-1 rounded-lg`}>
          <TrendingUp className="w-4 h-4 mr-1" />
          {change}
        </div>
        <span className="text-gray-400 ml-3 font-medium text-xs">depuis 30 jours</span>
      </div>
      
      {/* Decorative background circle */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 ${lightColor} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
    </div>
  );
}

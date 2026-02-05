import { BarChart, Activity, Users, Globe } from "lucide-react";

export default function StatsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Statistiques</h1>
        <p className="text-gray-500 mt-2">Analysez la croissance et l'engagement des utilisateurs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-700">Utilisateurs Actifs (30 jours)</h3>
            <Activity className="text-brand-green w-6 h-6" />
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 60, 45, 70, 85, 65, 90, 80, 95, 75, 60, 85].map((h, i) => (
              <div key={i} className="w-full bg-brand-green/20 rounded-t-lg relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-brand-green rounded-t-lg transition-all duration-500 group-hover:bg-brand-green-dark"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase">
            <span>Sem 1</span>
            <span>Sem 2</span>
            <span>Sem 3</span>
            <span>Sem 4</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-700">Répartition Géographique</h3>
            <Globe className="text-brand-blue w-6 h-6" />
          </div>
          <div className="space-y-4">
            <CountryStat country="RDC" percent={65} color="bg-brand-blue" />
            <CountryStat country="France" percent={15} color="bg-brand-yellow" />
            <CountryStat country="Congo-Brazzaville" percent={10} color="bg-brand-green" />
            <CountryStat country="Belgique" percent={5} color="bg-brand-red" />
            <CountryStat country="Autres" percent={5} color="bg-gray-300" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-700 mb-6">Leçons les plus populaires</h3>
        <div className="space-y-4">
          {[
            { name: "Salutations (Mbote)", views: 12500, completion: 85 },
            { name: "Au marché", views: 8400, completion: 72 },
            { name: "La famille", views: 6200, completion: 68 },
            { name: "Les verbes être et avoir", views: 5100, completion: 55 },
          ].map((lesson, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-8 font-bold text-gray-400">#{i + 1}</div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-gray-700">{lesson.name}</span>
                  <span className="text-sm text-gray-500 font-medium">{lesson.views} vues</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-brand-yellow h-2 rounded-full" 
                    style={{ width: `${lesson.completion}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm font-bold text-brand-yellow">{lesson.completion}% finis</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CountryStat({ country, percent, color }: { country: string, percent: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm font-bold text-gray-600">
        <span>{country}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div className={`${color} h-3 rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

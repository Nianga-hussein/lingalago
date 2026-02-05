import { users } from "@/app/lib/data";
import { Search, MoreVertical, Flame, Zap, BookOpen } from "lucide-react";

export default function UsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
          <p className="text-gray-500 mt-2">Gérez les comptes, abonnements et permissions.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Rechercher un utilisateur (nom, email)..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-brand-blue focus:outline-none text-gray-700 font-medium"
            />
          </div>
          <select className="py-2 px-4 rounded-xl border-2 border-gray-200 focus:border-brand-blue focus:outline-none text-gray-700 font-bold">
            <option>Tous les statuts</option>
            <option>Premium</option>
            <option>Gratuit</option>
          </select>
        </div>

        {/* List */}
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Utilisateur</th>
              <th className="px-6 py-4">Statut</th>
              <th className="px-6 py-4">Série / XP</th>
              <th className="px-6 py-4">Cours Actuel</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    user.status === 'Premium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-brand-orange font-bold text-sm">
                      <Flame className="w-4 h-4 fill-current" />
                      <span>12</span>
                    </div>
                    <div className="flex items-center gap-1 text-brand-yellow font-bold text-sm">
                      <Zap className="w-4 h-4 fill-current" />
                      <span>4500</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇨🇩</span>
                    <div>
                      <p className="font-bold text-gray-700 text-sm">Lingala</p>
                      <p className="text-xs text-gray-400 font-bold">Unité 3</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

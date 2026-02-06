"use client";

import { useState } from "react";
import { Search, MoreVertical, Flame, Zap, Trash2, Shield, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  image: string | null;
  xp: number;
  streak: number;
  hasCompletedOnboarding: boolean;
  onboardingReason: string | null;
  onboardingLevel: string | null;
  source: string | null;
  userProgress: any[];
};

export default function UsersClient({ initialUsers }: { initialUsers: User[] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
    
    setLoading(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const toggleRole = async (user: User) => {
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    if (!confirm(`Passer ${user.name} en ${newRole} ?`)) return;

    setLoading(user.id);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (res.ok) {
        setUsers(users.map(u => u.id === user.id ? { ...u, role: newRole } : u));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row items-center gap-4 bg-gray-50/50">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Rechercher un utilisateur..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none transition-all"
          />
        </div>
        <div className="text-sm text-gray-500 font-bold px-2">
          {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Utilisateur</th>
              <th className="px-6 py-4">Rôle</th>
              <th className="px-6 py-4">Onboarding</th>
              <th className="px-6 py-4">Stats</th>
              <th className="px-6 py-4">Progression</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length === 0 ? (
               <tr>
                 <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                   Aucun utilisateur trouvé.
                 </td>
               </tr>
            ) : filteredUsers.map((user) => {
              const lastLesson = user.userProgress[0]?.lesson;
              const isProcessing = loading === user.id;
              
              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-sm uppercase ring-2 ring-white shadow-sm">
                        {user.image ? (
                           <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                           user.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleRole(user)}
                      disabled={isProcessing}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {user.role === 'ADMIN' ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                      {user.role}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {user.hasCompletedOnboarding ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 w-fit">
                          Complété
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 w-fit">
                          En cours
                        </span>
                      )}
                      <div className="text-xs text-gray-500">
                         {user.source && <span className="block">Via: {user.source}</span>}
                         {user.onboardingReason && <span className="block">But: {user.onboardingReason}</span>}
                         {user.onboardingLevel && <span className="block">Niveau: {user.onboardingLevel}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-brand-orange font-bold text-sm bg-orange-50 px-2 py-1 rounded-lg">
                        <Flame className="w-4 h-4 fill-current" />
                        <span>{user.streak}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-yellow font-bold text-sm bg-yellow-50 px-2 py-1 rounded-lg">
                        <Zap className="w-4 h-4 fill-current" />
                        <span>{user.xp}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {lastLesson ? (
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-700 text-sm truncate max-w-[150px]">{lastLesson.title}</span>
                        <span className="text-xs text-gray-400 font-medium truncate max-w-[150px]">{lastLesson.unit.title}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 font-bold italic opacity-50">Inactif</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        disabled={isProcessing}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer l'utilisateur"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row items-center gap-4 bg-gray-50/50">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-blue transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher par nom ou email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 focus:outline-none transition-all text-gray-700 font-medium"
          />
        </div>
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-500 font-bold shadow-sm whitespace-nowrap">
          {filteredUsers.length} membre{filteredUsers.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 text-gray-400 text-xs uppercase font-black tracking-widest border-b border-gray-200">
              <th className="px-8 py-5">Utilisateur</th>
              <th className="px-6 py-5">Rôle</th>
              <th className="px-6 py-5">Onboarding</th>
              <th className="px-6 py-5 text-center">Stats</th>
              <th className="px-6 py-5">Progression</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length === 0 ? (
               <tr>
                 <td colSpan={6} className="px-8 py-20 text-center">
                   <div className="flex flex-col items-center gap-2">
                     <Search className="w-12 h-12 text-gray-200" />
                     <p className="text-gray-400 font-bold text-lg">Aucun utilisateur trouvé</p>
                     <p className="text-gray-300 text-sm">Essayez un autre terme de recherche</p>
                   </div>
                 </td>
               </tr>
            ) : filteredUsers.map((user) => {
              const lastLesson = user.userProgress[0]?.lesson;
              const isProcessing = loading === user.id;
              
              return (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 text-brand-blue flex items-center justify-center font-black text-lg uppercase ring-4 ring-white shadow-sm overflow-hidden shrink-0">
                        {user.image ? (
                           <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                           user.name.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-gray-800 text-base truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 font-bold tracking-tight truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <button 
                      onClick={() => toggleRole(user)}
                      disabled={isProcessing}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all hover:shadow-sm active:scale-95 border ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100' 
                          : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'
                      }`}
                    >
                      {user.role === 'ADMIN' ? <Shield className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
                      {user.role}
                    </button>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                      {user.hasCompletedOnboarding ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-green-50 text-green-600 border border-green-100 w-fit">
                          Complété
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100 w-fit">
                          En cours
                        </span>
                      )}
                      <div className="text-[10px] text-gray-400 font-bold space-y-0.5">
                         {user.onboardingReason && <span className="block opacity-70 italic">{user.onboardingReason}</span>}
                         {user.onboardingLevel && <span className="block">{user.onboardingLevel}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-orange-500 font-black text-sm">
                          <Flame className="w-4 h-4 fill-current" />
                          <span>{user.streak}</span>
                        </div>
                        <span className="text-[9px] text-gray-300 font-bold uppercase tracking-tighter">Série</span>
                      </div>
                      <div className="w-px h-6 bg-gray-100"></div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                          <Zap className="w-4 h-4 fill-current" />
                          <span>{user.xp}</span>
                        </div>
                        <span className="text-[9px] text-gray-300 font-bold uppercase tracking-tighter">XP</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {lastLesson ? (
                      <div className="flex flex-col">
                        <span className="font-black text-gray-700 text-sm truncate max-w-[150px] leading-tight">{lastLesson.title}</span>
                        <span className="text-[10px] text-gray-400 font-bold truncate max-w-[150px] mt-0.5">{lastLesson.unit.title}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                        <span className="text-xs font-black italic opacity-50 uppercase tracking-widest">Inactif</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        disabled={isProcessing}
                        className="p-2.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100"
                        title="Supprimer l'utilisateur"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
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

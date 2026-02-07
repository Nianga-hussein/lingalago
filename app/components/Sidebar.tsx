"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Users, Settings, Mic, BarChart, Layers, ArrowLeft, LogOut } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Unités", href: "/admin/units", icon: Layers },
  { label: "Leçons", href: "/admin/lessons", icon: BookOpen },
  { label: "Audios", href: "/admin/audios", icon: Mic },
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  { label: "Statistiques", href: "/admin/stats", icon: BarChart },
  { label: "Paramètres", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-100 bg-white h-screen fixed left-0 top-0 flex flex-col shadow-sm">
      <div className="p-8 mb-4">
        <Link href="/admin" className="flex items-center gap-3 group">
          <img 
            src="/assets/logo/logo.svg" 
            alt="LingalaGo" 
            className="w-10 h-10 transition-transform duration-500 group-hover:rotate-[360deg]" 
          />
          <div>
            <h1 className="text-2xl font-black text-brand-green tracking-tighter leading-none">lingalago</h1>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Admin Panel</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${
                isActive 
                  ? "bg-brand-green/10 text-brand-green shadow-sm shadow-brand-green/5" 
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-brand-green" : "text-gray-300"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto border-t border-gray-50 space-y-2">
        <Link 
          href="/learn" 
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all font-black text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour App
        </Link>
        
        <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3 border border-gray-100/50">
          <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center font-black shadow-lg shadow-brand-green/20 shrink-0">
            A
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-gray-800 truncate uppercase">Administrateur</p>
            <p className="text-[10px] font-bold text-gray-400 truncate">admin@lingalago.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

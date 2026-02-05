import Link from "next/link";
import { Home, BookOpen, Users, Settings, Mic, BarChart, Layers } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Leçons", href: "/admin/lessons", icon: BookOpen },
  { label: "Audios", href: "/admin/audios", icon: Mic },
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  { label: "Statistiques", href: "/admin/stats", icon: BarChart },
  { label: "Paramètres", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-screen fixed left-0 top-0 flex flex-col p-4">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold text-brand-green tracking-wide">LingalaGo</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Admin Panel</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors font-bold uppercase text-sm tracking-wide"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center font-bold text-white">
            A
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">Admin</p>
            <p className="text-xs text-gray-400">admin@lingalago.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

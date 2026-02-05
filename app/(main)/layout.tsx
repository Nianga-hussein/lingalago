"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shield, User } from "lucide-react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/learn", icon: Home, label: "Apprendre" },
    { href: "/leaderboard", icon: Shield, label: "Classement" },
    { href: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0 md:pl-64 flex flex-col md:flex-row">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex w-64 border-r border-gray-200 h-screen fixed left-0 top-0 flex-col p-4">
        <div className="mb-8 px-4">
          <h1 className="text-3xl font-bold text-brand-green tracking-wide">lingalago</h1>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold uppercase text-sm tracking-wide ${
                pathname === item.href 
                  ? "bg-blue-50 text-brand-blue border-2 border-brand-blue" 
                  : "text-gray-500 hover:bg-gray-100 border-2 border-transparent"
              }`}
            >
              <item.icon className="w-6 h-6" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-6 py-4 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all ${
              pathname === item.href ? "bg-blue-50/50" : ""
            }`}
          >
            <item.icon 
              className={`w-8 h-8 mb-1 ${
                pathname === item.href 
                  ? "text-brand-blue fill-current" 
                  : "text-gray-400"
              }`} 
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}

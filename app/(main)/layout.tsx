"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shield, User } from "lucide-react";
import MobileNav from "@/app/components/MobileNav";
import Logo from "@/app/components/Logo";

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
    <div className="min-h-screen bg-background pb-28 md:pb-0 md:pl-64 flex flex-col md:flex-row">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex w-64 border-r border-gray-200 h-screen fixed left-0 top-0 flex-col p-4 bg-background z-40">
        <div className="mb-8 px-2">
          <Logo size="sm" showText animate className="" />
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold uppercase text-sm tracking-wide ${
                pathname === item.href
                  ? "bg-blue-50 text-[#1CB0F6] border-2 border-[#1CB0F6]"
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
      <main className="flex-1 max-w-2xl mx-auto w-full px-1 sm:px-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
}

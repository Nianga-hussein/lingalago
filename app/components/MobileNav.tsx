"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shield, User } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/learn", icon: Home, label: "Apprendre" },
    { href: "/leaderboard", icon: Shield, label: "Classement" },
    { href: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="bg-background/95 backdrop-blur-xl border-t border-gray-200 px-2 pb-[env(safe-area-inset-bottom)] flex justify-around items-center mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex flex-col items-center justify-center flex-1 py-3 transition-all duration-200 ${
                isActive ? "" : "opacity-60"
              }`}
            >
              <div
                className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? "text-[#1CB0F6]" : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                <item.icon
                  className={`w-6 h-6 transition-all duration-200 ${
                    isActive ? "stroke-[2.5px]" : "stroke-2"
                  }`}
                />
              </div>

              <span
                className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive ? "text-[#1CB0F6]" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>

              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#1CB0F6] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

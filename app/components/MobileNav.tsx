"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shield, User, Sparkles } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/learn", icon: Home, label: "Apprendre" },
    { href: "/leaderboard", icon: Shield, label: "Classement" },
    { href: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50">
       <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] p-2 flex justify-between items-center mx-auto max-w-sm ring-1 ring-black/5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center justify-center w-full h-16 rounded-2xl transition-all duration-300 ease-out ${
                isActive 
                  ? "bg-brand-blue/10" 
                  : "hover:bg-gray-50"
              }`}
            >
              <div className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                  isActive ? "translate-y-0" : "translate-y-1"
              }`}>
                  {/* Icon Container */}
                  <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "text-brand-blue scale-110" 
                        : "text-gray-400 group-hover:text-gray-600"
                  }`}>
                    <item.icon 
                        className={`w-7 h-7 transition-all duration-300 ${
                            isActive ? "fill-brand-blue/20 stroke-[2.5px]" : "stroke-2"
                        }`} 
                    />
                    
                    {/* Active Glow */}
                    {isActive && (
                        <div className="absolute inset-0 bg-brand-blue/20 blur-xl rounded-full -z-10 animate-pulse"></div>
                    )}
                  </div>

                  {/* Label (Optional - maybe hidden for cleaner look, or small) */}
                  {/* <span className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      isActive ? "text-brand-blue opacity-100" : "text-gray-400 opacity-0 h-0"
                  }`}>
                      {item.label}
                  </span> */}
              </div>
              
              {/* Active Indicator Dot */}
              <span className={`absolute bottom-2 w-1.5 h-1.5 bg-brand-blue rounded-full transition-all duration-300 ${
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}></span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

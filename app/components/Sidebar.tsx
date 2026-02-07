"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Users, Settings, Mic, BarChart, Layers, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "@/app/components/Logo";
import { Home, BookOpen, Users, Settings, Mic, BarChart, Layers, ArrowLeft, LogOut } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Unites", href: "/admin/units", icon: Layers },
  { label: "Lecons", href: "/admin/lessons", icon: BookOpen },
  { label: "Audios", href: "/admin/audios", icon: Mic },
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  { label: "Statistiques", href: "/admin/stats", icon: BarChart },
  { label: "Parametres", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent scroll when open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navContent = (
    <>
      <div className="mb-8 px-4 flex items-center justify-between">
        <div>
          <Logo size="sm" showText animate={false} />
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1 ml-1">Admin Panel</p>
        </div>
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-400"
          onClick={() => setOpen(false)}
          aria-label="Fermer le menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1">

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
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold uppercase text-sm tracking-wide ${
                isActive
                  ? "bg-green-50 text-[#58CC02] border-2 border-[#58CC02]"
                  : "text-gray-500 hover:bg-gray-100 border-2 border-transparent"
              }`}
            >
              <item.icon className="w-5 h-5" />
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

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFC800] flex items-center justify-center font-bold text-foreground">
      
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
    </>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-background rounded-xl border border-gray-200 shadow-sm"
        aria-label="Ouvrir le menu"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-gray-200 bg-background h-screen fixed left-0 top-0 flex-col p-4 z-40">
        {navContent}
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-background border-r border-gray-200 z-50 flex flex-col p-4 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}

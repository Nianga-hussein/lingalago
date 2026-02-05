"use client";

import Link from "next/link";
import { ArrowLeft, Facebook, Apple, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <Link href="/" className="text-gray-300 hover:text-gray-400">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-gray-400 font-bold uppercase tracking-widest text-sm">Connexion</h1>
        <div className="w-6"></div> {/* Spacer for centering */}
      </header>

      {/* Form */}
      <main className="flex-1 px-6 pt-8 pb-8 flex flex-col max-w-md mx-auto w-full">
        <div className="space-y-4 mb-6">
          <input 
            type="text" 
            placeholder="E-mail, téléphone ou nom d'utilisateur"
            className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-700 font-medium placeholder-gray-400 focus:bg-white focus:border-brand-blue focus:outline-none transition-colors"
          />
          
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-700 font-medium placeholder-gray-400 focus:bg-white focus:border-brand-blue focus:outline-none transition-colors"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button className="w-full bg-gray-200 text-gray-400 font-bold py-4 rounded-2xl text-sm tracking-widest uppercase mb-6 cursor-not-allowed">
          SE CONNECTER
        </button>

        <div className="text-center mb-12">
          <Link href="#" className="text-brand-blue font-bold text-sm tracking-wide uppercase hover:underline">
            MOT DE PASSE OUBLIÉ ?
          </Link>
        </div>

        {/* Social Login */}
        <div className="space-y-4 mt-auto">
          <button className="w-full p-4 rounded-2xl border-2 border-gray-200 flex items-center justify-center gap-4 hover:bg-gray-50 transition-colors group">
            <span className="font-bold text-gray-700 group-hover:text-gray-900 text-sm tracking-wide uppercase">
              <span className="text-blue-500 mr-1">G</span> 
              SE CONNECTER AVEC GOOGLE
            </span>
          </button>
          
          <button className="w-full p-4 rounded-2xl border-2 border-gray-200 flex items-center justify-center gap-4 hover:bg-gray-50 transition-colors group">
             <Facebook className="w-6 h-6 text-[#1877F2]" />
            <span className="font-bold text-gray-700 group-hover:text-gray-900 text-sm tracking-wide uppercase">
              SE CONNECTER AVEC FACEBOOK
            </span>
          </button>

          <button className="w-full p-4 rounded-2xl border-2 border-gray-200 flex items-center justify-center gap-4 hover:bg-gray-50 transition-colors group">
             <Apple className="w-6 h-6 text-black" />
            <span className="font-bold text-gray-700 group-hover:text-gray-900 text-sm tracking-wide uppercase">
              SE CONNECTER AVEC APPLE
            </span>
          </button>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-8 leading-relaxed px-4">
          En te connectant à LingalaGo, tu acceptes nos <Link href="#" className="font-bold">Conditions d'utilisation</Link> et notre <Link href="#" className="font-bold">Politique de confidentialité</Link>.
        </p>
      </main>
    </div>
  );
}

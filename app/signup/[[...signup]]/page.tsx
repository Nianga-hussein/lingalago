"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, ArrowRight, User, Mail, Lock, Star } from "lucide-react";
import Logo from "@/app/components/Logo";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur d'inscription");
      }

      if (data.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/onboarding/intro");
      }

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row-reverse">
      {/* Right Side - Visual (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1CB0F6] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10 pattern-grid"></div>
        <div className="relative z-10 text-center text-background max-w-lg">
          <div className="mx-auto mb-8 flex items-center justify-center">
            <Logo size="xl" animate mood="encourage" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Commencez l'aventure !</h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            Rejoignez une communauté de passionnés et découvrez la richesse de la culture congolaise.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-4">
             <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-1">Gratuit</div>
                <div className="text-sm text-blue-100 font-bold uppercase">Pour toujours</div>
             </div>
             <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 text-center">
                <div className="text-3xl font-bold text-green-300 mb-1">Ludique</div>
                <div className="text-sm text-blue-100 font-bold uppercase">Apprendre en jouant</div>
             </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-2xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-400 rounded-full opacity-20 blur-3xl animate-float-delayed"></div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6 md:space-y-8">
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block mb-6 md:mb-8">
              <Logo size="sm" showText animate={false} />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer un profil</h1>
            <p className="text-gray-500">
              Quelques secondes suffisent pour commencer.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:bg-white focus:outline-none transition-all font-medium placeholder-gray-400"
                  placeholder="Nom complet (ex: Jean Dupont)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:bg-white focus:outline-none transition-all font-medium placeholder-gray-400"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:bg-white focus:outline-none transition-all font-medium placeholder-gray-400"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_0_rgb(24,140,216)] hover:shadow-[0_2px_0_rgb(24,140,216)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  CRÉER MON COMPTE
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium uppercase tracking-wider text-xs">Ou s'inscrire avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
              Facebook
            </button>
          </div>

          <p className="text-center text-gray-500 font-medium mt-8">
            Tu as déjà un compte ?{" "}
            <Link href="/login" className="text-brand-blue font-bold hover:underline">
              SE CONNECTER
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

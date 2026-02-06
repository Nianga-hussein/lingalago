"use client";

import { useState } from "react";
import { Save, Loader2, Globe, Lock, Bell } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    siteName: "LingalaGo",
    maintenanceMode: false,
    registrationOpen: true,
    emailNotifications: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    alert("Paramètres enregistrés (Simulation)");
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
        <p className="text-gray-500 mt-2 font-medium">Configuration globale de l'application.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-400" />
            Général
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nom du site</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:outline-none font-medium"
                value={formData.siteName}
                onChange={(e) => setFormData({...formData, siteName: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-400" />
            Accès & Sécurité
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <span className="block font-bold text-gray-800">Mode Maintenance</span>
                <span className="text-sm text-gray-500">Rend le site inaccessible aux utilisateurs non-admins.</span>
              </div>
              <div className={`w-12 h-7 rounded-full p-1 transition-colors ${formData.maintenanceMode ? 'bg-brand-blue' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${formData.maintenanceMode ? 'translate-x-5' : ''}`}></div>
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={formData.maintenanceMode} 
                onChange={(e) => setFormData({...formData, maintenanceMode: e.target.checked})} 
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <span className="block font-bold text-gray-800">Inscriptions Ouvertes</span>
                <span className="text-sm text-gray-500">Autoriser de nouveaux utilisateurs à créer un compte.</span>
              </div>
              <div className={`w-12 h-7 rounded-full p-1 transition-colors ${formData.registrationOpen ? 'bg-brand-green' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${formData.registrationOpen ? 'translate-x-5' : ''}`}></div>
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={formData.registrationOpen} 
                onChange={(e) => setFormData({...formData, registrationOpen: e.target.checked})} 
              />
            </label>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
           <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 rounded-xl transition-all shadow-[0_4px_0_rgb(24,140,216)] hover:shadow-[0_2px_0_rgb(24,140,216)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Enregistrer les modifications</>}
          </button>
        </div>
      </form>
    </div>
  );
}

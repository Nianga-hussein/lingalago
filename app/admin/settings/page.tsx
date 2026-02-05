import { Save, Bell, Lock, User, Globe, Moon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
        <p className="text-gray-500 mt-2">Configuration générale de la plateforme LingalaGo.</p>
      </div>

      <div className="space-y-6">
        {/* Section Générale */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-blue" />
            Général
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nom de l'application</label>
              <input type="text" defaultValue="LingalaGo" className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-brand-green focus:outline-none font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Langue par défaut</label>
              <select className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-brand-green focus:outline-none font-medium">
                <option>Français</option>
                <option>Anglais</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-bold text-gray-700">Mode Maintenance</span>
              <Toggle />
            </div>
          </div>
        </section>

        {/* Gamification */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-yellow" />
            Gamification
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">XP par leçon</label>
                <input type="number" defaultValue="10" className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-brand-yellow focus:outline-none font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">XP Bonus (Perfect)</label>
                <input type="number" defaultValue="5" className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-brand-yellow focus:outline-none font-medium" />
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-red" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Rappels quotidiens d'apprentissage</span>
              <Toggle checked />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Alertes nouveaux utilisateurs</span>
              <Toggle />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px]">
            <Save className="w-5 h-5" />
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked = false }: { checked?: boolean }) {
  return (
    <div className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-brand-green' : 'bg-gray-300'}`}>
      <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  );
}

import { Plus, Edit2, Trash2, Search, Layers, Book } from "lucide-react";

const units = [
  { id: 1, title: "Commande au café", description: "Apprends à commander à boire et à manger", lessonsCount: 5, color: "bg-brand-green", order: 1 },
  { id: 2, title: "Salutations", description: "Dis bonjour et présente-toi", lessonsCount: 4, color: "bg-brand-blue", order: 2 },
  { id: 3, title: "La famille", description: "Parle de ta famille proche", lessonsCount: 6, color: "bg-brand-yellow", order: 3 },
];

export default function UnitsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Unités</h1>
          <p className="text-gray-500 mt-2">Organisez les leçons en chapitres thématiques.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px]">
          <Plus className="w-5 h-5" />
          Nouvelle Unité
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {units.map((unit) => (
          <div key={unit.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex items-center gap-6 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute left-0 top-0 bottom-0 w-4 ${unit.color}`}></div>
            
            <div className={`w-16 h-16 ${unit.color} rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
              <Layers className="w-8 h-8" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Unité {unit.order}</span>
                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Book className="w-3 h-3" />
                  {unit.lessonsCount} leçons
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{unit.title}</h3>
              <p className="text-gray-500 font-medium">{unit.description}</p>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-3 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-xl transition-colors border-2 border-transparent hover:border-blue-100">
                <Edit2 className="w-5 h-5" />
              </button>
              <button className="p-3 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-xl transition-colors border-2 border-transparent hover:border-red-100">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

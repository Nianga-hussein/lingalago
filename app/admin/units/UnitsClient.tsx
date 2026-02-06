"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, Layers } from "lucide-react";
import { useRouter } from "next/navigation";

type Unit = {
  id: string;
  title: string;
  description: string;
  order: number;
  color: string;
  lessons: any[];
};

export default function UnitsClient({ initialUnits }: { initialUnits: Unit[] }) {
  const router = useRouter();
  const [units, setUnits] = useState(initialUnits);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: 1,
    color: "bg-brand-green"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingUnit) {
        const res = await fetch(`/api/admin/units/${editingUnit.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setUnits(units.map(u => u.id === editingUnit.id ? { ...updated, lessons: u.lessons } : u));
        }
      } else {
        const res = await fetch("/api/admin/units", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setUnits([...units, { ...created, lessons: [] }]);
        }
      }
      closeModal();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette unité et toutes ses leçons ?")) return;
    
    try {
      const res = await fetch(`/api/admin/units/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUnits(units.filter(u => u.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (unit?: Unit) => {
    if (unit) {
      setEditingUnit(unit);
      setFormData({
        title: unit.title,
        description: unit.description,
        order: unit.order,
        color: unit.color
      });
    } else {
      setEditingUnit(null);
      setFormData({
        title: "",
        description: "",
        order: units.length + 1,
        color: "bg-brand-green"
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUnit(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => openModal()}
          className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Unité
        </button>
      </div>

      <div className="grid gap-4">
        {units.map((unit) => (
          <div key={unit.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex items-center justify-between group hover:border-brand-blue/50 transition-colors">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-xl ${unit.color} flex items-center justify-center text-white shadow-sm`}>
                <span className="font-bold text-2xl">{unit.order}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{unit.title}</h3>
                <p className="text-gray-500 font-medium">{unit.description}</p>
                <div className="mt-2 flex items-center gap-2 text-sm font-bold text-gray-400">
                  <Layers className="w-4 h-4" />
                  {unit.lessons.length} leçon{unit.lessons.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => openModal(unit)}
                className="p-3 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-xl transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(unit.id)}
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {units.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400">Aucune unité</h3>
            <p className="text-gray-400">Commencez par en créer une.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                {editingUnit ? "Modifier l'unité" : "Nouvelle unité"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:outline-none font-medium"
                  placeholder="Ex: Unit 1 - Introduction"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:outline-none font-medium resize-none h-24"
                  placeholder="Description courte..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ordre</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:outline-none font-medium"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Couleur</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:outline-none font-medium"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                  >
                    <option value="bg-brand-green">Vert</option>
                    <option value="bg-brand-blue">Bleu</option>
                    <option value="bg-brand-orange">Orange</option>
                    <option value="bg-brand-yellow">Jaune</option>
                    <option value="bg-purple-500">Violet</option>
                    <option value="bg-pink-500">Rose</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors uppercase tracking-wide text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] uppercase tracking-wide text-sm"
                >
                  {editingUnit ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

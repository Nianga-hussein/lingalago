"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, GripVertical, CheckCircle, Type, Mic, Image as ImageIcon } from "lucide-react";

type Exercise = {
  id: string;
  type: string;
  question: string;
  correctAnswer: string | null;
  options: any;
  order: number;
};

type ExerciseListProps = {
  lessonId: string;
  exercises: Exercise[];
  onUpdate: () => void;
};

export default function ExerciseList({ lessonId, exercises, onUpdate }: ExerciseListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    type: "multiple_choice",
    question: "",
    correctAnswer: "",
    optionsStr: "", // For simple text options like ["a", "b"]
    order: exercises.length + 1,
  });

  const resetForm = () => {
    setEditingExercise(null);
    setFormData({
      type: "multiple_choice",
      question: "",
      correctAnswer: "",
      optionsStr: "",
      order: exercises.length + 1,
    });
    setIsFormOpen(false);
  };

  const openEdit = (ex: Exercise) => {
    setEditingExercise(ex);
    
    // Parse options to string for textarea
    let optionsStr = "";
    if (Array.isArray(ex.options)) {
        // If options are objects (like for image_selection)
        if (typeof ex.options[0] === 'object') {
             optionsStr = JSON.stringify(ex.options, null, 2);
        } else {
             optionsStr = ex.options.join(", ");
        }
    }

    setFormData({
      type: ex.type,
      question: ex.question,
      correctAnswer: ex.correctAnswer || "",
      optionsStr: optionsStr,
      order: ex.order,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse options
    let options = null;
    if (formData.optionsStr) {
       try {
          // Try to parse as JSON first (for complex options)
          if (formData.optionsStr.trim().startsWith("[")) {
              options = JSON.parse(formData.optionsStr);
          } else {
              // Fallback to comma separated list
              options = formData.optionsStr.split(",").map(s => s.trim());
          }
       } catch (e) {
          // If JSON parse fails, treat as simple array
          options = formData.optionsStr.split(",").map(s => s.trim());
       }
    }

    const payload = {
       lessonId,
       type: formData.type,
       question: formData.question,
       correctAnswer: formData.correctAnswer || null,
       options,
       order: formData.order
    };

    try {
      if (editingExercise) {
        await fetch(`/api/admin/exercises/${editingExercise.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/admin/exercises", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      onUpdate();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la sauvegarde");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet exercice ?")) return;
    await fetch(`/api/admin/exercises/${id}`, { method: "DELETE" });
    onUpdate();
  };

  const getIcon = (type: string) => {
     switch(type) {
        case "speech": return <Mic className="w-4 h-4 text-purple-500" />;
        case "image_selection": return <ImageIcon className="w-4 h-4 text-brand-blue" />;
        case "translation": return <Type className="w-4 h-4 text-brand-green" />;
        default: return <CheckCircle className="w-4 h-4 text-brand-orange" />;
     }
  };

  return (
    <div className="mt-8 border-t border-gray-100 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Exercices ({exercises.length})</h3>
        {!isFormOpen && (
          <button 
            onClick={() => { resetForm(); setIsFormOpen(true); }}
            className="text-sm font-bold text-brand-blue hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        )}
      </div>

      {isFormOpen ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4 mb-6">
           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Type</label>
                <select 
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="multiple_choice">QCM</option>
                  <option value="translation">Traduction</option>
                  <option value="speech">Prononciation (Speech)</option>
                  <option value="image_selection">Sélection Image</option>
                  <option value="matching">Association (Matching)</option>
                  <option value="fill_blank">Texte à trous</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Ordre</label>
                <input 
                  type="number" 
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm"
                  value={formData.order}
                  onChange={e => setFormData({...formData, order: parseInt(e.target.value)})}
                />
              </div>
           </div>

           <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Question</label>
              <input 
                type="text" 
                className="w-full p-2 rounded-lg border border-gray-300 text-sm"
                placeholder="Ex: Traduis 'Bonjour'"
                value={formData.question}
                onChange={e => setFormData({...formData, question: e.target.value})}
              />
           </div>

           <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Réponse Correcte (Texte)</label>
              <input 
                type="text" 
                className="w-full p-2 rounded-lg border border-gray-300 text-sm"
                placeholder="Ex: Mbote"
                value={formData.correctAnswer}
                onChange={e => setFormData({...formData, correctAnswer: e.target.value})}
              />
           </div>

           <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Options (JSON ou séparées par virgule)</label>
              <textarea 
                className="w-full p-2 rounded-lg border border-gray-300 text-sm h-24 font-mono"
                placeholder={'["Option A", "Option B"] ou JSON complexe'}
                value={formData.optionsStr}
                onChange={e => setFormData({...formData, optionsStr: e.target.value})}
              />
              <p className="text-[10px] text-gray-400 mt-1">Pour QCM simple : séparer par virgules. Pour Image/Matching : utiliser JSON.</p>
           </div>

           <div className="flex justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-200 rounded-lg"
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 text-sm font-bold text-white bg-brand-green hover:bg-green-600 rounded-lg"
              >
                Sauvegarder
              </button>
           </div>
        </form>
      ) : (
        <div className="space-y-2">
          {exercises.map((ex) => (
            <div key={ex.id} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-300 transition-colors group">
               <div className="cursor-move text-gray-300 hover:text-gray-500">
                  <GripVertical className="w-4 h-4" />
               </div>
               <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-500">
                  {getIcon(ex.type)}
               </div>
               <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-800 truncate">{ex.question}</p>
                  <p className="text-xs text-gray-400">{ex.type}</p>
               </div>
               <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(ex)} className="p-1.5 text-gray-400 hover:text-brand-blue rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(ex.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            </div>
          ))}
          {exercises.length === 0 && (
             <div className="text-center py-6 text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
                Aucun exercice pour cette leçon.
             </div>
          )}
        </div>
      )}
    </div>
  );
}

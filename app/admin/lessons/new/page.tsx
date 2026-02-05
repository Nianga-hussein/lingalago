"use client";

import { useState } from "react";
import { Plus, Trash2, Mic, Type, Image as ImageIcon, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewLessonPage() {
  const [exercises, setExercises] = useState([
    { id: 1, type: "translation", question: "", answer: "" }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { id: Date.now(), type: "translation", question: "", answer: "" }]);
  };

  const removeExercise = (id: number) => {
    setExercises(exercises.filter(e => e.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/lessons" className="p-2 rounded-xl hover:bg-gray-100 text-gray-500">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Nouvelle Leçon</h1>
          <p className="text-gray-500">Créez une séquence d'exercices.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Lesson Info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Titre de la leçon</label>
              <input type="text" placeholder="Ex: Salutations (Mbote)" className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-brand-green focus:outline-none font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Unité</label>
              <select className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-brand-green focus:outline-none font-medium">
                <option>Unité 1: Commande au café</option>
                <option>Unité 2: Salutations</option>
                <option>Unité 3: La famille</option>
              </select>
            </div>
          </div>
        </div>

        {/* Exercises Builder */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Exercices ({exercises.length})</h2>
          </div>

          {exercises.map((exercise, index) => (
            <div key={exercise.id} className="bg-white border border-gray-200 rounded-2xl p-6 relative group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => removeExercise(exercise.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <select className="p-2 rounded-lg border-2 border-gray-200 font-bold text-gray-600 focus:border-brand-blue outline-none">
                  <option value="image_selection">Sélection d'image</option>
                  <option value="translation">Traduction</option>
                  <option value="listening">Écoute</option>
                  <option value="speech">Prononciation</option>
                </select>
              </div>

              {exercise.type === "image_selection" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Question</label>
                    <input type="text" placeholder="Choisis la bonne image" defaultValue="Choisis la bonne image" className="w-full p-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-blue focus:outline-none transition-colors font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Mot Cible (Audio)</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Ex: café" className="flex-1 p-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-blue focus:outline-none transition-colors font-medium" />
                      <button className="p-3 bg-gray-100 rounded-xl text-gray-500 hover:bg-brand-blue hover:text-white transition-colors">
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {[1, 2, 3, 4].map((opt) => (
                      <div key={opt} className="p-3 border-2 border-gray-100 rounded-xl bg-gray-50">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-bold text-gray-400">Option {opt}</span>
                          <input type="radio" name={`correct-${exercise.id}`} className="w-4 h-4 text-brand-green" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="w-full h-20 bg-white rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
                            <ImageIcon className="w-6 h-6" />
                          </button>
                          <input type="text" placeholder="Label (ex: thé)" className="w-full p-2 text-sm rounded-lg border border-gray-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Phrase en Français</label>
                    <input type="text" placeholder="Bonjour comment ça va ?" className="w-full p-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-blue focus:outline-none transition-colors font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Traduction Lingala</label>
                    <input type="text" placeholder="Mbote, ozali malamu ?" className="w-full p-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-green focus:outline-none transition-colors font-medium" />
                  </div>
                </div>
              )}
            </div>
          ))}

          <button 
            onClick={addExercise}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold hover:border-brand-green hover:text-brand-green hover:bg-green-50 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ajouter un exercice
          </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-64 right-0 p-4 bg-white border-t border-gray-200 flex items-center justify-end gap-4 z-10">
        <Link href="/admin/lessons" className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
          Annuler
        </Link>
        <button className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px]">
          <Save className="w-5 h-5" />
          Enregistrer la leçon
        </button>
      </div>
    </div>
  );
}

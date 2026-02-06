"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, BookOpen, Star, Video, Headphones, Gift, Book, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import ExerciseList from "./ExerciseList";

type Unit = {
  id: string;
  title: string;
};

type Lesson = {
  id: string;
  title: string;
  order: number;
  type: "STAR" | "VIDEO" | "AUDIO" | "CHEST" | "STORY"; 
  unitId: string;
  unit: Unit;
  exercises: any[];
};

export default function LessonsClient({ initialLessons, units }: { initialLessons: Lesson[], units: Unit[] }) {
  const router = useRouter();
  const [lessons, setLessons] = useState(initialLessons);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    order: 1,
    type: "STAR",
    unitId: units[0]?.id || ""
  });

  const getLessonIcon = (type: string) => {
    switch(type) {
      case "VIDEO": return <Video className="w-5 h-5 text-brand-blue" />;
      case "AUDIO": return <Headphones className="w-5 h-5 text-purple-500" />;
      case "CHEST": return <Gift className="w-5 h-5 text-brand-yellow" />;
      case "STORY": return <Book className="w-5 h-5 text-brand-orange" />;
      default: return <Star className="w-5 h-5 text-brand-green" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedLessonId(expandedLessonId === id ? null : id);
  };

  const refreshData = async () => {
    router.refresh();
    // window.location.reload(); // Removed to prevent full reload loop
  };

  // Effect to update local state when props change (after router.refresh)
  useEffect(() => {
    setLessons(initialLessons);
  }, [initialLessons]);
  
  // ... (rest of handleSubmit, handleDelete, openModal, closeModal remains similar)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingLesson) {
        const res = await fetch(`/api/admin/lessons/${editingLesson.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
           refreshData();
        }
      } else {
        const res = await fetch("/api/admin/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
           refreshData();
        }
      }
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette leçon et tous ses exercices ?")) return;
    
    try {
      const res = await fetch(`/api/admin/lessons/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLessons(lessons.filter(l => l.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (lesson?: Lesson) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData({
        title: lesson.title,
        order: lesson.order,
        type: lesson.type,
        unitId: lesson.unitId
      });
    } else {
      setEditingLesson(null);
      setFormData({
        title: "",
        order: lessons.length + 1,
        type: "STAR",
        unitId: units[0]?.id || ""
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLesson(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => openModal()}
          className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px] active:shadow-none active:translate-y-[2px] flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Leçon
        </button>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className={`bg-white border-2 rounded-2xl p-6 transition-all ${expandedLessonId === lesson.id ? 'border-brand-blue ring-2 ring-brand-blue/10' : 'border-gray-200 hover:border-brand-blue/50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 cursor-pointer flex-1" onClick={() => toggleExpand(lesson.id)}>
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-gray-100">
                  {getLessonIcon(lesson.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    {lesson.title}
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase tracking-wide">
                      {lesson.type}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-sm font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-lg">
                       {lesson.unit?.title || "Unité inconnue"}
                     </span>
                     <span className="text-sm text-gray-400 font-bold">•</span>
                     <span className="text-sm text-gray-400 font-bold">Ordre: {lesson.order}</span>
                     <span className="text-sm text-gray-400 font-bold">•</span>
                     <span className="text-sm text-gray-400 font-bold">{lesson.exercises.length} exercices</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleExpand(lesson.id)}
                  className="p-3 text-gray-400 hover:text-gray-600 rounded-xl transition-colors"
                >
                  {expandedLessonId === lesson.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <div className="w-px h-8 bg-gray-200 mx-1"></div>
                <button 
                  onClick={() => openModal(lesson)}
                  className="p-3 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(lesson.id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Expanded Content: Exercises List */}
            {expandedLessonId === lesson.id && (
              <ExerciseList 
                lessonId={lesson.id} 
                exercises={lesson.exercises} 
                onUpdate={refreshData}
              />
            )}
          </div>
        ))}
        {/* ... Empty state ... */}
      </div>
      
      {/* ... Modal ... */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                {editingLesson ? "Modifier la leçon" : "Nouvelle leçon"}
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
                  placeholder="Ex: Salutations"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Unité Parente</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:outline-none font-medium"
                  value={formData.unitId}
                  onChange={(e) => setFormData({...formData, unitId: e.target.value})}
                >
                  <option value="" disabled>Choisir une unité</option>
                  {units.map(unit => (
                    <option key={unit.id} value={unit.id}>{unit.title}</option>
                  ))}
                </select>
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-brand-blue focus:outline-none font-medium"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="STAR">Standard (Étoile)</option>
                    <option value="VIDEO">Vidéo</option>
                    <option value="AUDIO">Audio</option>
                    <option value="CHEST">Coffre</option>
                    <option value="STORY">Histoire</option>
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
                  {editingLesson ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

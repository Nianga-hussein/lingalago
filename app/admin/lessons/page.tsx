import { lessons } from "@/app/lib/data";
import { Plus, Edit2, Trash2, Search, Eye } from "lucide-react";
import Link from "next/link";

export default function LessonsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Leçons</h1>
          <p className="text-gray-500 mt-2">Créez, modifiez et organisez le contenu pédagogique.</p>
        </div>
        <Link 
          href="/admin/lessons/new"
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-[0_4px_0_rgb(70,163,2)] hover:shadow-[0_2px_0_rgb(70,163,2)] translate-y-[-2px] hover:translate-y-[0px]"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Leçon
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Rechercher une leçon..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-brand-blue focus:outline-none text-gray-700 font-medium"
            />
          </div>
          <select className="py-2 px-4 rounded-xl border-2 border-gray-200 focus:border-brand-blue focus:outline-none text-gray-700 font-bold">
            <option>Tous les niveaux</option>
            <option>Débutant</option>
            <option>Intermédiaire</option>
            <option>Avancé</option>
          </select>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400">
                  {lesson.id}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{lesson.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                      lesson.level === 'Débutant' ? 'bg-green-100 text-green-700' :
                      lesson.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {lesson.level}
                    </span>
                    <span>• {lesson.wordsCount} mots</span>
                    <span>• Mis à jour le {lesson.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  lesson.status === 'Published' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {lesson.status === 'Published' ? 'Publié' : 'Brouillon'}
                </span>
                <Link 
                  href={`/admin/lessons/${lesson.id}/preview`}
                  className="p-2 text-gray-400 hover:text-brand-green hover:bg-green-50 rounded-lg transition-colors"
                  title="Voir comme sur l'app"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <Link 
                  href="/admin/lessons/new" 
                  className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </Link>
                <button className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

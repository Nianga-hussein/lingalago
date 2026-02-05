import { Play, Pause, Upload, CheckCircle, XCircle, Search, Filter } from "lucide-react";

export default function AudiosPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Audios</h1>
          <p className="text-gray-500 mt-2">Gérez la banque de voix et la prononciation.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-blue hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-[0_4px_0_#1185b8] hover:shadow-[0_2px_0_#1185b8] translate-y-[-2px] hover:translate-y-[0px]">
          <Upload className="w-5 h-5" />
          Uploader Audio
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Rechercher un fichier audio..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-brand-blue focus:outline-none text-gray-700 font-medium"
            />
          </div>
          <button className="flex items-center gap-2 py-2 px-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 font-bold text-gray-600">
            <Filter className="w-4 h-4" />
            Filtres
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors">
                  <Play className="w-5 h-5 ml-0.5" />
                </button>
                <div>
                  <h3 className="font-bold text-gray-800">mbote_male_01.mp3</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span>Homme</span>
                    <span>• 24kb</span>
                    <span>• Ajouté le 23 Oct 2023</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  Validé
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

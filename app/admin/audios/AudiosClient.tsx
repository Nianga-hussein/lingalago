"use client";

import { useState, useRef } from "react";
import { Upload, Trash2, Copy, Check, FileAudio, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Blob = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: Date;
};

export default function AudiosClient({ initialBlobs }: { initialBlobs: Blob[] }) {
  const router = useRouter();
  const [blobs, setBlobs] = useState(initialBlobs);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);

    try {
      const res = await fetch(`/api/admin/audios?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (res.ok) {
        const newBlob = await res.json();
        setBlobs([newBlob, ...blobs]);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'upload");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (url: string) => {
    if (!confirm("Supprimer ce fichier audio ?")) return;

    try {
      const res = await fetch(`/api/admin/audios?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBlobs(blobs.filter(b => b.url !== url));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-gray-200 text-center hover:border-brand-blue/50 transition-colors">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept="audio/*"
          className="hidden"
          id="audio-upload"
        />
        <label 
          htmlFor="audio-upload" 
          className={`cursor-pointer flex flex-col items-center justify-center gap-4 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
            {isUploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Upload className="w-8 h-8" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {isUploading ? "Téléchargement en cours..." : "Téléverser un fichier audio"}
            </h3>
            <p className="text-gray-400 mt-1">MP3, WAV, M4A supportés</p>
          </div>
        </label>
      </div>

      <div className="grid gap-4">
        {blobs.map((blob) => (
          <div key={blob.url} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                <FileAudio className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-800 truncate">{blob.pathname}</p>
                <a href={blob.url} target="_blank" rel="noreferrer" className="text-xs text-brand-blue hover:underline truncate block">
                  {blob.url}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(blob.url)}
                className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-colors"
                title="Copier l'URL"
              >
                {copiedUrl === blob.url ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
              <button
                onClick={() => handleDelete(blob.url)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {blobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucun fichier audio.</p>
          </div>
        )}
      </div>
    </div>
  );
}

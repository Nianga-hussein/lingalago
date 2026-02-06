"use client";

import { useState, useRef } from "react";
import { Camera, Upload, Loader2 } from "lucide-react";

export default function ProfileAvatar({ 
  initialImage, 
  initialName 
}: { 
  initialImage: string | null, 
  initialName: string 
}) {
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/user/profile/image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImage(data.image);
      }
    } catch (error) {
      console.error("Failed to upload image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      <div className="w-32 h-32 bg-brand-green rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 border-4 border-white shadow-lg uppercase overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          initialName.charAt(0)
        )}
      </div>
      
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-4 right-0 bg-brand-blue text-white p-2 rounded-full shadow-lg hover:bg-brand-blue-dark transition-all hover:scale-110 active:scale-95 border-2 border-white"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
      </button>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
}

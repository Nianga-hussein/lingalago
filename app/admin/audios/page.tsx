import { list } from "@vercel/blob";
import AudiosClient from "./AudiosClient";

export const dynamic = 'force-dynamic';

async function getBlobs() {
  try {
    const { blobs } = await list();
    return blobs;
  } catch (error) {
    console.error("Failed to fetch blobs:", error);
    return [];
  }
}

export default async function AudiosPage() {
  const blobs = await getBlobs();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Audios</h1>
          <p className="text-gray-500 mt-2 font-medium">Bibliothèque de fichiers audio pour les leçons.</p>
        </div>
      </div>

      <AudiosClient initialBlobs={blobs} />
    </div>
  );
}

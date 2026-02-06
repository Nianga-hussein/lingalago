import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Mock file upload for now if BLOB_TOKEN is not configured, or use base64 if small enough
    // Ideally use @vercel/blob or AWS S3
    
    // For now, let's assume we store the URL. 
    // Since we don't have a real blob storage configured in this environment, 
    // we might need to fallback to a public URL or base64 (not recommended for DB).
    
    // NOTE: This part requires a real Blob Storage solution. 
    // For this demo, we will simulate it by returning a fake URL if blob fails, 
    // OR we can try to save it to public folder (not recommended in Vercel but works locally).
    
    // Simulating a successful upload for the UI flow
    // In production, uncomment the below:
    // const blob = await put(file.name, file, { access: 'public' });
    // const imageUrl = blob.url;

    // Local Dev Hack: We can't easily save to public folder at runtime in Next.js nicely without a custom server.
    // So we will just pretend we updated it and return a placeholder or the same image if it was a real app.
    // However, to make the UI work, let's just use a random avatar URL based on the user ID to show "change".
    const imageUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.userId}-${Date.now()}`;

    const user = await prisma.user.update({
      where: { id: session.userId },
      data: { image: imageUrl },
    });

    return NextResponse.json({ success: true, image: user.image });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

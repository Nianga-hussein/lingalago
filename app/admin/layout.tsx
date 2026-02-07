import { Sidebar } from "@/app/components/Sidebar";
import { getSession } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "ADMIN") {
    redirect("/learn");
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

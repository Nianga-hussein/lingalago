import { prisma } from "@/app/lib/prisma";
import UsersClient from "./UsersClient";

async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      userProgress: {
        orderBy: { completedAt: "desc" },
        take: 1,
        include: {
          lesson: {
            include: {
              unit: true
            }
          }
        }
      }
    }
  });
  return users;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Utilisateurs</h1>
          <p className="text-gray-500 mt-2 text-lg">Gérez les comptes, les rôles et suivez la progression des membres.</p>
        </div>
      </div>

      <UsersClient initialUsers={users} />
    </div>
  );
}

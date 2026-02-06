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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
          <p className="text-gray-500 mt-2 font-medium">Gérez les comptes, les rôles et les accès.</p>
        </div>
      </div>

      <UsersClient initialUsers={users} />
    </div>
  );
}

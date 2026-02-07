import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth";
import { Settings, UserPlus, Zap, Flame, Calendar, Users, Shield } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProfileAvatar from "@/app/components/ProfileAvatar";

async function getProfileData() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      name: true,
      image: true,
      createdAt: true,
      xp: true,
      streak: true,
      _count: {
        select: {
          following: true,
          followedBy: true
        }
      }
    }
  });

  return user;
}

export default async function ProfilePage() {
  const user = await getProfileData();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="py-6 px-3 sm:px-4 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-400">{user.name}</h1>
        <Link href="/settings">
          <Settings className="w-6 h-6 text-brand-blue hover:text-brand-blue-dark transition-colors" />
        </Link>
      </div>

      {/* Profile Card */}
      <div className="flex flex-col items-center mb-8 border-b-2 border-gray-100 pb-8">
        
        <ProfileAvatar initialImage={user.image} initialName={user.name} />

        <h2 className="text-2xl font-bold text-gray-800 mt-2">{user.name}</h2>
        <p className="text-gray-400 font-bold text-sm mb-4 flex items-center gap-2 uppercase">
           <Calendar className="w-3 h-3" />
           Membre depuis {new Date(user.createdAt).getFullYear()}
        </p>
        
        <div className="flex gap-4 mb-6">
          <span className="text-2xl">🇨🇩</span> {/* Flag */}
        </div>

        <div className="grid grid-cols-2 gap-12 w-full max-w-xs text-center">
          <div className="hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-pointer">
            <p className="font-bold text-xl text-gray-800">{user._count.following}</p>
            <p className="text-gray-400 text-xs font-bold uppercase">Abonnements</p>
          </div>
          <div className="hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-pointer">
            <p className="font-bold text-xl text-gray-800">{user._count.followedBy}</p>
            <p className="text-gray-400 text-xs font-bold uppercase">Abonnés</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6 w-full">
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 py-3 rounded-xl font-bold text-brand-blue uppercase text-sm tracking-wide hover:bg-gray-50 transition-colors shadow-[0_4px_0_#e5e7eb] active:shadow-none active:translate-y-[4px]">
            <UserPlus className="w-5 h-5" />
            Ajouter des amis
          </button>
          <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-[0_4px_0_#e5e7eb] active:shadow-none active:translate-y-[4px]">
            <Zap className="w-6 h-6 text-brand-yellow fill-current" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Récap</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-gray-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-brand-orange">
               <Flame className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{user.streak} jours</p>
              <p className="text-xs text-gray-400 font-bold uppercase">Série</p>
            </div>
          </div>
          <div className="border-2 border-gray-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-brand-yellow">
               <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{user.xp} XP</p>
              <p className="text-xs text-gray-400 font-bold uppercase">Total XP</p>
            </div>
          </div>
          <div className="border-2 border-gray-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-brand-green">
               <Shield className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-gray-800">Argent</p>
              <p className="text-xs text-gray-400 font-bold uppercase">Division</p>
            </div>
          </div>
          <div className="border-2 border-gray-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-brand-blue">
               <Users className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-gray-800">0</p>
              <p className="text-xs text-gray-400 font-bold uppercase">Top 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

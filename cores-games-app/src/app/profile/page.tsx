import { requireSession } from "@/lib/session";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";
import { AppShell } from "@/components/shell/app-shell";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const session = await requireSession();
  await connectToDatabase();

  const user = await UserModel.findById(session.user.id).lean();
  if (!user) return null;

  return (
    <AppShell session={session}>
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 md:px-6">
        <div>
          <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">PROFILE PULSE</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Tune your gamer identity.</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass-panel neon-border rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/55">Username</p>
            <p className="mt-3 text-2xl font-semibold text-white">@{user.username}</p>
          </div>
          <div className="glass-panel neon-border rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/55">Level</p>
            <p className="mt-3 text-2xl font-semibold text-white">{user.level}</p>
          </div>
          <div className="glass-panel neon-border rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/55">Favorite games</p>
            <p className="mt-3 text-lg font-semibold text-white">{user.favoriteGames.slice(0, 2).join(", ")}</p>
          </div>
        </div>
        <ProfileForm
          initialValues={{
            name: user.name,
            username: user.username,
            avatar: user.avatar,
            favoriteGames: user.favoriteGames.join(", "),
            level: user.level,
            bio: user.bio,
          }}
        />
      </div>
    </AppShell>
  );
}

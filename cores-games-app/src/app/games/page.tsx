import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { AppShell } from "@/components/shell/app-shell";
import { GamesHub } from "@/components/games/games-hub";

export default async function GamesPage() {
  const session = await getServerSession(authOptions);

  return (
    <AppShell session={session}>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <GamesHub />
      </div>
    </AppShell>
  );
}

import { requireSession } from "@/lib/session";
import { connectToDatabase } from "@/lib/db";
import { ensureDemoUsers } from "@/lib/seed";
import { mapUserToSwipeCandidate } from "@/lib/user-mappers";
import { SwipeModel } from "@/models/Swipe";
import { UserModel } from "@/models/User";
import { AppShell } from "@/components/shell/app-shell";
import { SwipeDeck } from "@/components/swipe/swipe-deck";

export default async function SwipePage({
  searchParams,
}: {
  searchParams?: Promise<{ game?: string }>;
}) {
  const session = await requireSession();
  await connectToDatabase();
  await ensureDemoUsers();
  const params = searchParams ? await searchParams : undefined;
  const selectedGame = params?.game?.trim();

  const swipes = await SwipeModel.find({ fromUserId: session.user.id }).lean();
  const excludedIds = [session.user.id, ...swipes.map((swipe) => String(swipe.toUserId))];
  const users = await UserModel.find({
    _id: { $nin: excludedIds },
    ...(selectedGame
      ? {
          favoriteGames: selectedGame,
        }
      : {}),
  })
    .limit(12)
    .lean();

  const initialCandidates = users.map((user) =>
    mapUserToSwipeCandidate({
      ...user,
      _id: String(user._id),
    })
  );

  return (
    <AppShell session={session}>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass-panel neon-border rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/55">Deck status</p>
            <p className="mt-3 text-3xl font-semibold text-white">{initialCandidates.length}</p>
            <p className="mt-2 text-sm text-white/66">players waiting in your current swipe queue</p>
          </div>
          <div className="glass-panel neon-border rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/55">Intent</p>
            <p className="mt-3 text-3xl font-semibold text-white">Real Match</p>
            <p className="mt-2 text-sm text-white/66">likes persist to Mongo and can create mutual matches instantly</p>
          </div>
          <div className="glass-panel neon-border rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/55">Next step</p>
            <p className="mt-3 text-3xl font-semibold text-white">Video Chat</p>
            <p className="mt-2 text-sm text-white/66">use your matches page to move from swipe chemistry to live intros</p>
          </div>
        </div>
        {selectedGame ? (
          <div className="glass-panel neon-border rounded-[1.5rem] border border-cyan-400/20 bg-cyan-400/8 p-5">
            <p className="text-sm text-cyan-100/80">Filtered queue</p>
            <p className="mt-2 text-2xl font-semibold text-white">Showing players for {selectedGame}</p>
          </div>
        ) : null}
        <SwipeDeck initialCandidates={initialCandidates} />
      </div>
    </AppShell>
  );
}

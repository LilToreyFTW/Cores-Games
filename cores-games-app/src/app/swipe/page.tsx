import { requireSession } from "@/lib/session";
import { connectToDatabase } from "@/lib/db";
import { ensureDemoUsers } from "@/lib/seed";
import { mapUserToSwipeCandidate } from "@/lib/user-mappers";
import { SwipeModel } from "@/models/Swipe";
import { UserModel } from "@/models/User";
import { AppShell } from "@/components/shell/app-shell";
import { SwipeDeck } from "@/components/swipe/swipe-deck";

export default async function SwipePage() {
  const session = await requireSession();
  await connectToDatabase();
  await ensureDemoUsers();

  const swipes = await SwipeModel.find({ fromUserId: session.user.id }).lean();
  const excludedIds = [session.user.id, ...swipes.map((swipe) => String(swipe.toUserId))];
  const users = await UserModel.find({
    _id: { $nin: excludedIds },
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
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <SwipeDeck initialCandidates={initialCandidates} />
      </div>
    </AppShell>
  );
}

import { requireSession } from "@/lib/session";
import { connectToDatabase } from "@/lib/db";
import { MatchModel } from "@/models/Match";
import { UserModel } from "@/models/User";
import { mapUserToPublic } from "@/lib/user-mappers";
import { AppShell } from "@/components/shell/app-shell";
import { MatchesList } from "@/components/matches/matches-list";

export default async function MatchesPage() {
  const session = await requireSession();
  await connectToDatabase();

  const matchDocs = await MatchModel.find({
    userIds: session.user.id,
  })
    .sort({ createdAt: -1 })
    .lean();

  const matches = await Promise.all(
    matchDocs.map(async (match) => {
      const users = await UserModel.find({
        _id: { $in: match.userIds },
      }).lean();

      return {
        id: String(match._id),
        createdAt: match.createdAt.toISOString(),
        users: users.map((user) =>
          mapUserToPublic({
            ...user,
            _id: String(user._id),
          })
        ),
      };
    })
  );

  return (
    <AppShell session={session}>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-6">
        <div>
          <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">MUTUAL MATCHES</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Every right swipe that came back your way.</h1>
        </div>
        <MatchesList matches={matches} currentUserId={session.user.id} />
      </div>
    </AppShell>
  );
}

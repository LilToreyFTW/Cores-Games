import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { ensureDemoUsers } from "@/lib/seed";
import { mapUserToSwipeCandidate } from "@/lib/user-mappers";
import { SwipeModel } from "@/models/Swipe";
import { UserModel } from "@/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  await ensureDemoUsers();

  const swipes = await SwipeModel.find({ fromUserId: session.user.id }).lean();
  const excludedIds = [session.user.id, ...swipes.map((swipe) => String(swipe.toUserId))];

  const candidates = await UserModel.find({
    _id: { $nin: excludedIds },
  })
    .limit(12)
    .lean();

  return NextResponse.json({
    candidates: candidates.map((candidate) =>
      mapUserToSwipeCandidate({
        ...candidate,
        _id: String(candidate._id),
      })
    ),
  });
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { mapUserToPublic } from "@/lib/user-mappers";
import { MatchModel } from "@/models/Match";
import { UserModel } from "@/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const matches = await MatchModel.find({ userIds: session.user.id }).lean();
  const payload = await Promise.all(
    matches.map(async (match) => {
      const users = await UserModel.find({ _id: { $in: match.userIds } }).lean();
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

  return NextResponse.json({ matches: payload });
}

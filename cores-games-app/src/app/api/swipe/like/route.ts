import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { toId } from "@/lib/mongoose-helpers";
import { swipeSchema } from "@/lib/validators";
import { MatchModel } from "@/models/Match";
import { SwipeModel } from "@/models/Swipe";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = swipeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid swipe payload." }, { status: 400 });
  }

  await connectToDatabase();

  await SwipeModel.updateOne(
    {
      fromUserId: session.user.id,
      toUserId: parsed.data.targetUserId,
    },
    {
      $set: {
        direction: parsed.data.direction,
      },
    },
    { upsert: true }
  );

  let matched = false;

  if (parsed.data.direction === "right") {
    const reciprocal = await SwipeModel.findOne({
      fromUserId: toId(parsed.data.targetUserId),
      toUserId: toId(session.user.id),
      direction: "right",
    }).lean();

    if (reciprocal) {
      matched = true;
      const userIds = [session.user.id, parsed.data.targetUserId].sort();

      await MatchModel.updateOne(
        {
          roomKey: userIds.join(":"),
        },
        {
          $setOnInsert: {
            userIds,
            roomKey: userIds.join(":"),
            externalRoomKey: randomUUID(),
          },
        },
        { upsert: true }
      );
    }
  }

  return NextResponse.json({ matched });
}

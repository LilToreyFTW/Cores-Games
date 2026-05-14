import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    signalingServerUrl:
      process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL ?? "http://127.0.0.1:4001",
    user: session.user,
  });
}

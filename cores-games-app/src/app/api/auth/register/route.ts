import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid registration payload." }, { status: 400 });
    }

    await connectToDatabase();

    const email = parsed.data.email.toLowerCase();
    const existing = await UserModel.findOne({
      $or: [{ email }, { username: parsed.data.username }],
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email or username is already taken." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);

    const user = await UserModel.create({
      ...parsed.data,
      email,
      passwordHash,
      authProvider: "credentials",
    });

    return NextResponse.json({ id: String(user._id) }, { status: 201 });
  } catch (error) {
    console.error("register error", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

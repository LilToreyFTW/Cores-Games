import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { demoUsers } from "@/lib/demo-users";
import { UserModel } from "@/models/User";

export async function ensureDemoUsers() {
  await connectToDatabase();
  const count = await UserModel.countDocuments();

  if (count >= demoUsers.length) {
    return;
  }

  const passwordHash = await bcrypt.hash("DemoPass123!", 10);

  await Promise.all(
    demoUsers.map(async (user) => {
      await UserModel.updateOne(
        { email: user.email },
        {
          $setOnInsert: {
            ...user,
            passwordHash,
            authProvider: "credentials",
          },
        },
        { upsert: true }
      );
    })
  );
}

import bcrypt from "bcryptjs";
import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const providers: NextAuthOptions["providers"] = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: {},
      password: {},
    },
    async authorize(rawCredentials) {
      const parsed = credentialsSchema.safeParse(rawCredentials);
      if (!parsed.success) return null;

      await connectToDatabase();

      const user = await UserModel.findOne({
        email: parsed.data.email.toLowerCase(),
      }).lean();

      if (!user?.passwordHash) {
        return null;
      }

      const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);
      if (!isValid) {
        return null;
      }

      return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        favoriteGames: user.favoriteGames,
        level: user.level,
        bio: user.bio,
      };
    },
  }),
];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") {
        return true;
      }

      await connectToDatabase();
      const email = user.email?.toLowerCase();
      if (!email) return false;

      const existing = await UserModel.findOne({ email });
      if (!existing) {
        const baseUsername =
          user.name?.toLowerCase().replace(/[^a-z0-9]+/g, "") ||
          profile?.sub?.slice(0, 8) ||
          "coreplayer";

        await UserModel.create({
          name: user.name ?? "Google Player",
          username: `${baseUsername}${Math.floor(Math.random() * 1000)}`,
          email,
          avatar: user.image ?? `https://api.dicebear.com/9.x/bottts/svg?seed=${baseUsername}`,
          favoriteGames: ["Valorant", "Apex Legends", "Rocket League"],
          level: 25,
          bio: "Just joined Cores Games with Google.",
          headline: "Ready to squad up",
          location: "Online",
          authProvider: "google",
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.avatar = user.avatar;
        token.favoriteGames = user.favoriteGames;
        token.level = user.level;
        token.bio = user.bio;
      }

      if (!user && token.email) {
        await connectToDatabase();
        const dbUser = await UserModel.findOne({ email: token.email }).lean();
        if (dbUser) {
          token.id = String(dbUser._id);
          token.username = dbUser.username;
          token.avatar = dbUser.avatar;
          token.favoriteGames = dbUser.favoriteGames;
          token.level = dbUser.level;
          token.bio = dbUser.bio;
          token.name = dbUser.name;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.username = String(token.username ?? "");
        session.user.avatar = String(token.avatar ?? "");
        session.user.favoriteGames = (token.favoriteGames as string[] | undefined) ?? [];
        session.user.level = Number(token.level ?? 1);
        session.user.bio = String(token.bio ?? "");
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

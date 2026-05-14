import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      username: string;
      avatar: string;
      favoriteGames: string[];
      level: number;
      bio: string;
    };
  }

  interface User {
    username: string;
    avatar: string;
    favoriteGames: string[];
    level: number;
    bio: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    avatar: string;
    favoriteGames: string[];
    level: number;
    bio: string;
  }
}

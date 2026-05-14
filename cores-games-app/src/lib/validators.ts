import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(3).max(24).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(8).max(72),
  avatar: z.string().url(),
  favoriteGames: z.array(z.string().min(2)).min(1).max(5),
  level: z.coerce.number().min(1).max(999),
  bio: z.string().min(8).max(280),
});

export const profileUpdateSchema = registerSchema.omit({
  email: true,
  password: true,
}).extend({
  favoriteGames: z.array(z.string().min(2)).min(1).max(5),
});

export const swipeSchema = z.object({
  targetUserId: z.string().min(1),
  direction: z.enum(["left", "right"]),
});

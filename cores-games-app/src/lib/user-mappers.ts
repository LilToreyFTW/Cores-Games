import { UserDocument } from "@/models/User";
import { PublicUser, SwipeCandidate } from "@/types";

export function mapUserToPublic(user: Partial<UserDocument> & { _id: string }): PublicUser {
  return {
    id: String(user._id),
    name: user.name ?? "",
    username: user.username ?? "",
    avatar: user.avatar ?? "",
    bio: user.bio ?? "",
    level: user.level ?? 1,
    favoriteGames: user.favoriteGames ?? [],
    location: user.location ?? "",
  };
}

export function mapUserToSwipeCandidate(
  user: Partial<UserDocument> & { _id: string }
): SwipeCandidate {
  return {
    ...mapUserToPublic(user),
    headline: user.headline ?? "",
  };
}

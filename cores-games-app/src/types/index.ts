export type SwipeDirection = "left" | "right";

export interface PublicUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  level: number;
  favoriteGames: string[];
  location?: string;
}

export interface SwipeCandidate extends PublicUser {
  headline: string;
}

export interface MatchSummary {
  id: string;
  users: PublicUser[];
  createdAt: string;
}

export interface ChatQueueState {
  onlineCount: number;
  queueLength: number;
  activeRoomId?: string;
}

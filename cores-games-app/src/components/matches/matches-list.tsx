import Image from "next/image";
import { MatchSummary } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MatchesList({
  matches,
  currentUserId,
}: {
  matches: MatchSummary[];
  currentUserId: string;
}) {
  if (!matches.length) {
    return (
      <Card className="glass-panel neon-border border-white/10 bg-white/5">
        <CardContent className="p-8 text-center text-white/72">
          No mutual matches yet. Head back to swipe and build your squad.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {matches.map((match) => {
        const partner = match.users.find((user) => user.id !== currentUserId) ?? match.users[0];
        return (
          <Card key={match.id} className="glass-panel neon-border overflow-hidden border-white/10 bg-white/5">
            <CardContent className="p-0">
              <div className="relative h-60">
                <Image src={partner.avatar} alt={partner.username} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <Badge className="bg-primary/20 text-pink-100 hover:bg-primary/20">Matched</Badge>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{partner.name}</h2>
                  <p className="text-sm text-white/70">@{partner.username}</p>
                </div>
              </div>
              <div className="space-y-3 p-5 text-white/72">
                <p>{partner.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.favoriteGames.map((game) => (
                    <span key={game} className="rounded-full border border-white/10 px-3 py-1 text-sm">
                      {game}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

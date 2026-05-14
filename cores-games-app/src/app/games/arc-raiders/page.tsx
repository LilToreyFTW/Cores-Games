import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { ExternalLink } from "lucide-react";
import { authOptions } from "@/lib/auth-options";
import { findGameBySlug } from "@/lib/games";
import { AppShell } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ArcRaidersPage() {
  const session = await getServerSession(authOptions);
  const game = findGameBySlug("arc-raiders");

  if (!game) {
    notFound();
  }

  return (
    <AppShell session={session}>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">FEATURED GAME</p>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">{game.name}</h1>
            <p className="max-w-3xl text-white/72">{game.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/swipe?game=${encodeURIComponent(game.name)}`}
                className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
              >
                Swipe ARC Raiders players
              </Link>
              <Link
                href={game.officialSite}
                className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/12"
              >
                Official site
              </Link>
              {game.steamUrl ? (
                <Link
                  href={game.steamUrl}
                  className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/12"
                >
                  Steam page
                </Link>
              ) : null}
            </div>
          </div>

          <Card className="glass-panel neon-border border-white/10 bg-white/5">
            <CardContent className="space-y-4 p-6">
              <Badge className="bg-primary/15 text-pink-100 hover:bg-primary/15">{game.genre}</Badge>
              <div className="text-3xl font-semibold text-white">{game.players}</div>
              <p className="text-white/66">{game.mood}</p>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/75">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass-panel neon-border border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Official update feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {game.latestNews.map((item) => (
                <Link
                  key={`${item.date}-${item.title}`}
                  href={item.url}
                  className="block rounded-2xl border border-white/10 bg-white/6 p-4 transition hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Badge className="bg-cyan-400/12 text-cyan-200 hover:bg-cyan-400/12">
                      {item.type}
                    </Badge>
                    <ExternalLink className="size-4 text-white/50" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{item.date}</p>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-panel neon-border border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Why it fits Cores Games!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/72">
              <p>
                ARC Raiders is ideal for matchmaking because squad chemistry, extraction planning,
                and voice comms matter as much as raw mechanics.
              </p>
              <p>
                Players can use the game tab to inspect the latest official update cadence, then
                jump straight into a filtered swipe flow to find ARC Raiders teammates.
              </p>
              <p>
                The current official messaging points to larger major updates twice a year, with
                live updates and fixes continuing in between.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

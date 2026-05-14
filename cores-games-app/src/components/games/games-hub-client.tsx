"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLink, Flame, Search, Shield, Trophy } from "lucide-react";
import { gameCatalog } from "@/lib/games";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const curatedLobbies = [
  {
    title: "Rank Grind",
    description: "Strict comms, focused teams, and replay review energy.",
    icon: Trophy,
  },
  {
    title: "Party Stack",
    description: "Voice-first groups for casual chaos and social sessions.",
    icon: Flame,
  },
  {
    title: "Safe Queue",
    description: "Verified vibes, chill culture, and moderated friend finding.",
    icon: Shield,
  },
];

export function GamesHubClient() {
  const [query, setQuery] = useState("");

  const filteredGames = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return gameCatalog;

    return gameCatalog.filter((game) => {
      const haystack = [game.name, game.genre, game.mood, ...game.tags].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  const featured = gameCatalog[0];

  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">GAME HUB</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Search games first, then find the right players for them.
          </h1>
          <p className="max-w-2xl text-white/70">
            Games is now a searchable catalog. We’ve added ARC Raiders as a featured
            destination, and players can jump from a game page into swipe discovery for that title.
          </p>
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/45" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by game, genre, or vibe..."
              className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/40"
            />
          </div>
        </div>

        <Card className="glass-panel neon-border border-white/10 bg-white/5">
          <CardContent className="grid gap-4 p-6">
            <div className="flex items-center justify-between">
              <Badge className="bg-primary/15 text-pink-100 hover:bg-primary/15">
                Featured live title
              </Badge>
              <Flame className="size-5 text-cyan-200" />
            </div>
            <div>
              <div className="text-4xl font-semibold text-white">{featured.name}</div>
              <p className="mt-2 text-sm text-white/60">{featured.genre}</p>
              <p className="mt-4 text-sm text-white/72">{featured.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={featured.href}
                className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/12"
              >
                Open game page
              </Link>
              <Link
                href={`/swipe?game=${encodeURIComponent(featured.name)}`}
                className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
              >
                Swipe ARC Raiders players
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trending" className="space-y-6">
        <TabsList className="glass-panel border-white/10 bg-white/5 p-1">
          <TabsTrigger value="trending">Games</TabsTrigger>
          <TabsTrigger value="moods">Lobby Moods</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filteredGames.map((game) => (
            <Card key={game.slug} className="glass-panel neon-border border-white/10 bg-white/5">
              <CardHeader>
                <Badge className="w-fit bg-cyan-400/12 text-cyan-200 hover:bg-cyan-400/12">
                  {game.genre}
                </Badge>
                <CardTitle className="text-xl text-white">{game.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white/68">
                <p>{game.mood}</p>
                <p className="font-medium text-white">{game.players}</p>
                <div className="flex flex-wrap gap-2">
                  {game.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/75">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <Link href={game.href} className="text-sm text-cyan-200 hover:underline">
                    Explore
                  </Link>
                  <Link
                    href={`/swipe?game=${encodeURIComponent(game.name.replace(" Ranked Rush", "").replace(" Night Queue", "").replace(" Chaos", ""))}`}
                    className="text-sm text-pink-200 hover:underline"
                  >
                    Swipe
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="moods" className="grid gap-6 md:grid-cols-3">
          {curatedLobbies.map((lobby) => (
            <Card key={lobby.title} className="glass-panel neon-border border-white/10 bg-white/5">
              <CardHeader>
                <lobby.icon className="size-6 text-cyan-200" />
                <CardTitle className="text-xl text-white">{lobby.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-white/68">{lobby.description}</CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="updates">
          <Card className="glass-panel neon-border border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Latest ARC Raiders updates</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {featured.latestNews.map((item) => (
                <Link
                  key={`${item.date}-${item.title}`}
                  href={item.url}
                  className="rounded-2xl border border-white/10 bg-white/6 p-4 transition hover:bg-white/10"
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
        </TabsContent>
      </Tabs>
    </section>
  );
}

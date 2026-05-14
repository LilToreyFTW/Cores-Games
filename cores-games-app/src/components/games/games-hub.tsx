import { Flame, Radio, Shield, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const trendingGames = [
  {
    name: "Valorant Ranked Rush",
    genre: "Tactical FPS",
    mood: "Comms-heavy, camera-on duos",
    players: "18.2K live",
  },
  {
    name: "Warzone Night Queue",
    genre: "Battle Royale",
    mood: "Late-night squad fills",
    players: "13.7K live",
  },
  {
    name: "Lethal Company Chaos",
    genre: "Co-op Horror",
    mood: "Funny mic reactions",
    players: "9.4K live",
  },
];

const curatedLobbies = [
  {
    title: "Rank Grind",
    description: "Strict comms, focused teams, and replay review energy.",
    icon: Trophy,
  },
  {
    title: "Party Stack",
    description: "Voice-first groups for casual chaos and social sessions.",
    icon: Radio,
  },
  {
    title: "Safe Queue",
    description: "Verified vibes, chill culture, and moderated friend finding.",
    icon: Shield,
  },
];

export function GamesHub() {
  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">GAME HUB</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Pick the queue style before you pick the player.
          </h1>
          <p className="max-w-2xl text-white/70">
            Games is its own destination now: discover trending titles, lobby moods,
            and which communities are hottest before you start swiping or jumping into chat.
          </p>
        </div>

        <Card className="glass-panel neon-border border-white/10 bg-white/5">
          <CardContent className="grid gap-4 p-6">
            <div className="flex items-center justify-between">
              <Badge className="bg-primary/15 text-pink-100 hover:bg-primary/15">
                Live discovery
              </Badge>
              <Flame className="size-5 text-cyan-200" />
            </div>
            <div>
              <div className="text-4xl font-semibold text-white">42K+</div>
              <p className="mt-2 text-sm text-white/60">players browsing active game lobbies tonight</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trending" className="space-y-6">
        <TabsList className="glass-panel border-white/10 bg-white/5 p-1">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="moods">Lobby Moods</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="grid gap-6 md:grid-cols-3">
          {trendingGames.map((game) => (
            <Card key={game.name} className="glass-panel neon-border border-white/10 bg-white/5">
              <CardHeader>
                <Badge className="w-fit bg-cyan-400/12 text-cyan-200 hover:bg-cyan-400/12">
                  {game.genre}
                </Badge>
                <CardTitle className="text-xl text-white">{game.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white/68">
                <p>{game.mood}</p>
                <p className="font-medium text-white">{game.players}</p>
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

        <TabsContent value="events">
          <Card className="glass-panel neon-border border-white/10 bg-white/5">
            <CardContent className="grid gap-4 p-6 md:grid-cols-3">
              <div>
                <p className="font-mono text-xs tracking-[0.25em] text-cyan-200">TONIGHT</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Creator Drop-In Rooms</h3>
              </div>
              <p className="text-white/68">
                Public video intros for streamers, clip creators, and esports grinders.
              </p>
              <p className="text-white/68">
                Pair it with Swipe for targeted matches, or jump straight into spontaneous sessions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

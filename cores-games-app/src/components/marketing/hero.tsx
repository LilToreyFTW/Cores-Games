import Link from "next/link";
import { ArrowRight, PlayCircle, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:py-24">
      <div className="space-y-8">
        <Badge className="border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-cyan-200 hover:bg-cyan-400/10">
          <Zap className="mr-2 size-4" />
          Live matchmaking for gamers, creators, and squads
        </Badge>
        <div className="space-y-5">
          <p className="font-mono text-sm tracking-[0.38em] text-cyan-200">LEVEL UP YOUR SOCIAL LOBBY</p>
          <h1 className="text-glow text-5xl font-semibold tracking-tight md:text-7xl">
            Connect. Play. Game.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/72">
            Cores Games! is a premium social platform for gamers who want real profiles,
            smarter matching, instant video intros, and zero-dead-air squad building.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/swipe"
            className={buttonVariants({
              size: "lg",
              className: "bg-primary text-primary-foreground shadow-[0_0_40px_rgba(255,61,201,0.25)]",
            })}
          >
            Start Swiping
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="/video-chat"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "border-cyan-300/25 bg-white/5 text-white",
            })}
          >
            Join Video Chat
            <PlayCircle className="ml-2 size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["120K+", "Nightly players"],
            ["Real", "Mutual match engine"],
            ["WebRTC", "Random 1-on-1 video"],
          ].map(([value, label]) => (
            <Card key={label} className="glass-panel neon-border border-white/10 bg-white/5">
              <CardContent className="space-y-2 p-5">
                <div className="font-mono text-xl text-white">{value}</div>
                <div className="text-sm text-white/60">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="glass-panel neon-border overflow-hidden rounded-[2rem] border-white/10">
        <CardContent className="space-y-6 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">Featured Match</p>
              <h2 className="mt-2 text-3xl font-semibold">NovaHex</h2>
            </div>
            <Badge className="bg-emerald-400/15 text-emerald-200 hover:bg-emerald-400/15">
              Online
            </Badge>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center p-6 pt-48" />
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Main Games", "Valorant, Fortnite, Helldivers 2"],
                ["Looking For", "Ranked duos, creators, camera-on squads"],
                ["Vibe", "Confident comms and no awkward intros"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</p>
                  <p className="mt-2 text-sm text-white/80">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

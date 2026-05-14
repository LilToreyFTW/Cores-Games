"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { SwipeCandidate } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SwipeDeck({ initialCandidates }: { initialCandidates: SwipeCandidate[] }) {
  const [candidates, setCandidates] = useState<SwipeCandidate[]>(initialCandidates);
  const [status] = useState(
    initialCandidates.length ? "Live queue ready" : "No candidates yet"
  );
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  async function swipe(direction: "left" | "right") {
    const top = candidates[0];
    if (!top) return;

    setAnimatingId(top.id);

    await fetch("/api/swipe/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetUserId: top.id,
        direction,
      }),
    });

    window.setTimeout(() => {
      setCandidates((current) => current.slice(1));
      setAnimatingId(null);
    }, 240);
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-6">
        <div>
          <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">GAMER SWIPE</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Real likes. Real mutual matches.</h1>
          <p className="mt-4 max-w-lg text-white/70">
            Swipe right to like, left to pass. Every action persists to MongoDB and
            instantly becomes a match when the feeling is mutual.
          </p>
        </div>
        <div className="glass-panel neon-border rounded-[1.75rem] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">{status}</span>
            <Badge className="bg-cyan-400/12 text-cyan-200 hover:bg-cyan-400/12">
              {candidates.length} in deck
            </Badge>
          </div>
          <div className="mt-5 flex gap-4">
            <Button
              variant="outline"
              className="flex-1 border-rose-400/25 bg-rose-500/8 text-white"
              onClick={() => swipe("left")}
            >
              <X className="mr-2 size-4" />
              Pass
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground"
              onClick={() => swipe("right")}
            >
              <Heart className="mr-2 size-4" />
              Like
            </Button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[580px]">
        {candidates.length === 0 ? (
          <Card className="glass-panel neon-border flex min-h-[580px] items-center justify-center border-white/10 bg-white/5 p-10 text-center">
            <div>
              <h2 className="text-2xl font-semibold text-white">No more players in your queue</h2>
              <p className="mt-3 text-white/65">Register more users or rerun the seed script to refresh the deck.</p>
            </div>
          </Card>
        ) : null}

        {candidates.slice(0, 3).reverse().map((candidate, index, arr) => {
          const isTop = index === arr.length - 1;
          const isAnimating = candidate.id === animatingId;

          return (
            <Card
              key={candidate.id}
              className={`glass-panel neon-border absolute inset-0 overflow-hidden rounded-[2rem] border-white/10 bg-card/90 transition duration-300 ${
                isAnimating ? "translate-x-[120%] rotate-12 opacity-0" : ""
              }`}
              style={{
                transform: `translateY(${index * 16}px) scale(${1 - index * 0.03})`,
                zIndex: isTop ? 10 : index,
              }}
            >
              <div className="relative h-full">
                <Image
                  src={candidate.avatar}
                  alt={candidate.username}
                  fill
                  className="object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                  <Badge className="bg-cyan-400/15 text-cyan-200 hover:bg-cyan-400/15">
                    Level {candidate.level}
                  </Badge>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    {candidate.name} <span className="text-lg text-white/55">@{candidate.username}</span>
                  </h2>
                  <p className="mt-2 text-base text-white/82">{candidate.headline}</p>
                  <p className="mt-3 text-sm text-white/65">{candidate.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {candidate.favoriteGames.map((game) => (
                      <span
                        key={game}
                        className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-sm text-white/84"
                      >
                        {game}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

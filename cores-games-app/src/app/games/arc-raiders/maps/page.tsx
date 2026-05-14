import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { AppShell } from "@/components/shell/app-shell";
import { ArcRaidersMapsHub } from "@/components/games/arc-raiders-maps-hub";

export default async function ArcRaidersMapsPage() {
  const session = await getServerSession(authOptions);

  return (
    <AppShell session={session}>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-6">
        <div className="space-y-5">
          <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">ARC RAIDERS MAPS</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Interactive map control room for every current ARC Raiders zone.
          </h1>
          <p className="max-w-4xl text-white/72">
            This page pulls together the currently listed ARC Raiders maps from MetaForge and gives you a
            clean launch path for MapGenie as a second reference source. Use it to scout routes, call out
            extractions, and plan squad movement before you jump into swipe or live voice chat.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/games/arc-raiders"
              className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/12"
            >
              Back to ARC Raiders
            </Link>
            <Link
              href="/swipe?game=ARC%20Raiders"
              className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
            >
              Find ARC Raiders players
            </Link>
          </div>
        </div>

        <ArcRaidersMapsHub />
      </div>
    </AppShell>
  );
}

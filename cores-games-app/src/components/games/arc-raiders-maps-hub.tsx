"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLink, MapPinned, Radar, Rows3 } from "lucide-react";
import { arcRaidersMaps } from "@/lib/games";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MapSource = "metaforge" | "mapgenie";

export function ArcRaidersMapsHub() {
  const [selectedMapSlug, setSelectedMapSlug] = useState(arcRaidersMaps[0]?.slug ?? "dam");
  const [selectedSource, setSelectedSource] = useState<MapSource>("metaforge");

  const activeMap = useMemo(
    () => arcRaidersMaps.find((map) => map.slug === selectedMapSlug) ?? arcRaidersMaps[0],
    [selectedMapSlug]
  );

  if (!activeMap) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 xl:grid-cols-[340px_1fr]">
        <Card className="glass-panel neon-border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <MapPinned className="size-5 text-cyan-200" />
              Map Rotation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {arcRaidersMaps.map((map) => {
              const active = map.slug === activeMap.slug;

              return (
                <button
                  key={map.slug}
                  type="button"
                  onClick={() => setSelectedMapSlug(map.slug)}
                  className={`w-full rounded-[1.25rem] border p-4 text-left transition ${
                    active
                      ? "border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">{map.name}</p>
                      <p className="mt-1 text-sm text-white/55">{map.region}</p>
                    </div>
                    <Badge className="bg-white/10 text-white hover:bg-white/10">
                      {map.recommendedLevel}
                    </Badge>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="glass-panel neon-border border-white/10 bg-white/5">
            <CardContent className="space-y-5 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary/15 text-pink-100 hover:bg-primary/15">
                      {activeMap.region}
                    </Badge>
                    <Badge className="bg-cyan-400/12 text-cyan-200 hover:bg-cyan-400/12">
                      {activeMap.recommendedLevel}
                    </Badge>
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-white">{activeMap.name}</h2>
                    <p className="mt-2 max-w-3xl text-white/68">{activeMap.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={activeMap.metaforgeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
                  >
                    Open on MetaForge
                  </Link>
                  <Link
                    href={activeMap.mapgenieUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/12"
                  >
                    Open on MapGenie
                  </Link>
                </div>
              </div>

              <Tabs value={selectedSource} onValueChange={(value) => setSelectedSource(value as MapSource)}>
                <TabsList
                  variant="line"
                  className="w-full justify-start gap-2 rounded-full border border-white/10 bg-white/5 p-2"
                >
                  <TabsTrigger
                    value="metaforge"
                    className="rounded-full px-4 py-2 data-active:bg-white/10 data-active:text-white"
                  >
                    <Radar className="size-4" />
                    MetaForge Interactive
                  </TabsTrigger>
                  <TabsTrigger
                    value="mapgenie"
                    className="rounded-full px-4 py-2 data-active:bg-white/10 data-active:text-white"
                  >
                    <Rows3 className="size-4" />
                    MapGenie Reference
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="metaforge" className="mt-4">
                  <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                    <iframe
                      key={activeMap.metaforgeUrl}
                      src={activeMap.metaforgeUrl}
                      title={`${activeMap.name} MetaForge interactive map`}
                      className="h-[72vh] min-h-[620px] w-full bg-black"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="mapgenie" className="mt-4">
                  <Card className="glass-panel neon-border border-white/10 bg-white/5">
                    <CardContent className="space-y-4 p-6">
                      <p className="text-base text-white/74">
                        MapGenie is included here as a second source, but it does not expose a reliable
                        embed path for this app. Use the launch button below to open their ARC Raiders map
                        in a new tab while keeping this page as your control panel.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={activeMap.mapgenieUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/12"
                        >
                          Launch MapGenie
                          <ExternalLink className="size-4" />
                        </Link>
                        <Link
                          href={activeMap.metaforgeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
                        >
                          Launch MetaForge
                          <ExternalLink className="size-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass-panel neon-border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl text-white">Included Maps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-white/70">
            <p>Dam Battlegrounds</p>
            <p>The Spaceport</p>
            <p>Buried City</p>
            <p>Blue Gate</p>
            <p>Stella Montis</p>
            <p>Riven Tides</p>
          </CardContent>
        </Card>

        <Card className="glass-panel neon-border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl text-white">Source Coverage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-white/70">
            <p>
              MetaForge currently lists all six ARC Raiders map zones and supports searchable interactive
              overlays.
            </p>
            <p>
              MapGenie is linked as a second reference source for ARC Raiders map exploration and comparison.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel neon-border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl text-white">Best Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-white/70">
            <p>
              Keep this page open while swiping for ARC Raiders players so teams can plan routes, loot runs,
              and extracts before queueing.
            </p>
            <p>
              The Spaceport includes separate tunnel and surface layers on MetaForge, which makes it especially
              strong for duo planning.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

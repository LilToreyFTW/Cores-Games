export type GameNewsItem = {
  title: string;
  date: string;
  type: string;
  url: string;
};

export type GameCatalogEntry = {
  slug: string;
  name: string;
  genre: string;
  mood: string;
  players: string;
  description: string;
  href: string;
  officialSite: string;
  steamUrl?: string;
  tags: string[];
  latestNews: GameNewsItem[];
};

export type ArcRaidersMapEntry = {
  slug: string;
  name: string;
  region: string;
  recommendedLevel: string;
  description: string;
  metaforgeUrl: string;
  mapgenieUrl: string;
};

export const gameCatalog: GameCatalogEntry[] = [
  {
    slug: "arc-raiders",
    name: "ARC Raiders",
    genre: "Extraction Shooter",
    mood: "PvPvE survival with squad comms and high-stakes extractions",
    players: "Steam live title",
    description:
      "ARC Raiders is a multiplayer extraction adventure from Embark Studios set in a lethal future earth ruled by mechanized ARC threats.",
    href: "/games/arc-raiders",
    officialSite: "https://arcraiders.com/",
    steamUrl: "https://store.steampowered.com/app/1808500/ARC_Raiders/",
    tags: [
      "Extraction Shooter",
      "Multiplayer",
      "PvP",
      "PvE",
      "Online Co-op",
      "Sci-fi",
      "Third-Person Shooter",
    ],
    latestNews: [
      {
        title: "We’re changing how we update ARC Raiders - here’s what it means for you",
        date: "May 13, 2026",
        type: "Latest",
        url: "https://arcraiders.com/news/development-update",
      },
      {
        title: "Store Update 1.28.0",
        date: "May 12, 2026",
        type: "Store Update",
        url: "https://arcraiders.com/news",
      },
      {
        title: "Ensuring Fair Play",
        date: "May 7, 2026",
        type: "Latest",
        url: "https://arcraiders.com/news",
      },
      {
        title: "Patch Notes 1.27.0",
        date: "May 5, 2026",
        type: "Patch Notes",
        url: "https://arcraiders.com/news",
      },
      {
        title: "Hotfix 1.26.1",
        date: "April 30, 2026",
        type: "Hotfix",
        url: "https://arcraiders.com/news",
      },
      {
        title: "Riven Tides - Patch Notes 1.26.0",
        date: "April 28, 2026",
        type: "Patch Notes",
        url: "https://arcraiders.com/news",
      },
    ],
  },
  {
    slug: "valorant-ranked-rush",
    name: "Valorant Ranked Rush",
    genre: "Tactical FPS",
    mood: "Comms-heavy, camera-on duos",
    players: "18.2K live",
    description: "Competitive queue for players looking for aim-heavy tactical teammates.",
    href: "/swipe?game=Valorant",
    officialSite: "https://playvalorant.com/",
    tags: ["Tactical FPS", "Competitive", "Duo Queue"],
    latestNews: [],
  },
  {
    slug: "warzone-night-queue",
    name: "Warzone Night Queue",
    genre: "Battle Royale",
    mood: "Late-night squad fills",
    players: "13.7K live",
    description: "Fast-fill battle royale parties for night grinders and high-energy comms.",
    href: "/swipe?game=Warzone",
    officialSite: "https://www.callofduty.com/warzone",
    tags: ["Battle Royale", "Squads", "PvP"],
    latestNews: [],
  },
  {
    slug: "lethal-company-chaos",
    name: "Lethal Company Chaos",
    genre: "Co-op Horror",
    mood: "Funny mic reactions",
    players: "9.4K live",
    description: "For players who want goofy horror, voice reactions, and streamer-friendly chaos.",
    href: "/swipe?game=Lethal%20Company",
    officialSite: "https://store.steampowered.com/",
    tags: ["Co-op Horror", "Funny", "Voice Chat"],
    latestNews: [],
  },
];

export function findGameBySlug(slug: string) {
  return gameCatalog.find((game) => game.slug === slug);
}

export const arcRaidersMaps: ArcRaidersMapEntry[] = [
  {
    slug: "dam",
    name: "Dam Battlegrounds",
    region: "Starter zone",
    recommendedLevel: "Early queue",
    description:
      "A contested industrial stronghold with layered loot routes, event pressure, and solid early-run extraction planning.",
    metaforgeUrl: "https://metaforge.app/arc-raiders/map/dam",
    mapgenieUrl: "https://mapgenie.io/arc-raiders/maps/arc-raiders",
  },
  {
    slug: "spaceport",
    name: "The Spaceport",
    region: "High-mobility zone",
    recommendedLevel: "Mid to advanced",
    description:
      "Vertical combat, launch structures, and split route planning across surface and tunnel layers.",
    metaforgeUrl: "https://metaforge.app/arc-raiders/map/spaceport",
    mapgenieUrl: "https://mapgenie.io/arc-raiders/maps/arc-raiders",
  },
  {
    slug: "buried-city",
    name: "Buried City",
    region: "Desert ruins",
    recommendedLevel: "Mid queue",
    description:
      "Dense urban remnants in the dunes with residential loot patterns, rooftop danger, and close-quarters rotations.",
    metaforgeUrl: "https://metaforge.app/arc-raiders/map/buried-city",
    mapgenieUrl: "https://mapgenie.io/arc-raiders/maps/arc-raiders",
  },
  {
    slug: "blue-gate",
    name: "Blue Gate",
    region: "Advanced sector",
    recommendedLevel: "Advanced queue",
    description:
      "A harder zone with security-heavy routing, keycard value, and riskier extract decision-making.",
    metaforgeUrl: "https://metaforge.app/arc-raiders/map/blue-gate",
    mapgenieUrl: "https://mapgenie.io/arc-raiders/maps/arc-raiders",
  },
  {
    slug: "stella-montis",
    name: "Stella Montis",
    region: "Mountain endgame",
    recommendedLevel: "Endgame queue",
    description:
      "A colder, tougher endgame space built around indoor pressure, high-tier farming, and punishing late fights.",
    metaforgeUrl: "https://metaforge.app/arc-raiders/map/stella-montis",
    mapgenieUrl: "https://mapgenie.io/arc-raiders/maps/arc-raiders",
  },
  {
    slug: "riven-tides",
    name: "Riven Tides",
    region: "Newest coastal biome",
    recommendedLevel: "Current hot zone",
    description:
      "The newest ARC Raiders map with beach lines, coastal structures, active patrols, and fresh event routing.",
    metaforgeUrl: "https://metaforge.app/arc-raiders/map/riven-tides",
    mapgenieUrl: "https://mapgenie.io/arc-raiders/maps/arc-raiders",
  },
];

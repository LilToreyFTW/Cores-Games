import { Camera, Gamepad2, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  {
    icon: Gamepad2,
    title: "Swipe on gaming chemistry",
    body: "Profiles highlight favorite games, play style, energy, and skill level so every swipe has context.",
  },
  {
    icon: Camera,
    title: "Instant video intros",
    body: "Move from match or random queue into face-to-face conversation with fast WebRTC signaling.",
  },
  {
    icon: ShieldCheck,
    title: "Production-ready auth and data",
    body: "Credentials + Google sign-in, Mongo persistence, protected APIs, and a VPS-ready signaling layer.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} className="glass-panel neon-border border-white/10 bg-white/5">
            <CardHeader>
              <item.icon className="size-6 text-cyan-200" />
              <CardTitle className="mt-4 text-xl text-white">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-white/66">{item.body}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

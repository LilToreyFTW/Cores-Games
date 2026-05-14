import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { AppShell } from "@/components/shell/app-shell";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { buttonVariants } from "@/components/ui/button";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <AppShell session={session}>
      <Hero />
      <FeatureGrid />
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="glass-panel neon-border flex flex-col items-start justify-between gap-6 rounded-[2rem] p-8 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">DEPLOYMENT READY</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Ship the frontend to Vercel, run signaling on your VPS.
            </h2>
            <p className="mt-3 max-w-2xl text-white/66">
              The app is structured for serverless Next.js pages and APIs, with a separate
              Socket.IO signaling server for persistent WebRTC matchmaking.
            </p>
          </div>
          <Link
            href={session?.user ? "/swipe" : "/auth/sign-up"}
            className={buttonVariants({ className: "bg-primary text-primary-foreground" })}
          >
            {session?.user ? "Open App" : "Create Account"}
          </Link>
        </div>
      </section>
    </AppShell>
  );
}

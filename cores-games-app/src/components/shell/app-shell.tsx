"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Gamepad2, Menu, Radio, Sparkles, Users, Video } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/swipe", label: "Swipe", icon: Users },
  { href: "/matches", label: "Matches", icon: Radio },
  { href: "/video-chat", label: "Video Chat", icon: Video },
  { href: "/profile", label: "Profile", icon: Users },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-full px-4 py-2 text-sm transition hover:bg-white/8 hover:text-white",
            pathname === item.href
              ? "bg-white/10 text-white"
              : "text-white/72"
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function AppShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,61,201,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(20,217,255,0.12),transparent_24%)]" />
      <header className="sticky top-0 z-40 border-b border-white/8 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="text-glow font-mono text-lg font-semibold tracking-[0.28em]">
            CORES GAMES!
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <NavLinks />
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {session?.user ? (
              <SignOutButton />
            ) : (
              <Link
                href="/auth/sign-in"
                className={buttonVariants({ className: "bg-primary text-primary-foreground" })}
              >
                Sign In
              </Link>
            )}
          </div>

          <Sheet>
            <SheetTrigger
              className="md:hidden"
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/12 bg-white/5 text-white"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="border-white/10 bg-card text-white">
              <div className="mt-10 flex flex-col gap-2">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="relative z-10">{children}</main>
    </div>
  );
}

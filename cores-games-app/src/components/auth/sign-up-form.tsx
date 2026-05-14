"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

type RegisterValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  favoriteGames: string;
  level: number;
  bio: string;
};

export function SignUpForm({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<RegisterValues>({
    resolver: zodResolver(
      registerSchema.transform((values) => ({
        ...values,
        favoriteGames: values.favoriteGames,
      })) as never
    ),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=coreplayer",
      favoriteGames: "Valorant, Apex Legends, Rocket League",
      level: 25,
      bio: "",
    },
  });

  async function onSubmit(values: RegisterValues) {
    setPending(true);
    setError(null);

    const payload = {
      ...values,
      favoriteGames: values.favoriteGames
        .split(",")
        .map((game) => game.trim())
        .filter(Boolean),
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setPending(false);

    if (!response.ok) {
      setError(data.error ?? "Unable to create your account.");
      return;
    }

    router.push("/auth/sign-in");
  }

  return (
    <Card className="glass-panel neon-border border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Create your gamer profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {error ? (
          <Alert className="border-destructive/30 bg-destructive/10 text-white">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
        <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" {...form.register("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...form.register("username")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input id="avatar" {...form.register("avatar")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="favoriteGames">Favorite games</Label>
            <Input id="favoriteGames" {...form.register("favoriteGames")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Input id="level" type="number" {...form.register("level", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={4} {...form.register("bio")} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={pending}>
              {pending ? "Creating profile..." : "Create account"}
            </Button>
          </div>
        </form>
        {googleEnabled ? (
          <Button
            type="button"
            variant="outline"
            className="w-full border-white/12 bg-white/5 text-white"
            onClick={() => signIn("google", { callbackUrl: "/swipe" })}
          >
            Continue with Google
          </Button>
        ) : (
          <p className="text-center text-sm text-white/50">
            Google sign-up will appear here once production Google OAuth is connected.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

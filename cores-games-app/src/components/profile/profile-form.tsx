"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProfileFormValues = {
  name: string;
  username: string;
  avatar: string;
  favoriteGames: string;
  level: number;
  bio: string;
};

export function ProfileForm({
  initialValues,
}: {
  initialValues: ProfileFormValues;
}) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileUpdateSchema.transform((value) => value) as never),
    defaultValues: initialValues,
  });

  async function onSubmit(values: ProfileFormValues) {
    setPending(true);
    setMessage(null);

    const response = await fetch("/api/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        favoriteGames: values.favoriteGames
          .split(",")
          .map((game) => game.trim())
          .filter(Boolean),
      }),
    });

    setPending(false);
    setMessage(response.ok ? "Profile updated." : "Unable to update profile.");
  }

  return (
    <Card className="glass-panel neon-border border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Your gamer identity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" {...form.register("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...form.register("username")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input id="avatar" {...form.register("avatar")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="favoriteGames">Favorite games</Label>
            <Input id="favoriteGames" {...form.register("favoriteGames")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Input id="level" type="number" {...form.register("level", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={5} {...form.register("bio")} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="bg-primary text-primary-foreground" disabled={pending}>
              {pending ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
        {message ? <p className="text-sm text-white/70">{message}</p> : null}
      </CardContent>
    </Card>
  );
}

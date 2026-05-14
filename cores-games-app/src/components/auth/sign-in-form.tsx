"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setPending(true);
    setError(null);
    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    setPending(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/swipe");
    router.refresh();
  }

  return (
    <Card className="glass-panel neon-border border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Sign in to Cores Games!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {error ? (
          <Alert className="border-destructive/30 bg-destructive/10 text-white">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={pending}>
            {pending ? "Entering queue..." : "Sign In"}
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full border-white/12 bg-white/5 text-white"
          onClick={() => signIn("google", { callbackUrl: "/swipe" })}
        >
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}

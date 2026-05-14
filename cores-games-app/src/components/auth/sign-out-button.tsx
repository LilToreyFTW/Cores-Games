"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      variant="outline"
      className="border-white/12 bg-white/5 text-white"
      onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
    >
      Sign Out
    </Button>
  );
}

import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);
  const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  if (session?.user) {
    redirect("/swipe");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 md:px-6">
      <div className="grid w-full gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">NEW PLAYER</p>
          <h1 className="text-5xl font-semibold text-white">Build a gamer profile worth matching.</h1>
          <p className="max-w-lg text-white/68">
            Register with your core identity, top games, avatar, and level. This powers the swipe system and match quality.
          </p>
          <p className="text-sm text-white/56">
            Already inside?{" "}
            <Link href="/auth/sign-in" className="text-cyan-200 underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <SignUpForm googleEnabled={googleEnabled} />
      </div>
    </div>
  );
}

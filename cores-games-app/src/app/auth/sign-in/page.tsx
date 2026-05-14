import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { SignInForm } from "@/components/auth/sign-in-form";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  if (session?.user) {
    redirect("/swipe");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 md:px-6">
      <div className="grid w-full gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">WELCOME BACK</p>
          <h1 className="text-5xl font-semibold text-white">Step back into the queue.</h1>
          <p className="max-w-lg text-white/68">
            Sign in with credentials{googleEnabled ? " or Google" : ""} to access swiping, real matches, and random video chat.
          </p>
          <p className="text-sm text-white/56">
            Need an account?{" "}
            <Link href="/auth/sign-up" className="text-cyan-200 underline-offset-4 hover:underline">
              Create one here
            </Link>
          </p>
        </div>
        <SignInForm googleEnabled={googleEnabled} />
      </div>
    </div>
  );
}

import { requireSession } from "@/lib/session";
import { AppShell } from "@/components/shell/app-shell";
import { VideoChatClient } from "@/components/video-chat/video-chat-client";

export default async function VideoChatPage() {
  const session = await requireSession();

  return (
    <AppShell session={session}>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass-panel neon-border rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/55">Mode</p>
            <p className="mt-3 text-3xl font-semibold text-white">Random 1-on-1</p>
          </div>
          <div className="glass-panel neon-border rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/55">Transport</p>
            <p className="mt-3 text-3xl font-semibold text-white">WebRTC</p>
          </div>
          <div className="glass-panel neon-border rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/55">Signaling</p>
            <p className="mt-3 text-3xl font-semibold text-white">Socket.IO VPS</p>
          </div>
        </div>
        <VideoChatClient userId={session.user.id} username={session.user.username} />
      </div>
    </AppShell>
  );
}

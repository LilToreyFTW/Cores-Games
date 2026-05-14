import { requireSession } from "@/lib/session";
import { AppShell } from "@/components/shell/app-shell";
import { VideoChatClient } from "@/components/video-chat/video-chat-client";

export default async function VideoChatPage() {
  const session = await requireSession();

  return (
    <AppShell session={session}>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <VideoChatClient userId={session.user.id} username={session.user.username} />
      </div>
    </AppShell>
  );
}

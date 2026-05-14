"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import SimplePeer from "simple-peer";
import { Activity, Headphones, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SignalingPayload = {
  from: string;
  signal: SimplePeer.SignalData;
};

type QueueUpdate = {
  onlineCount: number;
  queueLength: number;
  roomId?: string;
  initiator?: boolean;
  partner?: {
    username: string;
    avatar: string;
  };
};

export function VideoChatClient({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) {
  const [queueState, setQueueState] = useState<QueueUpdate>({
    onlineCount: 0,
    queueLength: 0,
  });
  const [log, setLog] = useState<string[]>(["Queue ready. Click connect to enter random chat."]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const peerRef = useRef<SimplePeer.Instance | null>(null);

  const createPeer = useEffectEvent((initiator: boolean, socket: Socket) => {
    peerRef.current?.destroy();

    const peer = new SimplePeer({
      initiator,
      trickle: false,
    });

    peer.on("signal", (signal) => {
      socket.emit("webrtc:signal", signal);
    });

    peer.on("connect", () => {
      setLog((current) => ["Peer connection established.", ...current].slice(0, 6));
    });

    peer.on("error", () => {
      setLog((current) => ["Peer handshake failed. Check STUN/TURN or signaling setup.", ...current].slice(0, 6));
    });

    peerRef.current = peer;
  });

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL ?? "http://127.0.0.1:4001", {
      transports: ["websocket"],
      autoConnect: true,
      query: {
        userId,
        username,
      },
    });

    socketRef.current = socket;

    socket.on("queue:update", (payload: QueueUpdate) => {
      setQueueState(payload);
      if (payload.roomId) {
        setConnected(true);
      }
    });

    socket.on("match:ready", (payload: QueueUpdate) => {
      setQueueState(payload);
      createPeer(Boolean(payload.initiator), socket);
      setLog((current) => [`Matched with ${payload.partner?.username ?? "a gamer"}.`, ...current]);
    });

    socket.on("webrtc:signal", (payload: SignalingPayload) => {
      peerRef.current?.signal(payload.signal);
    });

    socket.on("chat:system", (message: string) => {
      setLog((current) => [message, ...current].slice(0, 6));
    });

    return () => {
      peerRef.current?.destroy();
      socket.disconnect();
    };
  }, [userId, username]);

  function joinQueue() {
    socketRef.current?.emit("queue:join");
    setLog((current) => ["Searching for the next player...", ...current].slice(0, 6));
  }

  function nextPlayer() {
    socketRef.current?.emit("queue:next");
    setConnected(false);
    setLog((current) => ["Skipped to the next player.", ...current].slice(0, 6));
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div>
          <p className="font-mono text-sm tracking-[0.35em] text-cyan-200">RANDOM VIDEO CHAT</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Monkey-style chat, wired for WebRTC.</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            The client connects to a Socket.IO signaling server on your VPS. Peer-to-peer video
            is negotiated with simple-peer, and the server handles queueing, pairing, and next-player flow.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="glass-panel neon-border border-white/10 bg-white/5">
            <CardContent className="p-5">
              <Badge className="bg-cyan-400/12 text-cyan-200 hover:bg-cyan-400/12">
                Online now
              </Badge>
              <div className="mt-3 text-4xl font-semibold text-white">{queueState.onlineCount}</div>
            </CardContent>
          </Card>
          <Card className="glass-panel neon-border border-white/10 bg-white/5">
            <CardContent className="p-5">
              <Badge className="bg-primary/15 text-pink-100 hover:bg-primary/15">Waiting queue</Badge>
              <div className="mt-3 text-4xl font-semibold text-white">{queueState.queueLength}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button className="bg-primary text-primary-foreground" onClick={joinQueue}>
            <Activity className="mr-2 size-4" />
            Connect
          </Button>
          <Button variant="outline" className="border-white/12 bg-white/5 text-white" onClick={nextPlayer}>
            <SkipForward className="mr-2 size-4" />
            Next
          </Button>
        </div>
      </div>

      <Card className="glass-panel neon-border border-white/10 bg-white/5">
        <CardContent className="grid gap-4 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center p-5 pt-40">
              <Badge className="bg-emerald-400/15 text-emerald-200 hover:bg-emerald-400/15">
                {connected ? "Matched" : "Awaiting player"}
              </Badge>
            </div>
            <div className="flex items-center justify-center rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-background to-primary/20 p-6 text-center">
              <div>
                <Headphones className="mx-auto size-8 text-cyan-200" />
                <p className="mt-4 text-lg font-medium text-white">@{username}</p>
                <p className="mt-2 text-sm text-white/62">Mic on, camera component ready for MediaStream wiring.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium text-white">Connection log</p>
            <ul className="mt-3 space-y-2 text-sm text-white/66">
              {log.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

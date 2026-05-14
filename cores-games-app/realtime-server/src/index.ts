import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

type ConnectedUser = {
  socketId: string;
  userId: string;
  username: string;
  roomId?: string;
};

const app = express();
app.use(cors({ origin: "*" }));
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Map<string, ConnectedUser>();
const queue: string[] = [];

function broadcastQueue() {
  io.emit("queue:update", {
    onlineCount: onlineUsers.size,
    queueLength: queue.length,
  });
}

function removeFromQueue(socketId: string) {
  const index = queue.indexOf(socketId);
  if (index >= 0) queue.splice(index, 1);
}

function pairUsers(firstSocketId: string, secondSocketId: string) {
  const first = onlineUsers.get(firstSocketId);
  const second = onlineUsers.get(secondSocketId);
  if (!first || !second) return;

  const roomId = [first.userId, second.userId].sort().join(":");
  first.roomId = roomId;
  second.roomId = roomId;

  io.to(first.socketId).emit("match:ready", {
    roomId,
    initiator: true,
    partner: { username: second.username, avatar: "" },
    onlineCount: onlineUsers.size,
    queueLength: queue.length,
  });

  io.to(second.socketId).emit("match:ready", {
    roomId,
    initiator: false,
    partner: { username: first.username, avatar: "" },
    onlineCount: onlineUsers.size,
    queueLength: queue.length,
  });
}

io.on("connection", (socket) => {
  const userId = String(socket.handshake.query.userId ?? socket.id);
  const username = String(socket.handshake.query.username ?? "player");

  onlineUsers.set(socket.id, {
    socketId: socket.id,
    userId,
    username,
  });

  broadcastQueue();

  socket.on("queue:join", () => {
    if (queue.includes(socket.id)) return;
    removeFromQueue(socket.id);
    queue.push(socket.id);

    if (queue.length >= 2) {
      const first = queue.shift();
      const second = queue.shift();
      if (first && second) {
        pairUsers(first, second);
      }
    }

    broadcastQueue();
  });

  socket.on("queue:next", () => {
    const user = onlineUsers.get(socket.id);
    if (user?.roomId) {
      io.to(socket.id).emit("chat:system", "Skipping to the next player...");
      user.roomId = undefined;
    }

    removeFromQueue(socket.id);
    queue.push(socket.id);
    if (queue.length >= 2) {
      const first = queue.shift();
      const second = queue.shift();
      if (first && second) {
        pairUsers(first, second);
      }
    }

    broadcastQueue();
  });

  socket.on("webrtc:signal", (signal) => {
    const sender = onlineUsers.get(socket.id);
    if (!sender?.roomId) return;

    for (const user of onlineUsers.values()) {
      if (user.socketId !== socket.id && user.roomId === sender.roomId) {
        io.to(user.socketId).emit("webrtc:signal", {
          from: sender.userId,
          signal,
        });
      }
    }
  });

  socket.on("disconnect", () => {
    removeFromQueue(socket.id);
    onlineUsers.delete(socket.id);
    broadcastQueue();
  });
});

const PORT = Number(process.env.PORT ?? 4001);
httpServer.listen(PORT, () => {
  console.log(`Cores Games realtime server listening on ${PORT}`);
});

# Cores Games!

Production-ready gaming social app scaffold built with:

- Next.js 16 App Router + TypeScript
- Tailwind CSS v4 + shadcn/ui
- MongoDB + Mongoose
- NextAuth credentials + Google
- Socket.IO signaling + WebRTC client flow with `simple-peer`

## App structure

- `src/app` route pages and API handlers
- `src/components` UI, auth, swipe, matches, profile, and video chat components
- `src/lib` auth, DB connection, validators, seed helpers
- `src/models` Mongoose models for users, swipes, and matches
- `realtime-server` VPS-ready Socket.IO signaling server

## Environment

Copy `.env.example` to `.env.local` and fill in the values.

## Local development

```bash
npm install
npm run seed
npm run dev
```

In another terminal, for video chat signaling:

```bash
cd realtime-server
npm install
npm run dev
```

## Deploy

- Deploy the Next.js app to Vercel
- Deploy `realtime-server` to your VPS and set `NEXT_PUBLIC_SIGNALING_SERVER_URL`
- Point MongoDB to Atlas or your managed Mongo instance

## Notes

- WebRTC media streams still need browser `getUserMedia` wiring and TURN credentials for production NAT traversal.
- The signaling flow and queue logic are included and structured for extension.

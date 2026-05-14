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

Required in production:

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_SIGNALING_SERVER_URL`

Optional:

- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

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

### Exact Vercel setup for this repository

This repository behaves like a small monorepo. The real Next.js app is inside:

- `cores-games-app`

If you import the repo root into Vercel without changing the project settings, Vercel can miss the actual app and you can end up with a bad deployment or a 404.

Use these Vercel settings:

- Framework Preset: `Next.js`
- Root Directory: `cores-games-app`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave blank

### Production env vars for `https://cores-games.vercel.app`

Set these in the Vercel project:

```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_SECRET=your-long-random-secret
NEXTAUTH_URL=https://cores-games.vercel.app
NEXT_PUBLIC_SIGNALING_SERVER_URL=https://your-signaling-domain-or-vps
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

Notes:

- `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` are optional. If unset, credentials auth still works and Google login is simply disabled.
- `NEXT_PUBLIC_SIGNALING_SERVER_URL` must point to your deployed VPS signaling server, not the Vercel app.
- The old prototype files in the repo are not the app Vercel should deploy. The nested `cores-games-app` directory is the one that matters.

### VPS signaling server

The WebRTC signaling server is in:

- `cores-games-app/realtime-server`

Deploy that separately on your VPS and expose it over HTTPS or behind a reverse proxy. A basic flow is:

```bash
cd realtime-server
npm install
PORT=4001 npm run start
```

Then set:

```env
NEXT_PUBLIC_SIGNALING_SERVER_URL=https://your-vps-domain
```

## Notes

- WebRTC media streams still need browser `getUserMedia` wiring and TURN credentials for production NAT traversal.
- The signaling flow and queue logic are included and structured for extension.

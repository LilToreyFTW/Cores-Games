Cores Games Windows VPS bundle
==============================

This folder is for the realtime signaling server used by the Vercel frontend.

What to do on the VPS:

1. Install Node.js 20+ if it is not already installed.
2. Extract this folder anywhere you want, for example:
   C:\cores-games-realtime
3. Double-click run-vps.bat

Default port:
- 4001

Optional:
- Set a PORT environment variable before running if you want another port.

Frontend env value to use in Vercel:
- NEXT_PUBLIC_SIGNALING_SERVER_URL=https://your-vps-domain

If you are using a reverse proxy, point your domain to this server and forward traffic to the chosen port.

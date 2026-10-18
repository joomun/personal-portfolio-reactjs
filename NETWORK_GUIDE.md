# Public IP Tracking and Ping Monitor Setup

This project includes a small backend service that keeps track of your public IP and exposes a ping endpoint for testing connectivity from the frontend.

## Architecture

- Backend server: hosted on your other server
- Frontend app: this React portfolio app
- Function: the backend fetches your current public IP, stores it in memory, and runs ping calls for a target IP or hostname

## 1) Backend setup on your external server

1. Open a terminal on your other server.
2. Create a folder:

   ```bash
   mkdir -p public-ip-monitor
   cd public-ip-monitor
   ```

3. Create a file named `package.json` with:

   ```json
   {
     "name": "public-ip-monitor-backend",
     "version": "1.0.0",
     "description": "Public IP tracking and ping health backend",
     "main": "server.js",
     "scripts": {
       "start": "node server.js",
       "dev": "node --watch server.js"
     },
     "dependencies": {
       "cors": "^2.8.5",
       "express": "^4.19.2"
     }
   }
   ```

4. Create `server.js` with the code in this repo under `backend/server.js`.
5. Install dependencies:

   ```bash
   npm install
   ```

6. Start the service:

   ```bash
   npm start
   ```

7. Check if it is alive:

   ```bash
   curl http://localhost:4000/api/health
   ```

You should get JSON like:

```json
{
  "service": "public-ip-monitor",
  "ok": true,
  "publicIp": "203.0.113.42",
  "lastUpdated": "2026-10-17T12:00:00.000Z"
}
```

## 2) Frontend setup in this React app

1. Copy the sample env file:

   ```bash
   cp .env.example .env
   ```

2. Update the backend URL if needed:

   ```bash
   REACT_APP_BACKEND_URL=http://your-server-ip:4000
   ```

3. Start the frontend:

   ```bash
   npm install
   npm start
   ```

4. Open the page at:

   ```text
   http://localhost:3000/network
   ```

## 3) How the page works

- The page loads the backend public IP automatically.
- It displays the current IP from the backend.
- You can type another target IP or hostname, then click "Test Ping".
- The request is sent to the backend, which executes `ping -c 4` on the server and returns the result.

## 4) Why this works well for dynamic ISP IPs

Your ISP may change your public IP at any time, but the backend runs on a machine that is always reachable and checks the public IP regularly. The frontend can then read the latest backend value instead of relying on a fixed public IP.

You can extend this with:

- email alerts when the IP changes
- Telegram or Discord notifications
- a small dashboard showing uptime and ping history
- a cron job to auto-refresh the IP every few minutes

## 5) Common notes

- This uses `ping`, so the server must run on Linux.
- If the backend is behind a firewall, open the required port.
- If you deploy the backend to another machine, make sure the frontend can access it over HTTP.

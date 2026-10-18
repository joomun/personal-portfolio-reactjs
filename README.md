# Personal Portfolio + Backend IP Monitor

This project contains:

- the React portfolio frontend
- a backend public IP tracker and ping service in `backend/`
- a private network monitor page for local/private deployment

## Frontend setup

From the project root:

```bash
npm install
npm start
```

The app will run on:

```bash
http://localhost:3000
```

To create a production build:

```bash
npm run build
```

## Backend setup

The backend lives in `backend/` and is responsible for:

- fetching the current public IP
- refreshing it automatically
- exposing a protected `/api/public-ip` endpoint
- exposing a protected `/api/ping` endpoint
- validating a username/password with `bcryptjs`
- issuing a JWT for authenticated frontend requests

### 1) Install backend dependencies

```bash
cd backend
npm install
```

### 2) Create backend environment file

Create a `.env` file in the `backend/` directory:

```env
APP_USER=joomun
APP_PASSWORD_HASH=<bcrypt-hash>
JWT_SECRET=<long-random-secret>
PORT=4000
```

Generate the bcrypt hash:

```bash
cd backend
node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('YourStrongPassword123', 10));"
```

Paste the generated hash into `APP_PASSWORD_HASH`.

### 3) Start the backend

```bash
cd backend
node server.js
```

You should see output like:

```bash
Public IP monitor running on http://localhost:4000
```

### 4) Test the endpoints

Login:

```bash
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"joomun","password":"YourStrongPassword123"}'
```

Get the public IP using the token returned from the login response:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:4000/api/public-ip
```

Ping a target:

```bash
curl -H "Authorization: Bearer <token>" "http://localhost:4000/api/ping?target=8.8.8.8"
```

## Frontend env for the network page

In the root project, create or update `.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:4000
REACT_APP_NETWORK_ENABLED=true
```

If you deploy the frontend to Vercel, set the backend URL to your live backend domain, for example:

```env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
REACT_APP_NETWORK_ENABLED=true
```

## Domain setup for your own server

If you have your own domain, the usual setup is:

### Option A: Frontend on Vercel, backend on your server

1. Point your domain to your server IP or keep the frontend on Vercel.
2. Create a subdomain for the API, such as `api.yourdomain.com`.
3. Add an `A` record to your DNS provider:

```text
api.yourdomain.com  ->  YOUR_SERVER_PUBLIC_IP
```

4. On the server, install Nginx and Certbot.
5. Add a reverse proxy so `api.yourdomain.com` forwards to port `4000`.

Example Nginx config:

```nginx
server {
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then enable HTTPS:

```bash
sudo certbot --nginx -d api.yourdomain.com
```

After that, set the frontend env:

```env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

### Option B: Frontend and backend on the same server

If the frontend is hosted on the same machine instead of Vercel:

- point `yourdomain.com` to the server IP
- configure Nginx to serve the frontend on port `80/443`
- configure a second location or subdomain for the backend API

Example:

```text
yourdomain.com        -> server public IP
api.yourdomain.com    -> server public IP
```

### DNS summary

Typical setup:

- `yourdomain.com` -> frontend (Vercel or same server)
- `api.yourdomain.com` -> backend server

This keeps the app clean and makes the backend API easier to secure.

## Important security note

Do not store the real password or raw secrets in the frontend. The frontend must only keep the JWT token after login. The backend should validate credentials and manage the public IP tracking logic.

## Production process

For a real deployment, it is recommended to use:

- PM2 or systemd for the backend process
- Nginx for HTTPS reverse proxy
- a domain + DNS A record for the backend subdomain
- environment variables stored only on the server, never committed to Git

## Useful commands

Start backend with PM2:

```bash
cd backend
pm2 start server.js --name public-ip-monitor
```

Check logs:

```bash
pm2 logs public-ip-monitor
```

Restart backend:

```bash
pm2 restart public-ip-monitor
```

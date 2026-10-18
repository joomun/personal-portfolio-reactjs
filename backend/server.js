require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const https = require('https');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const logDir = path.join(__dirname, 'logs');
const logFile = path.join(logDir, 'backend.log');
const PORT = process.env.PORT || 4000;
const APP_USER = process.env.APP_USER || 'joomun';
const APP_PASSWORD_HASH = process.env.APP_PASSWORD_HASH || '';
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-to-a-long-random-secret';

function F_GetTimestamp() {
  return new Date().toISOString();
}

function F_EnsureLogDir() {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

function F_WriteLog(level, message) {
  F_EnsureLogDir();

  const line = `[${F_GetTimestamp()}] [${level}] ${message}\n`;
  fs.appendFileSync(logFile, line, 'utf8');
  console.log(line.trim());
}

function F_PrintLog(message) {
  F_WriteLog('INFO', message);
}

function F_PrintWarning(message) {
  F_WriteLog('WARN', message);
}

function F_PrintError(message) {
  F_WriteLog('ERROR', message);
}

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://www.noorpersonalspace.africa',
  'https://noorpersonalspace.africa',
  'https://api.noorpersonalspace.africa',
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.options('*', cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

let currentPublicIp = null;
let lastUpdated = null;

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Authorization token required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ ok: false, message: 'Invalid or expired token.' });
  }
}

function fetchPublicIp() {
  return new Promise((resolve, reject) => {
    const request = https.get('https://api.ipify.org?format=json', (response) => {
      let raw = '';

      response.on('data', (chunk) => {
        raw += chunk;
      });

      response.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.ip) {
            resolve(parsed.ip);
            return;
          }
          reject(new Error('Could not parse public IP response.'));
        } catch (error) {
          reject(error);
        }
      });
    });

    request.on('error', reject);
  });
}

async function refreshPublicIp() {
  try {
    const ip = await fetchPublicIp();
    currentPublicIp = ip;
    lastUpdated = new Date().toISOString();
    F_PrintLog(`[public-ip] Updated IP: ${ip}`);
  } catch (error) {
    F_PrintWarning(`[public-ip] Failed to refresh IP: ${error.message}`);
  }
}

F_PrintLog(`Backend starting. PID=${process.pid}, PM2=${process.env.pm_id || 'local'}, PORT=${PORT}`);

if (!APP_PASSWORD_HASH) {
  F_PrintWarning('APP_PASSWORD_HASH is empty. Authentication is not configured.');
}

if (!JWT_SECRET || JWT_SECRET === 'change-this-to-a-long-random-secret') {
  F_PrintWarning('JWT_SECRET is still using the default value. Update it in the environment for production.');
}

refreshPublicIp();
setInterval(refreshPublicIp, 5 * 60 * 1000);

app.get('/api/health', (req, res) => {
  res.json({
    service: 'public-ip-monitor',
    ok: true,
    publicIp: currentPublicIp || null,
    lastUpdated,
    authRequired: false,
  });
});

app.get('/api/health-auth', authRequired, (req, res) => {
  res.json({
    service: 'public-ip-monitor',
    ok: true,
    publicIp: currentPublicIp || null,
    lastUpdated,
    authRequired: true,
  });
});

app.post('/api/login', (req, res) => {
  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '');

  if (!APP_PASSWORD_HASH) {
    return res.status(500).json({
      ok: false,
      message: 'Server authentication is not configured. Set APP_PASSWORD_HASH and JWT_SECRET in the backend environment.',
    });
  }

  if (!username || !password) {
    return res.status(400).json({ ok: false, message: 'Username and password are required.' });
  }

  if (username !== APP_USER) {
    return res.status(401).json({ ok: false, message: 'Invalid credentials.' });
  }

  const isValid = bcrypt.compareSync(password, APP_PASSWORD_HASH);

  if (!isValid) {
    return res.status(401).json({ ok: false, message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ username: APP_USER }, JWT_SECRET, { expiresIn: '8h' });

  return res.json({
    ok: true,
    token,
    username: APP_USER,
    message: 'Login successful.',
  });
});

app.get('/api/public-ip', authRequired, async (req, res) => {
  try {
    if (!currentPublicIp) {
      await refreshPublicIp();
    }

    res.json({
      ip: currentPublicIp,
      lastUpdated,
      source: 'https://api.ipify.org',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Unable to fetch public IP',
      message: error.message,
    });
  }
});

app.get('/api/ping', authRequired, (req, res) => {
  const target = (req.query.target || currentPublicIp || '').trim();

  if (!target) {
    return res.status(400).json({
      ok: false,
      error: 'Target IP or hostname is required.',
    });
  }

  const safeTarget = target.replace(/[^a-zA-Z0-9.:-]/g, '');
  const pingCommand = `ping -c 4 -W 2 ${safeTarget}`;

  exec(pingCommand, (error, stdout, stderr) => {
    const output = stdout || stderr || '';
    const exitCode = error ? error.code ?? 1 : 0;

    if (error && exitCode !== 0) {
      return res.status(200).json({
        ok: false,
        target: safeTarget,
        command: pingCommand,
        exitCode,
        output,
        message: 'Ping failed for target.',
      });
    }

    return res.json({
      ok: true,
      target: safeTarget,
      command: pingCommand,
      exitCode,
      output,
      message: 'Ping successful.',
    });
  });
});

const server = app.listen(PORT, () => {
  const message = `Public IP monitor running on http://localhost:${PORT}`;
  F_PrintLog(message);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    const message = `Port ${PORT} is already in use. Stop the existing backend process or remove the stale PM2 instance before restarting.`;
    F_PrintError(message);
    process.exit(1);
  }

  F_PrintError(`Unhandled server error: ${error.message}`);
  throw error;
});

process.on('SIGINT', () => {
  F_PrintWarning('Backend shutdown triggered by SIGINT.');
  process.exit(0);
});

process.on('SIGTERM', () => {
  F_PrintWarning('Backend shutdown triggered by SIGTERM.');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  F_PrintError(`Uncaught exception: ${error.stack || error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  F_PrintError(`Unhandled rejection: ${reason instanceof Error ? reason.stack : String(reason)}`);
});

const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let currentPublicIp = null;
let lastUpdated = null;

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
    console.log(`[public-ip] Updated IP: ${ip}`);
  } catch (error) {
    console.error('[public-ip] Failed to refresh IP:', error.message);
  }
}

refreshPublicIp();
setInterval(refreshPublicIp, 5 * 60 * 1000);

app.get('/api/health', (req, res) => {
  res.json({
    service: 'public-ip-monitor',
    ok: true,
    publicIp: currentPublicIp || null,
    lastUpdated,
  });
});

app.get('/api/public-ip', async (req, res) => {
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

app.get('/api/ping', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Public IP monitor running on http://localhost:${PORT}`);
});

module.exports = {
  apps: [
    {
      name: 'public-ip-monitor',
      script: 'server.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        PORT: 4000
      },
      out_file: './logs/pm2-out.log',
      error_file: './logs/pm2-error.log',
      log_file: './logs/pm2-combined.log',
      merge_logs: true,
      time: true,
      exec_mode: 'fork'
    }
  ]
};

#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

resolve_npm_bin() {
  local candidates=()

  if command -v npm >/dev/null 2>&1; then
    candidates+=("$(command -v npm)")
  fi

  while IFS= read -r candidate; do
    candidates+=("$candidate")
  done < <(find /home /usr/local/bin /usr/bin -path '*/bin/npm' 2>/dev/null | head -n 20)

  for candidate in "${candidates[@]}"; do
    if [[ -n "$candidate" && -x "$candidate" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done

  return 1
}

NPM_BIN="$(resolve_npm_bin || true)"
if [[ -n "${NPM_BIN:-}" ]]; then
  export PATH="$(dirname "$NPM_BIN"):$PATH"
fi

ACTION="${1:-start}"

ensure_root() {
  if [[ "$EUID" -ne 0 ]]; then
    echo "This script needs sudo for system packages and Nginx setup. Rerun with sudo."
    exit 1
  fi
}

install_packages() {
  export DEBIAN_FRONTEND=noninteractive
  apt-get update
  apt-get install -y nginx certbot python3-certbot-nginx
  npm install -g pm2
}

check_backend() {
  if curl -fsS http://localhost:4000/api/login >/dev/null 2>&1; then
    return 0
  fi
  return 1
}

check_pm2() {
  if ! command -v pm2 >/dev/null 2>&1; then
    return 1
  fi
  return 0
}

check_nginx() {
  if ! command -v nginx >/dev/null 2>&1; then
    return 1
  fi
  return 0
}

load_env_file() {
  local env_file="${1:-.env}"

  if [[ ! -f "$env_file" ]]; then
    return 0
  fi

  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%$'\r'}"
    [[ -z "${line//[[:space:]]/}" ]] && continue
    [[ "$line" =~ ^[[:space:]]*# ]] && continue

    if [[ "$line" =~ ^[[:space:]]*([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
      local key="${BASH_REMATCH[1]}"
      local value="${BASH_REMATCH[2]}"

      if [[ "$value" == \"*\" && "$value" == *\" ]]; then
        value="${value:1:${#value}-2}"
      elif [[ "$value" == \'*\' && "$value" == *\' ]]; then
        value="${value:1:${#value}-2}"
      fi

      export "$key=$value"
    fi
  done < "$env_file"
}

case "$ACTION" in
  start)
    ensure_root

    if ! check_pm2; then
      echo "PM2 not found. Installing..."
      npm install -g pm2
    fi

    if ! check_nginx; then
      echo "Nginx not found. Installing..."
      install_packages
    fi

    load_env_file ".env"

    if [[ -z "${APP_PASSWORD_HASH:-}" || -z "${JWT_SECRET:-}" ]]; then
      echo "Missing APP_PASSWORD_HASH or JWT_SECRET in backend/.env"
      exit 1
    fi

    if pm2 list | grep -q "public-ip-monitor"; then
      echo "Stopping existing PM2 instance before restart..."
      pm2 delete public-ip-monitor >/dev/null 2>&1 || true
    fi

    if ss -ltn 2>/dev/null | awk '{print $4}' | grep -Eq '(:|\.)4000$'; then
      echo "Port 4000 is already in use. Releasing stale listener..."
      fuser -k 4000/tcp >/dev/null 2>&1 || true
    fi

    if check_backend; then
      echo "Backend is already up. No need to start it again."
    else
      echo "Starting backend..."
      pm2 start server.js --name public-ip-monitor --interpreter node
    fi

    NGINX_CONF="/etc/nginx/sites-available/api.noorpersonalspace.africa"
    NGINX_LINK="/etc/nginx/sites-enabled/api.noorpersonalspace.africa"

    if [[ ! -f "$NGINX_CONF" ]]; then
      echo "Creating Nginx config for api.noorpersonalspace.africa..."
      cat > "$NGINX_CONF" <<'EOF'
server {
    listen 80;
    server_name api.noorpersonalspace.africa;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

      ln -sf "$NGINX_CONF" "$NGINX_LINK"
    fi

    systemctl enable nginx >/dev/null 2>&1 || true
    nginx -t
    systemctl start nginx || systemctl restart nginx
    echo "Backend and Nginx are running."
    ;;

  kill)
    ensure_root
    echo "Stopping backend and Nginx..."
    pm2 delete public-ip-monitor >/dev/null 2>&1 || true
    systemctl stop nginx >/dev/null 2>&1 || true
    echo "Stopped."
    ;;

  *)
    echo "Usage: $0 [start|kill]"
    exit 1
    ;;
esac

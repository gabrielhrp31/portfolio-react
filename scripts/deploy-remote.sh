#!/usr/bin/env bash
# Executado NA VPS (KingHost) pelo Gitea Actions.
set -euo pipefail

APP_DIR="${DEPLOY_PATH:-/opt/portfolio}"
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env.production"

cd "$APP_DIR"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERRO: falta $APP_DIR/$ENV_FILE"
  echo "O Gitea Actions deveria gerar este arquivo a partir dos Secrets."
  echo "Confira ADMIN_PASSWORD, MYSQL_ROOT_PASSWORD e DATABASE_PASSWORD no Gitea."
  exit 1
fi

# Carrega variáveis do .env.production
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

compose() {
  docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" "$@"
}

echo "==> Rede Traefik"
docker network inspect traefik >/dev/null 2>&1 || docker network create traefik

echo "==> Pasta de uploads (bind mount → /app/public/uploads)"
mkdir -p "$APP_DIR/public/uploads"
# Best-effort host ownership for Next.js uid inside the container.
# The container entrypoint also chowns the mount as root on start.
if chown -R 1001:1001 "$APP_DIR/public/uploads" 2>/dev/null; then
  echo "uploads owned by 1001:1001"
else
  echo "WARN: não foi possível chown 1001:1001 em public/uploads (entryoint do container corrige)"
fi
chmod -R ug+rwX "$APP_DIR/public/uploads" 2>/dev/null || true

# Stop only the app before build so npm/Next has RAM headroom.
# Short, predictable downtime beats an OOM crash that kills SSH/runner.
echo "==> Stopping app to free RAM for build"
compose stop app >/dev/null 2>&1 || true

echo "==> Freeing Docker disk/memory before build..."
docker image prune -f || true
docker builder prune -f --filter until=72h || true

echo "==> Building app image"
compose build app

echo "==> Ensuring MySQL is up"
compose up -d mysql

echo "==> Aguardando MySQL"
for _ in $(seq 1 40); do
  if compose exec -T mysql \
    mysqladmin ping -h localhost -uroot -p"${MYSQL_ROOT_PASSWORD}" --silent 2>/dev/null; then
    echo "MySQL OK"
    break
  fi
  sleep 3
done

echo "==> Starting app (--no-deps so MySQL is not recreated)"
compose up -d --no-deps --remove-orphans app

echo "==> Seed idempotente"
MYSQL_NET="$(docker inspect portfolio-mysql --format '{{range $k, $v := .NetworkSettings.Networks}}{{println $k}}{{end}}' | head -n1)"
# Repo is mounted read-only; install deps in /tmp and point NODE_PATH there
# (Node resolves modules from the script path, not from cwd).
docker run --rm \
  --network "$MYSQL_NET" \
  -v "$APP_DIR:/workspace:ro" \
  -e DATABASE_HOST=mysql \
  -e DATABASE_PORT=3306 \
  -e "DATABASE_USER=${DATABASE_USER}" \
  -e "DATABASE_PASSWORD=${DATABASE_PASSWORD}" \
  -e "DATABASE_NAME=${DATABASE_NAME}" \
  -e NODE_OPTIONS=--max-old-space-size=512 \
  node:20-alpine \
  sh -c 'set -e
    mkdir -p /tmp/seed-work
    cd /tmp/seed-work
    npm init -y >/dev/null 2>&1
    npm install --no-save --no-fund --no-audit mysql2@3 >/dev/null
    export NODE_PATH=/tmp/seed-work/node_modules
    node /workspace/scripts/seed.js
  '

docker image prune -f >/dev/null || true

echo "==> Status"
compose ps
echo "Deploy OK"

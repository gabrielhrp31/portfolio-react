#!/usr/bin/env bash
# Executado NA VPS (KingHost) pelo Gitea Actions.
set -euo pipefail

APP_DIR="${DEPLOY_PATH:-/opt/portfolio}"
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env.production"

cd "$APP_DIR"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERRO: falta $APP_DIR/$ENV_FILE"
  echo "Na VPS: cp .env.production.example .env.production && nano .env.production"
  exit 1
fi

# Carrega variáveis do .env.production
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

echo "==> Rede Traefik"
docker network inspect traefik >/dev/null 2>&1 || docker network create traefik

echo "==> Docker Compose up --build"
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d --build --remove-orphans

echo "==> Aguardando MySQL"
for _ in $(seq 1 40); do
  if docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" exec -T mysql \
    mysqladmin ping -h localhost -uroot -p"${MYSQL_ROOT_PASSWORD}" --silent 2>/dev/null; then
    echo "MySQL OK"
    break
  fi
  sleep 3
done

echo "==> Seed idempotente"
MYSQL_NET="$(docker inspect portfolio-mysql --format '{{range $k, $v := .NetworkSettings.Networks}}{{println $k}}{{end}}' | head -n1)"
docker run --rm \
  --network "$MYSQL_NET" \
  -v "$APP_DIR:/workspace:ro" \
  -w /workspace \
  -e DATABASE_HOST=mysql \
  -e DATABASE_PORT=3306 \
  -e "DATABASE_USER=${DATABASE_USER}" \
  -e "DATABASE_PASSWORD=${DATABASE_PASSWORD}" \
  -e "DATABASE_NAME=${DATABASE_NAME}" \
  node:20-alpine \
  sh -c "npm install --no-save mysql2@3 >/dev/null && node scripts/seed.js"

docker image prune -f >/dev/null || true

echo "==> Status"
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" ps
echo "Deploy OK → https://gabrielhrp.com/"

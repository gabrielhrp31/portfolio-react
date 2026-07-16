# Deploy — VPS KingHost + Traefik + Gitea Actions

Domínio: **https://gabrielhrp.com/**

## Arquivos

| Arquivo | Função |
|---------|--------|
| `.gitea/workflows/deploy.yml` | Pipeline Gitea Actions |
| `docker-compose.prod.yml` | App + MySQL + labels Traefik |
| `Dockerfile` | Build Next.js (`output: standalone`) |
| `.env.production.example` | Modelo de secrets na VPS |
| `scripts/deploy-remote.sh` | Build/up/seed na VPS |

## 1. Traefik na VPS

É preciso ter um Traefik já rodando, com:

- entrypoints `web` (:80) e `websecure` (:443)
- certresolver chamado **`letsencrypt`**
- Docker provider habilitado
- rede Docker externa **`traefik`**

Exemplo mínimo de Traefik (se ainda não tiver):

```yaml
# /opt/traefik/docker-compose.yml
services:
  traefik:
    image: traefik:v3.3
    container_name: traefik
    restart: unless-stopped
    command:
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
      - --providers.docker.network=traefik
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.letsencrypt.acme.email=seu@email.com
      - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
      - --certificatesresolvers.letsencrypt.acme.httpchallenge=true
      - --certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - traefik_letsencrypt:/letsencrypt
    networks:
      - traefik

networks:
  traefik:
    name: traefik
    external: false

volumes:
  traefik_letsencrypt:
```

```bash
docker network create traefik   # se o compose acima já cria, pule
cd /opt/traefik && docker compose up -d
```

Se o seu Traefik usar outro nome de certresolver (ex.: `myresolver`), altere em `docker-compose.prod.yml` a label:

`traefik.http.routers.portfolio.tls.certresolver=letsencrypt`

## 2. DNS (KingHost)

No painel DNS do domínio:

| Tipo | Nome | Valor |
|------|------|--------|
| A | `@` | IP da VPS |
| A | `www` | IP da VPS |

O compose redireciona `www.gabrielhrp.com` → `https://gabrielhrp.com/`.

## 3. Primeiro setup na VPS

```bash
sudo mkdir -p /opt/portfolio
sudo chown "$USER":"$USER" /opt/portfolio

# Na primeira vez, copie o código (ou deixe o Actions fazer o rsync)
# Depois:
cd /opt/portfolio
cp .env.production.example .env.production
nano .env.production   # senhas fortes!

chmod +x scripts/deploy-remote.sh
./scripts/deploy-remote.sh
```

## 4. Secrets no Gitea

Em **Repository → Settings → Actions → Secrets**:

| Secret | Exemplo |
|--------|---------|
| `SSH_HOST` | `123.45.67.89` |
| `SSH_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | conteúdo de `~/.ssh/id_ed25519` (chave privada) |
| `SSH_PORT` | `22` (opcional) |
| `DEPLOY_PATH` | `/opt/portfolio` (opcional) |

Na VPS, autorize a chave pública correspondente em `~/.ssh/authorized_keys` do `SSH_USER`.

O usuário precisa de permissão para Docker (`usermod -aG docker deploy` + relogin).

## 5. Runner Gitea (`act_runner`)

1. Gitea Admin → Actions → Runners → criar token  
2. Registrar runner com label `ubuntu-latest`  
3. Habilitar Actions no repositório  

## 6. Fluxo automático

Push em `master`/`main` (ou **Run workflow**):

1. Checkout no runner  
2. Rsync do código → `/opt/portfolio` (preserva `.env.production` e `uploads`)  
3. `docker compose -f docker-compose.prod.yml up -d --build`  
4. Seed MySQL idempotente  
5. Health check em `https://gabrielhrp.com/`

## Labels Traefik (resumo)

- Hosts: `gabrielhrp.com`, `www.gabrielhrp.com`
- Entrypoint TLS: `websecure` + `letsencrypt`
- HTTP → HTTPS
- `www` → apex
- Headers de segurança (HSTS, etc.)
- Serviço interno na porta `3000`

## Admin

Após o deploy: `https://gabrielhrp.com/admin`  
Senha: `ADMIN_PASSWORD` do `.env.production`.

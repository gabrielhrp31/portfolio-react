# Deploy — VPS KingHost + Traefik + Gitea Actions

Domínio: **https://SEU_DOMINIO.com/**

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

O compose redireciona `www.SEU_DOMINIO.com` → `https://SEU_DOMINIO.com/`.

## 3. Primeiro setup na VPS

```bash
sudo mkdir -p /opt/portfolio
sudo chown "$USER":"$USER" /opt/portfolio
# Docker + rede Traefik (ver seção 1)
# Não é necessário criar .env.production manualmente:
# o Gitea Actions gera o arquivo a partir dos Secrets a cada deploy.
```

Garanta que o usuário SSH tem permissão Docker (`usermod -aG docker SEU_USER` + relogin)  
e que login por senha SSH está habilitado na VPS (padrão na maioria dos painéis KingHost).

## 4. Secrets no Gitea

Em **Repository → Settings → Actions → Secrets**:

### Obrigatórios

| Secret | Uso |
|--------|-----|
| `SSH_HOST` | IP/hostname da VPS |
| `SSH_USER` | usuário SSH da VPS |
| `SSH_PASSWORD` | senha SSH da VPS (KingHost) |
| `ADMIN_PASSWORD` | senha do `/admin` do site |
| `MYSQL_ROOT_PASSWORD` | senha **root** do MySQL **do Docker** (você escolhe) |
| `DATABASE_PASSWORD` | senha do user MySQL **do Docker** (você escolhe) |

### Opcionais

| Secret | Default / uso |
|--------|----------------|
| `SSH_PORT` | `22` |
| `DEPLOY_PATH` | `/opt/portfolio` |
| `DATABASE_NAME` | `portfolio` |
| `DATABASE_USER` | `portfolio` |
| `CONTACT_SMTP_HOST` | SMTP para orçamentos |
| `CONTACT_SMTP_PORT` | `587` |
| `CONTACT_SMTP_USER` / `CONTACT_SMTP_PASS` | auth SMTP |
| `CONTACT_SMTP_FROM` | remetente |
| `CONTACT_SMTP_TO` / `CONTACT_TO_EMAIL` | destinatário dos orçamentos |
| `CONTACT_SMTP_SECURE` | `false` |

### MySQL: de onde vêm os dados?

O MySQL **já está no** `docker-compose.prod.yml` (serviço `mysql`).  
Não é um MySQL externo da KingHost.

1. Você cria nos Secrets as senhas que quiser (`MYSQL_ROOT_PASSWORD`, `DATABASE_PASSWORD`, etc.).
2. O Actions grava isso em `.env.production` na VPS.
3. No `docker compose up`, o container MySQL é criado com esses valores.
4. O script de deploy roda o **seed** (tabelas + dados iniciais).
5. Depois você gerencia conteúdo pelo `/admin`.

O workflow grava os Secrets em `${DEPLOY_PATH}/.env.production` (chmod 600) antes do `docker compose up`.

## 5. Runner Gitea (`act_runner`)

1. Gitea Admin → Actions → Runners → criar token  
2. Registrar runner com label `ubuntu-latest`  
3. Habilitar Actions no repositório  

### Erro `Could not resolve host: server`

Isso acontece quando o `actions/checkout` tenta clonar de `http://server:3000/...`  
(URL interna do Docker do Gitea) e o container do job não resolve o hostname `server`.

O workflow deste repo **já contorna** isso clonando pela URL pública do Gitea
(host `gitea.portfolio.vps-kinghost.net` + `gitea.repository` do contexto do Actions),
em vez de `http://server:3000/...`.

Ainda assim, ajuste o Gitea para evitar outros problemas:

```ini
# app.ini (ou env do container Gitea)
[server]
DOMAIN = gitea.portfolio.vps-kinghost.net
ROOT_URL = https://gitea.portfolio.vps-kinghost.net/
```

No `act_runner` (opcional, se precisar falar com o Gitea na rede Docker):

```yaml
# config.yaml do act_runner
container:
  network: host
```

Reinicie Gitea + act_runner depois de mudar `ROOT_URL`.

## 6. Fluxo automático

Push em `master`/`main` (ou **Run workflow**):

1. Checkout no runner  
2. Gera `.env.production` na VPS a partir dos Secrets  
3. Rsync do código → `/opt/portfolio` (não sobrescreve `.env.production`/`uploads` via rsync)  
4. `docker compose -f docker-compose.prod.yml up -d --build`  
5. Seed MySQL idempotente  
6. Health check em `https://SEU_DOMINIO.com/`

## Labels Traefik (resumo)

- Hosts: `SEU_DOMINIO.com`, `www.SEU_DOMINIO.com`
- Entrypoint TLS: `websecure` + `letsencrypt`
- HTTP → HTTPS
- `www` → apex
- Headers de segurança (HSTS, etc.)
- Serviço interno na porta `3000`

## Admin

Após o deploy: `https://SEU_DOMINIO.com/admin`  
Senha: valor do secret `ADMIN_PASSWORD` (injetado no `.env.production`).

## Certificado inválido (`ERR_CERT_AUTHORITY_INVALID`)

O Chrome mostra esse aviso quando o Traefik ainda serve o certificado
**default/self-signed** (ACME/Let’s Encrypt não emitiu o cert do domínio).

Checklist:

1. DNS `A` de `@` e `www` apontando para o IP da VPS (`dig +short SEU_DOMINIO.com`).
2. Portas **80** e **443** abertas na VPS (challenge HTTP usa a 80).
3. Traefik com certresolver chamado **`letsencrypt`** (mesmo nome das labels do compose).
4. Logs do Traefik:
   ```bash
   docker logs traefik 2>&1 | tail -100
   ```
   Procure erros `acme` / `unable to generate` / `NXDOMAIN`.
5. Depois do DNS certo, force recriação do app:
   ```bash
   cd /opt/portfolio
   docker compose -f docker-compose.prod.yml --env-file .env.production up -d
   ```

Enquanto o Let’s Encrypt não emitir, o aviso de “invasores” é esperado
(certificado temporário do Traefik) — não significa que o site foi invadido.

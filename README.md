# Gabriel Rodrigues Personal Page

Portfólio pessoal em **Next.js** com itens cadastrados dinamicamente em **MySQL**.

## Stack

- Next.js (App Router)
- React + Styled Components
- MySQL 8 (via Docker Compose)
- React Icons + Devicon

## Setup rápido

1. Copie as variáveis de ambiente:

```bash
cp .env.example .env.local
```

2. Suba o MySQL e rode o seed:

```bash
npm install
npm run db:init
```

3. Inicie o app em modo desenvolvimento:

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin (CRUD do portfólio): [http://localhost:3000/admin](http://localhost:3000/admin)
- Senha padrão do admin: `admin123` (variável `ADMIN_PASSWORD`)

## Scripts úteis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run lint` | ESLint (Next) |
| `npm test` | Testes unitários simples |
| `npm run db:up` | Sobe o MySQL |
| `npm run db:seed` | Cria tabela e popula itens iniciais |
| `npm run db:init` | `db:up` + espera healthcheck + seed |

## Modelo de dados

Conteúdo dinâmico (CRUD em `/admin`):

| Tabela | Uso na home |
|--------|-------------|
| `portfolio_items` | Cards do portfólio |
| `services` | Seção de serviços (`icon_key`: code, mobile, server, laptop, cloud) |
| `technologies` | Ícones Devicon na seção Sobre (`slug` ex: `react`, `mysql`) |
| `experiences` | Timeline de experiência profissional |
| `courses` | Formação, cursos e certificados (`kind`: formation/course/certificate) |
| `site_media` | Imagens configuráveis (perfil, logos, fundos, identidade) |

APIs: `GET /api/portfolio`, `/api/services`, `/api/technologies`, `/api/experiences`, `/api/courses`, `/api/media`. Upload: `POST /api/media/upload` (admin). Imagens locais passam pelo otimizador do Next.js (AVIF/WebP).

Sugestões de evolução (inspiradas em [valadao.works](https://valadao.works/)): ver `docs/IMPROVEMENTS.md`.

## Deploy (KingHost + Traefik + Gitea Actions)

Produção em **https://gabrielhrp.com/** com Docker e Traefik.

- Workflow: `.gitea/workflows/deploy.yml`
- Compose prod: `docker-compose.prod.yml`
- Guia completo (DNS, secrets, Traefik): [`docs/DEPLOY.md`](docs/DEPLOY.md)

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

Tabela `portfolio_items`:

- `name`, `description`, `image`
- `technologies` (JSON)
- `url_demo`, `url_github`
- `demo_user`, `demo_password`, `roles`
- `sort_order`

Os itens da home vêm dessa tabela via Server Components / API `GET /api/portfolio`.

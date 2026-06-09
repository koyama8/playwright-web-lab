# Playwright Web API Lab

Laboratório de QA Automation com Playwright, cobrindo testes web E2E, validações por API e apoio com PostgreSQL para preparação de massa de dados.

## Visão Geral

| Pasta | Objetivo | Stack principal |
| --- | --- | --- |
| `apps/zombieplus/api/` | API REST usada como backend da aplicação | Node.js, Express, Sequelize, PostgreSQL |
| `apps/zombieplus/web/` | Aplicação web ZombiePlus servida localmente | React build, Serve |
| `apps/zombieplus/docker-compose.yml` | Infra local de banco e PgAdmin | Docker, PostgreSQL, PgAdmin |
| `tests/e2e/` | Especificações dos testes automatizados | Playwright, JavaScript |
| `tests/support/` | Actions, fixtures, helpers de API e banco | Page Objects, APIRequestContext, PostgreSQL |

## O Que Foi Automatizado

- Login administrativo com sucesso e validações de campos obrigatórios.
- Cadastro de leads na fila de espera.
- Validação de lead com e-mail duplicado.
- Cadastro de filmes pelo painel administrativo.
- Validação de título de filme duplicado.
- Validação de campos obrigatórios no cadastro de filmes.
- Remoção de filme cadastrado.
- Preparação de massa via API antes dos testes web.
- Limpeza de massa diretamente no PostgreSQL quando necessário.

## Estrutura

```text
web-lab-QAKoyama/
|-- apps/
|   `-- zombieplus/
|       |-- api/
|       |   |-- src/
|       |   |   |-- app/
|       |   |   |-- config/
|       |   |   |-- database/
|       |   |   |-- app.js
|       |   |   |-- bootstrap.js
|       |   |   |-- routes.js
|       |   |   `-- server.js
|       |   |-- db.sh
|       |   |-- nodemon.json
|       |   |-- package.json
|       |   `-- package-lock.json
|       |-- web/
|       |   |-- build/
|       |   |-- package.json
|       |   `-- package-lock.json
|       `-- docker-compose.yml
|-- tests/
|   |-- e2e/
|   |   |-- leads.spec.js
|   |   |-- login.spec.js
|   |   `-- movies.spec.js
|   |-- support/
|   |   |-- actions/
|   |   |   |-- Components.js
|   |   |   |-- Leads.js
|   |   |   |-- Login.js
|   |   |   `-- Movies.js
|   |   |-- api/
|   |   |   `-- index.js
|   |   |-- fixtures/
|   |   |   `-- movies.json
|   |   |-- databse.js
|   |   `-- index.js
|-- playwright.config.js
|-- package.json
|-- package-lock.json
|-- .gitignore
`-- README.md
```

## Pré-requisitos

- Node.js e npm.
- Docker e Docker Compose.
- Navegadores do Playwright instalados.

Caso ainda não tenha os browsers do Playwright:

```bash
npx playwright install
```

## Variáveis de Ambiente da API

Crie o arquivo `apps/zombieplus/api/.env` com os dados do ambiente local:

```env
APP_NAME=ZombiePlus
NODE_ENV=development
PORT=3333
FRONT_URL=http://localhost:3000

DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASS=pwd123
DB_NAME=zombieplus
DB_SSL=false

SENTRY_DSN=
```

## Como Rodar

Antes de subir a infraestrutura, deixe o Docker Desktop aberto.

Instale as dependências do projeto principal:

```bash
npm install
```

Instale as dependências da API:

```bash
cd apps/zombieplus/api
npm install
```

Instale as dependências da aplicação web:

```bash
cd apps/zombieplus/web
npm install
```

Suba o banco de dados e o PgAdmin:

```bash
cd apps/zombieplus
docker-compose up -d
```

Prepare o banco da API:

```bash
cd apps/zombieplus/api
npx sequelize db:migrate
npx sequelize db:seed:all
```

Inicie a API em um terminal:

```bash
cd apps/zombieplus/api
npm run dev
```

Inicie a aplicação web em outro terminal:

```bash
cd apps/zombieplus/web
npm run dev
```

Execute os testes na raiz do projeto:

```bash
npx playwright test
```

Abra o relatorio HTML:

```bash
npx playwright show-report
```

## URLs Locais

| Serviço | URL |
| --- | --- |
| Web | `http://localhost:3000` |
| API | `http://localhost:3333` |
| PgAdmin | `http://localhost:16543` |
| PostgreSQL | `localhost:5433` |

## Suite de Testes

| Arquivo | Cobertura |
| --- | --- |
| `tests/e2e/login.spec.js` | Login administrativo e validações de autenticação |
| `tests/e2e/leads.spec.js` | Cadastro de leads e validações da fila de espera |
| `tests/e2e/movies.spec.js` | Cadastro, duplicidade, obrigatoriedade e remoção de filmes |

Suite atual: 14 cenários automatizados em Chromium.

## Observações

- Os testes usam a API para preparar massa de dados quando isso deixa o fluxo web mais rápido e estável.
- O helper de banco em `tests/support/databse.js` remove registros específicos antes de alguns cenários.
- O relatório do Playwright e os resultados de execução ficam em `playwright-report/` e `test-results/`, ambos ignorados pelo Git.

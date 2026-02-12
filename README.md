# API de Clientes (Node.js + Express + Sequelize + SQLite)

API REST para gerenciamento de clientes/leads de vendas, com CRUD completo e um relatório de funil que calcula comissão sobre o valor potencial de cada negócio.

---

## Visão geral

- **Objetivo**: centralizar cadastro de clientes/leads e gerar um resumo do funil (leads, propostas, fechados, valor e comissão).
- **Stack**: Node.js, Express, Sequelize, SQLite, dotenv.
- **Arquitetura**: MVC simples, com camadas bem separadas (`models`, `controllers`, `routes`, `database` e `server.js`).

---

## Estrutura

```text
src/
 ├── database/
 │    └── database.js       # configuração do Sequelize + SQLite
 ├── models/
 │    └── Cliente.js        # definição do model de cliente
 ├── controllers/
 │    └── clienteController.js
 ├── routes/
 │    └── clienteRoutes.js
 └── server.js              # ponto de entrada da aplicação
```

---

## Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
NODE_ENV=development
PORT=3000
DB_STORAGE=./database.sqlite
DB_LOGGING=false
```

### 3. Desenvolvimento

```bash
npm run dev
```

### 4. Produção (local ou servidor)

```bash
NODE_ENV=production npm start
```

O servidor escuta em `process.env.PORT` (ou `3000` por padrão).

---

## Endpoints principais

Base URL: `http://localhost:3000`

- **GET `/clientes`** – lista todos os clientes.
- **GET `/clientes/:id`** – retorna um cliente específico.
- **POST `/clientes`** – cria um cliente.
- **PUT `/clientes/:id`** – atualiza um cliente.
- **DELETE `/clientes/:id`** – remove um cliente.
- **GET `/relatorio`** – consolida dados do funil:
  - `totalLeads`
  - `totalPropostas`
  - `totalFechados`
  - `valorTotalFechado`
  - `comissaoTotal`

### Exemplo de criação de cliente

```json
{
  "nome": "Empresa Alfa",
  "email": "contato@alfa.com",
  "telefone": "11999999999",
  "status": "lead",
  "valorPotencial": 20000
}
```

---

## Regra de negócio

Para cada cliente, a comissão é calculada com base no valor potencial:

\[
\text{comissão} = \text{valorPotencial} \times 0{,}05
\]

- Na criação (`POST /clientes`), a comissão é calculada automaticamente.
- Na atualização (`PUT /clientes/:id`), se `valorPotencial` mudar, a comissão é recalculada.

---

## Tratamento de erros

- Rotas assíncronas usando `async/await` com `try/catch`.
- Respostas de erro padronizadas em JSON (por exemplo, `404` para não encontrado e `500` para erro interno).
- Middleware de erro no `server.js` como fallback.

---

## Deploy no Render (resumo)

1. Suba o código para um repositório no GitHub.
2. No Render, crie um **Web Service** a partir desse repositório.
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Em **Environment**, defina pelo menos:
   - `NODE_ENV=production`
   - `DB_LOGGING=false`
   - (opcional, mas recomendado) `DB_STORAGE=/var/data/database.sqlite`
5. Se quiser persistência de SQLite, crie um **Disk** no Render e monte em `/var/data`.

Depois do primeiro deploy, use a URL pública gerada pelo Render como base para consumir os endpoints.


# AnotaAqui - API 🚀

Back-end oficial do aplicativo **AnotaAqui**, desenvolvido para gerenciar requisições, autenticação de usuários, criptografia de dados e persistência no banco de dados distribuído da Cloudflare.

## 🛠️ Tecnologias Utilizadas

* **Node.js** com **TypeScript**
* **Express.js** (Framework para roteamento e manipulação de requisições)
* **Cloudflare D1 / SQLite** (Banco de dados relacional)
* **Bcrypt** (Criptografia e segurança de senhas)
* **JWT (JSON Web Token)** (Autenticação e controle de sessões)
* **Dotenv** (Gerenciamento de variáveis de ambiente)

## 📂 Estrutura de Pastas da API
    api/
    ├── src/
    │   ├── controllers/   # Lógica de controle das rotas
    │   ├── models/        # Modelos e interação com o banco de dados
    │   ├── routes/        # Definição dos endpoints da API
    │   ├── middlewares/   # Middlewares de autenticação e validação
    │   └── server.ts      # Ponto de entrada da aplicação
    ├── .env.example       # Exemplo de variáveis de ambiente
    ├── package.json
    └── tsconfig.json

## ⚙️ Pré-requisitos

Certifique-se de possuir em sua máquina:

-   Node.js (Versão 18+ recomendada)

-   Gerenciador de pacotes (npm, pnpm, yarn ou bun)

## 🚀 Como Configurar e Executar
### 1. Navegue até o diretório da API

Se estiver na raiz do monorepo:
Bash
```
cd apps/api
```
### 2. Instale as dependências
Bash
```
npm install
```
### 3. Configure as Variáveis de Ambiente

Crie um arquivo .env baseado no modelo de exemplo (.env.example):
Bash
```
cp .env.example .env
```
Abra o arquivo .env gerado e preencha as variáveis obrigatórias.

### 4. Executar em Ambiente de Desenvolvimento

Para rodar a API com hot-reload ativado:
Bash
```
npm run dev
```

## 🔒 Autenticação e Segurança

-   Senhas: Utilizam o algoritmo Bcrypt para hash seguro antes de serem persistidas no SQLite/D1.

-   Sessões: O acesso às rotas privadas é validado por meio de tokens JWT passados via cabeçalho de autorização (Bearer Token).
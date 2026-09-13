# AnotaAqui 📝

Um aplicativo moderno de anotações focado em privacidade, funcionamento *offline-first* e suporte a múltiplos tipos de notas com sistema de backup.

## 🎯 Sobre o Projeto

O **AnotaAqui** nasceu com o objetivo de proporcionar uma experiência fluida e segura para o gerenciamento de anotações do dia a dia. A aplicação foi pensada para rodar de forma totalmente independente no dispositivo do usuário (*offline-first*), garantindo acesso rápido e persistência local via IndexedDB, com recursos de sincronização e backup na nuvem por meio da API e infraestrutura da Cloudflare.

## 🚀 Tecnologias Utilizadas

### **Back-end (API)**
* **Node.js** com **TypeScript**
* **Express.js** (Framework web)
* **Cloudflare D1 / SQLite** (Banco de dados relacional distribuído)
* **Cloudflare** (Infraestrutura e deploy)
* **Bcrypt** & **JWT** (Segurança e autenticação)
* **Dotenv** (Gerenciamento de variáveis de ambiente)

### **Front-end (Web)** *(Em desenvolvimento)*
* **React** com **Vite** e **TypeScript**
* **Dexie.js** (Wrapper elegante para o IndexedDB — armazenamento offline)

## 📁 Estrutura do Monorepo

Este repositório utiliza o padrão de Monorepo, organizado da seguinte forma:
Plaintext

    anota-aqui/
    ├── api/         # Código-fonte do Back-end (Express + SQLite/D1)
    └── web/         # Código-fonte do Front-end (Vite + React + Dexie)
    └──README.md     # Documentação global do projeto

## ⚙️ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

-   Node.js (Versão 18+ recomendada)

-   Gerenciador de pacotes (npm, pnpm, yarn ou bun)

## 🛠️ Como Instalar e Rodar o Projeto
Como este é um projeto estruturado em monorepo com partes independentes (API e Web), a configuração, instalação de dependências e execução detalhada de cada ambiente devem ser consultadas diretamente em suas respectivas documentações:

### 1. Clonar o repositório
Bash

```
git clone [https://github.com/AsaphMoraes/anota-aqui.git](https://github.com/AsaphMoraes/anota-aqui.git)

cd anota-aqui
```

### 2. Configuração e Executação do Projeto
<p>🔧 Para configurar e rodar o Back-end (API): <a href=''>Acesse a Documentação da API.</a></p>

Frontend (Web) em desenvolvimento.

<!--<p>💻 Para configurar e rodar o Front-end (Web): <a href=''>Acesse a Documentação do Web.</a></p> -->

## 📌 Status do Projeto

    Global:
    [x] Arquitetura base do Monorepo

    API:
    [x] Configuração inicial da API (Node.js + TypeScript + Express)

    [x] Conexão com SQLite/D1 da Cloudflare

    [ ] Criação de Rotas.

    Web:
    [ ] Desenvolvimento da interface Web (Vite + React)

    [ ] Implementação do armazenamento Offline-first com Dexie.js

    [ ] Sistema de Backup e Sincronização
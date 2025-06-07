# KyoGo-api

KyoGo-api é o backend da aplicação KyoGo, desenvolvido com Node.js, TypeScript e Prisma, seguindo os princípios SOLID. Esta API fornece todos os endpoints necessários para o funcionamento do sistema de gerenciamento de academias.

## Funcionalidades

- Autenticação e autorização com JWT
- CRUD completo de academias
- Sistema de check-in com validação de localização
- Busca de academias por proximidade
- Gerenciamento de usuários e permissões
- Integração com banco de dados PostgreSQL

## Tecnologias utilizadas

![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-%232D3748.svg?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- PostgreSQL (pode ser executado via Docker)

## Instalação

Clone o repositório:

```bash
git clone https://github.com/gabislera/KyoGo-api.git
cd KyoGo-api
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Configure as variáveis de ambiente necessárias no arquivo `.env`.

## Execução

### Usando Docker Compose (Recomendado)

```bash
docker-compose up -d
```

### Execução Local

1. Inicie o banco de dados PostgreSQL (se não estiver usando Docker)
2. Execute as mirations do Prisma:

```bash
npx prisma migrate dev
```

3. Inicie o servidor:

```bash
npm run dev
# ou
yarn dev
```

O servidor estará disponível em [http://localhost:3333](http://localhost:3333).

## Variáveis de Ambiente

- `DATABASE_URL`: URL de conexão com o banco de dados PostgreSQL
- `JWT_SECRET`: Chave secreta para geração de tokens JWT
- `PORT`: Porta em que o servidor irá rodar (padrão: 3333)

## Build para Produção

```bash
npm run build
npm start
```

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

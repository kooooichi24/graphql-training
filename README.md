# GraphQL Training

This repository is a scaffold for GraphQL servers.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [npm](https://www.npmjs.com/)
- [Docker](https://docs.docker.com/engine/install/)

### Installation

1. Clone this repository

    ```sh
    git clone https://github.com/kooooichi24/graphql-training.git
    ```

2. Run `npm install` to install dependencies

    ```sh
    npm install
    ```

3. Create `.env` file and set the environment variables

    ```sh
    cp .env.example .env
    ```

4. Set up the database

    ```sh
    npm run docker:up
    ```

5. Generate Prisma client

    ```sh
    npm run prisma:generate
    ```

6. Migrate the database

    ```sh
    npm run prisma:migrate
    ```

7. Run `npm start` to start the GraphQL server

    ```sh
    npm start
    ```

8. Visit `http://localhost:3000/graphql` to access the GraphQL playground

### Usage

**Lint**
```sh
npm run lint
```

**Format**
```sh
npm run format
```

**Generate GraphQL code from schema**
```sh
npm run gql:codegen
```

**Generate documentation**
```sh
npm run gen:doc
```

**Prisma Studio**
```sh
npm run prisma:studio
```

## Roadmap

- [x] Build Apollo Server on Lambda
- [x] Schema First + [GraphQL Codegen](https://the-guild.dev/graphql/codegen)
- [x] Use mappers and defer resolve to prevent eager resolve
  
  see: [How to write GraphQL resolvers effectively](https://the-guild.dev/graphql/hive/blog/how-to-write-graphql-resolvers-effectively)

- [x] Pagination base on [Relay Connection specification](https://relay.dev/graphql/connections.htm)
  - [x] Forward pagination
  - [x] Backward pagination
- [x] [Dataloader](https://github.com/graphql/dataloader) to solve N+1 problem
- [x] [Global Object Specification](https://relay.dev/graphql/objectidentification.htm)
- [x] [GraphQL Schema Linter](https://the-guild.dev/graphql/eslint/docs)
- [x] Autogenerate static GraphQL API documentation by [spectaql](https://github.com/anvilco/spectaql)
  - [ ] TODO: Consider [graphql-docs](https://github.com/brettchalupa/graphql-docs)
- [x] Authentication
- [x] Authorization by [GraphQL Shield](https://the-guild.dev/graphql/shield)
- [x] Prevent too much sharing types

  See Sharing Types section of GraphQL Schema Design chapter at [Production Ready GraphQL](https://book.productionreadygraphql.com/).

- [x] Security
  - [x] [@graphile/depth-limit](https://github.com/graphile/depth-limit)
  - [x] [graphql-query-complexity](https://github.com/slicknode/graphql-query-complexity)
- [ ] Error Handling
- [ ] Write ADR
- [ ] Directory Structure
- [ ] Test strategy
- [ ] Cache
- [ ] Visualize schema by [graphql-voyager](https://github.com/graphql-kit/graphql-voyager)

  Abandoned because Express is required, and I don't want to include Express in the existing package.

## Technologies Used

- GraphQL Server (Apollo Server)
- Lambda
- TypeScript
- PostgreSQL
- Prisma

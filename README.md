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

5. Migrate the database

    ```sh
    npm run prisma:migrate
    ```

6. Run `npm start` to start the GraphQL server

    ```sh
    npm start
    ```

6. Visit `http://localhost:3000/graphql` to access the GraphQL playground

## Contents

- Basic GraphQL schema definition
- Query and mutation examples
- Resolver implementation
- GraphQL client integration

## Technologies Used

- GraphQL Server (Apollo Server)
- Lambda
- TypeScript
- PostgreSQL
- Prisma

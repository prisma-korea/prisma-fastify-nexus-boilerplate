# GraphQL Server with Fastify, Mercurius, Prisma, and Nexus Example

This repo shows how to build a GraphQL server with TypeScript and the following technologies:

- [**Fastify**](https://www.fastify.io/): Fast and low overhead web framework, for Node.js
- [**Mercurius**](https://mercurius.dev/): GraphQL adapter for Fastify
- [**Nexus**](https://nexusjs.org/): Declarative, Code-First GraphQL Schemas for JavaScript/TypeScript
- [**Prisma**](https://www.prisma.io/): Next-generation ORM for type-safe interaction with the database
- [**PostgreSQL**](https://www.postgresql.org/): powerful, open source object-relational database system with over 30 years of active development.
<!-- - [**Sentry**](https://sentry.io/): an error tracking and monitoring tool. -->
- [**Altair GraphQL**](https://altair.sirmuel.design/): GraphQL Web Client (similar to GraphQL Playground)

The project is written in TypeScript and attempts to maintain a high degree of type-safety by leveraging Prisma and GraphQL.

## Setup environment
1. cp `./dotenv/test.env` `./dotenv/.env`
2. Include `DATABASE_URL`
   ```
   DATABASE_URL="postgresql://<user>:<password>@<url>:5432/postgres?schema=<scheme>"
   ```
   > Note that you should change appropriate values in `user`, `password`, `url`, `scheme` fields. Or you can even use other database. More about [connection urls](https://www.prisma.io/docs/reference/database-connectors/connection-urls)
3. Running `yarn start` or `yarn dev` will load `env` from `dotenv/.env`.

## Generate Prisma Client and Nexus
```
yarn generate
```

## Migration

#### Init migration

1. Change models in `schema.prisma`.
   > Note that `prisma/migrations` dir is included in `.gitignore` in this repo but it should not be ignored in production.
2. Run migration script.
   > Note that this should be targeting the production database. Locally, you can just run `yarn db-push`.
   ```
   yarn migrate
   ```
3. Deploy migration to production.
   > Note you may want to run `yarn migrate:dev` beforhand to test your migration.
   ```
   yarn migrate:deploy
   ```

#### Create test user
```sh
➜  ~ createuser --interactive --pwprompt
Enter name of role to add: test
Enter password for new role: 
Enter it again: 
Shall the new role be a superuser? (y/n) y
```

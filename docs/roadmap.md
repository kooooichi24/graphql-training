## Roadmap

- [x] Build Apollo Server
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
- [ ] Monitoring
  - [ ] OpenTelemetry support
  - [ ] Health checks
- [ ] Error Handling
- [ ] Write ADR
- [ ] Directory Structure
- [ ] Test strategy
- [ ] Cache
- [ ] Visualize schema by [graphql-voyager](https://github.com/graphql-kit/graphql-voyager)

  Abandoned because Express is required, and I don't want to include Express in the existing package.
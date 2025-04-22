# Adopt Schema‑First GraphQL Approach with GraphQL Codegen

## Status

Proposed

## Context

Background and explanation of the problem that necessitated this decision.

## Decision

Adopt **Schema‑First GraphQL** with **[GraphQL Codegen](https://the-guild.dev/graphql/codegen)** as the single source of truth.  
We choose this approach because GraphQL Codegen delivers the best developer experience, generates strongly‑typed code for all our languages from one SDL file, and is the most stable, widely adopted tool in the ecosystem.

## Alternatives Considered

Other options that were considered, along with their advantages and disadvantages.

## Consequences

Impacts of this decision (both positive and negative).

## Related

* [npm trends: @graphql-codegen/typescript-resolvers vs @pothos/core vs nexus vs type-graphql](https://npmtrends.com/@graphql-codegen/typescript-resolvers-vs-@pothos/core-vs-nexus-vs-type-graphql)
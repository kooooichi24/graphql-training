# Use GraphQL Cursor Connections Specification

## Status

Proposed

## Context

The data volume in our primary schemas is expected to reach hundreds of thousands—or even millions—of records, making pagination an essential requirement.

Even if initial data volumes are low, retrofitting pagination later would introduce breaking changes for existing clients; therefore, pagination must be designed in from the very beginning.

Offset-based pagination degrades performance on deep pages and can yield duplicate or missing records under concurrent writes. Instead, we will adopt cursor-based pagination to ensure stable ordering and O(log n) performance.

## Decision

Adopt the **[GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm)**, as it is widely recognized as the standard best practice for implementing scalable cursor-based pagination in GraphQL APIs.

For further details, see the official specification.

## Alternatives Considered

| Alternative | Pros　| Cons |
|-|-|-|
| **Offset-based pagination**　| - Simple to implement<br>- Familiar to most SQL developers | - Performance degrades on deep pages<br>- Duplicate/missing records under concurrent writes<br>- Later migration is breaking |
| **Custom keyset without spec** | - Stable performance (keyset seeks)<br>- No external spec dependency | - Inconsistent API shapes across fields<br>- Lacks ecosystem tooling and community examples |
| **Hybrid (offset now, cursors later)** | - Lower initial complexity<br>- Faster time to prototype | - Dual paradigms confuse clients<br>- Inevitably incurs breaking change later |


## Consequences

**Positive Impacts**  

- **Apply best practices**: adopt a widely accepted specification to improve client compatibility and development productivity.

**Negative Impacts**

- **Initial complexity**: the initial implementation will be more complex than offset-based pagination.

## Related

- [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm)
- [GraphQL Best Practices | Pagination | Pagination and edges](https://graphql.org/learn/pagination/#pagination-and-edges)
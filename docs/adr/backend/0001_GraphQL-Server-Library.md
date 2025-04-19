# Adopt @apollo/server as the GraphQL Server Library

## Status

Proposed

## Context

We are building a GraphQL API in a Node.js + TypeScript environment. The team evaluated two leading server libraries—[`@apollo/server`](https://github.com/apollographql/apollo-server) and [`graphql-yoga`](https://github.com/dotansimha/graphql-yoga)—to determine which best fits our needs. We have no strict non-functional requirements (e.g., bundler size, plugin architecture) beyond stability and community support.

## Decision

We will adopt **`@apollo/server`** as our GraphQL server library.

Note: While this ADR opts for Apollo Server at present, we are not married to it. The official GraphQL Yoga documentation strongly recommends Yoga over Apollo Server; however, I cannot base our decision solely on Yoga’s claims of superiority. Since Apollo Server still enjoys higher download numbers, we have chosen to adopt Apollo Server for now. Of course, if you prefer GraphQL Yoga, you’re welcome to migrate at any time.

## Alternatives Considered

- **`@apollo/server`**  
  - **Pros:**  
    - Largest community adoption and GitHub star count among GraphQL server libraries  
    - Consistently high npm download figures, indicating active use in production  
    - Rich ecosystem of integrations (Apollo Federation, Apollo Studio, caching, tracing)  
    - First‑party TypeScript support and maintained type definitions  
  - **Cons:**  
    - Slightly higher bundle size compared to lighter‑weight alternatives  
    - Complexity of some advanced features may be overkill for simple schemas  

- **`graphql-yoga`**  
  - **Pros:**  
    - Minimalist setup with sensible defaults  
    - Built‑in support for schema stitching and subscriptions  
    - Lower baseline bundle size  
  - **Cons:**  
    - Smaller community and fewer stars/downloads than Apollo  
    - Less mature ecosystem for advanced tooling (e.g., performance tracing, federated schemas)  
    - TypeScript support requires additional configuration  

## Consequences


- **Positive:**  
  - We gain access to a mature, battle‑tested ecosystem and strong community support.  
  - Future integration with Apollo tooling (Federation, Studio) will be seamless.  
  - Type definitions come out of the box, reducing boilerplate and configuration overhead.

- **Negative:**  
  - The library footprint is larger than more minimal alternatives.  
  - Some features (e.g., Apollo Federation) will require learning additional concepts and configuration.


## Related

* [npm trends: @apollo/server vs graphql-yoga](https://npmtrends.com/@apollo/server-vs-graphql-yoga)
* [Comparison with other JavaScript GraphQL Server Libraries](https://the-guild.dev/graphql/yoga-server/docs/comparison)
# Introduce 'Errors as Data' pattern for GraphQL Error Handling

## Status

Proposed

## Context

The GraphQL specification designates an [errors array](https://spec.graphql.org/October2021/#sec-Errors) to represent errors that occurred during a request.

```json
{
  "data": {
    "checkout": null
  },
  "errors": [
    {
      "path": ["checkout"],
      "locations": [
        { "line": 3, "column": 5 }
      ],
      "message": "Failed to process checkout",
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "timestamp": "2024-10-29T10:00:00Z"
      }
    }
  ]
}
```

These top-level errors work well for certain types of errors but are less ideal for others. Top-level errors lack a specified structure and strong typing—key benefits of a GraphQL schema—which makes them less useful for clients.

Errors as data is an approach to error handling that includes error types as part of your GraphQL schema, and subsequently as part of the `data` object in the response payload. This approach allows clients to respond intelligently and provide a better end-user experience. It also enhances the developer experience via more maintainable code.

<details>

<summary>GraphQL authors also suggest Errors as Data pattern</summary>

> GraphQL errors encode exceptional scenarios - like a service being down or some other internal failure. Errors which are part of the API domain should be captured within that domain.
>
> [[RFC] Typed error #391](https://github.com/graphql/graphql-spec/issues/391#issuecomment-385553207)

> The data in the errors object is definitely typical for debugging. But of course the existence of an error could be used to render something in a UI about data not being available.
>
> My suggestion for the example you bring up here is to allow for data for a user-facing report in the payload of your mutation. It's often the case that mutation payloads include a "didSucceed" field and a "userError" field. If your UI requires rich information about potential errors, then you should include this information in your payload as well. For example, maybe you want to highlight the email field red, you might include something like a boolean "wasBadEmail".
>
> The general philosophy at play is that Errors are considered exceptional. Your user data should never be represented as an Error. If your users can do something that needs to provide negative guidance, then you should represent that kind of information in GraphQL as Data not as an Error. Errors should always represent either developer errors or exceptional circumstances (e.g. the database was offline).
>
> [Validations that cannot be ran on the client side and the errors object #117](https://github.com/graphql/graphql-spec/issues/117#issuecomment-170180628)

</details>

## Decision

We will adopt the 'Errors as Data' pattern for GraphQL error handling.

### When to use errors as data

Business errors (Domain errors) should be encoded as part of the `data` object.

For example, if a checkout mutation can't complete an order, the reasons why (insufficient stock, invalid payment method, shipping restrictions, version conflict of optimistic locking, etc.) would prompt different user experiences and next steps. To more easily differentiate the user experience, these errors should become part of the known response types within your schema.

### When to use top-level errors

System errors (Technical errors) should be encoded as part of the `errors` array.

In general, the `errors` array is reserved for system errors—those that would typically result in an HTTP 500 error. These errors are usually unexpected and can't be handled gracefully by the client. As a result, they should be logged and monitored on the server side, while the client should display a generic error message.

For example:

- Parsing / schema-validation errors
- Authentication failure
- Authorization failure
- Rate-limit breach
- Server crashes
- Unhandled exceptions
- Exhausted resources (for example, memory or CPU)

### How to implement errors as data

The errors as data pattern uses **union types** to represent different response scenarios. Union types allow a single field to return one of several types, thus ideal for managing success and error cases. This technique helps developers create flexible and expressive APIs that handle different scenarios efficiently.


```graphql
input CheckoutInput {
  paymentMethod: ID!
}

union CheckoutPayload =
    Order
  | InsufficientStockError
  | InvalidPaymentMethodError
  | OptimisticLockError

type Mutation {
  checkout(input: CheckoutInput!): CheckoutPayload
}

type Order {
  id: ID!
  items: [OrderItem!]!
  totalPrice: Float!
  status: String!
}

type OrderItem {
  id: ID!
  product: Product!
  quantity: Int!
  price: Float!
}

type Product {
  id: ID!
  name: String!
  price: Float!
}

interface BusinessError {
  message: String!
}

type InsufficientStockError implements BusinessError {
  message: String!
  product: Product!
  availableStock: Int!
}

type InvalidPaymentMethodError implements BusinessError {
  message: String!
  paymentMethod: ID!
}

type OptimisticLockError implements BusinessError {
  message: String!
}
```

## Alternatives Considered

The most well-known alternative is the [Error Union List + Interface](https://productionreadygraphql.com/2020-08-01-guide-to-graphql-errors#:~:text=Stage%206a%3A%20Error%20Union%20List%20%2B%20Interface) pattern.

```graphql
type Mutation {
  checkoutOrder(input: CheckoutInput!): CheckoutPayload
}

union CheckoutUserError = InsufficientStockError | InvalidPaymentMethodError | OptimisticLockError

type CheckoutPayload {
  order: Order
  userErrors: [CheckoutUserError!]!
}
```

### Advantages

- **Supports multiple errors at once:** Because `userErrors` is an array, you can return several validation problems in a single response—ideal for complex forms.
  - However, by defining a wrapper type—e.g., ValidationErrors that contains an array of field errors—you can still return multiple validation errors even when using a result-type union.
- **High backward-compatibility:** Even after a new error type is added to the union, older clients keep working—the list just contains one more element, so the **build** doesn’t break.
  - Note: “High backward-compatibility” does not mean “guaranteed safety.”
    It simply means that adding a new error type won’t break the existing schema at compile time, so an older client might continue to run without a rebuild. This property is particularly useful when you distribute an SDK or other pre-built client libraries. 
    However, if the GraphQL client lacks a generic fallback handler, receiving an unknown error type can still trigger a runtime crash. Whichever pattern you adopt, the application is crash-resistant only when you implement a robust, generic fallback.
- **Relay compatibility:** It is easy to migrate to tools such as Relay in the future because `…Payload { userErrors }` is a Relay-compliant format.

### Disadvantages

- **Possible “impossible states”:** The schema allows `user` and `userErrors` to both be non-null, so developers must enforce the rule “either data or errors” in code.
- **Harder to enforce exhaustive type-safety:** The `userErrors` array can be ignored altogether and the code will still type-check, so an exhaustive `switch(__typename)`—which is mandatory with a direct union response—is not enforced automatically. Unless developers explicitly add a `switch` inside the loop, error cases can easily be missed.
- **A payload wrapper and fixed fields are always required:** To remain Relay-compatible, each mutation has to use a two-layer wrapper—`XxxPayload { … userErrors }`. This introduces deeper nesting and more boilerplate in the schema than a result-type union.
- **Array overhead for single-error cases:** Even when only one error is possible (e.g., optimistic-lock failure), callers must still unwrap the list.

### References

See [A Guide to GraphQL Errors](https://productionreadygraphql.com/2020-08-01-guide-to-graphql-errors) blog for detail information.

## Consequences

Impacts of this decision (both positive and negative).

### Positive

- **Improved type safety:** Because all business errors are explicitly declared in the schema through unions or interfaces, the client can write a static `switch`/`match` on `__typename`. This lets the build process catch any unhandled cases and reduces the likelihood of runtime exceptions. 
- **Non-Null guarantee:** Because the result is returned as a union type, the field itself can be declared Non-Null—e.g., `checkout: CheckoutPayload!`. A payload is always delivered whether the operation succeeds or fails, so the `data` field never has to be `null` as in the top-level-errors approach. This eliminates most client-side `null` checks and further improves type safety and code readability.
- **Clear monitoring and alerting:** Because system errors are still reported in the top-level errors array, tools such as APM or Sentry can follow a two-step monitoring strategy: first watch the errors count, and if it remains at zero, move on to inspect business-logic metrics.

### Negative

- **Not Relay-compatible:** The response is a union, not an object payload, so it cannot be consumed by Relay clients.

## References

- [GraphQL Specification | Errors](https://spec.graphql.org/October2021/#sec-Errors)
- [A Guide to GraphQL Errors](https://productionreadygraphql.com/2020-08-01-guide-to-graphql-errors)
- [Production Ready GraphQL](https://book.productionreadygraphql.com/)
- [Apollo Server | Error handling](https://www.apollographql.com/docs/apollo-server/data/errors)
- [Apollo Server | Errors as Data](https://www.apollographql.com/docs/graphos/schema-design/guides/errors-as-data-explained)
- [Shopify Admin GraphQL API](https://shopify.dev/docs/api/admin-graphql/latest)

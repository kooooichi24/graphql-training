import type { Connection, EncodeCursor } from './types';

export function toConnection<T>(
  nodes: T[],
  encodeCursor: EncodeCursor<T>,
  cursorPaginationParams: {
    after: string | undefined;
    before: string | undefined;
    first: number | undefined;
    last: number | undefined;
  },
): Connection<T> {
  const { after, before, first, last } = cursorPaginationParams;

  const slicedNodes =
    (first !== undefined && nodes.length > first) || (last !== undefined && nodes.length > last)
      ? nodes.slice(1)
      : nodes;
  const edges = slicedNodes.map((node) => ({
    node,
    cursor: encodeCursor(node),
  }));

  const startCursor = edges.length > 0 ? edges[0].cursor : null;
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
  const hasNextPage =
    (first !== undefined && nodes.length > first) || (last !== undefined && nodes.length > last);
  const hasPreviousPage =
    after !== undefined ||
    (before !== undefined && last !== undefined) ||
    (first !== undefined && nodes.length > (first ?? 0));

  return {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor,
    },
  };
}

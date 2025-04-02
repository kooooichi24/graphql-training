import type { PageInfo } from '../../graphql/types.generated';

export type Edge<T> = {
  node: T;
  cursor: string;
};

export type Connection<T> = {
  edges: Edge<T>[];
  pageInfo: PageInfo;
};

export type EncodeCursor<T> = (node: T) => string;

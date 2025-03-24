import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import type { z } from 'zod';
import type { PageInfo } from './types.generated';

export const MAX_PAGINATION_ITEMS = 300;

export type Edge<T> = {
  node: T;
  cursor: string;
};

export type Connection<T> = {
  edges: Edge<T>[];
  pageInfo: PageInfo;
};

export type EncodeCursor<T> = (node: T) => string;

/**
 * ページネーションカーソルのユーティリティを作成するファクトリ関数
 * 特定のスキーマに対応したエンコード・デコード関数のセットを返します
 */
export function createPaginationCursor<T extends z.ZodType>(schema: T) {
  type CursorData = z.infer<T>;

  /**
   * カーソルデータをBase64エンコードされた文字列に変換
   */
  const encodeCursor: EncodeCursor<CursorData> = (data: CursorData): string => {
    const jsonStr = JSON.stringify(data);
    return Buffer.from(jsonStr).toString('base64');
  };

  /**
   * Base64エンコードされたカーソル文字列をデコードしてデータを返す
   * 無効なカーソルの場合はGraphQLErrorをスロー
   */
  const decodeCursor = (cursor: string): CursorData => {
    try {
      const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
      const data = JSON.parse(decoded);
      return schema.parse(data);
    } catch (error) {
      throw new GraphQLError('Invalid cursor format. Please specify correct cursor value.', {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      });
    }
  };

  /**
   * エンティティからカーソルデータを生成する関数を作成
   */
  const createCursorEncoder = <T>(extractor: (node: T) => CursorData): EncodeCursor<T> => {
    return (entity: T): string => {
      const cursorData = extractor(entity);
      return encodeCursor(cursorData);
    };
  };

  return {
    decodeCursor,
    createCursorEncoder,
  };
}

export function toConnection<T>(
  nodes: T[],
  encodeCursor: EncodeCursor<T>,
  queryParams?: {
    after?: string;
    before?: string;
    first?: number;
    last?: number;
  },
): Connection<T> {
  const slicedNodes = nodes.slice(0, queryParams?.first ?? nodes.length);
  const edges = slicedNodes.map((node) => ({
    node,
    cursor: encodeCursor(node),
  }));

  const startCursor = edges.length > 0 ? edges[0].cursor : null;
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
  const hasNextPage = queryParams?.first !== undefined && nodes.length > (queryParams.first ?? 0);
  const hasPreviousPage =
    queryParams?.after !== undefined ||
    (queryParams?.before !== undefined && queryParams?.last !== undefined);

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

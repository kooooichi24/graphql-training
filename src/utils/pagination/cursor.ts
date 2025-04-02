import type { z } from 'zod';
import { EncodeCursor } from './types';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/dist/esm/errors';

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
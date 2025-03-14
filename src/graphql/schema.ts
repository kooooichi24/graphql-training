import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolvers } from './resolvers.js';
import {
  DateTimeResolver,
  EmailAddressResolver,
  NonEmptyStringResolver,
  UUIDResolver,
} from 'graphql-scalars';

// ESモジュールで__dirnameを使用するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// GraphQLスキーマファイルを読み込む
const typeDefs = loadSchemaSync(join(__dirname, 'schemas', '**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

// スカラー型のリゾルバーを追加
const customResolvers = {
  ...resolvers,
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  NonEmptyString: NonEmptyStringResolver,
  UUID: UUIDResolver,
};

// スキーマとリゾルバーを結合して実行可能なスキーマを作成
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: customResolvers,
});

export { schema };

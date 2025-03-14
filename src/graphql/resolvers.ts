import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// GraphQLスキーマファイルを読み込む
const resolversArray = loadFilesSync(join(__dirname, '**/*.resolvers.graphql'));

// リゾルバーを結合
const resolvers = mergeResolvers(resolversArray);

export { resolvers };

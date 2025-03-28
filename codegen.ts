import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/**/*.graphql',
  generates: {
    'src/graphql': defineConfig({
      typesPluginsConfig: {
        contextType: '../context#Context',
      },
    }),
  },
  hooks: {
    afterAllFileWrite: ['npm run format', 'npm run fix'],
  },
};

export default config;

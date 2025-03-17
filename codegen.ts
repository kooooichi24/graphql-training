import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/**/*.graphql',
  generates: {
    './src/graphql-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: './context#Context',
        scalars: {
          DateTime: 'Date',
          EmailAddress: 'string',
          NonEmptyString: 'string',
          UUID: 'string',
        },
      },
    },
  },
};

export default config;

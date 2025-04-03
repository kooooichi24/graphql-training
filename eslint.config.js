const graphqlPlugin = require('@graphql-eslint/eslint-plugin');

module.exports = [
  {
    ignores: ['.serverless/**', 'node_modules/**', 'dist/**'],
  },
  {
    // Setup GraphQL Parser
    files: ['**/*.{graphql,graphqls,gql}'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
  },
  {
    // Setup all config for schema files
    files: ['**/*.{graphql,graphqls,gql}'],
    rules: {
      /** flat/schema-all */
      ...graphqlPlugin.configs['flat/schema-all'].rules,
      '@graphql-eslint/alphabetize': 'off',
      '@graphql-eslint/no-root-type': 'off',
      '@graphql-eslint/require-field-of-type-query-in-mutation-result': 'off',
      '@graphql-eslint/require-description': [
        'error',
        {
          types: true,
          ignoredSelectors: [
            '[type=ObjectTypeDefinition][name.value=/Connection$/]',
            '[type=ObjectTypeDefinition][name.value=/Edge$/]',
            '[type=ObjectTypeDefinition][name.value=Mutation]',
            '[type=ObjectTypeDefinition][name.value=Query]',
            '[type=ObjectTypeDefinition][name.value=Subscription]',
          ],
        },
      ],
      '@graphql-eslint/require-nullable-result-in-root': 'off',
      '@graphql-eslint/strict-id-in-types': [
        'error',
        {
          exceptions: {
            types: ['PageInfo'],
            suffixes: ['Connection', 'Edge'],
          },
        },
      ],
      /** flat/schema-relay */
      ...graphqlPlugin.configs['flat/schema-relay'].rules,
      // Reason: To use NonNegativeInt for first and last pagination arguments.
      // TODO: Create own custom rules with reference to @graphql-eslint/relay-arguments.
      '@graphql-eslint/relay-arguments': 'off',
    },
  },
];

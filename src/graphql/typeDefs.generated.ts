import type { DocumentNode } from 'graphql';
export const typeDefs = {
  kind: 'Document',
  definitions: [
    {
      kind: 'ObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value:
          'An object representing pagination information.\nUsed in cursor-based pagination based on the GraphQL Relay specification.\nThis object provides information for efficiently navigating through result sets.\n\n@see [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm)',
        block: true,
      },
      name: { kind: 'Name', value: 'PageInfo' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value:
              '`hasNextPage` is used to indicate whether more edges exist following the set defined by the clients arguments.\nIf the client is paginating with `first`/`after`, then the server must return **true** if further edges exist, otherwise **false**.\nIf the client is paginating with `last`/`before`, then the client may return **true** if edges further from `before` exist, if it can do so efficiently, otherwise may return **false**.',
            block: true,
          },
          name: { kind: 'Name', value: 'hasNextPage' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value:
              '`hasPreviousPage` is used to indicate whether more edges exist prior to the set defined by the clients arguments.\nIf the client is paginating with `last`/`before`, then the server must return **true** if prior edges exist, otherwise **false**.\nIf the client is paginating with first/after, then the client may return **true** if edges prior to `after` exist, if it can do so efficiently, otherwise may return **false**.',
            block: true,
          },
          name: { kind: 'Name', value: 'hasPreviousPage' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The cursor of the first edge in the set.',
            block: true,
          },
          name: { kind: 'Name', value: 'startCursor' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The cursor of the last edge in the set.',
            block: true,
          },
          name: { kind: 'Name', value: 'endCursor' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
      ],
    },
    { kind: 'ScalarTypeDefinition', name: { kind: 'Name', value: 'DateTime' }, directives: [] },
    { kind: 'ScalarTypeDefinition', name: { kind: 'Name', value: 'EmailAddress' }, directives: [] },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'NonEmptyString' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'NonNegativeInt' },
      directives: [],
    },
    { kind: 'ScalarTypeDefinition', name: { kind: 'Name', value: 'UUID' }, directives: [] },
    {
      kind: 'ObjectTypeDefinition',
      description: { kind: 'StringValue', value: 'This object represents a team.', block: true },
      name: { kind: 'Name', value: 'Team' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The identifier of the team.', block: true },
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The name of the team.', block: true },
          name: { kind: 'Name', value: 'name' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonEmptyString' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The description of the team.', block: true },
          name: { kind: 'Name', value: 'description' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The members of the team.', block: true },
          name: { kind: 'Name', value: 'members' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The number of items to forward paginate (used with after).',
                block: true,
              },
              name: { kind: 'Name', value: 'first' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The cursor to start the pagination from.',
                block: true,
              },
              name: { kind: 'Name', value: 'after' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserConnection' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'TeamEdge' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'node' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Team' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'cursor' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'TeamConnection' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'edges' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'TeamEdge' } },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'pageInfo' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PageInfo' } },
          },
          directives: [],
        },
      ],
    },
    {
      name: { kind: 'Name', value: 'Query' },
      kind: 'ObjectTypeDefinition',
      fields: [
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'Returns a list of teams.', block: true },
          name: { kind: 'Name', value: 'teams' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The number of items to forward paginate (used with after).\n\nMaximum: 500',
                block: true,
              },
              name: { kind: 'Name', value: 'first' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The cursor to start the pagination from.',
                block: true,
              },
              name: { kind: 'Name', value: 'after' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'TeamConnection' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'Returns a team by ID.', block: true },
          name: { kind: 'Name', value: 'team' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The identifier of the team.',
                block: true,
              },
              name: { kind: 'Name', value: 'id' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Team' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Returns a list of users.\n\nIt is not possible to get users of other tenants.',
            block: true,
          },
          name: { kind: 'Name', value: 'users' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The number of items to forward paginate (used with after).\n\nMaximum: 500',
                block: true,
              },
              name: { kind: 'Name', value: 'first' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The cursor to start the pagination from.',
                block: true,
              },
              name: { kind: 'Name', value: 'after' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserConnection' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Returns a user by ID.\n\nIt is not possible to get users of other tenants.',
            block: true,
          },
          name: { kind: 'Name', value: 'user' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The ID of the user to return.',
                block: true,
              },
              name: { kind: 'Name', value: 'id' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      name: { kind: 'Name', value: 'Mutation' },
      kind: 'ObjectTypeDefinition',
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'createTeam' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'name' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonEmptyString' } },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'description' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Team' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'updateTeam' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'id' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'name' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonEmptyString' } },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'description' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Team' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'deleteTeam' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'id' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Team' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'Creates a user.', block: true },
          name: { kind: 'Name', value: 'createUser' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateUserInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserOutput' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'Updates a user.', block: true },
          name: { kind: 'Name', value: 'updateUser' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateUserInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserOutput' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'Deletes a user.', block: true },
          name: { kind: 'Name', value: 'deleteUser' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'DeleteUserInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserOutput' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'Adds a user to a team.', block: true },
          name: { kind: 'Name', value: 'addUserToTeam' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddUserToTeamInput' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserOutput' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'Removes a user from a team.', block: true },
          name: { kind: 'Name', value: 'removeUserFromTeam' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'RemoveUserFromTeamInput' },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserOutput' } },
          },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      description: { kind: 'StringValue', value: 'This object represents a user.', block: true },
      name: { kind: 'Name', value: 'User' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The identifier of the user.', block: true },
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The name of the user.', block: true },
          name: { kind: 'Name', value: 'name' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonEmptyString' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The email address of the user.',
            block: true,
          },
          name: { kind: 'Name', value: 'email' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EmailAddress' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The teams to which the user belongs.',
            block: true,
          },
          name: { kind: 'Name', value: 'teams' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The number of items to forward paginate (used with after).\n\nMaximum: 500',
                block: true,
              },
              name: { kind: 'Name', value: 'first' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The cursor to start the pagination from.',
                block: true,
              },
              name: { kind: 'Name', value: 'after' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'TeamConnection' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'UserEdge' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'node' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'cursor' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'UserConnection' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'edges' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserEdge' } },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'pageInfo' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PageInfo' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'This object represents the mutation response to the user.',
        block: true,
      },
      name: { kind: 'Name', value: 'UserOutput' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The identifier of the user.', block: true },
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'This input represents the input to create a user.',
        block: true,
      },
      name: { kind: 'Name', value: 'CreateUserInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The name of the user.', block: true },
          name: { kind: 'Name', value: 'name' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonEmptyString' } },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'The email address of the user.',
            block: true,
          },
          name: { kind: 'Name', value: 'email' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EmailAddress' } },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'The ID of the team to which the user belongs.',
            block: true,
          },
          name: { kind: 'Name', value: 'teamId' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'This input represents the input to update a user.',
        block: true,
      },
      name: { kind: 'Name', value: 'UpdateUserInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The ID of the user to update.', block: true },
          name: { kind: 'Name', value: 'id' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The name of the user.', block: true },
          name: { kind: 'Name', value: 'name' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonEmptyString' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'The email address of the user.',
            block: true,
          },
          name: { kind: 'Name', value: 'email' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'EmailAddress' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'The ID of the team to which the user belongs.',
            block: true,
          },
          name: { kind: 'Name', value: 'teamId' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'This input represents the input to delete a user.',
        block: true,
      },
      name: { kind: 'Name', value: 'DeleteUserInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The ID of the user to delete.', block: true },
          name: { kind: 'Name', value: 'id' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'AddUserToTeamInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'The ID of the user to add to the team.',
            block: true,
          },
          name: { kind: 'Name', value: 'userId' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'The ID of the team to add the user to.',
            block: true,
          },
          name: { kind: 'Name', value: 'teamId' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: { kind: 'Name', value: 'RemoveUserFromTeamInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'The ID of the user to remove from the team.',
            block: true,
          },
          name: { kind: 'Name', value: 'userId' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'The ID of the team to remove the user from.',
            block: true,
          },
          name: { kind: 'Name', value: 'teamId' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'SchemaDefinition',
      operationTypes: [
        {
          kind: 'OperationTypeDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Query' } },
          operation: 'query',
        },
        {
          kind: 'OperationTypeDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Mutation' } },
          operation: 'mutation',
        },
      ],
    },
  ],
} as unknown as DocumentNode;

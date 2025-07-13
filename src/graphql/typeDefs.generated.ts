import type { DocumentNode } from 'graphql';
export const typeDefs = {
  kind: 'Document',
  definitions: [
    {
      kind: 'InterfaceTypeDefinition',
      description: {
        kind: 'StringValue',
        value:
          'An interface for objects with a Globally Unique ID.\n\n@see https://graphql.org/learn/global-object-identification/',
        block: true,
      },
      name: { kind: 'Name', value: 'Node' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The ID of the object.', block: true },
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
          description: {
            kind: 'StringValue',
            value: 'Fetches an object given its ID.',
            block: true,
          },
          name: { kind: 'Name', value: 'node' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              description: { kind: 'StringValue', value: 'The ID of the object.', block: true },
              name: { kind: 'Name', value: 'id' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
              },
              directives: [],
            },
          ],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Node' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Returns a list of teams sorted by name.',
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
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
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
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The number of items to backward paginate (used with before).\n\nMaximum: 500',
                block: true,
              },
              name: { kind: 'Name', value: 'last' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The cursor to start the pagination from.',
                block: true,
              },
              name: { kind: 'Name', value: 'before' },
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
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
            value:
              'Returns a list of users sorted by name.\n\nIt is not possible to get users of other tenants.',
            block: true,
          },
          name: { kind: 'Name', value: 'users' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The number of items to forward paginate (used with after).\n\nMaximum: 500\nDefault: 250 (If first or last is not specified)',
                block: true,
              },
              name: { kind: 'Name', value: 'first' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
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
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The number of items to backward paginate (used with before).\n\nMaximum: 500',
                block: true,
              },
              name: { kind: 'Name', value: 'last' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The cursor to start the pagination from.',
                block: true,
              },
              name: { kind: 'Name', value: 'before' },
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
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
    {
      kind: 'ScalarTypeDefinition',
      description: {
        kind: 'StringValue',
        value: '@see https://the-guild.dev/graphql/scalars/docs/scalars/email-address',
        block: true,
      },
      name: { kind: 'Name', value: 'EmailAddress' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      description: {
        kind: 'StringValue',
        value: '@see https://the-guild.dev/graphql/scalars/docs/scalars/non-empty-string',
        block: true,
      },
      name: { kind: 'Name', value: 'NonEmptyString' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      description: {
        kind: 'StringValue',
        value: '@see https://the-guild.dev/graphql/scalars/docs/scalars/non-negative-int',
        block: true,
      },
      name: { kind: 'Name', value: 'NonNegativeInt' },
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'This input represents the input to create a team.',
        block: true,
      },
      name: { kind: 'Name', value: 'CreateTeamInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The name of the team.', block: true },
          name: { kind: 'Name', value: 'name' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonEmptyString' } },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The description of the team.', block: true },
          name: { kind: 'Name', value: 'description' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'This input represents the input to update a team.',
        block: true,
      },
      name: { kind: 'Name', value: 'UpdateTeamInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The identifier of the team.', block: true },
          name: { kind: 'Name', value: 'id' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The name of the team.', block: true },
          name: { kind: 'Name', value: 'name' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonEmptyString' } },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The description of the team.', block: true },
          name: { kind: 'Name', value: 'description' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'This input represents the input to delete a team.',
        block: true,
      },
      name: { kind: 'Name', value: 'DeleteTeamInput' },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          description: { kind: 'StringValue', value: 'The identifier of the team.', block: true },
          name: { kind: 'Name', value: 'id' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          directives: [],
        },
      ],
    },
    {
      name: { kind: 'Name', value: 'Mutation' },
      kind: 'ObjectTypeDefinition',
      fields: [
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'Creates a team.', block: true },
          name: { kind: 'Name', value: 'createTeam' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateTeamInput' } },
              },
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
          description: { kind: 'StringValue', value: 'Updates a team.', block: true },
          name: { kind: 'Name', value: 'updateTeam' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateTeamInput' } },
              },
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
          description: { kind: 'StringValue', value: 'Deletes a team.', block: true },
          name: { kind: 'Name', value: 'deleteTeam' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'input' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'DeleteTeamInput' } },
              },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
          },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      description: { kind: 'StringValue', value: 'This object represents a team.', block: true },
      name: { kind: 'Name', value: 'Team' },
      interfaces: [{ kind: 'NamedType', name: { kind: 'Name', value: 'Node' } }],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The identifier of the team.', block: true },
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
          description: {
            kind: 'StringValue',
            value: 'The members of the team.\n\nThe list is sorted by name.',
            block: true,
          },
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
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
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
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The number of items to backward paginate (used with before).\n\nMaximum: 500',
                block: true,
              },
              name: { kind: 'Name', value: 'last' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The cursor to start the pagination from.',
                block: true,
              },
              name: { kind: 'Name', value: 'before' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'TeamMemberConnection' } },
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
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'TeamMemberEdge' },
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
      name: { kind: 'Name', value: 'TeamMemberConnection' },
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
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'TeamMemberEdge' } },
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
          description: { kind: 'StringValue', value: 'The role of the user.', block: true },
          name: { kind: 'Name', value: 'role' },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Role' } },
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
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
          description: { kind: 'StringValue', value: 'The role of the user.', block: true },
          name: { kind: 'Name', value: 'role' },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Role' } },
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
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'This input represents the input to add a user to a team.',
        block: true,
      },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'InputObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'This input represents the input to remove a user from a team.',
        block: true,
      },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'EnumTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'The role of the user.\n\n- `USER`: A regular user.\n- `ADMIN`: An admin user.',
        block: true,
      },
      name: { kind: 'Name', value: 'Role' },
      directives: [],
      values: [
        { kind: 'EnumValueDefinition', name: { kind: 'Name', value: 'USER' }, directives: [] },
        { kind: 'EnumValueDefinition', name: { kind: 'Name', value: 'ADMIN' }, directives: [] },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      description: { kind: 'StringValue', value: 'This object represents a user.', block: true },
      name: { kind: 'Name', value: 'User' },
      interfaces: [{ kind: 'NamedType', name: { kind: 'Name', value: 'Node' } }],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          description: { kind: 'StringValue', value: 'The identifier of the user.', block: true },
          name: { kind: 'Name', value: 'id' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
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
          description: { kind: 'StringValue', value: 'The role of the user.', block: true },
          name: { kind: 'Name', value: 'role' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Role' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The teams to which the user belongs.\n\nThe list is sorted by name.',
            block: true,
          },
          name: { kind: 'Name', value: 'teams' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The number of items to forward paginate (used with after).\n\nMaximum: 500\nDefault: 250 (If first or last is not specified)',
                block: true,
              },
              name: { kind: 'Name', value: 'first' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
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
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The number of items to backward paginate (used with before).\n\nMaximum: 500',
                block: true,
              },
              name: { kind: 'Name', value: 'last' },
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonNegativeInt' } },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value: 'The cursor to start the pagination from.',
                block: true,
              },
              name: { kind: 'Name', value: 'before' },
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

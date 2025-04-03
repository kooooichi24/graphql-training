import {
  EmailAddressResolver,
  NonEmptyStringResolver,
  NonNegativeIntResolver,
} from 'graphql-scalars';

export const scalarResolvers = {
  EmailAddress: EmailAddressResolver,
  NonEmptyString: NonEmptyStringResolver,
  NonNegativeInt: NonNegativeIntResolver,
};

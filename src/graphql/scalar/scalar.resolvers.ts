import {
  DateTimeResolver,
  EmailAddressResolver,
  NonEmptyStringResolver,
  UUIDResolver,
} from 'graphql-scalars';

export const scalarResolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  NonEmptyString: NonEmptyStringResolver,
  UUID: UUIDResolver,
};

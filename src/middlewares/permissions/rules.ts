import { rule } from 'graphql-shield';
import type { Context } from '../../context';

export const isAdmin = rule({ cache: 'contextual' })(async (_parent, _args, ctx: Context) => {
  return ctx.user.role === 'ADMIN';
});

export const isUser = rule({ cache: 'contextual' })(async (_parent, _args, ctx: Context) => {
  return ctx.user.role === 'USER';
});

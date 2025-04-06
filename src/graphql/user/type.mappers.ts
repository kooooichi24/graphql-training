import type { Role } from '../types.generated';

export interface UserMapper {
  id: string;
  name: string;
  email: string;
  role: Role;
}

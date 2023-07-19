import { User } from '@prisma/client';

export type NewUserDto = Omit<User, 'id' | 'role'>;

export type UserDto = Omit<User, 'password'>;

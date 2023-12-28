/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constants';

export interface TUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export type TUserLoginCredentials = {
  username: string;
  password: string;
};

export interface UserMethod extends Model<TUser> {
  existingUser(username: string): Promise<TUser>;
  doesPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

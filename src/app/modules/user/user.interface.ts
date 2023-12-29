/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constants';

export type TPasswordChange = {
  timestamp: Date;
  password: string;
};

export type TPasswordChangePayload = {
  currentPassword: string;
  newPassword: string;
};

export interface TUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  passwordHistory?: TPasswordChange[];
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

  updatePassword(
    id: Types.ObjectId,
    newPassword: string,
  ): Promise<Document | null>;
}

export type TUserRole = keyof typeof USER_ROLE;

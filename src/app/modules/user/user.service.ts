import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import {
  TPasswordChangePayload,
  TUser,
  TUserLoginCredentials,
} from './user.interface';
import { UserModel } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Response } from 'express';

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const userLoginService = async (payload: TUserLoginCredentials) => {
  const { username, password } = payload;
  const existingUser = await UserModel.existingUser(username);

  if (!existingUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'There is no user with this username',
    );
  }

  if (!(await UserModel.doesPasswordMatch(password, existingUser.password))) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Incorrect password',
      "Password doesn't match!",
    );
  }

  const jwtPayload = {
    _id: existingUser._id,
    role: existingUser.role,
    email: existingUser.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.access_token_expiration as string,
  );

  return { user: existingUser, token: accessToken };
};

const changePassword = async (
  payload: TPasswordChangePayload,
  user: JwtPayload,
  res: Response,
) => {
  const { currentPassword, newPassword } = payload;

  const { _id } = user;

  const existingUser = await UserModel.findById(_id).select(
    '+password +passwordHistory -createdAt -updatedAt',
  );

  if (!existingUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    );
  }

  const doesPasswordMatch = await UserModel.doesPasswordMatch(
    currentPassword,
    existingUser.password,
  );

  if (!doesPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Incorrect Password!',
      'Current password do not match!',
    );
  }

  const passwordHistory = existingUser.passwordHistory;

  const isPasswordInHistory = passwordHistory?.find((history) => {
    return bcrypt.compareSync(newPassword, history.password);
  });

  if (isPasswordInHistory) {
    const formattedTime = isPasswordInHistory.timestamp
      .toLocaleString()
      .replace(',', ' at');

    res.status(400).json({
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedTime}).`,
      data: null,
    });
    return;
  }

  const newHashedPassword = bcrypt.hashSync(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await UserModel.updatePassword(_id, newHashedPassword);

  return result;
};

export const UserServices = {
  createUserIntoDB,
  userLoginService,
  changePassword,
};

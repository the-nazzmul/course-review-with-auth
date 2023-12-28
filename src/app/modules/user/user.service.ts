import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser, TUserLoginCredentials } from './user.interface';
import { UserModel } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';

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

  console.log(config.access_token_expiration);
  // const decode = verifyToken(accessToken, config.jwt_access_token as string);

  return { user: existingUser, token: accessToken };
};

export const UserServices = {
  createUserIntoDB,
  userLoginService,
};

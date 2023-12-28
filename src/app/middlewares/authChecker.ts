import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { verifyToken } from '../modules/user/user.utils';
import config from '../config';
import { UserModel } from '../modules/user/user.model';
import { sendUnauthorizedResponse } from '../errors/UnauthorizedAccessError';

// import jwt from 'jsonwebtoken';

export const authChecker = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return sendUnauthorizedResponse(res);
    }

    const decodedDataFromJWT = verifyToken(
      token,
      config.jwt_access_token as string,
    );

    const { _id, role } = decodedDataFromJWT;

    const existingUser = await UserModel.findById(_id);

    if (!existingUser) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'User not found',
        'This user is not found!',
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      return sendUnauthorizedResponse(res);
    }

    req.user = decodedDataFromJWT;

    next();
  });
};

import { Response } from 'express';
import httpStatus from 'http-status';

export const PasswordUpdateFailureError = (res: Response) => {
  return res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    statusCode: httpStatus.BAD_REQUEST,
    message:
      'Password change failed. Ensure the new password is unique and not among the last 2 used (last used on 2023-01-01 at 12:00 PM).',
    data: null,
  });
};

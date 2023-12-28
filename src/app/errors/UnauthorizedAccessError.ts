/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

export const sendUnauthorizedResponse = (res: any) => {
  return res.status(httpStatus.FORBIDDEN).json({
    success: false,
    message: 'Unauthorized Access',
    errorMessage:
      'You do not have the necessary permissions to access this resource.',
    errorDetails: null,
    stack: null,
  });
};

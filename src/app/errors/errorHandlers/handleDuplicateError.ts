/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import { TErrorResponse } from '../../interface/errors';

export const handleDuplicateError = (err: any): TErrorResponse => {
  const message = 'Duplicate Key error!';
  const errorMessage = `'${err.keyValue.title}' already exists!`;
  const statusCode = httpStatus.BAD_REQUEST;
  const errorDetails = err;

  return {
    message,
    errorMessage,
    statusCode,
    errorDetails,
  };
};

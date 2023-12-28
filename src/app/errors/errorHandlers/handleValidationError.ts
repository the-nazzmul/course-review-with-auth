import mongoose from 'mongoose';
import { TErrorResponse } from '../../interface/errors';
import httpStatus from 'http-status';

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = 'Validation error!';
  const errorMessage = err.message;

  const errorDetails = err;

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails,
  };
};

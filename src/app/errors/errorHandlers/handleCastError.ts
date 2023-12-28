import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TErrorResponse } from '../../interface/errors';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TErrorResponse => {
  const message = 'Invalid ID';
  const errorMessage = `${err.value} is not a valid ID!`;
  const statusCode = httpStatus.BAD_REQUEST;
  const errorDetails = err;

  return {
    message,
    errorMessage,
    statusCode,
    errorDetails,
  };
};

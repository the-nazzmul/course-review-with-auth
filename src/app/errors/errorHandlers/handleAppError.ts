import { TErrorResponse } from '../../interface/errors';
import AppError from '../AppError';

export const handleAppError = (err: AppError): TErrorResponse => {
  const statusCode = err.statusCode;
  const message = err.message;
  const errorMessage = err.errorMessage;
  const errorDetails = err;

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails,
  };
};

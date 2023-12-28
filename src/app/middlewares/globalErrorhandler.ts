/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { handleZodError } from '../errors/errorHandlers/handleZodError';
import { handleValidationError } from '../errors/errorHandlers/handleValidationError';
import { handleCastError } from '../errors/errorHandlers/handleCastError';
import { handleDuplicateError } from '../errors/errorHandlers/handleDuplicateError';
import AppError from '../errors/AppError';
import { handleAppError } from '../errors/errorHandlers/handleAppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = err.statusCode;
  let message = err.message;
  let errorMessge = err.message;
  let errorDetails = err;

  if (err.name === 'CastError') {
    const formattedError = handleCastError(err);
    statusCode = formattedError.statusCode;
    message = formattedError.message;
    errorMessge = formattedError.errorMessage;
    errorDetails = formattedError.errorDetails;
  } else if (err.code === 11000) {
    const formattedError = handleDuplicateError(err);
    statusCode = formattedError.statusCode;
    message = formattedError.message;
    errorMessge = formattedError.errorMessage;
    errorDetails = formattedError.errorDetails;
  } else if (err instanceof ZodError) {
    const formattedError = handleZodError(err);
    statusCode = formattedError.statusCode;
    message = formattedError.message;
    errorMessge = formattedError.errorMessage;
    errorDetails = formattedError.errorDetails;
  } else if (err.name === 'ValidationError') {
    const formattedError = handleValidationError(err);
    statusCode = formattedError.statusCode;
    message = formattedError.message;
    errorMessge = formattedError.errorMessage;
    errorDetails = formattedError.errorDetails;
  } else if (err instanceof AppError) {
    const formattedError = handleAppError(err);
    statusCode = formattedError.statusCode;
    message = formattedError.message;
    errorMessge = formattedError.errorMessage;
    errorDetails = formattedError.errorDetails;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessge,
    errorDetails,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;

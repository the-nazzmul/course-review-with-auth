import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { TErrorResponse } from '../../interface/errors';

export const handleZodError = (err: ZodError): TErrorResponse => {
  const message = 'Validation Error';
  const statusCode = httpStatus.BAD_REQUEST;
  const errorDetails = err;

  const issues: ZodIssue[] = err.errors;

  const errorMessage = issues
    .map((issue) => {
      if ('received' in issue && issue.received === 'undefined') {
        return `${issue?.path[issue.path.length - 1]} is required`;
      } else if (
        'expected' in issue &&
        'received' in issue &&
        issue.expected !== issue.received
      ) {
        return `${issue?.path[
          issue.path.length - 1
        ]} is expected as ${issue?.expected}, but received as ${issue?.received}`;
      } else if (issue.code === 'invalid_enum_value') {
        return issue.message;
      }
    })
    .join('. ');

  return {
    message,
    errorMessage,
    statusCode,
    errorDetails,
  };
};

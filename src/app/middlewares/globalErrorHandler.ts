
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CustomError } from '../Errors/CustomError';
import { StatusCodes } from 'http-status-codes';

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error response
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';
  let details: any = null;

  // Handle different error types
  if (err instanceof CustomError) {
    return err.sendResponse(res);
  } 
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Invalid ID format';
    details = { path: err.path, value: err.value };
  } 
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Validation failed';
    details = Object.values(err.errors).map((e) => ({
      path: e.path,
      message: e.message,
    }));
  } 
  else if ((err as any).code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    message = 'Duplicate key error';
    details = { keyValue: (err as any).keyValue };
  } 
  else if (err instanceof Error) {
    message = err.message;
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    name: err instanceof Error ? err.constructor.name : 'Error',
    message,
    details,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err instanceof Error ? err.stack : undefined,
    }),
  });
};





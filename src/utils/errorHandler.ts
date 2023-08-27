import express, { Request, Response, NextFunction } from "express";

export interface ErrorResponse {
  message: string;
  statusCode?: number;
  status?: string;
  stack?: Object;
}

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (!err.status) {
    err.status = "error";
  }

  if (err.status = "error") {
    err.stack = err.stack
  }



  return res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    errstack: err.stack || {}
  });
};

export const generateErrorObj = (message: string, errorCode: number, status: string) => {
  const err: ErrorResponse = new Error(message);
  err.statusCode = errorCode;
  err.status = "failed";

  return err
}
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
): void => {
  if (!err.status) {
    err.status = "error";
  }

  if (err.status = "error") {
    err.stack = err.stack
  }

  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    errstack: err.stack || {}
  });
};

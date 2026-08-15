import type {
  Request,
  Response,
  NextFunction
} from "express";

import { AppError } from "../utils/AppError.js";

interface ValidationError extends Error {
  statusCode?: number;
  details?: unknown;
}

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    });

    return;
  }

  const validationError =
    error as ValidationError;

  if (
    validationError.statusCode === 400
  ) {
    res.status(400).json({
      success: false,
      message: validationError.message,
      details: validationError.details
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
}
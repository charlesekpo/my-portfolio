import type {
  Request,
  Response,
  NextFunction
} from "express";

import { AppError } from "../utils/AppError.js";
import { verifyToken } from "../utils/jwt.js";

export interface AuthenticatedRequest
  extends Request {
  user?: {
    userId: string;
    role: "admin";
  };
}

export function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  const authorization =
    req.headers.authorization;

  if (!authorization) {
    next(
      new AppError(
        "Authentication required",
        401
      )
    );

    return;
  }

  const [scheme, token] =
    authorization.split(" ");

  if (
    scheme !== "Bearer" ||
    !token
  ) {
    next(
      new AppError(
        "Invalid authorization header",
        401
      )
    );

    return;
  }

  try {
    const payload = verifyToken(token);

    if (payload.role !== "admin") {
      throw new AppError(
        "Admin access required",
        403
      );
    }

    req.user = payload;

    next();
  } catch {
    next(
      new AppError(
        "Invalid or expired token",
        401
      )
    );
  }
}
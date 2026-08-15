import type {
  Request,
  Response,
  NextFunction
} from "express";

import * as z from "zod";

export function validateBody(
  schema: z.ZodType
) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = z.treeifyError(result.error);

      next(
        Object.assign(
          new Error("Validation failed"),
          {
            statusCode: 400,
            details: errors
          }
        )
      );

      return;
    }

    req.body = result.data;

    next();
  };
}
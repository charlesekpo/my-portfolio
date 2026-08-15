import type { Request, Response } from "express";

import { loginUser } from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      throw new AppError(
        "Email and password are required",
        400
      );
    }

    const result = await loginUser({
      email,
      password
    });

    res.status(200).json({
      success: true,
      data: result
    });
  }
);
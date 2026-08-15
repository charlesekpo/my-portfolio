import type {
  Request,
  Response
} from "express";

import {
  createExperience,
  deleteExperience,
  getAllExperience,
  getExperience,
  updateExperience
} from "../services/experience.service.js";

import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const create = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {
    const experience =
      await createExperience(
        req.body
      );

    res.status(201).json({
      success: true,
      data: experience
    });
  }
);

export const list = asyncHandler(
  async (
    _req: Request,
    res: Response
  ) => {
    const experience =
      await getExperience();

    res.json({
      success: true,
      data: experience
    });
  }
);

export const adminList =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const experience =
        await getAllExperience();

      res.json({
        success: true,
        data: experience
      });
    }
  );

export const update =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const id = req.params.id;

      if (typeof id !== "string") {
        throw new AppError(
          "Experience ID is required",
          400
        );
      }

      const experience =
        await updateExperience(
          id,
          req.body
        );

      res.json({
        success: true,
        data: experience
      });
    }
  );

export const remove =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const id = req.params.id;

      if (typeof id !== "string") {
        throw new AppError(
          "Experience ID is required",
          400
        );
      }

      await deleteExperience(id);

      res.status(204).send();
    }
  );
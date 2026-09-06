import type {
  Request,
  Response
} from "express";

import {
  createEducation,
  deleteEducation,
  getAllEducation,
  getEducation,
  updateEducation
} from "../services/education.service.js";

import {
  AppError
} from "../utils/AppError.js";

import {
  asyncHandler
} from "../utils/asyncHandler.js";

function getParamId(
  req: Request
): string {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new AppError(
      "Education ID is required",
      400
    );
  }

  return id;
}

export const create =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const education =
        await createEducation(
          req.body
        );

      res.status(201).json({
        success: true,
        data: education
      });
    }
  );

export const list =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const education =
        await getEducation();

      res.json({
        success: true,
        data: education
      });
    }
  );

export const adminList =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const education =
        await getAllEducation();

      res.json({
        success: true,
        data: education
      });
    }
  );

export const update =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const education =
        await updateEducation(
          getParamId(req),
          req.body
        );

      res.json({
        success: true,
        data: education
      });
    }
  );

export const remove =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      await deleteEducation(
        getParamId(req)
      );

      res.status(204).send();
    }
  );

import type { Request, Response } from "express";

import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getSkills,
  updateSkill
} from "../services/skill.service.js";

import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const create = asyncHandler(
  async (req: Request, res: Response) => {
    const skill =
      await createSkill(req.body);

    res.status(201).json({
      success: true,
      data: skill
    });
  }
);

export const list = asyncHandler(
  async (_req: Request, res: Response) => {
    const skills =
      await getSkills();

    res.json({
      success: true,
      data: skills
    });
  }
);

export const adminList =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const skills =
        await getAllSkills();

      res.json({
        success: true,
        data: skills
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
          "Skill ID is required",
          400
        );
      }

      const skill =
        await updateSkill(
          id,
          req.body
        );

      res.json({
        success: true,
        data: skill
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
          "Skill ID is required",
          400
        );
      }

      await deleteSkill(id);

      res.status(204).send();
    }
  );
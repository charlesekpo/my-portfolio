import type { Request, Response } from "express";

import {
  createProject,
  deleteProject,
  getProjectBySlug,
  getProjects,
  getPublishedProjects,
  updateProject
} from "../services/project.service.js";

import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const create = asyncHandler(
  async (req: Request, res: Response) => {
    const project =
      await createProject(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  }
);

export const list = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(req.query.limit) || 10,
        1
      ),
      100
    );

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const published =
      req.query.published === "true"
        ? true
        : req.query.published === "false"
          ? false
          : undefined;

    const featured =
      req.query.featured === "true"
        ? true
        : req.query.featured === "false"
          ? false
          : undefined;

    /*
     * With exactOptionalPropertyTypes enabled,
     * we should NOT explicitly pass undefined
     * for optional properties.
     */

    const options = {
      page,
      limit,
      ...(search !== undefined
        ? { search }
        : {}),
      ...(published !== undefined
        ? { published }
        : {}),
      ...(featured !== undefined
        ? { featured }
        : {})
    };

    const result =
      await getProjects(options);

    res.json({
      success: true,
      data: result
    });
  }
);

export const publicList =
  asyncHandler(
    async (_req: Request, res: Response) => {
      const projects =
        await getPublishedProjects();

      res.json({
        success: true,
        data: projects
      });
    }
  );

export const getBySlug =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const slug = req.params.slug;

      if (typeof slug !== "string") {
        throw new AppError(
          "Project slug is required",
          400
        );
      }

      const project =
        await getProjectBySlug(slug);

      res.json({
        success: true,
        data: project
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
          "Project ID is required",
          400
        );
      }

      const project =
        await updateProject(
          id,
          req.body
        );

      res.json({
        success: true,
        data: project
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
          "Project ID is required",
          400
        );
      }

      await deleteProject(id);

      res.status(204).send();
    }
  );
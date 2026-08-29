import type {
  Request,
  Response
} from "express";

import {
  createSiteSettings,
  deleteSiteSettings,
  getSiteSettings,
  updateSiteSettings
} from "../services/siteSettings.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const get =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const settings =
        await getSiteSettings();

      res.json({
        success: true,
        data: settings
      });
    }
  );

export const create =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const settings =
        await createSiteSettings(
          req.body
        );

      res.status(201).json({
        success: true,
        data: settings
      });
    }
  );

export const update =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const settings =
        await updateSiteSettings(
          req.body
        );

      res.json({
        success: true,
        data: settings
      });
    }
  );

export const remove =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      await deleteSiteSettings();

      res.status(204).send();
    }
  );
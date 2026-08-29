import type {
  Request,
  Response
} from "express";

import {
  createMedia,
  deleteMedia,
  getMedia,
  getMediaById
} from "../services/media.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const upload =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message:
            "No file uploaded"
        });

        return;
      }

      const media =
        await createMedia(
          req.file
        );

      res.status(201).json({
        success: true,
        message:
          "File uploaded successfully",
        data: media
      });
    }
  );

export const getAll =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const media =
        await getMedia();

      res.json({
        success: true,
        data: media
      });
    }
  );

export const getOne =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const media =
        await getMediaById(
          getParamId(req)
        );

      res.json({
        success: true,
        data: media
      });
    }
  );

export const remove =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      await deleteMedia(
        getParamId(req)
      );

      res.status(204).send();
    }
  );

function getParamId(
  req: Request
): string {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error(
      "Media ID is required"
    );
  }

  return id;
}
import type {
  Request,
  Response
} from "express";

import {
  createVideo,
  deleteVideo,
  getAllVideos,
  getVideos,
  getVideoById,
  updateVideo
} from "../services/video.service.js";

import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const create =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const video =
        await createVideo(req.body);

      res.status(201).json({
        success: true,
        data: video
      });
    }
  );

export const list =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const videos =
        await getVideos();

      res.json({
        success: true,
        data: videos
      });
    }
  );

export const adminList =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const videos =
        await getAllVideos();

      res.json({
        success: true,
        data: videos
      });
    }
  );

export const getOne =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const id = req.params.id;

      if (typeof id !== "string") {
        throw new AppError(
          "Video ID is required",
          400
        );
      }

      const video =
        await getVideoById(id);

      res.json({
        success: true,
        data: video
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
          "Video ID is required",
          400
        );
      }

      const video =
        await updateVideo(
          id,
          req.body
        );

      res.json({
        success: true,
        data: video
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
          "Video ID is required",
          400
        );
      }

      await deleteVideo(id);

      res.status(204).send();
    }
  );
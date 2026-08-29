import fs from "node:fs/promises";
import path from "node:path";

import { Media } from "../models/Media.js";
import { AppError } from "../utils/AppError.js";

import type { MediaType } from "../models/Media.js";

export async function createMedia(
  file: Express.Multer.File
) {
  if (!file) {
    throw new AppError(
      "No file uploaded",
      400
    );
  }

  const type: MediaType =
    file.mimetype.startsWith("image/")
      ? "image"
      : "document";

  const directory =
    type === "image"
      ? "images"
      : "documents";

  const url =
    `/uploads/${directory}/${file.filename}`;

  const media =
    await Media.create({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url,
      type
    });

  return media;
}

export async function getMedia() {
  return Media.find()
    .sort({ createdAt: -1 })
    .lean();
}

export async function getMediaById(
  id: string
) {
  const media =
    await Media.findById(id).lean();

  if (!media) {
    throw new AppError(
      "Media not found",
      404
    );
  }

  return media;
}

export async function deleteMedia(
  id: string
) {
  const media =
    await Media.findById(id);

  if (!media) {
    throw new AppError(
      "Media not found",
      404
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Delete physical file
  |--------------------------------------------------------------------------
  */

  const filePath =
    path.resolve(
      media.type === "image"
        ? "uploads/images"
        : "uploads/documents",
      media.filename
    );

  try {
    await fs.unlink(filePath);
  } catch (error: unknown) {
    /*
     * If the file doesn't exist, we can
     * still remove the database record.
     */
    if (
      !(
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "ENOENT"
      )
    ) {
      throw error;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete MongoDB record
  |--------------------------------------------------------------------------
  */

  await media.deleteOne();

  return media;
}
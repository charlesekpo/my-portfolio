import { Media } from "../models/Media.js";
import { AppError } from "../utils/AppError.js";
import {
  uploadImage,
  uploadVideo,
  deleteFile
} from "../utils/cloudinary.js";

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

  console.log("Creating media record for:", file.originalname, file.mimetype);

  let type: MediaType;
  let uploadResult: {
    url: string;
    publicId: string;
    resourceType: "image" | "video";
  };

  try {
    if (file.mimetype.startsWith("image/")) {
      type = "image";
      uploadResult = await uploadImage(file);
    } else if (file.mimetype.startsWith("video/")) {
      type = "video";
      uploadResult = await uploadVideo(file);
    } else {
      throw new AppError(
        "Unsupported file type",
        400
      );
    }

    console.log("Upload result:", uploadResult);

    const media =
      await Media.create({
        filename: file.originalname,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: uploadResult.url,
        type,
        publicId: uploadResult.publicId
      });

    console.log("Media record created:", media);

    return media;
  } catch (error: any) {
    console.error("Error creating media:", error);
    throw error;
  }
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
  | Delete from Cloudinary
  |--------------------------------------------------------------------------
  */

  const mediaData = media as any;
  if (mediaData.publicId) {
    try {
      await deleteFile(mediaData.publicId);
    } catch (error) {
      console.error("Failed to delete from Cloudinary:", error);
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
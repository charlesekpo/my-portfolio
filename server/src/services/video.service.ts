import { Video } from "../models/Video.js";
import { AppError } from "../utils/AppError.js";

import type {
  CreateVideoInput,
  UpdateVideoInput
} from "../validators/video.validator.js";

export async function createVideo(
  input: CreateVideoInput
) {
  return Video.create({
    title: input.title,
    description: input.description,
    thumbnail: input.thumbnail,
    videoUrl: input.videoUrl,
    platform: input.platform,
    featured: input.featured,
    published: input.published,
    sortOrder: input.sortOrder
  });
}

export async function getVideos() {
  return Video.find({
    published: true
  }).sort({
    featured: -1,
    sortOrder: 1,
    createdAt: -1
  });
}

export async function getAllVideos() {
  return Video.find().sort({
    featured: -1,
    sortOrder: 1,
    createdAt: -1
  });
}

export async function getVideoById(
  id: string
) {
  const video =
    await Video.findById(id);

  if (!video) {
    throw new AppError(
      "Video not found",
      404
    );
  }

  return video;
}

export async function updateVideo(
  id: string,
  input: UpdateVideoInput
) {
  const video =
    await Video.findById(id);

  if (!video) {
    throw new AppError(
      "Video not found",
      404
    );
  }

  if (input.title !== undefined) {
    video.title = input.title;
  }

  if (
    input.description !== undefined
  ) {
    video.description =
      input.description;
  }

  if (
    input.thumbnail !== undefined
  ) {
    video.thumbnail =
      input.thumbnail;
  }

  if (
    input.videoUrl !== undefined
  ) {
    video.videoUrl =
      input.videoUrl;
  }

  if (
    input.platform !== undefined
  ) {
    video.platform =
      input.platform;
  }

  if (
    input.featured !== undefined
  ) {
    video.featured =
      input.featured;
  }

  if (
    input.published !== undefined
  ) {
    video.published =
      input.published;
  }

  if (
    input.sortOrder !== undefined
  ) {
    video.sortOrder =
      input.sortOrder;
  }

  await video.save();

  return video;
}

export async function deleteVideo(
  id: string
) {
  const video =
    await Video.findByIdAndDelete(id);

  if (!video) {
    throw new AppError(
      "Video not found",
      404
    );
  }

  return video;
}
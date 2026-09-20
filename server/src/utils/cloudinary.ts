import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const isCloudinaryConfigured =
  Boolean(env.CLOUDINARY_CLOUD_NAME) &&
  Boolean(env.CLOUDINARY_API_KEY) &&
  Boolean(env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

export interface UploadResult {
  url: string;
  publicId: string;
  resourceType: "image" | "video";
}

// Fallback to local storage when Cloudinary is not configured
async function saveFileLocally(
  file: Express.Multer.File,
  folder: string
): Promise<UploadResult> {
  try {
    const extension = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}-${crypto.randomUUID()}${extension}`;
    const filePath = path.join("uploads", folder, filename);

    console.log(`Saving file locally: ${filePath}`);
    console.log(`File size: ${file.buffer.length} bytes`);

    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write file
    await fs.writeFile(filePath, file.buffer);

    console.log(`File saved successfully: ${filePath}`);

    return {
      url: `/${filePath.replace(/\\/g, "/")}`,
      publicId: filename,
      resourceType: folder === "videos" ? "video" : "image"
    };
  } catch (error) {
    console.error("Error saving file locally:", error);
    throw error;
  }
}

async function deleteFileLocally(publicId: string): Promise<void> {
  const filePath = path.join("uploads", "images", publicId);
  const videoPath = path.join("uploads", "videos", publicId);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    // Ignore if file doesn't exist
  }

  try {
    await fs.unlink(videoPath);
  } catch (error) {
    // Ignore if file doesn't exist
  }
}

export async function uploadImage(
  file: Express.Multer.File
): Promise<UploadResult> {
  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "portfolio/images",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
          max_file_size: 10 * 1024 * 1024 // 10MB
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Failed to upload image"));
            return;
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: "image"
          });
        }
      ).end(file.buffer);
    });
  } else {
    console.log("Cloudinary not configured, using local storage for image");
    return saveFileLocally(file, "images");
  }
}

export async function uploadVideo(
  file: Express.Multer.File
): Promise<UploadResult> {
  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_chunked_stream(
          {
            resource_type: "video",
            folder: "portfolio/videos",
            chunk_size: 6 * 1024 * 1024,
            timeout: 600000
          },
          (error, result) => {
            if (error || !result) {
              reject(
                error ||
                  new Error("Failed to upload video")
              );
              return;
            }

            console.log(
              "Cloudinary video upload successful:",
              result.secure_url
            );

            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              resourceType: "video"
            });
          }
        );

      uploadStream.end(file.buffer);
    });
  } else {
    console.log(
      "Cloudinary not configured, using local storage for video"
    );

    return saveFileLocally(file, "videos");
  }
}

export async function deleteFile(publicId: string): Promise<void> {
  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: "auto" },
        (error, _result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        }
      );
    });
  } else {
    console.log("Cloudinary not configured, deleting local file");
    await deleteFileLocally(publicId);
  }
}

export async function deleteFiles(publicIds: string[]): Promise<void> {
  await Promise.all(publicIds.map((id) => deleteFile(id)));
}
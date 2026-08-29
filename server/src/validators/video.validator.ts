import * as z from "zod";

export const createVideoSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(1, "Video title is required")
      .max(150),

    description: z
      .string()
      .trim()
      .default(""),

    thumbnail: z
      .string()
      .trim()
      .default(""),

    videoUrl: z
      .string()
      .trim()
      .url("Video URL must be a valid URL"),

    platform: z.enum([
      "youtube",
      "vimeo",
      "direct"
    ]),

    featured: z
      .boolean()
      .default(false),

    published: z
      .boolean()
      .default(true),

    sortOrder: z
      .number()
      .int()
      .default(0)
  });

export const updateVideoSchema =
  createVideoSchema.partial();

export type CreateVideoInput =
  z.infer<
    typeof createVideoSchema
  >;

export type UpdateVideoInput =
  z.infer<
    typeof updateVideoSchema
  >;
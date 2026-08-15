import * as z from "zod";

const optionalUrl = z
  .url()
  .or(z.literal(""))
  .optional();

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150),

  shortDescription: z
    .string()
    .trim()
    .min(1, "Short description is required")
    .max(300),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  technologies: z
    .array(z.string().trim().min(1))
    .default([]),

  thumbnail: z
    .string()
    .trim()
    .optional()
    .default(""),

  images: z
    .array(z.string().trim().min(1))
    .default([]),

  liveUrl: optionalUrl,

  githubUrl: optionalUrl,

  videoUrl: optionalUrl,

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

export const updateProjectSchema =
  createProjectSchema.partial();

export type CreateProjectInput =
  z.infer<typeof createProjectSchema>;

export type UpdateProjectInput =
  z.infer<typeof updateProjectSchema>;
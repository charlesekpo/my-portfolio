import * as z from "zod";

export const createSkillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required")
    .max(100),

  category: z.enum([
    "frontend",
    "backend",
    "database",
    "devops",
    "tools",
    "other"
  ]),

  level: z
    .number()
    .int()
    .min(0)
    .max(100),

  icon: z
    .string()
    .trim()
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  sortOrder: z
    .number()
    .int()
    .default(0),

  published: z
    .boolean()
    .default(true)
});

export const updateSkillSchema =
  createSkillSchema.partial();

export type CreateSkillInput =
  z.infer<typeof createSkillSchema>;

export type UpdateSkillInput =
  z.infer<typeof updateSkillSchema>;
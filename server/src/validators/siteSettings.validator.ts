import * as z from "zod";

export const createSiteSettingsSchema =
  z.object({
    fullName: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .max(150),

    professionalTitle: z
      .string()
      .trim()
      .min(1, "Professional title is required")
      .max(150),

    shortBio: z
      .string()
      .trim()
      .min(1, "Short bio is required")
      .max(500),

    about: z
      .string()
      .trim()
      .min(1, "About section is required"),

    profileImage: z
      .string()
      .trim()
      .url()
      .or(z.literal(""))
      .default(""),

    resumeUrl: z
      .string()
      .trim()
      .url()
      .or(z.literal(""))
      .default(""),

    email: z
      .string()
      .trim()
      .email()
      .or(z.literal(""))
      .default(""),

    phone: z
      .string()
      .trim()
      .default(""),

    location: z
      .string()
      .trim()
      .default(""),

    githubUrl: z
      .string()
      .trim()
      .url()
      .or(z.literal(""))
      .default(""),

    linkedinUrl: z
      .string()
      .trim()
      .url()
      .or(z.literal(""))
      .default(""),

    twitterUrl: z
      .string()
      .trim()
      .url()
      .or(z.literal(""))
      .default(""),

    websiteUrl: z
      .string()
      .trim()
      .url()
      .or(z.literal(""))
      .default(""),

    availableForWork: z
      .boolean()
      .default(true)
  });

export const updateSiteSettingsSchema =
  createSiteSettingsSchema.partial();

export type CreateSiteSettingsInput =
  z.infer<
    typeof createSiteSettingsSchema
  >;

export type UpdateSiteSettingsInput =
  z.infer<
    typeof updateSiteSettingsSchema
  >;
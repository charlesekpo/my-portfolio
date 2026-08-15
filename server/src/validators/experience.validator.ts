import * as z from "zod";

const experienceFields = {
  company: z
    .string()
    .trim()
    .min(1, "Company is required")
    .max(150),

  position: z
    .string()
    .trim()
    .min(1, "Position is required")
    .max(150),

  location: z
    .string()
    .trim()
    .default(""),

  startDate: z.coerce.date(),

  endDate: z.coerce
    .date()
    .optional(),

  current: z
    .boolean()
    .default(false),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  technologies: z
    .array(
      z.string().trim().min(1)
    )
    .default([]),

  sortOrder: z
    .number()
    .int()
    .default(0),

  published: z
    .boolean()
    .default(true)
};

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export const createExperienceSchema =
  z
    .object(experienceFields)
    .refine(
      (data) => {
        if (
          data.current &&
          data.endDate
        ) {
          return false;
        }

        return true;
      },
      {
        message:
          "Current experience cannot have an end date",
        path: ["endDate"]
      }
    )
    .refine(
      (data) => {
        if (
          data.endDate &&
          data.startDate > data.endDate
        ) {
          return false;
        }

        return true;
      },
      {
        message:
          "End date cannot be before start date",
        path: ["endDate"]
      }
    );

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
|
| We cannot call .partial() on the refined
| create schema in Zod v4.
|
| So we create the partial object first,
| then apply the refinements.
|
*/

export const updateExperienceSchema =
  z
    .object(experienceFields)
    .partial()
    .refine(
      (data) => {
        if (
          data.current === true &&
          data.endDate
        ) {
          return false;
        }

        return true;
      },
      {
        message:
          "Current experience cannot have an end date",
        path: ["endDate"]
      }
    )
    .refine(
      (data) => {
        if (
          data.startDate &&
          data.endDate &&
          data.startDate >
            data.endDate
        ) {
          return false;
        }

        return true;
      },
      {
        message:
          "End date cannot be before start date",
        path: ["endDate"]
      }
    );

export type CreateExperienceInput =
  z.infer<
    typeof createExperienceSchema
  >;

export type UpdateExperienceInput =
  z.infer<
    typeof updateExperienceSchema
  >;
import * as z from "zod";

/*
|--------------------------------------------------------------------------
| Date helper
|--------------------------------------------------------------------------
|
| Accept:
| - YYYY-MM-DD strings
| - Date objects
| - undefined
|
| Convert empty strings to undefined.
|
*/

const optionalDate = z.preprocess(
  (value) => {
    if (value === "") {
      return undefined;
    }

    return value;
  },
  z.union([
    z.string(),
    z.date()
  ])
  .transform((value) => {
    if (value instanceof Date) {
      return value;
    }

    return new Date(value);
  })
  .refine(
    (value) => !Number.isNaN(value.getTime()),
    {
      message: "Invalid date"
    }
  )
  .optional()
);

const requiredDate = z.preprocess(
  (value) => value,
  z.union([
    z.string(),
    z.date()
  ])
  .transform((value) => {
    if (value instanceof Date) {
      return value;
    }

    return new Date(value);
  })
  .refine(
    (value) => !Number.isNaN(value.getTime()),
    {
      message: "Invalid date"
    }
  )
);

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

  startDate: requiredDate,

  endDate: optionalDate,

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
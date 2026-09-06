import * as z from "zod";

const optionalDate = z.preprocess(
  (value) => {
    if (value === "") {
      return undefined;
    }

    return value;
  },
  z
    .union([
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
      (value) =>
        !Number.isNaN(
          value.getTime()
        ),
      {
        message: "Invalid date"
      }
    )
    .optional()
);

const educationFields = {
  institution: z
    .string()
    .trim()
    .min(
      1,
      "Institution is required"
    )
    .max(200),

  qualification: z
    .string()
    .trim()
    .min(
      1,
      "Qualification is required"
    )
    .max(200),

  fieldOfStudy: z
    .string()
    .trim()
    .max(200)
    .default(""),

  location: z
    .string()
    .trim()
    .max(200)
    .default(""),

  startDate: optionalDate,

  endDate: optionalDate,

  current: z
    .boolean()
    .default(false),

  description: z
    .string()
    .trim()
    .max(3000)
    .default(""),
    
  sortOrder: z
    .number()
    .int()
    .default(0),

  published: z
    .boolean()
    .default(true)
};

export const createEducationSchema =
  z
    .object(educationFields)
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
          "Current education cannot have an end date",
        path: ["endDate"]
      }
    )
    .refine(
      (data) => {
        if (
          data.startDate &&
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

export const updateEducationSchema =
  z
    .object(educationFields)
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
          "Current education cannot have an end date",
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

export type CreateEducationInput =
  z.infer<
    typeof createEducationSchema
  >;

export type UpdateEducationInput =
  z.infer<
    typeof updateEducationSchema
  >;

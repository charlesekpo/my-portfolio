import * as z from "zod";

export const createMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),

  subject: z
    .string()
    .trim()
    .max(200)
    .default(""),

  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000)
});

export const updateMessageStatusSchema =
  z.object({
    status: z.enum([
      "unread",
      "read",
      "replied",
      "archived"
    ])
  });

export type CreateMessageInput =
  z.infer<typeof createMessageSchema>;

export type UpdateMessageStatusInput =
  z.infer<typeof updateMessageStatusSchema>;
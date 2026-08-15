import mongoose, { Document, Schema } from "mongoose";

export type MessageStatus =
  | "unread"
  | "read"
  | "replied"
  | "archived";

export interface IMessage extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: MessageStatus;

  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    subject: {
      type: String,
      default: "",
      maxlength: 200
    },

    message: {
      type: String,
      required: true,
      maxlength: 5000
    },

    status: {
      type: String,
      enum: [
        "unread",
        "read",
        "replied",
        "archived"
      ],
      default: "unread"
    }
  },
  {
    timestamps: true
  }
);

export const Message = mongoose.model<IMessage>(
  "Message",
  messageSchema
);
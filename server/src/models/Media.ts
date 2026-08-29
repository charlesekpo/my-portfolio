import mongoose, {
  Document,
  Schema
} from "mongoose";

export type MediaType =
  | "image"
  | "document";

export interface IMedia
  extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  type: MediaType;

  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema =
  new Schema<IMedia>(
    {
      filename: {
        type: String,
        required: true,
        trim: true
      },

      originalName: {
        type: String,
        required: true,
        trim: true
      },

      mimeType: {
        type: String,
        required: true,
        trim: true
      },

      size: {
        type: Number,
        required: true
      },

      url: {
        type: String,
        required: true,
        trim: true
      },

      type: {
        type: String,
        enum: [
          "image",
          "document"
        ],
        required: true
      }
    },
    {
      timestamps: true
    }
  );

mediaSchema.index({
  type: 1,
  createdAt: -1
});

export const Media =
  mongoose.model<IMedia>(
    "Media",
    mediaSchema
  );
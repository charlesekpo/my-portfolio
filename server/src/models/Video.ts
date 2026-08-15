import mongoose, { Document, Schema } from "mongoose";

export type VideoPlatform =
  | "youtube"
  | "vimeo"
  | "self-hosted"
  | "other";

export interface IVideo extends Document {
  title: string;
  description?: string;

  url: string;
  thumbnail?: string;

  platform: VideoPlatform;

  featured: boolean;
  published: boolean;

  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    description: {
      type: String,
      default: ""
    },

    url: {
      type: String,
      required: true,
      trim: true
    },

    thumbnail: {
      type: String,
      default: ""
    },

    platform: {
      type: String,
      enum: [
        "youtube",
        "vimeo",
        "self-hosted",
        "other"
      ],
      default: "youtube"
    },

    featured: {
      type: Boolean,
      default: false
    },

    published: {
      type: Boolean,
      default: true
    },

    sortOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const Video = mongoose.model<IVideo>(
  "Video",
  videoSchema
);
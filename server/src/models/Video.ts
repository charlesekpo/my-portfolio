import mongoose, {
  Document,
  Schema
} from "mongoose";

export type VideoPlatform =
  | "youtube"
  | "vimeo"
  | "direct";

export interface IVideo
  extends Document {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  platform: VideoPlatform;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema =
  new Schema<IVideo>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
      },

      description: {
        type: String,
        default: "",
        trim: true
      },

      thumbnail: {
        type: String,
        default: "",
        trim: true
      },

      videoUrl: {
        type: String,
        required: true,
        trim: true
      },

      platform: {
        type: String,
        enum: [
          "youtube",
          "vimeo",
          "direct"
        ],
        required: true
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

videoSchema.index({
  published: 1,
  featured: 1,
  sortOrder: 1
});

export const Video =
  mongoose.model<IVideo>(
    "Video",
    videoSchema
  );
import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;

  technologies: string[];

  thumbnail?: string;
  images: string[];

  liveUrl?: string;
  githubUrl?: string;

  videoUrl?: string;

  featured: boolean;
  published: boolean;

  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    technologies: {
      type: [String],
      default: []
    },

    thumbnail: {
      type: String,
      default: ""
    },

    images: {
      type: [String],
      default: []
    },

    liveUrl: {
      type: String,
      default: ""
    },

    githubUrl: {
      type: String,
      default: ""
    },

    videoUrl: {
      type: String,
      default: ""
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

export const Project = mongoose.model<IProject>(
  "Project",
  projectSchema
);
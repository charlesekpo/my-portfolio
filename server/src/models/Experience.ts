import mongoose, {
  Document,
  Schema
} from "mongoose";

export interface IExperience
  extends Document {
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  technologies: string[];
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema =
  new Schema<IExperience>(
    {
      company: {
        type: String,
        required: true,
        trim: true
      },

      position: {
        type: String,
        required: true,
        trim: true
      },

      location: {
        type: String,
        default: "",
        trim: true
      },

      startDate: {
        type: Date,
        required: true
      },

      endDate: {
        type: Date
      },

      current: {
        type: Boolean,
        default: false
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

      sortOrder: {
        type: Number,
        default: 0
      },

      published: {
        type: Boolean,
        default: true
      }
    },
    {
      timestamps: true
    }
  );

export const Experience =
  mongoose.model<IExperience>(
    "Experience",
    experienceSchema
  );
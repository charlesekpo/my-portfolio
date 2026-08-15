import mongoose, { Document, Schema } from "mongoose";

export interface IExperience extends Document {
  company: string;
  position: string;
  location?: string;

  description: string;

  technologies: string[];

  startDate: Date;
  endDate?: Date;

  current: boolean;

  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    position: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    location: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      required: true
    },

    technologies: {
      type: [String],
      default: []
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

    sortOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const Experience = mongoose.model<IExperience>(
  "Experience",
  experienceSchema
);
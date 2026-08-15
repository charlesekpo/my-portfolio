import mongoose, { Document, Schema } from "mongoose";

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tools"
  | "other";

export interface ISkill extends Document {
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
  description?: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    category: {
      type: String,
      enum: [
        "frontend",
        "backend",
        "database",
        "devops",
        "tools",
        "other"
      ],
      default: "other"
    },

    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 80
    },

    icon: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
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

export const Skill = mongoose.model<ISkill>("Skill", skillSchema);
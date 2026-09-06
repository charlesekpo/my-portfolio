import mongoose, {
  Document,
  Schema
} from "mongoose";

export interface IEducation
  extends Document {
  institution: string;
  qualification: string;
  fieldOfStudy: string;
  location: string;
  startDate?: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  sortOrder: number;
  published: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const educationSchema =
  new Schema<IEducation>(
    {
      institution: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
      },

      qualification: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
      },

      fieldOfStudy: {
        type: String,
        default: "",
        trim: true,
        maxlength: 200
      },

      location: {
        type: String,
        default: "",
        trim: true,
        maxlength: 200
      },

      startDate: {
        type: Date
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
        default: "",
        trim: true,
        maxlength: 3000
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

educationSchema.index({
  published: 1,
  sortOrder: 1,
  endDate: -1
});

export const Education =
  mongoose.model<IEducation>(
    "Education",
    educationSchema
  );

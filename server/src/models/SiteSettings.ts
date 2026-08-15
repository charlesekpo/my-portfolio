import mongoose, { Document, Schema } from "mongoose";

export interface ISiteSettings extends Document {
  fullName: string;
  professionalTitle: string;

  shortBio: string;
  about: string;

  profileImage?: string;
  resumeUrl?: string;

  email?: string;
  phone?: string;
  location?: string;

  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;

  availableForWork: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    professionalTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    shortBio: {
      type: String,
      required: true,
      maxlength: 500
    },

    about: {
      type: String,
      required: true
    },

    profileImage: {
      type: String,
      default: ""
    },

    resumeUrl: {
      type: String,
      default: ""
    },

    email: {
      type: String,
      default: ""
    },

    phone: {
      type: String,
      default: ""
    },

    location: {
      type: String,
      default: ""
    },

    githubUrl: {
      type: String,
      default: ""
    },

    linkedinUrl: {
      type: String,
      default: ""
    },

    twitterUrl: {
      type: String,
      default: ""
    },

    websiteUrl: {
      type: String,
      default: ""
    },

    availableForWork: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const SiteSettings = mongoose.model<ISiteSettings>(
  "SiteSettings",
  siteSettingsSchema
);
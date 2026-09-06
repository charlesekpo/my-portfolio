import {
  Education
} from "../models/Education.js";

import {
  AppError
} from "../utils/AppError.js";

import type {
  CreateEducationInput,
  UpdateEducationInput
} from "../validators/education.validator.js";

export async function createEducation(
  input: CreateEducationInput
) {
  const educationData: {
    institution: string;
    qualification: string;
    fieldOfStudy: string;
    location: string;
    current: boolean;
    description: string;
    sortOrder: number;
    published: boolean;
    startDate?: Date;
    endDate?: Date;
  } = {
    institution: input.institution,
    qualification: input.qualification,
    fieldOfStudy: input.fieldOfStudy,
    location: input.location,
    current: input.current,
    description: input.description,
    sortOrder: input.sortOrder,
    published: input.published
  };

  if (input.startDate) {
    educationData.startDate =
      input.startDate;
  }

  if (input.endDate) {
    educationData.endDate =
      input.endDate;
  }

  return Education.create(
    educationData
  );
}

export async function getEducation() {
  return Education.find({
    published: true
  })
    .sort({
      sortOrder: 1,
      endDate: -1,
      createdAt: -1
    })
    .lean();
}

export async function getAllEducation() {
  return Education.find()
    .sort({
      sortOrder: 1,
      endDate: -1,
      createdAt: -1
    })
    .lean();
}

export async function updateEducation(
  id: string,
  input: UpdateEducationInput
) {
  const education =
    await Education.findByIdAndUpdate(
      id,
      input,
      {
        new: true,
        runValidators: true
      }
    ).lean();

  if (!education) {
    throw new AppError(
      "Education record not found",
      404
    );
  }

  return education;
}

export async function deleteEducation(
  id: string
) {
  const education =
    await Education.findByIdAndDelete(
      id
    );

  if (!education) {
    throw new AppError(
      "Education record not found",
      404
    );
  }

  return education;
}

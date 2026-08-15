import { Experience } from "../models/Experience.js";
import { AppError } from "../utils/AppError.js";

import type {
  CreateExperienceInput,
  UpdateExperienceInput
} from "../validators/experience.validator.js";

export async function createExperience(
  input: CreateExperienceInput
) {
  const experienceData = {
    company: input.company,
    position: input.position,
    location: input.location,
    startDate: input.startDate,
    current: input.current,
    description: input.description,
    technologies: input.technologies,
    sortOrder: input.sortOrder,
    published: input.published,

    ...(input.endDate !== undefined
      ? {
          endDate: input.endDate
        }
      : {})
  };

  return Experience.create(
    experienceData
  );
}

export async function getExperience() {
  return Experience.find({
    published: true
  }).sort({
    current: -1,
    sortOrder: 1,
    startDate: -1
  });
}

export async function getAllExperience() {
  return Experience.find().sort({
    current: -1,
    sortOrder: 1,
    startDate: -1
  });
}

export async function updateExperience(
  id: string,
  input: UpdateExperienceInput
) {
  const experience =
    await Experience.findById(id);

  if (!experience) {
    throw new AppError(
      "Experience not found",
      404
    );
  }

  if (input.company !== undefined) {
    experience.company =
      input.company;
  }

  if (input.position !== undefined) {
    experience.position =
      input.position;
  }

  if (input.location !== undefined) {
    experience.location =
      input.location;
  }

  if (input.startDate !== undefined) {
    experience.startDate =
      input.startDate;
  }

  if (input.endDate !== undefined) {
    experience.endDate =
      input.endDate;
  }

  if (input.current !== undefined) {
    experience.current =
      input.current;
  }

  if (input.description !== undefined) {
    experience.description =
      input.description;
  }

  if (input.technologies !== undefined) {
    experience.technologies =
      input.technologies;
  }

  if (input.sortOrder !== undefined) {
    experience.sortOrder =
      input.sortOrder;
  }

  if (input.published !== undefined) {
    experience.published =
      input.published;
  }

  /*
   * Current experience should not
   * have an end date.
   */
  if (experience.current) {
    experience.set(
        "endDate",
        undefined
    );
    }

  await experience.save();

  return experience;
}

export async function deleteExperience(
  id: string
) {
  const experience =
    await Experience.findByIdAndDelete(id);

  if (!experience) {
    throw new AppError(
      "Experience not found",
      404
    );
  }

  return experience;
}
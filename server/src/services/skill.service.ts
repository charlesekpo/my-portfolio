import { Skill } from "../models/Skill.js";
import { AppError } from "../utils/AppError.js";

import type {
  CreateSkillInput,
  UpdateSkillInput
} from "../validators/skill.validator.js";

export async function createSkill(
  input: CreateSkillInput
) {
  const existing =
    await Skill.findOne({
      name: input.name
    });

  if (existing) {
    throw new AppError(
      "A skill with this name already exists",
      409
    );
  }

  return Skill.create({
    name: input.name,
    category: input.category,
    level: input.level,
    icon: input.icon ?? "",
    description: input.description ?? "",
    sortOrder: input.sortOrder,
    published: input.published
  });
}

export async function getSkills() {
  return Skill.find({
    published: true
  }).sort({
    sortOrder: 1,
    createdAt: -1
  });
}

export async function getAllSkills() {
  return Skill.find().sort({
    sortOrder: 1,
    createdAt: -1
  });
}

export async function updateSkill(
  id: string,
  input: UpdateSkillInput
) {
  const skill =
    await Skill.findById(id);

  if (!skill) {
    throw new AppError(
      "Skill not found",
      404
    );
  }

  if (input.name !== undefined) {
    const existing =
      await Skill.findOne({
        name: input.name,
        _id: {
          $ne: id
        }
      });

    if (existing) {
      throw new AppError(
        "A skill with this name already exists",
        409
      );
    }

    skill.name = input.name;
  }

  if (input.category !== undefined) {
    skill.category = input.category;
  }

  if (input.level !== undefined) {
    skill.level = input.level;
  }

  if (input.icon !== undefined) {
    skill.icon = input.icon;
  }

  if (input.description !== undefined) {
    skill.description =
      input.description;
  }

  if (input.sortOrder !== undefined) {
    skill.sortOrder =
      input.sortOrder;
  }

  if (input.published !== undefined) {
    skill.published =
      input.published;
  }

  await skill.save();

  return skill;
}

export async function deleteSkill(
  id: string
) {
  const skill =
    await Skill.findByIdAndDelete(id);

  if (!skill) {
    throw new AppError(
      "Skill not found",
      404
    );
  }

  return skill;
}
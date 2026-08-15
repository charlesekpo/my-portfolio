import { Project } from "../models/Project.js";
import { AppError } from "../utils/AppError.js";
import { createSlug } from "../utils/slug.js";

import type {
  CreateProjectInput,
  UpdateProjectInput
} from "../validators/project.validator.js";

interface GetProjectsOptions {
  page: number;
  limit: number;
  search?: string;
  published?: boolean;
  featured?: boolean;
}

export async function createProject(
  input: CreateProjectInput
) {
  let slug = createSlug(input.title);

  const existing =
    await Project.findOne({ slug });

  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const project = await Project.create({
    title: input.title,
    slug,
    shortDescription: input.shortDescription,
    description: input.description,
    technologies: input.technologies,
    thumbnail: input.thumbnail ?? "",
    images: input.images,
    liveUrl: input.liveUrl ?? "",
    githubUrl: input.githubUrl ?? "",
    videoUrl: input.videoUrl ?? "",
    featured: input.featured,
    published: input.published,
    sortOrder: input.sortOrder
  });

  return project;
}

export async function getProjects(
  options: GetProjectsOptions
) {
  const {
    page,
    limit,
    search,
    published,
    featured
  } = options;

  const filter: Record<
    string,
    unknown
  > = {};

  if (typeof published === "boolean") {
    filter.published = published;
  }

  if (typeof featured === "boolean") {
    filter.featured = featured;
  }

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i"
        }
      },
      {
        shortDescription: {
          $regex: search,
          $options: "i"
        }
      },
      {
        technologies: {
          $regex: search,
          $options: "i"
        }
      }
    ];
  }

  const skip =
    (page - 1) * limit;

  const [
    projects,
    total
  ] = await Promise.all([
    Project.find(filter)
      .sort({
        featured: -1,
        sortOrder: 1,
        createdAt: -1
      })
      .skip(skip)
      .limit(limit),

    Project.countDocuments(filter)
  ]);

  return {
    projects,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}

export async function getPublishedProjects() {
  return Project.find({
    published: true
  }).sort({
    featured: -1,
    sortOrder: 1,
    createdAt: -1
  });
}

export async function getProjectBySlug(
  slug: string
) {
  const project =
    await Project.findOne({
      slug
    });

  if (!project) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  return project;
}

export async function updateProject(
  id: string,
  input: UpdateProjectInput
) {
  const project =
    await Project.findById(id);

  if (!project) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  if (input.title !== undefined) {
    const newSlug =
      createSlug(input.title);

    const existing =
      await Project.findOne({
        slug: newSlug,
        _id: {
          $ne: id
        }
      });

    project.slug = existing
      ? `${newSlug}-${Date.now()}`
      : newSlug;

    project.title = input.title;
  }

  if (
    input.shortDescription !== undefined
  ) {
    project.shortDescription =
      input.shortDescription;
  }

  if (
    input.description !== undefined
  ) {
    project.description =
      input.description;
  }

  if (
    input.technologies !== undefined
  ) {
    project.technologies =
      input.technologies;
  }

  if (input.thumbnail !== undefined) {
    project.thumbnail =
      input.thumbnail;
  }

  if (input.images !== undefined) {
    project.images =
      input.images;
  }

  if (input.liveUrl !== undefined) {
    project.liveUrl =
      input.liveUrl;
  }

  if (input.githubUrl !== undefined) {
    project.githubUrl =
      input.githubUrl;
  }

  if (input.videoUrl !== undefined) {
    project.videoUrl =
      input.videoUrl;
  }

  if (input.featured !== undefined) {
    project.featured =
      input.featured;
  }

  if (input.published !== undefined) {
    project.published =
      input.published;
  }

  if (input.sortOrder !== undefined) {
    project.sortOrder =
      input.sortOrder;
  }

  await project.save();

  return project;
}

export async function deleteProject(
  id: string
) {
  const project =
    await Project.findByIdAndDelete(id);

  if (!project) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  return project;
}
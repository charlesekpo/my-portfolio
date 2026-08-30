import { Request, Response } from "express";

import { Project } from "../models/Project.js";
import { Skill } from "../models/Skill.js";
import { Experience } from "../models/Experience.js";
import { Video } from "../models/Video.js";
import { Message } from "../models/Message.js";
import { Media } from "../models/Media.js";

export async function getDashboardStats(
  _req: Request,
  res: Response
) {
  const [
    projects,
    skills,
    experience,
    videos,
    messages,
    media
  ] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Video.countDocuments(),
    Message.countDocuments(),
    Media.countDocuments()
  ]);

  res.json({
    success: true,
    data: {
      projects,
      skills,
      experience,
      videos,
      messages,
      media
    }
  });
}
import { Router } from "express";

import {
  create,
  list,
  adminList,
  update,
  remove
} from "../controllers/skill.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

import { validateBody } from "../middleware/validate.middleware.js";

import {
  createSkillSchema,
  updateSkillSchema
} from "../validators/skill.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  list
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  requireAuth,
  adminList
);

router.post(
  "/",
  requireAuth,
  validateBody(createSkillSchema),
  create
);

router.put(
  "/:id",
  requireAuth,
  validateBody(updateSkillSchema),
  update
);

router.delete(
  "/:id",
  requireAuth,
  remove
);

export default router;
import { Router } from "express";

import {
  create,
  list,
  publicList,
  getBySlug,
  update,
  remove
} from "../controllers/project.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

import { validateBody } from "../middleware/validate.middleware.js";

import {
  createProjectSchema,
  updateProjectSchema
} from "../validators/project.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/

router.get(
  "/public",
  publicList
);

router.get(
  "/slug/:slug",
  getBySlug
);

/*
|--------------------------------------------------------------------------
| Admin routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  requireAuth,
  list
);

router.post(
  "/",
  requireAuth,
  validateBody(createProjectSchema),
  create
);

router.put(
  "/:id",
  requireAuth,
  validateBody(updateProjectSchema),
  update
);

router.delete(
  "/:id",
  requireAuth,
  remove
);

export default router;
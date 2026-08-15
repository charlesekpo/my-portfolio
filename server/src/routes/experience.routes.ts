import { Router } from "express";

import {
  create,
  list,
  adminList,
  update,
  remove
} from "../controllers/experience.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

import { validateBody } from "../middleware/validate.middleware.js";

import {
  createExperienceSchema,
  updateExperienceSchema
} from "../validators/experience.validator.js";

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
  validateBody(
    createExperienceSchema
  ),
  create
);

router.put(
  "/:id",
  requireAuth,
  validateBody(
    updateExperienceSchema
  ),
  update
);

router.delete(
  "/:id",
  requireAuth,
  remove
);

export default router;
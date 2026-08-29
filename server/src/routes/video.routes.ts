import { Router } from "express";

import {
  create,
  adminList,
  getOne,
  list,
  remove,
  update
} from "../controllers/video.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

import { validateBody } from "../middleware/validate.middleware.js";

import {
  createVideoSchema,
  updateVideoSchema
} from "../validators/video.validator.js";

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

router.get(
  "/:id",
  getOne
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/all",
  requireAuth,
  adminList
);

router.post(
  "/",
  requireAuth,
  validateBody(
    createVideoSchema
  ),
  create
);

router.put(
  "/:id",
  requireAuth,
  validateBody(
    updateVideoSchema
  ),
  update
);

router.delete(
  "/:id",
  requireAuth,
  remove
);

export default router;
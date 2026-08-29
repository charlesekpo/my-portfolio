import { Router } from "express";

import {
  create,
  get,
  remove,
  update
} from "../controllers/siteSettings.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

import { validateBody } from "../middleware/validate.middleware.js";

import {
  createSiteSettingsSchema,
  updateSiteSettingsSchema
} from "../validators/siteSettings.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  get
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  requireAuth,
  validateBody(
    createSiteSettingsSchema
  ),
  create
);

router.put(
  "/",
  requireAuth,
  validateBody(
    updateSiteSettingsSchema
  ),
  update
);

router.delete(
  "/",
  requireAuth,
  remove
);

export default router;
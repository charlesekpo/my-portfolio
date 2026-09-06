import {
  Router
} from "express";

import {
  create,
  list,
  adminList,
  update,
  remove
} from "../controllers/education.controller.js";

import {
  requireAuth
} from "../middleware/auth.middleware.js";

import {
  validateBody
} from "../middleware/validate.middleware.js";

import {
  createEducationSchema,
  updateEducationSchema
} from "../validators/education.validator.js";

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
    createEducationSchema
  ),
  create
);

router.put(
  "/:id",
  requireAuth,
  validateBody(
    updateEducationSchema
  ),
  update
);

router.delete(
  "/:id",
  requireAuth,
  remove
);

export default router;

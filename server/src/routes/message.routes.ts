import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  remove,
  updateStatus
} from "../controllers/message.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

import { validateBody } from "../middleware/validate.middleware.js";

import {
  createMessageSchema,
  updateMessageStatusSchema
} from "../validators/message.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  validateBody(createMessageSchema),
  create
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  requireAuth,
  getAll
);

router.get(
  "/:id",
  requireAuth,
  getOne
);

router.patch(
  "/:id/status",
  requireAuth,
  validateBody(
    updateMessageStatusSchema
  ),
  updateStatus
);

router.delete(
  "/:id",
  requireAuth,
  remove
);

export default router;
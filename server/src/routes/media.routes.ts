import { Router } from "express";

import {
  getAll,
  getOne,
  remove,
  upload
} from "../controllers/media.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

import { upload as uploadMiddleware } from "../middleware/upload.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Media
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  requireAuth,
  uploadMiddleware.single("file"),
  upload
);

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

router.delete(
  "/:id",
  requireAuth,
  remove
);

export default router;
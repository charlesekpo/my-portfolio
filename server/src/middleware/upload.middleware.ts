import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "uploads/images");
      return;
    }

    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/documents");
      return;
    }

    cb(
      new Error("Unsupported file type"),
      ""
    );
  },

  filename: (_req, file, cb) => {
    const extension =
      path.extname(
        file.originalname
      ).toLowerCase();

    const filename =
      `${Date.now()}-${crypto.randomUUID()}${extension}`;

    cb(null, filename);
  }
});

const fileFilter: multer.Options["fileFilter"] =
  (_req, file, cb) => {
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    const allowedDocumentTypes = [
      "application/pdf"
    ];

    if (
      allowedImageTypes.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
      return;
    }

    if (
      allowedDocumentTypes.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
      return;
    }

    cb(
      new Error(
        "Only JPEG, PNG, WebP images and PDF documents are allowed"
      )
    );
  };

export const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024
  }
});
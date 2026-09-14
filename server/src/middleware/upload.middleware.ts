import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] =
  (_req, file, cb) => {
    console.log("File filter check:", file.mimetype, file.originalname);

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    const allowedVideoTypes = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/webm"
    ];

    const allowedDocumentTypes = [
      "application/pdf"
    ];

    if (
      allowedImageTypes.includes(
        file.mimetype
      )
    ) {
      console.log("Image file accepted");
      cb(null, true);
      return;
    }

    if (
      allowedVideoTypes.includes(
        file.mimetype
      )
    ) {
      console.log("Video file accepted");
      cb(null, true);
      return;
    }

    if (
      allowedDocumentTypes.includes(
        file.mimetype
      )
    ) {
      console.log("Document file accepted");
      cb(null, true);
      return;
    }

    console.log("File rejected - unsupported type");
    cb(
      new Error(
        "Only JPEG, PNG, WebP images, MP4/MOV/AVI/WebM videos, and PDF documents are allowed"
      )
    );
  };

export const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB for videos
    fieldSize: 100 * 1024 * 1024
  }
});
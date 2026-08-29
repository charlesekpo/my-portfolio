import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { errorMiddleware } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import videoRoutes from "./routes/video.routes.js";
import siteSettingsRoutes from "./routes/siteSettings.routes.js";
import messageRoutes from "./routes/message.routes.js";

import { env } from "./config/env.js";

const app = express();

app.set("trust proxy", 1);

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true
  })
);

/*
|--------------------------------------------------------------------------
| Performance
|--------------------------------------------------------------------------
*/

app.use(compression());

/*
|--------------------------------------------------------------------------
| Request parsing
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "1mb"
  })
);

/*
|--------------------------------------------------------------------------
| Logging
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Rate limiting
|--------------------------------------------------------------------------
*/

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false
  })
);

app.use("/api/auth", authRoutes);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/skills",
  skillRoutes
);

app.use(
  "/api/experience",
  experienceRoutes
);

app.use(
  "/api/videos",
  videoRoutes
);

app.use(
  "/api/settings",
  siteSettingsRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

/*
|--------------------------------------------------------------------------
| Health check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running"
  });
});

app.use(errorMiddleware);

export default app;
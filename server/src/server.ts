import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";

async function startServer(): Promise<void> {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    console.log(
      `Server running at http://localhost:${env.PORT}`
    );
  });

  // Increase timeout for large file uploads
  server.setTimeout(10 * 60 * 1000); // 10 minutes
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
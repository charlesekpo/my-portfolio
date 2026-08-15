import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(
      `Server running at http://localhost:${env.PORT}`
    );
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
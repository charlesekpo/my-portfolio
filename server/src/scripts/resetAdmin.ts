import bcrypt from "bcryptjs";

import { connectDatabase } from "../config/db.js";
import { User } from "../models/User.js";

async function resetAdmin() {
  await connectDatabase();

  const email =
    process.env.ADMIN_EMAIL;

  const password =
    process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD are required"
    );
  }

  if (password.length < 8) {
    throw new Error(
      "Admin password must contain at least 8 characters"
    );
  }

  const user =
  await User.findOne({
    email: email.toLowerCase().trim()
  });

  if (!user) {
    throw new Error(
      `Admin account not found for ${email}`
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 12);

  user.password = hashedPassword;
  user.isActive = true;

  await user.save();

  console.log(
    `Admin password successfully reset for ${email}`
  );

  process.exit(0);
}

resetAdmin().catch((error) => {
  console.error(
    "Failed to reset admin password:",
    error
  );

  process.exit(1);
});


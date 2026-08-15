import bcrypt from "bcryptjs";

import { connectDatabase } from "../config/db.js";
import { User } from "../models/User.js";

async function seedAdmin() {
  await connectDatabase();

  const email =
    process.env.ADMIN_EMAIL;

  const password =
    process.env.ADMIN_PASSWORD;

  const name =
    process.env.ADMIN_NAME ?? "Admin";

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

  const existingUser =
    await User.findOne({ email });

  if (existingUser) {
    console.log(
      "Admin account already exists."
    );

    process.exit(0);
  }

  const hashedPassword =
    await bcrypt.hash(password, 12);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
    isActive: true
  });

  console.log(
    `Admin account created for ${email}`
  );

  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error(
    "Failed to seed admin:",
    error
  );

  process.exit(1);
});
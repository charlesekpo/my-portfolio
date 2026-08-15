import bcrypt from "bcryptjs";

import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { generateToken } from "../utils/jwt.js";

interface LoginInput {
  email: string;
  password: string;
}

export async function loginUser({
  email,
  password
}: LoginInput) {
  const user = await User.findOne({
    email: email.toLowerCase()
  }).select("+password");

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  if (!user.isActive) {
    throw new AppError(
      "This account is disabled",
      403
    );
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatches) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
}
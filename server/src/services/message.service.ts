import { Message } from "../models/Message.js";
import { AppError } from "../utils/AppError.js";

import type {
  CreateMessageInput,
  UpdateMessageStatusInput
} from "../validators/message.validator.js";

export async function createMessage(
  input: CreateMessageInput
) {
  return Message.create({
    ...input,
    status: "unread"
  });
}

export async function getMessages() {
  return Message.find()
    .sort({ createdAt: -1 })
    .lean();
}

export async function getMessageById(
  id: string
) {
  const message =
    await Message.findById(id).lean();

  if (!message) {
    throw new AppError(
      "Message not found",
      404
    );
  }

  return message;
}

export async function updateMessageStatus(
  id: string,
  input: UpdateMessageStatusInput
) {
  const message =
    await Message.findByIdAndUpdate(
      id,
      {
        status: input.status
      },
      {
        new: true,
        runValidators: true
      }
    ).lean();

  if (!message) {
    throw new AppError(
      "Message not found",
      404
    );
  }

  return message;
}

export async function deleteMessage(
  id: string
) {
  const message =
    await Message.findByIdAndDelete(id);

  if (!message) {
    throw new AppError(
      "Message not found",
      404
    );
  }

  return message;
}
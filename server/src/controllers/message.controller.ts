import type {
  Request,
  Response
} from "express";

import {
  createMessage,
  deleteMessage,
  getMessageById,
  getMessages,
  updateMessageStatus
} from "../services/message.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

function getParamId(
  req: Request
): string {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error(
      "Message ID is required"
    );
  }

  return id;
}

export const create =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const message =
        await createMessage(req.body);

      res.status(201).json({
        success: true,
        message:
          "Message sent successfully",
        data: message
      });
    }
  );

export const getAll =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const messages =
        await getMessages();

      res.json({
        success: true,
        data: messages
      });
    }
  );

export const getOne =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const message =
        await getMessageById(
          getParamId(req)
        );

      res.json({
        success: true,
        data: message
      });
    }
  );

export const updateStatus =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const message =
        await updateMessageStatus(
          getParamId(req),
          req.body
        );

      res.json({
        success: true,
        data: message
      });
    }
  );

export const remove =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      await deleteMessage(
        getParamId(req)
      );

      res.status(204).send();
    }
  );
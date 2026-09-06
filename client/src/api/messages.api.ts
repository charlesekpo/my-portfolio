import apiClient from "./client";

export type MessageStatus =
  | "unread"
  | "read"
  | "replied"
  | "archived";

export interface CreateMessageInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
}

interface MessageResponse {
  success: boolean;
  message?: string;
  data: Message;
}

interface MessagesResponse {
  success: boolean;
  data: Message[];
}

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

export async function sendMessage(
  input: CreateMessageInput
) {
  const response =
    await apiClient.post<MessageResponse>(
      "/messages",
      input
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

export async function getMessages() {
  const response =
    await apiClient.get<MessagesResponse>(
      "/messages"
    );

  return response.data.data;
}

export async function getMessageById(
  id: string
) {
  const response =
    await apiClient.get<MessageResponse>(
      `/messages/${id}`
    );

  return response.data.data;
}

export async function updateMessageStatus(
  id: string,
  status: MessageStatus
) {
  const response =
    await apiClient.patch<MessageResponse>(
      `/messages/${id}/status`,
      {
        status
      }
    );

  return response.data.data;
}

export async function deleteMessage(
  id: string
) {
  await apiClient.delete(
    `/messages/${id}`
  );
}
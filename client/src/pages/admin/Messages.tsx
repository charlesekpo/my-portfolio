import {
  useEffect,
  useState
} from "react";

import {
  deleteMessage,
  getMessages,
  updateMessageStatus,
  type Message,
  type MessageStatus
} from "../../api/messages.api";

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  ).format(
    new Date(value)
  );
}

function getStatusLabel(
  status: MessageStatus
) {
  switch (status) {
    case "unread":
      return "Unread";

    case "read":
      return "Read";

    case "replied":
      return "Replied";

    case "archived":
      return "Archived";
  }
}

export default function Messages() {
  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);

  async function loadMessages() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getMessages();

      setMessages(data);
    } catch {
      setError(
        "Failed to load messages."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleStatusChange(
    message: Message,
    status: MessageStatus
  ) {
    try {
      setError("");

      const updated =
        await updateMessageStatus(
          message._id,
          status
        );

      setMessages((current) =>
        current.map((item) =>
          item._id === updated._id
            ? updated
            : item
        )
      );

      setSelectedMessage((current) =>
        current?._id === updated._id
          ? updated
          : current
      );
    } catch {
      setError(
        "Failed to update message status."
      );
    }
  }

  async function handleDelete(
    message: Message
  ) {
    const confirmed =
      window.confirm(
        `Delete the message from ${message.name}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteMessage(
        message._id
      );

      setMessages((current) =>
        current.filter(
          (item) =>
            item._id !== message._id
        )
      );

      setSelectedMessage((current) =>
        current?._id === message._id
          ? null
          : current
      );
    } catch {
      setError(
        "Failed to delete message."
      );
    }
  }

  const unreadCount =
    messages.filter(
      (message) =>
        message.status === "unread"
    ).length;

  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>
            Messages
          </h2>

          <p>
            Manage messages sent from
            your portfolio contact form.
          </p>
        </div>

        <div className="admin-page-count">
          {unreadCount} unread
        </div>
      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="admin-loading">
          Loading messages...
        </div>
      ) : (
        <div className="messages-layout">

          <div className="messages-list-card">

            <div className="messages-list-header">
              <div>
                <h3>
                  Inbox
                </h3>

                <p>
                  {messages.length} total
                  {messages.length === 1
                    ? " message"
                    : " messages"}
                </p>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="messages-empty">
                <h3>
                  No messages yet
                </h3>

                <p>
                  Messages sent through your
                  contact form will appear here.
                </p>
              </div>
            ) : (
              <div className="messages-list">

                {messages.map(
                  (message) => (
                    <button
                      key={message._id}
                      type="button"
                      className={
                        selectedMessage?._id ===
                        message._id
                          ? "message-list-item active"
                          : "message-list-item"
                      }
                      onClick={() =>
                        setSelectedMessage(
                          message
                        )
                      }
                    >
                      <div className="message-list-top">
                        <strong>
                          {message.name}
                        </strong>

                        <span
                          className={
                            `message-status ${message.status}`
                          }
                        >
                          {getStatusLabel(
                            message.status
                          )}
                        </span>
                      </div>

                      <span className="message-email">
                        {message.email}
                      </span>

                      <span className="message-subject">
                        {message.subject ||
                          "No subject"}
                      </span>

                      <span className="message-date">
                        {formatDate(
                          message.createdAt
                        )}
                      </span>
                    </button>
                  )
                )}

              </div>
            )}

          </div>

          <div className="message-detail-card">

            {selectedMessage ? (
              <>
                <div className="message-detail-header">

                  <div>
                    <span className="message-detail-label">
                      MESSAGE
                    </span>

                    <h3>
                      {selectedMessage.subject ||
                        "No subject"}
                    </h3>
                  </div>

                  <span
                    className={
                      `message-status ${selectedMessage.status}`
                    }
                  >
                    {getStatusLabel(
                      selectedMessage.status
                    )}
                  </span>

                </div>

                <div className="message-sender">

                  <div>
                    <span>
                      From
                    </span>

                    <strong>
                      {selectedMessage.name}
                    </strong>
                  </div>

                  <a
                    href={
                      `mailto:${selectedMessage.email}`
                    }
                  >
                    {selectedMessage.email}
                  </a>

                </div>

                <div className="message-content">
                  {selectedMessage.message}
                </div>

                <div className="message-detail-date">
                  Received{" "}
                  {formatDate(
                    selectedMessage.createdAt
                  )}
                </div>

                <div className="message-actions">

                  <select
                    value={
                      selectedMessage.status
                    }
                    onChange={(event) =>
                      handleStatusChange(
                        selectedMessage,
                        event.target
                          .value as MessageStatus
                      )
                    }
                  >
                    <option value="unread">
                      Unread
                    </option>

                    <option value="read">
                      Read
                    </option>

                    <option value="replied">
                      Replied
                    </option>

                    <option value="archived">
                      Archived
                    </option>
                  </select>

                  <a
                    className="message-reply-button"
                    href={
                      `mailto:${selectedMessage.email}?subject=Re: ${
                        selectedMessage.subject ||
                        "Your message"
                      }`
                    }
                    onClick={() =>
                      handleStatusChange(
                        selectedMessage,
                        "replied"
                      )
                    }
                  >
                    Reply by Email
                  </a>

                  <button
                    type="button"
                    className="message-delete-button"
                    onClick={() =>
                      handleDelete(
                        selectedMessage
                      )
                    }
                  >
                    Delete
                  </button>

                </div>
              </>
            ) : (
              <div className="message-detail-empty">
                <h3>
                  Select a message
                </h3>

                <p>
                  Choose a message from the inbox
                  to read its contents.
                </p>
              </div>
            )}

          </div>

        </div>
      )}
    </section>
  );
}
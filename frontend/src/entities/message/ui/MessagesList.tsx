import { ReceivedMessage } from "../types/message";
import { Box, List } from "@mui/material";
import React from "react";

interface MessagesListProps {
  messages: ReceivedMessage[];
  children: (message: ReceivedMessage) => React.ReactNode;
}

// TODO: здесь необходимо использовать какой-нибудь вирутальный список по типу virtuoso (https://virtuoso.dev/virtuoso-message-list/)
export const MessagesList: React.FC<MessagesListProps> = ({
  children,
  messages,
}) => (
  <List sx={{ p: 1 }}>
    {messages.map((message) => (
      <Box key={message.id} sx={{ display: "flex", paddingBottom: "2rem" }}>
        <Box sx={{ marginLeft: message.isCurrentUser ? "auto" : "none" }}>
          {children(message)}
        </Box>
      </Box>
    ))}
  </List>
);

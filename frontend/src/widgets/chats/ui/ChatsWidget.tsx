"use client";
import {
  ChatsList,
  ReceivedChat,
  useChatSubscription,
} from "@/src/entities/chat";
import { OpenChatListItem } from "@/src/features/chat";
import { Divider } from "@mui/material";
import React from "react";
import { useState } from "react";

export const ChatsWidget = () => {
  const [chats, setChats] = useState<ReceivedChat[]>([]);
  useChatSubscription("receiveChats", setChats);

  return (
    <ChatsList>
      {chats.map((chat, index, arr) => (
        <React.Fragment key={chat.id}>
          <OpenChatListItem chat={chat} />
          {index !== arr.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </React.Fragment>
      ))}
    </ChatsList>
  );
};

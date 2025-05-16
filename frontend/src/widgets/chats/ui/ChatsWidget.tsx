"use client";
import {
  ChatsList,
  ReceivedChat,
  useChatSocket,
  useChatSubscription,
} from "@/src/entities/chat";
import { OpenChatListItem } from "@/src/features/chat";
import { Divider } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";

export const ChatsWidget = () => {
  const [chats, setChats] = useState<ReceivedChat[]>([]);
  useChatSubscription("receiveChats", setChats);
  const { socket } = useChatSocket();
  useEffect(() => {
    socket.emit("chatsBetween", {
      dateFrom: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      dateTo: new Date().toISOString(),
    });
  }, [socket]);

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

"use client";
import { useEffect, useState } from "react";
import {
  useChatSubscription,
  useChatSocket,
} from "@/src/entities/chat/@x/message";
import { ReceivedMessage } from "../types/message";

export function useChatMessages(chatId: string) {
  const { socket } = useChatSocket();
  useEffect(() => {
    socket.emit("chatMessages", { chatId });
  }, [chatId, socket]);

  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  useChatSubscription("receiveMessages", setMessages);

  return messages;
}

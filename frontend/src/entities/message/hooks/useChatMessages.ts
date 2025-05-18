"use client";
import { useCallback, useEffect, useState } from "react";
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
  const handleGetMessages = useCallback(
    (receivedMessages: ReceivedMessage[]) => {
      setMessages((messages) => messages.concat(receivedMessages));
    },
    []
  );
  useChatSubscription("receiveMessages", handleGetMessages);

  return messages;
}

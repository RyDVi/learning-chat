'use client'
import { useChatSocket } from "@/src/entities/chat";
import { ChatsSearch } from "@/src/features/chat/search";
import { ChatsWidget } from "@/src/widgets/chats";
import { useEffect, useState } from "react";

export const ChatsPage = () => {
  const [searchText, setSearchText] = useState("");

  const { socket } = useChatSocket();
  useEffect(() => {
    if (!searchText) {
      socket.emit("chatsBetween", {
        dateFrom: new Date().toISOString(),
        dateTo: new Date().toISOString(),
      });
    }
  }, [searchText, socket]);

  return (
    <>
      <ChatsSearch searchText={searchText} onChange={setSearchText} />
      <ChatsWidget />
    </>
  );
};

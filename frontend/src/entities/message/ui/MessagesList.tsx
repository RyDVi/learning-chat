import { ReceivedMessage } from "../types/message";
import { Box, List, ListProps } from "@mui/material";
import React, { useEffect, useRef } from "react";

interface MessagesListProps {
  messages: ReceivedMessage[];
  children: (message: ReceivedMessage) => React.ReactNode;
}

// TODO: здесь необходимо использовать какой-нибудь вирутальный список по типу virtuoso (https://virtuoso.dev/virtuoso-message-list/)
export const MessagesList: React.FC<
  MessagesListProps & Omit<ListProps, "children" | "ref">
> = ({ children, messages, ...props }) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // TODO: WTF?
    requestAnimationFrame(()=>{
      setTimeout(() => {
        if (!listRef.current) return;
        listRef.current.scrollTop = 999999;
      }, 100);
    })
  }, []);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    // Get the last message element
    const lastMessageEl = listEl.lastElementChild;
    const prevLastMessageEl = listEl.children[listEl.children.length - 2];
    if (!lastMessageEl || !prevLastMessageEl) return;

    const lastTwoMessagesHeight = lastMessageEl.clientHeight + prevLastMessageEl.clientHeight;

    // Calculate how far from the bottom the scroll is
    const scrollFromBottom =
      listEl.scrollHeight - listEl.scrollTop - listEl.clientHeight;
    console.log(scrollFromBottom, lastTwoMessagesHeight)
    // Scroll if the scroll position is less than the height of the new element
    if (scrollFromBottom < lastTwoMessagesHeight) {
      // Defer scrolling until after DOM updates
      requestAnimationFrame(() => {
        listEl.scrollTo({ top: listEl.scrollHeight });
      });
    }
  }, [messages]);

  return (
    <List
      {...props}
      ref={listRef}
      sx={{ p: 1, height: 1, overflowY: "auto", ...props.sx }}
    >
      {messages.map((message) => (
        <Box key={message.id} sx={{ display: "flex", paddingBottom: "2rem" }}>
          <Box sx={{ marginLeft: message.isCurrentUser ? "auto" : "none" }}>
            {children(message)}
          </Box>
        </Box>
      ))}
    </List>
  );
};

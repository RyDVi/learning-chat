"use client";
import { useEffect } from "react";
import { useChatSocket } from "./useSocket";
import { ChatServerToClientEvents } from "./chatSocket";

export function useChatSubscription<
  EventName extends keyof ChatServerToClientEvents
>(eventName: EventName, on: ChatServerToClientEvents[EventName]) {
  const { socket } = useChatSocket();
  useEffect(() => {
    socket.on<EventName>(
      eventName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on as any
    );
    return () => {
      socket.off(eventName);
    };
  }, [on, socket, eventName]);
}

"use client";
import { createContext } from "react";
import { Socket } from "socket.io-client";
import {
  ChatClientToServerEvents,
  ChatServerToClientEvents,
} from "./chatSocket";

export interface ChatSocketContextProps {
  socket: Socket<ChatServerToClientEvents, ChatClientToServerEvents>;
}
export const ChatSocketContext = createContext<ChatSocketContextProps>({
  socket: null as unknown as Socket,
});

import { useContext } from "react";
import { ChatSocketContext } from "../context/socketContext";

export function useChatSocket() {
  const socketContext = useContext(ChatSocketContext);
  return socketContext;
}

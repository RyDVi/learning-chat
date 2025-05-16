import { useContext } from "react";
import { ChatSocketContext } from "./socketContext";

export function useChatSocket() {
  const socketContext = useContext(ChatSocketContext);
  return socketContext;
}

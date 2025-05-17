import { ReceivedChat } from "./chat";
import { ReceivedMessage } from "@/src/entities/message/@x/chat";

export interface ChatClientToServerEvents {
  chatsBetween: (data: { dateFrom: string; dateTo: string }) => void;
  chatMessages: (data: { chatId: string }) => void;
}

export interface ChatServerToClientEvents {
  receiveChats: (chat: ReceivedChat[]) => void;
  receiveMessages: (messsages: ReceivedMessage[]) => void;
}

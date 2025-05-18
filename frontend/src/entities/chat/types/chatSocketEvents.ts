import { ReceivedChat } from "./chat";
import {
  MessageForSend,
  ReceivedMessage,
} from "@/src/entities/message/@x/chat";

export interface ChatClientToServerEvents {
  chatsBetween: (data: { dateFrom: string; dateTo: string }) => void;
  chatMessages: (data: { chatId: string }) => void;
  sendMessageToChat: (data: MessageForSend) => void;
}

export interface ChatServerToClientEvents {
  receiveChats: (chat: ReceivedChat[]) => void;
  receiveMessages: (messsages: ReceivedMessage[]) => void;
}

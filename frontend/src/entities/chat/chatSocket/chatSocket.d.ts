import { ReceivedChat } from "../types/chat";

export interface ChatClientToServerEvents {
  chatsBetween: (data: { dateFrom: string; dateTo: string }) => void;
}

export interface ChatServerToClientEvents {
  receiveChats: (chat: ReceivedChat[]) => void;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
  text: string;
}

export interface ReceivedMessage extends Message {
  isCurrentUser: boolean;
}

export type MessageForSend = Omit<
  Message,
  "id" | "senderId" | "createdAt" | "updatedAt"
>;

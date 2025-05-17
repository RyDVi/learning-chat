// export interface Message {
//   id: string;
//   chatId: string;
//   sender: string;
//   senderId: string;
//   createdAt: string;
//   updatedAt: string;
//   text: string;
// }

import { Message } from "../../message/types/message";

export enum ChatTypeEnum {
  group,
  user_to_user,
}

export interface Chat {
  id: string;
  type: ChatTypeEnum;
}

export interface UserChat {
  chatId: string;
  id: string;
  user: User;
}

interface User {
  id: string;
  email: string;
  createdAt: string;
  password: string;
  phone?: string;
  updatedAt: string;
}

export type ReceivedUser = Pick<User, "email" | "id" | "phone">;

export interface ReceivedChat extends Chat {
  UserChat: UserChat[];
  messages: Message[];
}

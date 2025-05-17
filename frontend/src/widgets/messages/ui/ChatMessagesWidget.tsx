"use client"
import { MessagesList, useChatMessages } from "@/src/entities/message";
import { MessageListItem } from "@/src/entities/message/ui/Message";

interface ChatMessagesWidget {
  chatId: string;
}

export const ChatMessagesWidget: React.FC<ChatMessagesWidget> = ({
  chatId,
}) => {
  const messages = useChatMessages(chatId);

  return (
    <MessagesList messages={messages}>
      {(message) => <MessageListItem message={message} />}
    </MessagesList>
  );
};

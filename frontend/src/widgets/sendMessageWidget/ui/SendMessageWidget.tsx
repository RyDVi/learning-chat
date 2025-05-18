"use client";
import { MessageField, MessageForSend } from "@/src/entities/message";
import {
  SendMessageInChatButton,
  SendMessageInChatButtonRefProps,
} from "@/src/features/message/sendMessage";
import { useCallback, useRef, useState } from "react";

interface SendMessageWidgetProps {
  chatId: string;
}

const getInitialMessageForSend = ({
  chatId,
}: Partial<MessageForSend> &
  Pick<MessageForSend, "chatId">): MessageForSend => ({
  chatId,
  text: "",
});

export const SendMessageWidget: React.FC<SendMessageWidgetProps> = ({
  chatId,
}) => {
  const ref = useRef<SendMessageInChatButtonRefProps>(null);
  const [messageForSend, setMessageForSend] = useState<MessageForSend>(
    getInitialMessageForSend({ chatId })
  );

  const handleMessageFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setMessageForSend({ ...messageForSend, text: e.target.value });

  const handleMessageFieldKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        ref.current?.sendMessage();
      }
    },
    []
  );

  return (
    <MessageField
      value={messageForSend.text}
      onChange={handleMessageFieldChange}
      onKeyDown={handleMessageFieldKeyDown}
      rightActions={
        <SendMessageInChatButton
          ref={ref}
          message={messageForSend}
          disabled={!messageForSend.text}
          onSent={() => setMessageForSend(getInitialMessageForSend({ chatId }))}
        />
      }
    />
  );
};

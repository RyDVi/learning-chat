import { MessageForSend } from "@/src/entities/message";
import { IconButton, IconButtonProps } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useChatSocket } from "@/src/entities/chat";
import { Ref, useCallback, useImperativeHandle } from "react";

export interface SendMessageInChatButtonRefProps {
  sendMessage: () => void;
}

interface SendMessageInChatButtonProps {
  message: MessageForSend;
  onSent: () => void;
  ref: Ref<SendMessageInChatButtonRefProps>;
}

export const SendMessageInChatButton: React.FC<
  SendMessageInChatButtonProps & Omit<IconButtonProps, "onClick" | "ref">
> = ({ message, onSent, ref, ...props }) => {
  const { socket } = useChatSocket();

  const handleSendMessageToChat = useCallback(() => {
    if (!message.text.trim()) return;
    socket.emit("sendMessageToChat", message);
    onSent();
  }, [message, onSent, socket]);

  useImperativeHandle(ref, () => ({
    sendMessage: handleSendMessageToChat,
  }));

  return (
    <IconButton
      {...props}
      onKeyUp={(e) => {
        console.log(e.key);
        if (e.key === "Enter") {
          handleSendMessageToChat();
        }
      }}
      onClick={handleSendMessageToChat}
    >
      <SendIcon />
    </IconButton>
  );
};

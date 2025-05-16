import { ChatListItem } from "@/src/entities/chat";
import { paths } from "@/src/shared/lib";
import { ListItemButton } from "@mui/material";
import Link from "next/link";

export const OpenChatListItem: React.FC<Parameters<typeof ChatListItem>[0]> = ({
  chat,
  ...props
}) => (
  <Link href={paths.chat({ chatId: chat.id })}>
    <ListItemButton>
      <ChatListItem {...props} chat={chat} />
    </ListItemButton>
  </Link>
);

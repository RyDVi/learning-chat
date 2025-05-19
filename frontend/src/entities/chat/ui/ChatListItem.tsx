import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemText,
} from "@mui/material";
import { ReceivedChat } from "../types/chat";

interface ChatListItemProps {
  chat: ReceivedChat;
}

export const ChatListItem: React.FC<ListItemProps & ChatListItemProps> = ({
  chat,
  ...props
}) => {
  const chatName = /*chat.name || ...*/ chat.UserChat[1]?.user.email;
  const lastMessage = chat.messages[0];
  return (
    <ListItem {...props}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={chatName} secondary={lastMessage?.text} />
      <ListItemText
        sx={{ ml: 2, textAlign: "end" }}
        slotProps={{
          primary: {
            fontSize: "0.8rem",
            color: "textDisabled",
          },
        }}
        primary={
          lastMessage?.createdAt
            ? new Date(lastMessage.createdAt).toLocaleDateString()
            : null
        }
        secondary={<>&shy;</>}
      />
    </ListItem>
  );
};

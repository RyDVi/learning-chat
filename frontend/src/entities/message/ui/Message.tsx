import { ListItem, ListItemText, Paper } from "@mui/material";
import { ReceivedMessage } from "../types/message";

interface MessageListItemProps {
  message: ReceivedMessage;
}
export const MessageListItem: React.FC<MessageListItemProps> = ({
  message,
}) => {
  return (
    <Paper
      sx={{
        background: message.isCurrentUser ? "primary.main" : "secondary.main",
      }}
    >
      <ListItem>
        <ListItemText
          primary={message.text}
          secondary={
            message.createdAt === message.updatedAt
              ? new Date(message.createdAt).toLocaleDateString()
              : `изменено ${new Date(message.updatedAt).toLocaleDateString()}`
          }
          slotProps={{
            primary: {
              whiteSpace: "pre-line",
            },
          }}
        />
      </ListItem>
    </Paper>
  );
};

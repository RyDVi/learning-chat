import { List, ListProps } from "@mui/material";

export const ChatsList: React.FC<ListProps> = (props) => (
  <List {...props} sx={{ overflowY: "auto", height: '100%', ...props.sx }} />
);

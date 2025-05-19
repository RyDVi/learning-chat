import { useChatSocket } from "@/src/entities/chat";
import { ChatsSearchField } from "@/src/entities/chat/ui/ChatsSearchField";
import { CloseOutlined } from "@mui/icons-material";
import { debounce, IconButton } from "@mui/material";
import { useCallback, useMemo } from "react";

interface ChatsSearchProps {
  searchText: string;
  onChange: (searchText: string) => void;
}

export const ChatsSearch: React.FC<ChatsSearchProps> = ({
  onChange,
  searchText,
}) => {
  const { socket } = useChatSocket();
  console.log(searchText);
  const searchChat = useMemo(
    () =>
      debounce((searchText: string) => {
        socket.emit("chatsSearch", { searchText });
      }, 1000),
    [socket]
  );

  const handleSearchChat = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onChange(event.target.value);

      searchChat(event.target.value);
    },
    [onChange, searchChat]
  );

  return (
    <ChatsSearchField
      value={searchText}
      onChange={handleSearchChat}
      rightActions={
        <IconButton onClick={() => onChange("")} disabled={!searchText}>
          <CloseOutlined />
        </IconButton>
      }
    />
  );
};

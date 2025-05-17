import { ChatSocketProvider } from "@/src/entities/chat";
import { ChatsWidget } from "@/src/widgets/chats";
import { Box, Container, Paper } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChatSocketProvider>
      <Container maxWidth="lg">
        <Paper
          elevation={5}
          sx={{
            minHeight: "calc(100dvh - 2rem)",
            display: "grid",
            // TODO: добавить адаптив с выбором страницы на маленьких экранах
            gridTemplateColumns: "minmax(300px, auto) 1fr",
            m: "1rem",
          }}
        >
          <Box>
            {/* TODO: по идее, это должен быть @chatsList сегмент в отдельном каталоге, но он не работает. Разобраться почему... */}
            <ChatsWidget />
          </Box>
          <Paper elevation={1}>{children}</Paper>
          {/* {children} */}
        </Paper>
      </Container>
    </ChatSocketProvider>
  );
}

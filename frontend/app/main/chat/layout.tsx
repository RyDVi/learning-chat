import { ChatSocketProvider } from "@/src/entities/chat";
import { ChatsPage } from "@/src/pages/chatsPage";
import { Box, Container, Paper } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChatSocketProvider>
      <Container maxWidth="lg">
        <Paper
          elevation={5}
          sx={{
            height: "calc(100dvh - 2rem)",
            display: "grid",
            // TODO: добавить адаптив с выбором страницы на маленьких экранах
            gridTemplateColumns: "minmax(300px, auto) 1fr",
            m: "1rem",
          }}
        >
          <Box
            sx={{
              display: "grid",
              width: 1,
              gridTemplateRows: "auto 1fr",
              height: "inherit",
            }}
          >
            {/* TODO: по идее, это должен быть @chatsList сегмент в отдельном каталоге, но он не работает. Разобраться почему... */}
            <ChatsPage />
          </Box>
          {children}
        </Paper>
      </Container>
    </ChatSocketProvider>
  );
}

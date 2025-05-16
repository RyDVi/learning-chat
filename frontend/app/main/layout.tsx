import { ChatSocketProvider } from "@/src/entities/chat";
import { Box, Container, Paper } from "@mui/material";

export default function Layout({
  children,
  chat,
  chatsList,
}: {
  children: React.ReactNode;
  chat: React.ReactNode;
  chatsList: React.ReactNode;
}) {
  return (
    <ChatSocketProvider>
      <Container maxWidth="lg">
        <Paper
          elevation={5}
          sx={{
            minHeight: "80dvh",
            display: "grid",
            gridTemplateColumns: "minmax(300px, auto) 1fr",
            m: 0.5,
          }}
        >
          <Box>{chatsList}</Box>
          <Paper elevation={1}>{chat}</Paper>
          {children}
        </Paper>
      </Container>
    </ChatSocketProvider>
  );
}

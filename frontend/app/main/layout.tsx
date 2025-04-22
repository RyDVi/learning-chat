import { Box, Container } from "@mui/material";

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
    <Container maxWidth="lg">
      <Box>{chatsList}</Box>
      <Box>{chat}</Box>
      {children}
    </Container>
  );
}

import { Container, Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => (
  <Container
    maxWidth="sm"
    sx={{
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
    }}
  >
    <Paper sx={{ p: 1 }} elevation={3}>
      {children}
    </Paper>
  </Container>
);

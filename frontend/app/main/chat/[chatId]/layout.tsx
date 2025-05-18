import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Paper
      sx={{
        display: "grid",
        width: 1,
        p: 1,
        gridTemplateRows: "1fr auto",
        height: "inherit",
      }}
    >
      {children}
    </Paper>
  );
}

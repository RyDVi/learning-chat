"use client";
import { Box, BoxProps, Typography } from "@mui/material";
import { LoginFields } from "./LoginFields";
import { GetFieldProps } from "@/src/shared/hooks/useForm";
import { Login } from "@/src/entities/login/types/login";

interface LoginFormProps {
  actions?: React.ReactNode;
  getFieldProps: GetFieldProps<Login>;
}

export const LoginForm = ({ actions, getFieldProps, ...props }: LoginFormProps & BoxProps) => (
  <Box
    component="form"
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "3rem",
      ...props.sx,
    }}
  >
    <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
      Вход
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <LoginFields getFieldProps={getFieldProps} />
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {actions}
    </Box>
  </Box>
);

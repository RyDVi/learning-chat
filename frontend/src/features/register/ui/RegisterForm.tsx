"use client";
import { Box, BoxProps, Typography } from "@mui/material";
import { RegisterFields } from "./RegisterFields";
import { Register } from "@/src/entities/register";
import { GetFieldProps } from "@/src/shared/hooks/useForm";

interface RegisterFormProps {
  actions?: React.ReactNode;
  getFieldProps: GetFieldProps<Register>;
}

export const RegisterForm = ({
  actions,
  getFieldProps,
  ...props
}: RegisterFormProps & Omit<BoxProps, "onChange">) => (
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
      Регистрация
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <RegisterFields getFieldProps={getFieldProps} />
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {actions}
    </Box>
  </Box>
);

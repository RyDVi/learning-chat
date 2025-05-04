import { Login } from "@/src/entities/login/types/login";
import { GetFieldProps } from "@/src/shared/hooks/useForm";
import { TextField } from "@mui/material";

export const LoginFields = ({
  getFieldProps,
}: {
  getFieldProps: GetFieldProps<Login>;
}) => (
  <>
    <TextField
      name="email"
      type="email"
      label="Почта  "
      placeholder="Введите почту"
      autoFocus
      {...getFieldProps("email")}
    />
    <TextField
      name="password"
      type="password"
      label="Пароль"
      placeholder="Введите пароль"
      {...getFieldProps("password")}
    />
  </>
);

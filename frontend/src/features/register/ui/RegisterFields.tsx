import { Register } from "@/src/entities/register";
import { GetFieldProps } from "@/src/shared/hooks/useForm";
import { TextField } from "@mui/material";

export const RegisterFields = ({
  getFieldProps,
}: {
  getFieldProps: GetFieldProps<Register>;
}) => (
  <>
    <TextField
      name="email"
      type="email"
      label="Почта"
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
    <TextField
      name="repeatPassword"
      type="password"
      label="Повторите пароль"
      placeholder="Повтрите ввод пароль"
      {...getFieldProps("repeatPassword")}
    />
  </>
);

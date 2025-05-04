import { Button, ButtonProps } from "@mui/material";

export const LoginButton = (props: ButtonProps) => {
  return (
    <Button variant="contained" {...props}>
      Войти
    </Button>
  );
};

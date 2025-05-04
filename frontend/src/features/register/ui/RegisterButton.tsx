import { Button, ButtonProps } from "@mui/material";

export const RegisterButton = (props: ButtonProps) => {
  return (
    <Button variant="contained" {...props}>
      Зарегистрироваться
    </Button>
  );
};

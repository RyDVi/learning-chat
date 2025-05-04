import { paths } from "@/src/shared/lib";
import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

export const NavigateToLoginButton = (props: Omit<ButtonProps, "onClick">) => (
  <Link href={paths.login({})}>
    <Button variant="contained" {...props} sx={{ width: "100%", ...props.sx }}>
      Войти с существующим аккаунтом
    </Button>
  </Link>
);

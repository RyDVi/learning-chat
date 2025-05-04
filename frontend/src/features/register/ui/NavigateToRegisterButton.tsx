import { paths } from "@/src/shared/lib";
import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

export const NavigateToRegisterButton = (
  props: Omit<ButtonProps, "onClick">
) => (
  <Link href={paths.register({})}>
    <Button variant="contained" {...props} sx={{ width: "100%", ...props.sx }}>
      Создать новый аккаунт
    </Button>
  </Link>
);

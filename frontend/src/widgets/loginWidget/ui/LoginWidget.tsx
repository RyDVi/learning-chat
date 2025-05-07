"use client";
import { loginUser, loginValidator } from "@/src/entities/login";
import { Login } from "@/src/entities/login/types/login";
import { LoginButton, LoginForm } from "@/src/features/login";
import { NavigateToRegisterButton } from "@/src/features/register";
import { useForm } from "@/src/shared/hooks/useForm";
import { paths } from "@/src/shared/lib";
import { catchError } from "@/src/shared/lib/wrapError";
import { redirect } from "next/navigation";

const initialValues: Login = {
  email: "",
  password: "",
};

export const LoginWidget = () => {
  const { getFieldProps, handleSubmit } = useForm<Login>({
    initialValues,
    validationSchema: loginValidator,
    onSubmit: (data) =>
      catchError(loginUser)(data).then(() => redirect(paths.main({}))),
  });
  return (
    <LoginForm
      onSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      actions={
        <>
          <LoginButton type="submit" />
          <NavigateToRegisterButton />
        </>
      }
    />
  );
};

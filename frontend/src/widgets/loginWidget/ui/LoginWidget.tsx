"use client";
import { loginValidator } from "@/src/entities/login";
import { Login } from "@/src/entities/login/types/login";
import { LoginButton, LoginForm } from "@/src/features/login";
import { NavigateToRegisterButton } from "@/src/features/register";
import { useForm } from "@/src/shared/hooks/useForm";

const initialValues: Login = {
  email: "",
  password: "",
};

export const LoginWidget = () => {
  const { getFieldProps, handleSubmit } = useForm<Login>({
    initialValues,
    validationSchema: loginValidator,
    onSubmit: async () => null,
  });
  return (
    <LoginForm
      onSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      actions={
        <>
          <LoginButton type='submit' />
          <NavigateToRegisterButton />
        </>
      }
    />
  );
};

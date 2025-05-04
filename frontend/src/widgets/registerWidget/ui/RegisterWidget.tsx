"use client";
import {
  registerUser,
  Register,
  registerValidator,
} from "@/src/entities/register";
import { NavigateToLoginButton } from "@/src/features/login";
import { RegisterButton, RegisterForm } from "@/src/features/register";
import { useForm } from "@/src/shared/hooks/useForm";
import { paths } from "@/src/shared/lib";
import { catchError } from "@/src/shared/lib/wrapError";
import { redirect } from "next/navigation";

const initialValues: Register = {
  email: "",
  password: "",
  repeatPassword: "",
};

export const RegisterWidget = () => {
  const { getFieldProps, handleSubmit } = useForm<Register>({
    initialValues,
    validationSchema: registerValidator,
    onSubmit: (data) =>
      catchError(registerUser)(data).then(() => redirect(paths.main({}))),
  });

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      actions={
        <>
          <RegisterButton type="submit" />
          <NavigateToLoginButton />
        </>
      }
    />
  );
};

"use client";
import { Register, registerValidator } from "@/src/entities/register";
import { NavigateToLoginButton } from "@/src/features/login";
import { RegisterButton, RegisterForm } from "@/src/features/register";
import { useForm } from "@/src/shared/hooks/useForm";

const initialValues: Register = {
  email: "",
  password: "",
  repeatPassword: "",
};

export const RegisterWidget = () => {
  const { getFieldProps, handleSubmit } = useForm<Register>({
    initialValues,
    validationSchema: registerValidator,
    onSubmit: async () => null,
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

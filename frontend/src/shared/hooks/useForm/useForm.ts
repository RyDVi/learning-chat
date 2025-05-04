"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AnyObject } from "yup";
import { UseFormOptions, FormProps } from "./types";

const useForm = <T extends AnyObject>(options: UseFormOptions<T>) => {
  const { initialValues, validationSchema, onSubmit } = options;

  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change
    if (errors[name as keyof T]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = async (): Promise<boolean> => {
    if (!validationSchema) return true;

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (err: any) {
      const validationErrors: Partial<Record<keyof T, string>> = {};
      err.inner.forEach((error: any) => {
        if (error.path) {
          validationErrors[error.path as keyof T] = error.message;
        }
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validate();
    if (isValid) {
      onSubmit(formData);
    }

    setIsSubmitting(false);
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    getFieldProps: (name: keyof T): FormProps<T> => ({
      value: formData[name],
      onChange: handleChange,
      error: !!errors[name],
      helperText: errors[name],
    }),
  };
};

export default useForm;

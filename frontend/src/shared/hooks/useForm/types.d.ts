import { ChangeEvent } from 'react';
import { ObjectSchema } from 'yup';

// Generic form props interface
export interface FormProps<T> {
  value: T;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

// Hook options including validation schema
export interface UseFormOptions<T> {
  initialValues: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: ObjectSchema<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: T) => Promise<any>;
}

export type GetFieldProps<T> = <K extends keyof T>(name: K) => FieldProps<T[K]>;
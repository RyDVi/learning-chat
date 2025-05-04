import * as yup from "yup";

export const loginValidator = yup.object({
  email: yup.string().email('Неверный фрмат почты').required('Необходимо указать почту'),
  password: yup.string().min(6, 'Пароль должен быть длиной не менее 6 символов').required('Необходимо указать пароль'),
});
